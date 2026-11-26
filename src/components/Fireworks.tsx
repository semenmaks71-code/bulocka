import React, { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

interface FireworksProps {
  trigger?: boolean
  onComplete?: () => void
}

export const Fireworks: React.FC<FireworksProps> = ({ trigger = true, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!trigger) return

    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        if (onComplete) onComplete()
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      // Gold and red romantic fireworks
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#c9a030', '#d4b05a', '#8b0000', '#ff4d4d', '#f5f0e6'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#c9a030', '#f0e4b8', '#a52a2a', '#ff6b6b', '#ffffff'],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [trigger, onComplete])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50" />
}
