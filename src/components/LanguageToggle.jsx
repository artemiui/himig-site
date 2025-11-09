import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow"
      aria-label="Toggle language"
    >
      <Languages size={18} className="text-sky-blue" />
      <span className="font-title font-semibold text-sky-blue">
        {language === 'en' ? 'EN' : 'FIL'}
      </span>
    </motion.button>
  )
}

export default LanguageToggle

