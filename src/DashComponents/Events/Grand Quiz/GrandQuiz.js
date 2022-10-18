import { React, useState, useEffect } from 'react'
import '../Events.css'

import QuizUpdates from './QuizUpdates'
import QuizPage from './QuizPage'

const GrandQuiz = ({ user, server, showHomeToggle, viewRef }) => {
  const [quiz, setQuiz] = useState(null)
  const [view, setView] = useState('')
  const [showQuizUpdates, setShowQuizUpdates] = useState(true)
  const [showQuizPage, setShowQuizPage] = useState(false)
  useEffect(() => {
    if (showQuizUpdates) {
      setShowQuizPage(false)
      setView(
        <QuizUpdates
          server={server}
          showQuizPage={(quiz) => {
            setQuiz(quiz)
            setShowQuizPage(true)
          }}
          user={user}
          showHomeToggle={(show) => {
            showHomeToggle(show)
          }}
          viewRef={viewRef}
        />
      )
    }
  }, [showQuizUpdates])
  useEffect(() => {
    if (showQuizPage) {
      setShowQuizUpdates(false)
      setView(
        <QuizPage
          user={user}
          quiz={quiz}
          showQuizUpdates={() => {
            setQuiz(null)
            setShowQuizUpdates(true)
          }}
        />
      )
    }
  }, [showQuizPage])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default GrandQuiz
