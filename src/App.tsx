import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SceneType } from './types'
import { saveProgress } from './services/auth'

// Scenes
import { IntroScene } from './scenes/IntroScene'
import { SecretCodeScene } from './scenes/SecretCodeScene'
import { EnvelopeScene } from './scenes/EnvelopeScene'
import { QuizScene } from './scenes/QuizScene'
import { MemoryScene } from './scenes/MemoryScene'
import { TimelineScene } from './scenes/TimelineScene'
import { VoiceScene } from './scenes/VoiceScene'
import { SongScene } from './scenes/SongScene'
import { SecretRoomScene } from './scenes/SecretRoomScene'
import { FinaleScene } from './scenes/FinaleScene'

const sceneVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function App() {
  const [scene, setScene] = useState<SceneType>('intro')
  const [isLoading] = useState(false)

  // Scene sequence
  const scenes: Record<SceneType, SceneType | null> = {
    'intro': 'secret-code',
    'secret-code': 'envelope',
    'envelope': 'quiz',
    'quiz': 'memory',
    'memory': 'timeline',
    'timeline': 'voice',
    'voice': 'song',
    'song': 'secret-room',
    'secret-room': 'finale',
    'finale': null,
  }

  const nextScene = scenes[scene]

  const handleSceneComplete = () => {
    if (nextScene) {
      setScene(nextScene)

      // Save progress
      const progressMap: Record<SceneType, number> = {
        'intro': 0,
        'secret-code': 0,
        'envelope': 1,
        'quiz': 2,
        'memory': 3,
        'timeline': 4,
        'voice': 5,
        'song': 6,
        'secret-room': 7,
        'finale': 8,
      }
      saveProgress(progressMap[nextScene])
    }
  }

  const handleReset = () => {
    localStorage.removeItem('arina_access_token')
    localStorage.removeItem('arina_progress')
    setScene('intro')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-burgundy-900 flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <motion.div key="intro" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <IntroScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'secret-code' && (
          <motion.div key="secret-code" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <SecretCodeScene onSuccess={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'envelope' && (
          <motion.div key="envelope" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <EnvelopeScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'quiz' && (
          <motion.div key="quiz" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <QuizScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'memory' && (
          <motion.div key="memory" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <MemoryScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'timeline' && (
          <motion.div key="timeline" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <TimelineScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'voice' && (
          <motion.div key="voice" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <VoiceScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'song' && (
          <motion.div key="song" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <SongScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'secret-room' && (
          <motion.div key="secret-room" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            <SecretRoomScene onComplete={handleSceneComplete} />
          </motion.div>
        )}

        {scene === 'finale' && (
          <motion.div key="finale" variants={sceneVariants} initial="initial" animate="animate" exit="exit">
            < FinaleScene onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App