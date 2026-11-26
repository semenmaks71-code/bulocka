import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeVisualProps {
  isOpen: boolean
  onOpen: () => void
}

export const EnvelopeVisual: React.FC<EnvelopeVisualProps> = ({ isOpen, onOpen }) => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center cursor-pointer group" onClick={!isOpen ? onOpen : undefined}>
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden luxury-shadow border-2 border-gold-500/40 bg-burgundy-950 flex flex-col items-center justify-center p-6"
        whileHover={!isOpen ? { scale: 1.02, borderColor: 'rgba(201, 160, 48, 0.8)' } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Фоновое изображение конверта */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('/assets/envelope-bg.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-900/80 to-burgundy-950/90" />

        {/* До открытия: Конверт с сияющей золотой печатью-сердцем */}
        {!isOpen && (
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 via-gold-600 to-gold-700 flex items-center justify-center shadow-2xl border-2 border-gold-300 mb-6"
              animate={{
                boxShadow: ['0 0 20px rgba(201, 160, 48, 0.4)', '0 0 40px rgba(201, 160, 48, 0.8)', '0 0 20px rgba(201, 160, 48, 0.4)'],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-3xl text-burgundy-950 font-bold">♥</span>
            </motion.div>

            <h3 className="font-display text-2xl text-gold-300 mb-2 drop-shadow-md">
              Письмо для Арины
            </h3>

            <motion.p
              className="font-elegant text-dustyRose text-base italic"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              (Нажмите, чтобы распечатать конверт)
            </motion.p>
          </div>
        )}

        {/* После открытия: Письмо плавно выплывает из конверта */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-6 bg-burgundy-900/95 border-2 border-gold-400/60 rounded-xl p-6 shadow-2xl flex flex-col justify-center text-center z-20 backdrop-blur-md"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="absolute top-3 right-4 text-gold-400">✨</div>
              <h3 className="font-display text-xl md:text-2xl text-gold-300 mb-3 gold-glow">
                Моя дорогая Арина ❤️
              </h3>
              <p className="font-elegant text-cream text-base md:text-lg leading-relaxed mb-4">
                Каждый момент с тобой наполнен теплом, нежностью и настоящим волшебством. Спасибо, что ты есть у меня.
              </p>
              <p className="font-script text-gold-400 text-2xl">
                Твой Булочка
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}