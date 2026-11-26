import { forwardRef } from 'react'

interface PostcardVisualProps {
  className?: string
}

export const PostcardVisual = forwardRef<HTMLDivElement, PostcardVisualProps>(({ className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-80 h-96 md:w-[450px] md:h-[550px] rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}assets/photo_7_2026-11-26_10-01-41.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 160, 48, 0.3)',
      }}
    >
      {/* Dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
        <h2 className="font-display text-3xl md:text-4xl text-gold-300 mb-4 drop-shadow-lg" style={{ textShadow: '0 0 20px rgba(201, 160, 48, 0.8)' }}>
          Арина ❤️
        </h2>
        <p className="font-display text-xl md:text-2xl text-cream mb-6 drop-shadow-md">
          С нашими тремя месяцами!
        </p>
        <p className="font-body text-base md:text-lg text-cream leading-relaxed max-w-xs drop-shadow-md">
          Ты — часть моей самой любимой истории.<br />
          И я счастлив, что эта история началась именно с тебя.
        </p>
        <p className="font-display text-lg md:text-xl text-gold-400 mt-6 drop-shadow-md">
          Твой Максим ❤️
        </p>
      </div>
    </div>
  )
})

PostcardVisual.displayName = 'PostcardVisual'