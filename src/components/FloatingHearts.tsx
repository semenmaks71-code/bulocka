import React from 'react'
import { motion } from 'framer-motion'

export const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 12 })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 15
        const startX = Math.random() * 100
        const duration = Math.random() * 8 + 6
        const delay = Math.random() * 4
        const hue = Math.random() > 0.5 ? 0 : 340 // Red or pink

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${startX}%`, top: '100%' }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 60],
              rotate: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={`hsl(${hue}, 80%, 55%)`}
              style={{ filter: 'drop-shadow(0 0 6px rgba(200,50,50,0.6))' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}