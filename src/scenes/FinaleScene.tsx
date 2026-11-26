import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { letterText } from '../data/letter'
import { Fireworks } from '../components/Fireworks'
import { FloatingHearts } from '../components/FloatingHearts'
import { PostcardModal } from '../components/PostcardModal'
import { Heart, Sparkles, Award } from 'lucide-react'

interface FinaleSceneProps {
  onReset: () => void
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onReset }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [showPostcard, setShowPostcard] = useState(false)
  const [fireworksKey, setFireworksKey] = useState(0)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= letterText.length) {
        setDisplayedText(letterText.slice(0, index))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, 25)

    return () => clearInterval(timer)
  }, [])

  const handleSkip = () => {
    setDisplayedText(letterText)
    setIsTypingComplete(true)
  }

  const handleReplayFireworks = () => {
    setFireworksKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden bg-velvet velvet-texture">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url('/assets/photo_6_2026-11-26_10-01-41.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/85 via-burgundy-900/70 to-burgundy-950/85" />

      <FloatingHearts />
      <Fireworks key={fireworksKey} trigger={true} />

      <div className="max-w-2xl mx-auto relative z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-gold-400 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 15px rgba(201, 160, 48, 0.8))' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-16 h-16 text-red-500 animate-pulse" style={{ animationDuration: '1.2s' }} />
              </div>
            </div>
          </div>

          <div className="ornament text-gold-500/60 justify-center mb-6">
            <span className="font-script text-gold-400 text-2xl">Поздравляю</span>
          </div>

          <h1 className="cinematic-title text-4xl md:text-5xl lg:text-6xl mb-6 px-4">
            С ТРЕМЯ МЕСЯЦАМИ НАС!
          </h1>

          <p className="font-script text-2xl text-gold-300 gold-glow">
            моя Булочка ❤️
          </p>

          <p className="font-elegant text-xl text-dustyRose mt-4 max-w-lg mx-auto">
            Три месяца — это только начало нашей большой истории.
          </p>
        </motion.div>

        {/* Letter Container */}
        <motion.div
          className="bg-burgundy-950/90 border-2 border-gold-500/40 rounded-2xl p-6 md:p-10 backdrop-blur-md luxury-shadow mb-10 text-left relative"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute top-4 right-4 text-gold-400 opacity-60">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="font-elegant text-lg md:text-xl text-cream leading-relaxed whitespace-pre-line min-h-[280px]">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-6 bg-gold-400 ml-1 animate-pulse" />
            )}
          </div>

          {!isTypingComplete && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSkip}
                className="px-6 py-3 bg-burgundy-900/80 border border-gold-500/30 text-gold-300 text-sm font-display rounded-lg hover:bg-burgundy-800 transition-all backdrop-blur-sm cursor-pointer"
              >
                Показать письмо полностью
              </button>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        {isTypingComplete && (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowPostcard(true)}
              className="px-8 py-4 bg-gradient-to-r from-burgundy-800 via-gold-700 to-burgundy-800 bg-[length:200%_auto] text-cream font-display text-lg rounded-xl border border-gold-400 shadow-lg hover:bg-[position:right_center] transition-all duration-500 flex items-center gap-3 backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Award className="w-5 h-5 text-gold-300" />
              <span>Открытка для тебя</span>
            </motion.button>

            <motion.button
              onClick={handleReplayFireworks}
              className="px-6 py-4 bg-burgundy-900/80 border border-gold-500/50 text-gold-300 font-display rounded-xl hover:bg-burgundy-800 transition-all backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                🎉 Ещё фейерверки
              </span>
            </motion.button>

            <motion.button
              onClick={onReset}
              className="px-6 py-4 bg-burgundy-950/80 border border-dustyRose/30 text-dustyRose font-elegant text-base rounded-xl hover:bg-burgundy-900 transition-all backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Начать сначала
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Postcard Modal */}
      {showPostcard && <PostcardModal onClose={() => setShowPostcard(false)} />}
    </div>
  )
}