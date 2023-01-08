import { React, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../Tasks.css'

import UpdateQuestion from './UpdateQuestion'
import QuestionView from './QuestionView'

import add from '../assets/add.jpg'

const CreateQuestion = ({ user, quiz, viewQuiz, server }) => {
  const [showUpdateQuestion, setShowUpdateQuestion] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [request, setRequest] = useState('')
  const [sectionValue, setSectionValue] = useState('all')
  const allRef = useRef(null)
  const objRef = useRef(null)
  const othersRef = useRef(null)
  const [updattingQuestion, setUpdattingQuestion] = useState(null)
  useEffect(() => {
    allRef.current.style.borderBottom = 'solid red 0px'
    objRef.current.style.borderBottom = 'solid red 0px'
    othersRef.current.style.borderBottom = 'solid red 0px'
    if (sectionValue === 'all') {
      allRef.current.style.borderBottom = 'solid red 2px'
    } else if (sectionValue === 'obj') {
      objRef.current.style.borderBottom = 'solid red 2px'
    } else if (sectionValue === 'others') {
      othersRef.current.style.borderBottom = 'solid red 2px'
    }
  }, [sectionValue])
  const filteredQuizQuestions = () => {
    if (sectionValue !== 'all') {
      const filteredQuestions = quiz.questions.filter((question) => {
        return question.type === sectionValue
      })
      return filteredQuestions
    }
    return quiz.questions
  }
  const handleSectionValue = (e) => {
    const name = e.target.getAttribute('name')
    if (name !== undefined && name !== null) {
      setSectionValue(name)
    }
  }
  const notify = ({ message }) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }
  const handleRemoveQuestion = async (question) => {
    quiz.questions = quiz.questions.filter((quest) => {
      return quest !== question
    })
    const newQuiz = quiz
    var index1 = user.createQuiz.length
    user.createQuiz.forEach((quiz, i) => {
      if (quiz.title === newQuiz.title) {
        index1 = i
      }
    })
    user.createQuiz[index1] = newQuiz

    const updatedQuiz = user.createQuiz

    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { matricNo: user.matricNo },
            {
              createQuiz: updatedQuiz,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        notify({
          message:
            'Removed Question' +
            question.index +
            ' from Quiz: ' +
            newQuiz.title.toUpperCase() +
            ' Successfully',
        })
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <div>
        <label
          className='backtoquiz'
          onClick={() => {
            viewQuiz()
          }}
        >
          {'<< Back'}
        </label>
        {showNotification && (
          <div
            style={{
              position: 'fixed',
              top: '5px',
              zIndex: '1',
              justifyContent: 'center',
              width: '100vw',
            }}
          >
            <div
              style={{
                width: '60%',
                flexWrap: 'wrap',
                margin: 'auto',
                padding: '10px',
                fontSize: '.9rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderRadius: '10px',
                color: 'white',
              }}
            >
              {notificationMessage}
            </div>
          </div>
        )}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            width: 'fit-content',
            padding: '10px',
            borderRadius: '10px',
            margin: '50px auto',
            backgroundColor: 'whitesmoke',
          }}
        >
          <label>{'Quiz: ' + quiz.title.toUpperCase()}</label>
        </div>
        <div
          onClick={handleSectionValue}
          style={{
            fontFamily: 'monospace',
            fontSize: '.85rem',
            marginBottom: '40px',
            textAlign: 'center',
            justifyContent: 'center',
            overflowX: 'auto',
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          <label
            ref={allRef}
            name='all'
            style={{
              margin: 'auto',
              padding: '5px',
              cursor: 'pointer',
              width: 'max-content',
            }}
          >
            All Questions
          </label>
          <label
            ref={objRef}
            name='obj'
            style={{
              margin: 'auto',
              padding: '5px',
              cursor: 'pointer',
              width: 'max-content',
            }}
          >
            Multiple-Choice
          </label>
          <label
            ref={othersRef}
            name='others'
            style={{
              margin: 'auto',
              padding: '5px',
              cursor: 'pointer',
              width: 'max-content',
            }}
          >
            Others
          </label>
        </div>
        <AnimatePresence>
          {showUpdateQuestion && (
            <UpdateQuestion
              server={server}
              closeUpdate={() => {
                setShowUpdateQuestion(false)
              }}
              request={request}
              type={sectionValue}
              user={user}
              quiz={quiz}
              updattingQuestion={updattingQuestion}
              notifyUpdate={(message) => {
                notify({ message: message })
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {sectionValue !== 'all' && (
            <motion.img
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.5 }}
              exit={{
                x: '100vw',
                transition: { ease: 'easeIn', duration: 0.7 },
              }}
              src={add}
              alt='add'
              className='addcourse'
              style={{
                backgroundColor: 'rgba(255,0,0,0.9)',
                border: 'solid red 1px',
                boxShadow: 'rgba(0,0,0,1) 0px 0px 8px',
              }}
              onClick={() => {
                setRequest('add')
                setUpdattingQuestion(null)
                setShowUpdateQuestion(true)
              }}
              height='25px'
            />
          )}
        </AnimatePresence>
        <div style={{ paddingBottom: '70px' }}>
          {filteredQuizQuestions().length ? (
            filteredQuizQuestions().map((question, i) => {
              return (
                <QuestionView
                  key={i}
                  index={i}
                  question={question}
                  editQuestion={() => {
                    setRequest('edit')
                    setUpdattingQuestion(question)
                    setShowUpdateQuestion(true)
                  }}
                  removeQuestion={(question) => {
                    handleRemoveQuestion(question)
                  }}
                />
              )
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                fontFamily: 'Courier New',
                fontSize: '1rem',
                fontWeight: 'bold',
                padding: '10px',
                backgroundColor: 'whitesmoke',
                borderRadius: '10px',
                // boxShadow: '0px 0px 2px black',
                margin: '50px',
              }}
            >
              <label>
                {sectionValue === 'all'
                  ? 'Click The Multiple-Choice Or Others Section To Add Questions'
                  : sectionValue === 'obj'
                  ? 'Use The Add Button Below To Add Multiple-Choice Questions For Quiz: ' +
                    quiz.title.toUpperCase()
                  : 'Use The Add Button Below To Add Other Questions For Quiz: ' +
                    quiz.title.toUpperCase()}
              </label>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateQuestion
