import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChestVisual } from '../components/visual/ChestVisual'
import { Particles } from '../components/Particles'
import { Sparkles } from 'lucide-react'

interface SecretRoomSceneProps {
  onComplete: () => void
}

export const SecretRoomScene: React.FC<SecretRoomSceneProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-velvet velvet-texture py-12">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Darker background with subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" />
      <Particles />

      <motion.div
        className="max-w-lg w-full text-center relative z-30 bg-burgundy-950/85 gold-frame rounded-2xl p-8 backdrop-blur-md luxury-shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-4">
          <Sparkles className="w-8 h-8 text-gold-400 animate-pulse" />
        </div>

        <div className="ornament text-gold-500/50 justify-center mb-4">
          <span className="font-script text-gold-400 text-xl">Сокровищница</span>
        </div>

        <motion.h2
          className="cinematic-title text-2xl md:text-3xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          А это ещё не всё...
        </motion.h2>

        <div className="mb-8 flex justify-center">
          <ChestVisual isOpen={isOpen} onClick={() => setIsOpen(true)} />
        </div>

        {isOpen && (
          <motion.button
            onClick={onComplete}
            className="w-full py-4 bg-gradient-to-r from-burgundy-800 via-gold-700 to-burgundy-800 bg-[length:200%_auto] text-cream font-display text-lg rounded-xl border border-gold-400 shadow-lg hover:bg-[position:right_center] transition-all duration-500 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-3">
              <span>К финалу</span>
              <span className="text-gold-300">🎉</span>
            </span>
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}