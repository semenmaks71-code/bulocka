import React from 'react'
import { motion } from 'framer-motion'

export const Particles: React.FC = () => {
  const particles = Array.from({ length: 30 })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2
        const startX = Math.random() * 100
        const duration = Math.random() * 10 + 5
        const delay = Math.random() * 5

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-400 opacity-60"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              top: '-5%',
              boxShadow: '0 0 8px rgba(212, 176, 90, 0.8)',
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [
                `${Math.sin(i) * 30}px`,
                `${Math.cos(i) * 50}px`,
              ],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}
