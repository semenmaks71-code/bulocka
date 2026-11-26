import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { PostcardVisual } from './visual/PostcardVisual'
import { X, Download, Share2 } from 'lucide-react'

interface PostcardModalProps {
  onClose: () => void
}

export const PostcardModal: React.FC<PostcardModalProps> = ({ onClose }) => {
  const postcardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isExported, setIsExported] = useState(false)

  const handleExport = async () => {
    if (!postcardRef.current) return

    setIsExporting(true)
    try {
      const canvas = await html2canvas(postcardRef.current, {
        backgroundColor: '#1a0a0a',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = 'arina-3-months.png'
      link.href = canvas.toDataURL('image/png')
      link.click()

      setIsExported(true)
      setTimeout(() => setIsExported(false), 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-lg w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-gold-400 hover:text-gold-300 transition-colors p-2"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Postcard */}
        <div ref={postcardRef} className="bg-burgundy-900 p-4 rounded-xl">
          <PostcardVisual />
        </div>

        {/* Export button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-burgundy-700 via-gold-600 to-burgundy-700 bg-[length:200%_auto] text-cream font-display text-lg rounded-xl border border-gold-400 shadow-lg hover:bg-[position:right_center] transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting ? (
              'Сохранение...'
            ) : isExported ? (
              <>
                <Share2 className="w-5 h-5" />
                Сохранено! ❤️
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Сохранить открытку
              </>
            )}
          </motion.button>
        </div>

        <p className="text-center text-dustyRose/60 text-sm mt-4">
          Открытка сохранится как изображение PNG
        </p>
      </motion.div>
    </motion.div>
  )
}