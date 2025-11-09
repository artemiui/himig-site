import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Quiz = ({ story }) => {
  const { language } = useLanguage()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())

  const quiz = story?.quiz || []
  const currentQuestion = quiz[currentQuestionIndex]

  useEffect(() => {
    // Load score from localStorage
    const savedScore = localStorage.getItem(`quiz-score-${story.id}`)
    if (savedScore) {
      setScore(parseInt(savedScore))
    }
  }, [story.id])

  const handleAnswerSelect = (answerIndex) => {
    if (answeredQuestions.has(currentQuestionIndex)) return
    
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const isCorrect = answerIndex === currentQuestion.answer
    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 1
        localStorage.setItem(`quiz-score-${story.id}`, newScore.toString())
        return newScore
      })
    }

    setAnsweredQuestions((prev) => new Set([...prev, currentQuestionIndex]))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setIsComplete(false)
    setAnsweredQuestions(new Set())
    localStorage.removeItem(`quiz-score-${story.id}`)
  }

  if (!story || !currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Quiz not available</p>
      </div>
    )
  }

  if (isComplete) {
    const percentage = Math.round((score / quiz.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Sparkles size={64} className="text-sunshine-yellow mx-auto mb-4" />
          </motion.div>
          <h2 className="font-title font-bold text-3xl text-gray-800 mb-4">
            {language === 'en' ? 'Quiz Complete!' : '¡Quiz Completado!'}
          </h2>
          <p className="text-2xl font-semibold text-gray-700 mb-2">
            {score} / {quiz.length}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            {percentage}% {language === 'en' ? 'Correct' : 'Correcto'}
          </p>
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-blue text-white px-8 py-3 rounded-full font-title font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
          </motion.button>
        </div>
      </motion.div>
    )
  }

  const isCorrect = selectedAnswer === currentQuestion.answer
  const isAnswered = answeredQuestions.has(currentQuestionIndex)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {language === 'en' ? 'Question' : 'Pregunta'} {currentQuestionIndex + 1} / {quiz.length}
            </span>
            <span>
              {language === 'en' ? 'Score' : 'Puntuación'}: {score}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sky-blue"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="font-title font-bold text-2xl text-gray-800 mb-6">
          {currentQuestion.question[language]}
        </h2>

        {/* Answers */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options[language].map((option, index) => {
            const isSelected = selectedAnswer === index
            const showCorrect = showFeedback && index === currentQuestion.answer
            const showIncorrect = showFeedback && isSelected && !isCorrect

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                animate={
                  showIncorrect
                    ? {
                        x: [-10, 10, -10, 10, 0],
                      }
                    : {}
                }
                transition={
                  showIncorrect
                    ? {
                        duration: 0.5,
                        times: [0, 0.25, 0.5, 0.75, 1],
                      }
                    : {}
                }
                className={`w-full text-left p-4 rounded-xl font-body text-lg transition-all ${
                  showCorrect
                    ? 'bg-leaf-green text-white shadow-lg'
                    : showIncorrect
                    ? 'bg-soft-coral text-white shadow-lg'
                    : isSelected
                    ? 'bg-sky-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Check size={24} />
                    </motion.div>
                  )}
                  {showIncorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                    >
                      <X size={24} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Next Button */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-sunshine-yellow text-white px-8 py-3 rounded-full font-title font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              {currentQuestionIndex < quiz.length - 1
                ? language === 'en'
                  ? 'Next Question'
                  : 'Siguiente Pregunta'
                : language === 'en'
                ? 'Finish Quiz'
                : 'Finalizar Quiz'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Quiz

