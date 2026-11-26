import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeVisual } from '../components/visual/EnvelopeVisual'
import { FloatingHearts } from '../components/FloatingHearts'
import { Particles } from '../components/Particles'

interface EnvelopeSceneProps {
  onComplete: () => void
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [canProceed, setCanProceed] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => {
      setCanProceed(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-velvet velvet-texture py-12">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Фон слоями */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/assets/envelope-bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/70 to-burgundy-950/90" />

      <Particles />
      <FloatingHearts />

      <motion.div
        className="text-center relative z-30 px-4 max-w-xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Декоративный заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="ornament text-gold-500/50 justify-center mb-4">
            <span className="font-script text-gold-400 text-2xl">Письмо для тебя</span>
          </div>
          <h2 className="cinematic-title text-3xl md:text-4xl">
            Таинственное послание
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8"
        >
          <EnvelopeVisual isOpen={isOpen} onOpen={handleOpen} />
        </motion.div>

        {isOpen && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="gold-divider my-6" />

            <p className="font-elegant text-xl md:text-2xl text-cream mb-6 max-w-lg mx-auto leading-relaxed">
              Ну что, моя Булочка... готова продолжить наше путешествие? ❤️
            </p>

            {canProceed && (
              <motion.button
                onClick={onComplete}
                className="px-10 py-5 bg-gradient-to-r from-burgundy-800 via-gold-700 to-burgundy-800 bg-[length:200%_auto] text-cream font-display text-xl rounded-xl border border-gold-400/50 luxury-shadow cursor-pointer hover:bg-[position:right_center] transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Следующая глава</span>
                  <span className="text-gold-300">♥</span>
                </span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Декоративный орнамент снизу */}
        <motion.div
          className="ornament text-gold-500/40 justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ❧
        </motion.div>
      </motion.div>
    </div>
  )
}