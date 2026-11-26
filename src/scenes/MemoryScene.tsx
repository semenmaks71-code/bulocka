import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingHeart } from '../components/visual/GlowingHeart'
import { Particles } from '../components/Particles'

interface MemorySceneProps {
  onComplete: () => void
}

export const MemoryScene: React.FC<MemorySceneProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1)
      }
    }, 4500)
    return () => clearTimeout(timer)
  }, [step])

  const texts = [
    'А помнишь?..',
    'Тот самый момент, когда ты впервые сказала мне, что любишь меня.',
    'Возможно, для тебя это были просто слова. Но для меня они стали одним из самых дорогих воспоминаний.',
    'Я очень дорожу тобой, Арина. И хочу, чтобы ты всегда это знала ❤️',
  ]

  const styles = [
    'font-script text-4xl md:text-5xl text-gold-300',
    'font-display text-2xl md:text-3xl text-cream',
    'font-elegant text-xl md:text-2xl text-dustyRose',
    'font-display text-xl md:text-2xl text-gold-300 gold-glow',
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden bg-velvet velvet-texture">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Background image with overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('/assets/photo_3_2026-11-26_10-01-41.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/80 via-burgundy-900/60 to-burgundy-950/80" />

      <Particles />

      <div className="relative z-30 max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              <GlowingHeart size={step === 0 ? 120 : 80} className="mx-auto mb-10" />
            </motion.div>

            <p className={styles[step]}>
              {texts[step]}
            </p>

            {step < 3 && (
              <div className="mt-8 flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === step
                        ? 'w-8 bg-gold-400'
                        : i < step
                        ? 'w-3 bg-gold-500/60'
                        : 'w-3 bg-burgundy-800'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="gold-divider my-10" />

              <motion.button
                onClick={onComplete}
                className="px-10 py-5 bg-burgundy-950/80 border-2 border-gold-500/50 text-gold-300 font-display text-xl rounded-xl luxury-shadow cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(201, 160, 48, 0.8)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-3">
                  <span>Продолжить</span>
                  <span className="text-gold-400">♥</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}