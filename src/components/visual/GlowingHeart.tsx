import React from 'react'
import { motion } from 'framer-motion'

interface GlowingHeartProps {
  size?: number | string
  className?: string
  onClick?: () => void
}

export const GlowingHeart: React.FC<GlowingHeartProps> = ({ size = 280, className = '', onClick }) => {
  return (
    <motion.div
      className={`relative cursor-pointer group ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      animate={{
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Мягкое золотое свечение на заднем плане */}
      <motion.div
        className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-gold-500/20 via-gold-400/40 to-gold-500/20 blur-2xl pointer-events-none"
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Основное изображение рубинового сердца с тенью и глубиной */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl"
        style={{
          backgroundImage: `url('/assets/Рубиновое сердце среди роз и золота.png')`,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(201, 160, 48, 0.4), inset 0 0 20px rgba(255, 100, 100, 0.2)',
          border: '2px solid rgba(201, 160, 48, 0.5)',
        }}
      />

      {/* Блик поверх для создания объема и глянцевости */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Золотая пульсирующая рамка */}
      <motion.div
        className="absolute inset-[-4px] rounded-2xl border border-gold-400/40 pointer-events-none"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}