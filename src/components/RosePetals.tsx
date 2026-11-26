import React from 'react'
import { motion } from 'framer-motion'

export const RosePetals: React.FC = () => {
  const petals = Array.from({ length: 20 })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((_, i) => {
        const size = Math.random() * 15 + 10
        const startX = Math.random() * 100
        const duration = Math.random() * 12 + 8
        const delay = Math.random() * 6
        const rotation = Math.random() * 360
        const depth = Math.random() > 0.5

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: '-10%',
              width: size,
              height: size,
              rotate: rotation,
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              x: [
                0,
                Math.sin(i * 0.5) * 80,
                Math.cos(i * 0.7) * 100,
              ],
              rotate: [rotation, rotation + 180, rotation + 360],
              opacity: [0.4, 0.7, 0.4],
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
              style={{ filter: 'drop-shadow(0 0 4px rgba(139, 0, 0, 0.4))' }}
            >
              <defs>
                <linearGradient id={`roseGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={depth ? '#8b0000' : '#a52a2a'} />
                  <stop offset="100%" stopColor={depth ? '#5c2020' : '#7a1515'} />
                </linearGradient>
              </defs>
              <path
                d="M12 2C10 4 8 6 8 10c0 3 2 6 4 8 2-2 4-5 4-8 0-4-2-6-4-8z"
                fill={`url(#roseGradient${i})`}
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}