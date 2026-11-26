import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  code: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { code } = await req.json() as RequestBody

    if (!code || !code.startsWith('LOVE-') || code.length !== 9) {
      return new Response(
        JSON.stringify({ success: false, error: 'Неверный формат кода' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Rate limiting - check attempts in last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentAttempts } = await supabase
      .from('verification_logs')
      .select('id')
      .gte('created_at', oneHourAgo)

    if (recentAttempts && recentAttempts.length >= 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Слишком много попыток. Попробуй позже.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Find and validate code
    const { data: accessCode } = await supabase
      .from('access_codes')
      .select('id, is_used')
      .eq('code', code.toUpperCase())
      .single()

    if (!accessCode) {
      await supabase.from('verification_logs').insert({
        code_attempt: code,
        success: false,
      })

      return new Response(
        JSON.stringify({ success: false, error: 'Неверный код' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    if (accessCode.is_used) {
      await supabase.from('verification_logs').insert({
        code_attempt: code,
        success: false,
      })

      return new Response(
        JSON.stringify({ success: false, error: 'Этот код уже был использован' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Generate secure token
    const token = crypto.randomUUID()

    // Mark code as used and create token
    await supabase.from('access_codes').update({ is_used: true }).eq('id', accessCode.id)
    await supabase.from('access_tokens').insert({
      token,
      code_id: accessCode.id,
      progress: 1,
    })
    await supabase.from('verification_logs').insert({
      code_attempt: code,
      success: true,
    })

    return new Response(
      JSON.stringify({ success: true, token, message: 'code_activated' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Внутренняя ошибка сервера' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})