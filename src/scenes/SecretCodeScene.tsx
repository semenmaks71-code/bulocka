import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { verifyAccessCode } from '../services/auth'
import { Particles } from '../components/Particles'
import { Lock, Sparkles, AlertCircle, Loader2 } from 'lucide-react'

interface SecretCodeSceneProps {
  onSuccess: () => void
}

export const SecretCodeScene: React.FC<SecretCodeSceneProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Пожалуйста, введи код')
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await verifyAccessCode(code)

    setIsLoading(false)

    if (result.success) {
      setSuccessMsg(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } else {
      setError(result.error || 'Неверный код')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/intro-bg.png')` }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <Particles />

      <motion.div
        className="max-w-md w-full bg-burgundy-800/85 border border-gold-500/40 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-burgundy-700/80 border border-gold-500/50 flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8 text-gold-400" />
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-gold-300 mb-3 drop-shadow-md">
          У каждого особенного сюрприза есть свой ключ...
        </h2>

        <p className="font-body text-dustyRose mb-8 text-sm md:text-base">
          Введи свой любовный код в формате <span className="text-gold-400 font-mono">LOVE-XXXX</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(null)
              }}
              placeholder="LOVE-XXXX"
              disabled={isLoading || successMsg}
              className="w-full px-4 py-4 bg-burgundy-950/90 border-2 border-gold-500/40 rounded-xl text-center font-mono text-xl tracking-wider text-cream placeholder-gold-500/30 focus:outline-none focus:border-gold-400 transition-all uppercase shadow-inner"
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400 pointer-events-none opacity-50" />
          </div>

          {error && (
            <motion.div
              className="flex items-center justify-center gap-2 text-red-400 text-sm bg-red-950/60 border border-red-500/30 rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              className="text-gold-300 text-sm bg-gold-950/60 border border-gold-500/30 rounded-lg p-3 font-display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ❤️ Код принят! Открываем сюрприз...
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading || successMsg}
            className="w-full py-4 bg-gradient-to-r from-burgundy-700 via-gold-600 to-burgundy-700 bg-[length:200%_auto] text-cream font-display text-lg rounded-xl border border-gold-400 shadow-lg hover:bg-[position:right_center] transition-all duration-500 disabled:opacity-50 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Проверяем код...
              </span>
            ) : (
              'Открыть мой сюрприз'
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-xs text-dustyRose/70">
          Подсказка: Твой ключ ждёт тебя в одном особенном месте... (или используй <span className="font-mono text-gold-400">LOVE-7777</span>)
        </p>
      </motion.div>
    </div>
  )
}