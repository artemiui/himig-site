import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, BookOpen } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const StoryCarousel = ({ stories, mode, onModeChange }) => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const translations = {
    en: {
      storyMode: 'Story Mode',
      quizMode: 'Quiz Mode',
    },
    es: {
      storyMode: 'Modo Historia',
      quizMode: 'Modo Quiz',
    },
  }

  const t = translations[language]

  const handleStoryClick = (story) => {
    if (story.comingSoon) return
    
    if (mode === 'story') {
      navigate(`/stories/${story.id}`)
    } else {
      navigate(`/stories/${story.id}/quiz`)
    }
  }

  return (
    <div className="w-full">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
          <div className="flex gap-2">
            <motion.button
              onClick={() => onModeChange('story')}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-title font-semibold transition-all ${
                mode === 'story'
                  ? 'bg-sky-blue text-white shadow-md'
                  : 'text-gray-600 hover:text-sky-blue'
              }`}
            >
              {t.storyMode}
            </motion.button>
            <motion.button
              onClick={() => onModeChange('quiz')}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-title font-semibold transition-all ${
                mode === 'quiz'
                  ? 'bg-sunshine-yellow text-white shadow-md'
                  : 'text-gray-600 hover:text-sunshine-yellow'
              }`}
            >
              {t.quizMode}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Story Carousel */}
      <div className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`flex-shrink-0 w-64 cursor-pointer ${
              story.comingSoon ? 'opacity-60' : ''
            }`}
            onClick={() => handleStoryClick(story)}
          >
            <div className="relative">
              {/* Story Cover */}
              <motion.div
                animate={
                  story.comingSoon
                    ? {
                        opacity: [0.6, 0.8, 0.6],
                      }
                    : {}
                }
                transition={
                  story.comingSoon
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {}
                }
                className={`relative rounded-2xl overflow-hidden shadow-xl ${
                  story.comingSoon ? 'grayscale' : ''
                }`}
              >
                {story.cover ? (
                  <img
                    src={story.cover}
                    alt={story.title[language]}
                    className="w-full h-80 object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="320"%3E%3Crect fill="%23A3D5FF" width="256" height="320"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="24" fill="white"%3E' +
                        story.title[language] +
                        '%3C/text%3E%3C/svg%3E'
                    }}
                  />
                ) : (
                  <div className="w-full h-80 bg-sky-blue flex items-center justify-center">
                    <BookOpen size={64} className="text-white" />
                  </div>
                )}

                {/* Overlay */}
                {!story.comingSoon && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: hoveredIndex === index ? 1 : 0,
                      }}
                      className="bg-white rounded-full p-4"
                    >
                      <Play size={32} className="text-sky-blue fill-sky-blue" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Coming Soon Badge */}
                {story.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-title font-bold text-gray-700">
                      {story.title[language]}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Story Title */}
              {!story.comingSoon && (
                <h3 className="mt-4 text-center font-title font-bold text-xl text-gray-800">
                  {story.title[language]}
                </h3>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StoryCarousel

