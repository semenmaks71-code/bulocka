import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { riddles, checkAnswer } from '../data/riddles'
import { Particles } from '../components/Particles'
import { Heart, ArrowRight, CheckCircle } from 'lucide-react'

interface QuizSceneProps {
  onComplete: () => void
}

export const QuizScene: React.FC<QuizSceneProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState<number[]>([])

  const currentRiddle = riddles[currentIndex]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correct = checkAnswer(currentRiddle, answer)
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setCompleted([...completed, currentIndex])
    }
  }

  const handleNext = () => {
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswer('')
      setShowResult(false)
      setIsCorrect(false)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-velvet velvet-texture px-4 py-8">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Фоновое изображение с низкой прозрачностью */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('/assets/Рубиновое сердце среди роз и золота.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" />

      <Particles />

      <motion.div
        className="max-w-lg w-full bg-burgundy-950/85 gold-frame rounded-2xl p-6 md:p-10 backdrop-blur-md luxury-shadow relative z-30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Индикатор прогресса */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {riddles.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-gold-400 scale-125 shadow-md shadow-gold-500/50'
                  : completed.includes(i)
                  ? 'bg-green-500'
                  : 'bg-burgundy-800 border border-gold-500/30'
              }`}
            />
          ))}
        </div>

        <p className="text-center font-script text-xl text-gold-400 mb-6">
          Загадка {currentIndex + 1} из {riddles.length}
        </p>

        <div className="gold-divider mb-8" />

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-burgundy-900 border border-gold-500/50 flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-5 h-5 text-gold-400 fill-gold-400/30" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-cream leading-relaxed">
                  {currentRiddle.question}
                </h2>
              </div>

              {currentRiddle.hint && (
                <p className="font-elegant text-dustyRose text-base mb-8 italic pl-14 border-l-2 border-gold-500/30">
                  Подсказка: {currentRiddle.hint}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Твой ответ..."
                  className="w-full px-5 py-4 bg-burgundy-900/90 border-2 border-gold-500/40 rounded-xl text-cream placeholder-gold-500/30 font-elegant text-lg focus:outline-none focus:border-gold-400 transition-all shadow-inner"
                />

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-burgundy-800/90 border-2 border-gold-500 text-gold-300 font-display text-lg rounded-xl hover:bg-burgundy-700 hover:border-gold-400 transition-all shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Проверить ответ
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-6"
            >
              {isCorrect && (
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-950/80 border-2 border-green-500/50 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                </div>
              )}

              <p className={`font-display text-xl md:text-2xl mb-8 leading-relaxed ${isCorrect ? 'text-gold-300 gold-glow' : 'text-red-400'}`}>
                {isCorrect ? currentRiddle.successMessage : 'Не совсем так... Попробуй ещё раз ❤️'}
              </p>

              <motion.button
                onClick={isCorrect ? handleNext : () => setShowResult(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-burgundy-800 via-gold-600 to-burgundy-800 bg-[length:200%_auto] text-cream font-display text-lg rounded-xl border border-gold-400 shadow-lg hover:bg-[position:right_center] transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCorrect ? (
                  <>
                    <span>{currentIndex < riddles.length - 1 ? 'Следующая загадка' : 'Продолжить историю'}</span>
                    <ArrowRight className="w-5 h-5 text-gold-300" />
                  </>
                ) : (
                  'Попробовать снова'
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}