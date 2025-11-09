import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Menu, X, BookOpen } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../context/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const { language } = useLanguage()

  const translations = {
    en: {
      home: 'Home',
      stories: 'Stories',
      about: 'About',
      search: 'Search stories...',
    },
    es: {
      home: 'Inicio',
      stories: 'Historias',
      about: 'Acerca de',
      search: 'Buscar historias...',
    },
  }

  const t = translations[language]

  const navItems = [
    { path: '/', label: t.home },
    { path: '/stories', label: t.stories },
    { path: '/about', label: t.about },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="text-sky-blue" size={32} />
            </motion.div>
            <span className="font-title font-bold text-2xl text-sky-blue hidden sm:block">
              HIMIG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body font-semibold transition-colors ${
                  location.pathname === item.path
                    ? 'text-sky-blue'
                    : 'text-gray-700 hover:text-sky-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-body font-semibold transition-colors ${
                    location.pathname === item.path
                      ? 'text-sky-blue'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header

