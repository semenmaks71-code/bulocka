import React from 'react'
import { motion } from 'framer-motion'
import { timelineItems } from '../data/timeline'
import { Particles } from '../components/Particles'
import { Heart } from 'lucide-react'

interface TimelineSceneProps {
  onComplete: () => void
}

export const TimelineScene: React.FC<TimelineSceneProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden bg-velvet velvet-texture">
      {/* Виньетка */}
      <div className="absolute inset-0 vignette pointer-events-none z-20" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/photo_5_2026-11-26_10-01-41.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950 via-burgundy-900/70 to-burgundy-950" />

      <Particles />

      <div className="max-w-2xl mx-auto relative z-30">
        {/* Декоративный заголовок */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="ornament text-gold-500/50 justify-center mb-4">
            <span className="font-script text-gold-400 text-2xl">Наша история</span>
          </div>
          <h2 className="cinematic-title text-3xl md:text-4xl px-8">
            С чего всё началось...
          </h2>
        </motion.div>

        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-40 bottom-40 w-0.5 bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0" />

        {/* Timeline items */}
        <div className="space-y-16">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
            >
              {/* Dot with glow */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-400 z-10">
                <div className="absolute inset-0 rounded-full bg-gold-300 animate-ping opacity-50" />
                <div className="absolute inset-0 rounded-full shadow-lg shadow-gold-500/50" />
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} text-center md:text-left`}>
                <div className="bg-burgundy-950/85 border border-gold-500/30 rounded-xl p-6 backdrop-blur-md luxury-shadow">
                  <span className="inline-block px-4 py-1.5 bg-gold-600/20 border border-gold-500/40 rounded-full text-gold-400 text-sm font-display mb-3">
                    {item.date}
                  </span>
                  <h3 className="font-display text-xl text-cream mb-3">{item.title}</h3>
                  <p className="font-elegant text-dustyRose text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final heart */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <div className="relative">
            <Heart className="w-12 h-12 text-gold-400 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 10px rgba(201, 160, 48, 0.6))' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-12 h-12 text-red-500 animate-pulse" style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        </motion.div>

        <div className="gold-divider my-10" />

        {/* Continue button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button
            onClick={onComplete}
            className="px-10 py-5 bg-burgundy-950/80 border-2 border-gold-500/50 text-gold-300 font-display text-xl rounded-xl luxury-shadow cursor-pointer hover:border-gold-400 transition-all"
          >
            <span className="flex items-center gap-3">
              <span>Дальше</span>
              <span className="text-gold-400">♥</span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}