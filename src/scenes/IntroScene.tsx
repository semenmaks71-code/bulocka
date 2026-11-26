import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingHeart } from '../components/visual/GlowingHeart'
import { Particles } from '../components/Particles'

interface IntroSceneProps {
  onComplete: () => void
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const [clickEffect, setClickEffect] = useState(false)

  const handleHeartClick = () => {
    if (clickEffect) return
    setClickEffect(true)
    setTimeout(() => {
      setClickEffect(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-velvet velvet-texture py-12">
      {/* Виньетка для кинематографичности */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Бархатная текстура с градиентами */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/intro-bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/80 via-transparent to-burgundy-900/80" />

      <Particles />

      {/* Волна золотого света и частицы при клике на рубиновое сердце */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Золотая волна */}
            <motion.div
              className="absolute rounded-full border-2 border-gold-400 bg-gold-500/20"
              initial={{ width: 100, height: 100, opacity: 1 }}
              animate={{ width: '150vw', height: '150vw', opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {/* Разлетающиеся сердечки */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12
              const distance = 250 + Math.random() * 150
              return (
                <motion.div
                  key={i}
                  className="absolute text-gold-400 text-2xl"
                  initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    scale: [0.5, 1.5, 0.8],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  ♥
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-30 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Декоративный орнамент сверху */}
        <motion.div
          className="ornament text-gold-500/60 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          ❧
        </motion.div>

        {/* Кинематографичный заголовок */}
        <motion.h1
          className="cinematic-title text-4xl md:text-6xl mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Для моей Булочки
        </motion.h1>

        {/* Подзаголовок script-шрифтом */}
        <motion.p
          className="font-script text-2xl md:text-3xl text-gold-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ textShadow: '0 0 20px rgba(201, 160, 48, 0.5)' }}
        >
          Наша маленькая история ❤️
        </motion.p>

        {/* Рубиновое сердце в центре композиции (крупное, с пульсацией и эффектами) */}
        <motion.div
          className="my-4 flex justify-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
        >
          <GlowingHeart size={260} onClick={handleHeartClick} />
        </motion.div>

        <motion.p
          className="font-elegant text-sm text-gold-400/80 mb-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          (Нажми на рубиновое сердце, чтобы почувствовать магию)
        </motion.p>

        {/* Интригующий текст */}
        <motion.p
          className="font-elegant text-xl md:text-2xl text-cream/90 mb-8 max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Кажется, сегодня тебя ждёт кое-что особенное...
        </motion.p>

        {/* Кнопка с золотой рамкой */}
        <motion.button
          onClick={onComplete}
          className="relative px-10 py-5 bg-burgundy-950/80 border-2 border-gold-500/50 text-gold-300 font-display text-xl rounded-xl overflow-hidden group cursor-pointer luxury-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(201, 160, 48, 0.8)' }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Внутреннее свечение при наведении */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span className="relative z-10 flex items-center gap-3">
            <span>Открыть историю</span>
            <span className="text-gold-400">♥</span>
          </span>
        </motion.button>

        {/* Декоративный орнамент снизу */}
        <motion.div
          className="ornament text-gold-500/60 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          ❧
        </motion.div>
      </motion.div>

      {/* Нижняя виньетка для глубины */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-burgundy-950 to-transparent pointer-events-none z-10" />
    </div>
  )
}