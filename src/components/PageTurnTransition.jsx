import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PageTurnTransition = ({ isActive, onComplete }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          style={{ 
            perspective: '2000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Background page (current page) */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50" />
          
          {/* Turning page */}
          <motion.div
            initial={{ 
              rotateY: 0,
              transformOrigin: 'right center',
              opacity: 1
            }}
            animate={{ 
              rotateY: -180,
              opacity: [1, 1, 0.8, 0]
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.3, 0.7, 1],
              ease: [0.4, 0, 0.2, 1],
              onComplete: onComplete
            }}
            className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Page shadow that follows the turn */}
            <motion.div
              initial={{ opacity: 0, x: '0%' }}
              animate={{ 
                opacity: [0, 0.4, 0.6, 0.3, 0],
                x: ['0%', '25%', '50%', '75%', '100%']
              }}
              transition={{
                duration: 0.9,
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent"
            />
            
            {/* Page edge highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.6, 0],
                x: ['0%', '50%', '100%']
              }}
              transition={{
                duration: 0.9,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                width: '2px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </motion.div>
          
          {/* New page revealing from behind */}
          <motion.div
            initial={{ 
              rotateY: 180,
              opacity: 0,
              transformOrigin: 'left center'
            }}
            animate={{ 
              rotateY: 0,
              opacity: [0, 0, 0, 1]
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.5, 0.8, 1],
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0 bg-white"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTurnTransition
