import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import StoryPlayer from './StoryPlayer'
import { useLanguage } from '../context/LanguageContext'

const StoryReader = ({ story }) => {
  const { language } = useLanguage()
  const [currentSegment, setCurrentSegment] = useState(null)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const segmentRefs = useRef({})
  const containerRef = useRef(null)

  const chapters = story?.chapters || []
  const segments = chapters.flatMap((chapter) => chapter[language] || [])

  const handleTimeUpdate = (currentTime) => {
    const activeSegment = segments.find(
      (segment) => currentTime >= segment.start && currentTime <= segment.end
    )

    if (activeSegment && activeSegment !== currentSegment) {
      setCurrentSegment(activeSegment)
      
      // Auto-scroll to active segment
      const segmentKey = `${activeSegment.start}-${activeSegment.end}`
      const element = segmentRefs.current[segmentKey]
      if (element && containerRef.current) {
        const container = containerRef.current
        const elementTop = element.offsetTop
        const containerTop = container.scrollTop
        const containerHeight = container.clientHeight
        const elementHeight = element.offsetHeight

        // Scroll if element is not visible
        if (
          elementTop < containerTop ||
          elementTop + elementHeight > containerTop + containerHeight
        ) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }
    }
  }

  const handleAudioLoaded = () => {
    setAudioLoaded(true)
  }

  if (!story) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Story not found</p>
      </div>
    )
  }

  const audioSrc = story.voice?.[language]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-title font-bold text-4xl text-center text-gray-800 mb-4">
          {story.title[language]}
        </h1>
      </motion.div>

      {/* Audio Player */}
      <div className="mb-8">
        <StoryPlayer
          audioSrc={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoaded={handleAudioLoaded}
        />
      </div>

      {/* Story Text */}
      <div
        ref={containerRef}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-h-[60vh] overflow-y-auto"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
      >
        {segments.map((segment, index) => {
          const segmentKey = `${segment.start}-${segment.end}`
          const isActive = currentSegment === segment

          return (
            <motion.span
              key={segmentKey}
              ref={(el) => (segmentRefs.current[segmentKey] = el)}
              initial={{ opacity: 0 }}
              animate={{
                opacity: audioLoaded ? 1 : 0.5,
                backgroundColor: isActive ? '#FFE066' : 'transparent',
              }}
              transition={{
                backgroundColor: { duration: 0.3 },
                opacity: { duration: 0.5 },
              }}
              className={`inline-block px-2 py-1 rounded transition-colors ${
                isActive ? 'font-semibold' : ''
              }`}
            >
              {segment.text}
              {index < segments.length - 1 && ' '}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

export default StoryReader

