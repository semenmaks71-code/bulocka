import { supabase, isSupabaseConfigured } from './supabase'

const TOKEN_KEY = 'arina_access_token'
const PROGRESS_KEY = 'arina_progress'

interface AccessResult {
  success: boolean
  token?: string
  error?: string
  message?: string
}

interface VerifyResponse {
  success: boolean
  token?: string
  message?: string
  error?: string
}

// Check if user has valid saved token
export const checkSavedToken = async (): Promise<{ valid: boolean; progress?: number }> => {
  const savedToken = localStorage.getItem(TOKEN_KEY)

  if (!savedToken) {
    return { valid: false }
  }

  // If Supabase is not configured, fall back to localStorage-only mode
  if (!isSupabaseConfigured()) {
    const progress = parseInt(localStorage.getItem(PROGRESS_KEY) || '0', 10)
    return { valid: true, progress }
  }

  try {
    // Verify token with Supabase
    const { data, error } = await supabase.rpc('verify_token', { token: savedToken })

    if (error || !data?.valid) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(PROGRESS_KEY)
      return { valid: false }
    }

    return { valid: true, progress: data.progress || 0 }
  } catch {
    return { valid: false }
  }
}

// Verify access code
export const verifyAccessCode = async (code: string): Promise<AccessResult> => {
  const normalizedCode = code.trim().toUpperCase()

  // Fallback mode without Supabase - accepts any code starting with LOVE-
  if (!isSupabaseConfigured()) {
    if (normalizedCode.startsWith('LOVE-') && normalizedCode.length === 9) {
      const token = generateToken()
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(PROGRESS_KEY, '1')
      return { success: true, token, message: 'fallback_mode' }
    }
    return { success: false, error: 'Неверный код. Подсказка: код начинается с LOVE-', message: 'invalid_code' }
  }

  try {
    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('verify-code', {
      body: { code: normalizedCode },
    })

    const response = data as VerifyResponse | null

    if (error || !response?.success) {
      return {
        success: false,
        error: response?.error || 'Неверный код. Подсказка: код начинается с LOVE-',
        message: response?.message
      }
    }

    // Save token locally
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(PROGRESS_KEY, '1')
    }

    return { success: true, token: response.token }
  } catch (err) {
    console.error('Verification error:', err)
    return { success: false, error: 'Ошибка проверки. Попробуй ещё раз.', message: 'server_error' }
  }
}

// Save progress
export const saveProgress = (step: number): void => {
  localStorage.setItem(PROGRESS_KEY, step.toString())
}

// Get progress
export const getProgress = (): number => {
  return parseInt(localStorage.getItem(PROGRESS_KEY) || '0', 10)
}

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem(TOKEN_Key_Clean())
}

const TOKEN_Key_Clean = () => TOKEN_KEY

// Helper functions
const generateToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}
