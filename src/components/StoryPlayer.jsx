import React, { useRef, useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

const StoryPlayer = ({ audioSrc, onTimeUpdate, onLoaded }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const time = audio.currentTime
      setCurrentTime(time)
      if (onTimeUpdate) {
        onTimeUpdate(time)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      if (onLoaded) {
        onLoaded()
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onTimeUpdate, onLoaded])

  useEffect(() => {
    if (audioSrc) {
      const audio = audioRef.current
      if (audio) {
        audio.load()
      }
    }
  }, [audioSrc])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sky-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-sky-blue text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </motion.button>

        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-600 hover:text-sky-blue transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </motion.button>
      </div>
    </div>
  )
}

export default StoryPlayer

