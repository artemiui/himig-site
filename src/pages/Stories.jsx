import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import StoryReader from '../components/StoryReader'
import Quiz from '../components/Quiz'
import { getStoryById } from '../utils/storyLoader'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const Stories = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const isQuizMode = location.pathname.includes('/quiz')

  useEffect(() => {
    const fetchStory = async () => {
      if (id) {
        const loadedStory = await getStoryById(id)
        setStory(loadedStory)
        setLoading(false)
      }
    }
    fetchStory()
  }, [id])

  const translations = {
    en: {
      back: 'Back to Stories',
    },
    fil: {
      back: 'Bumalik sa Mga Kuwento',
    },
  }

  const t = translations[language] || translations['en']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-sky-blue border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-sky-blue transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-body font-semibold">{t.back}</span>
        </motion.button>

        {/* Story Reader or Quiz */}
        {isQuizMode ? (
          <Quiz story={story} />
        ) : (
          <StoryReader story={story} />
        )}
      </div>
    </div>
  )
}

export default Stories

