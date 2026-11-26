import React from 'react'
import { motion } from 'framer-motion'
import { AudioPlayer } from '../components/AudioPlayer'
import { Particles } from '../components/Particles'
import { Mic } from 'lucide-react'

interface VoiceSceneProps {
  onComplete: () => void
}

export const VoiceScene: React.FC<VoiceSceneProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-velvet velvet-texture">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/assets/photo_4_2026-11-26_10-01-41.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950 via-burgundy-900/70 to-burgundy-950" />

      <Particles />

      <motion.div
        className="max-w-lg w-full text-center relative z-30 bg-burgundy-950/85 gold-frame rounded-2xl p-8 backdrop-blur-md luxury-shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-burgundy-900 border border-gold-500/50 flex items-center justify-center shadow-lg">
          <Mic className="w-8 h-8 text-gold-400" />
        </div>

        <div className="ornament text-gold-500/50 justify-center mb-4">
          <span className="font-script text-gold-400 text-xl">Особенное послание</span>
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-gold-300 mb-8 leading-relaxed">
          Есть кое-что, что я хочу сказать тебе своим голосом...
        </h2>

        <div className="mb-8">
          <AudioPlayer
            src="./audio/voice-message.ogg"
            title="Голосовое послание"
            artist="Для моей Булочки"
          />
        </div>

        <div className="gold-divider mb-8" />

        <motion.button
          onClick={onComplete}
          className="w-full py-4 bg-burgundy-900/90 border-2 border-gold-500 text-gold-300 font-display text-lg rounded-xl hover:bg-burgundy-800 hover:border-gold-400 transition-all shadow-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-3">
            <span>Прослушать песню</span>
            <span className="text-gold-400">♥</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  )
}