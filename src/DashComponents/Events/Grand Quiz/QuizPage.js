import { React, useState, useEffect } from 'react'
import '../Events.css'

import QuizNotePage from './QuizNotePage'
import QuizReviewPage from './QuizReviewPage'
import Quiz from './Quiz.js'

const QuizPage = ({ user, showQuizUpdates, quiz }) => {
  const [view, setView] = useState('')
  const [startQuiz, setStartQuiz] = useState(false)
  const [showQuizReview, setShowQuizReview] = useState(false)
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    if (startQuiz) {
      setShowQuizReview(false)
      setView(
        <Quiz
          user={user}
          showQuizUpdates={() => {
            showQuizUpdates()
          }}
          quiz={quiz}
          showQuizReview={() => {
            setShowQuizReview(true)
          }}
          setAns={(answers) => {
            setAnswers(answers)
          }}
        />
      )
    }
  }, [startQuiz])
  useEffect(() => {
    if (showQuizReview) {
      setStartQuiz(false)
      setView(
        <QuizReviewPage
          user={user}
          quiz={quiz}
          answers={answers}
          showQuizUpdates={() => {
            showQuizUpdates()
          }}
        />
      )
    }
  }, [showQuizReview])
  useEffect(() => {
    setView(
      <QuizNotePage
        user={user}
        showQuizUpdates={() => {
          showQuizUpdates()
        }}
        quiz={quiz}
        startQuiz={() => {
          setStartQuiz(true)
        }}
      />
    )
  }, [])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default QuizPage
