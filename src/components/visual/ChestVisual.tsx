import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChestVisualProps {
  isOpen: boolean
  onClick: () => void
}

export const ChestVisual: React.FC<ChestVisualProps> = ({ isOpen, onClick }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center group w-full max-w-md mx-auto" onClick={!isOpen ? onClick : undefined}>
      <motion.div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden luxury-shadow border-2 border-gold-500/40 bg-burgundy-950 flex flex-col items-center justify-center p-6"
        whileHover={!isOpen ? { scale: 1.02, borderColor: 'rgba(201, 160, 48, 0.8)' } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Фоновое изображение шкатулки */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/photo_2_2026-11-26_10-01-41.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-900/80 to-burgundy-950/90" />

        {/* Золотой замок / Ключ до открытия */}
        {!isOpen && (
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 via-gold-600 to-gold-700 flex items-center justify-center shadow-2xl border-2 border-gold-300 mb-4"
              animate={{
                boxShadow: ['0 0 20px rgba(201, 160, 48, 0.4)', '0 0 40px rgba(201, 160, 48, 0.8)', '0 0 20px rgba(201, 160, 48, 0.4)'],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl text-burgundy-950">🔒</span>
            </motion.div>

            <h3 className="font-display text-xl text-gold-300 mb-2 drop-shadow-md">
              Секретная шкатулка
            </h3>

            <motion.p
              className="font-elegant text-dustyRose text-sm italic"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              (Нажмите, чтобы открыть замок и крышку)
            </motion.p>
          </div>
        )}

        {/* Крышка открывается и изнутри идет золотое свечение + лепестки / частицы */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-burgundy-950/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Золотое свечение изнутри */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gold-500/30 via-gold-400/20 to-transparent pointer-events-none"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Вылетающие золотые частицы и сердечки */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-gold-400 text-lg pointer-events-none"
                  initial={{ x: 0, y: 20, opacity: 1, scale: 0.5 }}
                  animate={{
                    x: (Math.random() - 0.5) * 200,
                    y: -100 - Math.random() * 80,
                    opacity: 0,
                    scale: [0.5, 1.2, 0.8],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  {i % 2 === 0 ? '✨' : '❤️'}
                </motion.div>
              ))}

              <motion.div
                className="relative z-30 bg-burgundy-900/95 border-2 border-gold-400/60 rounded-xl p-6 shadow-2xl text-center"
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-gold-400 text-2xl mb-2">💎</div>
                <p className="font-display text-lg md:text-xl text-gold-300 mb-3 gold-glow leading-relaxed">
                  «Если бы мне снова пришлось выбирать, я бы снова выбрал тебя. ❤️»
                </p>
                <div className="gold-divider my-3" />
                <p className="font-elegant text-dustyRose text-base">
                  Спасибо, что ты есть в моей жизни, моя Булочка
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}