import { React, useState, useEffect } from 'react'
import '../Tasks.css'
import CreateQuiz from './CreateQuiz'
import CreateQuestion from './CreateQuestion'

const QuizApp = ({ user,server }) => {
  const [view, setView] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [showCreateQuiz, setShowCreateQuiz] = useState(true)
  const [showCreateQuestion, setShowCreateQuestion] = useState(false)
  useEffect(() => {
    if (showCreateQuiz) {
      setQuiz(null)
      setShowCreateQuestion(false)
      setView(
        <CreateQuiz
          server={server}
          viewQuestions={(quiz) => {
            setQuiz(quiz)
            setShowCreateQuestion(true)
          }}
          user={user}
        />
      )
    }
  }, [showCreateQuiz])
  useEffect(() => {
    if (showCreateQuestion) {
      setShowCreateQuiz(false)
      setView(
        <CreateQuestion
          server={server}
          user={user}
          quiz={quiz}
          viewQuiz={() => {
            setShowCreateQuiz(true)
          }}
        />
      )
    }
  }, [showCreateQuestion])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default QuizApp
