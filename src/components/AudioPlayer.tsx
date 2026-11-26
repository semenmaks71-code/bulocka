import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  src: string
  title: string
  artist?: string
  onPlay?: () => void
  onPause?: () => void
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, artist, onPlay, onPause }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle external pause requests (when other audio starts)
  useEffect(() => {
    const handlePauseRequest = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }

    window.addEventListener('pause-all-audio', handlePauseRequest)
    return () => window.removeEventListener('pause-all-audio', handlePauseRequest)
  }, [])

  const togglePlay = useCallback(() => {
    if (!audioRef.current || error) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPause?.()
    } else {
      // Pause all other audio first
      window.dispatchEvent(new CustomEvent('pause-all-audio'))
      audioRef.current.play()
      setIsPlaying(true)
      onPlay?.()
    }
  }, [isPlaying, error, onPlay, onPause])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoaded(true)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    onPause?.()
  }

  const handleError = () => {
    setError('Аудиофайл недоступен')
    setIsLoaded(false)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.7
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full bg-burgundy-800/80 border border-gold-500/30 rounded-2xl p-6 backdrop-blur-md">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
      />

      {/* Error state */}
      {error ? (
        <div className="text-center py-8">
          <p className="text-dustyRose text-lg mb-2">🎵</p>
          <p className="text-dustyRose text-sm">{error}</p>
          <p className="text-gold-400/60 text-xs mt-2">Добавь файл {src.replace('public/', '/')} в проект</p>
        </div>
      ) : (
        <>
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="font-display text-xl text-gold-300">{title}</h3>
            {artist && <p className="text-dustyRose text-sm mt-1">{artist}</p>}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-burgundy-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
              disabled={!isLoaded}
            />
            <div className="flex justify-between text-xs text-dustyRose mt-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-gold-400 hover:text-gold-300 transition-colors"
                disabled={!isLoaded}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-burgundy-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                disabled={!isLoaded}
              />
            </div>

            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-600 to-gold-700 flex items-center justify-center shadow-lg hover:shadow-gold-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isLoaded}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-burgundy-900" />
              ) : (
                <Play className="w-7 h-7 text-burgundy-900 ml-1" />
              )}
            </motion.button>

            {/* Visual placeholder */}
            <div className="w-20 h-5 flex items-center justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gold-400 rounded-full"
                  animate={{
                    height: isPlaying ? [8, 16, 8, 12, 8] : 8,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}