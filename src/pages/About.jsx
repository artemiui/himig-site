import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Heart, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'About HIMIG',
      subtitle: 'Magical Stories for Children',
      description: 'HIMIG is an interactive storytelling platform designed to inspire and educate children through engaging stories and fun quizzes.',
      features: {
        title: 'Features',
        storyMode: 'Story Mode - Read along with synchronized narration',
        quizMode: 'Quiz Mode - Test your understanding with interactive quizzes',
        multilingual: 'Multilingual Support - Available in multiple languages',
        colorful: 'Colorful Design - Bright and engaging visual experience',
      },
      mission: {
        title: 'Our Mission',
        text: 'To make learning fun and accessible for children everywhere through the power of storytelling.',
      },
    },
    fil: {
      title: 'Tungkol sa HIMIG',
      subtitle: 'Mga Mahiwagang Kuwento para sa mga Bata',
      description: 'Ang HIMIG ay isang interactive na storytelling platform na idinisenyo upang magbigay-inspirasyon at magturo sa mga bata sa pamamagitan ng nakakaengganyong kuwento at masayang mga pagsusulit.',
      features: {
        title: 'Mga Tampok',
        storyMode: 'Story Mode - Magbasa kasama ng synchronized na pagbabasa',
        quizMode: 'Quiz Mode - Subukan ang iyong pag-unawa sa interactive na mga pagsusulit',
        multilingual: 'Suporta sa Maraming Wika - Available sa maraming wika',
        colorful: 'Makulay na Disenyo - Maliwanag at nakakaengganyong visual na karanasan',
      },
      mission: {
        title: 'Ang Aming Misyon',
        text: 'Gawing masaya at naa-access ang pag-aaral para sa mga bata saanman sa pamamagitan ng kapangyarihan ng storytelling.',
      },
    },
  }

  const t = translations[language] || translations['en']

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-title font-bold text-5xl text-gray-800 mb-4">
            {t.title}
          </h1>
          <p className="font-body text-2xl text-gray-600 mb-2">{t.subtitle}</p>
          <p className="font-body text-lg text-gray-500">{t.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
          >
            <BookOpen className="text-sky-blue mb-4" size={40} />
            <h3 className="font-title font-bold text-xl text-gray-800 mb-2">
              {t.features.storyMode}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
          >
            <Heart className="text-soft-coral mb-4" size={40} />
            <h3 className="font-title font-bold text-xl text-gray-800 mb-2">
              {t.features.quizMode}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
          >
            <Globe className="text-leaf-green mb-4" size={40} />
            <h3 className="font-title font-bold text-xl text-gray-800 mb-2">
              {t.features.multilingual}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sky-blue"></div>
              <div className="w-8 h-8 rounded-full bg-sunshine-yellow"></div>
              <div className="w-8 h-8 rounded-full bg-soft-coral"></div>
              <div className="w-8 h-8 rounded-full bg-leaf-green"></div>
            </div>
            <h3 className="font-title font-bold text-xl text-gray-800 mb-2">
              {t.features.colorful}
            </h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center"
        >
          <h2 className="font-title font-bold text-3xl text-gray-800 mb-4">
            {t.mission.title}
          </h2>
          <p className="font-body text-lg text-gray-600">{t.mission.text}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default About

