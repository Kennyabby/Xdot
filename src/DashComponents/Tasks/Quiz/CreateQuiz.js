import { React, useState, useEffect } from 'react'
import '../Tasks.css'

import QuizShareModal from './QuizShareModal'
import QuizView from './QuizView'
import UpdateQuiz from './UpdateQuiz'

import add from '../assets/add.jpg'

const CreateQuiz = ({ user, viewQuestions, server }) => {
  const [updateRequest, setUpdateRequest] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [editQuiz, setEditQuiz] = useState(null)
  const [showQuizShareModal, setShowQuizShareModal] = useState(false)
  const notify = ({ message }) => {
    setShowNotification(true)
    setNotificationMessage(message)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }
  const handleRemoveQuiz = async (quiz) => {
    user.createQuiz = user.createQuiz.filter((qz) => {
      return qz !== quiz
    })
    var createQuiz = user.createQuiz
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
              createQuiz: createQuiz,
            },
          ],
        }),
      }
      const resp = await fetch(server+'/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        notify({
          message:
            'Removed Quiz: ' + quiz.title.toUpperCase() + ' Successfully',
        })
      }
    } catch (TypeError) {}
  }

  return (
    <>
      <div style={{ margin: '5px' }}>
        {showNotification && (
          <div 
            style={{
              padding: '10px',
              position: 'fixed',
              top: '5px',
              zIndex: '1',
              justifyContent:'center',
              width:'100vw',
            }}
          >
            <label
              style={{
                margin:'auto',
                padding:'10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderRadius: '10px',
                color: 'white',
              }}
            >
              {notificationMessage}
            </label>
          </div>
        )}
        {showQuizShareModal && (
          <QuizShareModal
            server={server}
            editQuiz={editQuiz}
            closeModal={() => {
              setShowQuizShareModal(false)
            }}
            notifyUpdate={(message) => {
              notify({ message: message })
            }}
            user={user}
          />
        )}
        {showUpdate && (
          <UpdateQuiz
            server={server}
            closeUpdate={() => {
              setShowUpdate(false)
            }}
            notifyUpdate={(message) => {
              notify({ message: message })
            }}
            editQuiz={editQuiz}
            request={updateRequest}
            user={user}
          />
        )}
        <img
          src={add}
          alt='add'
          className='addcourse'
          style={{
            border: 'solid blue 1px',
            backgroundColor: 'rgba(0,0,255,0.9)',
            boxShadow: 'black 6px 6px 7px',
          }}
          onClick={() => {
            setUpdateRequest('add')
            setEditQuiz(null)
            setShowUpdate(true)
          }}
          height='25px'
        />

        <div style={{ display: 'block', margin: '0px', paddingBottom:'70px'}}>
          {user.createQuiz.length ? (
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
              }}
            >
              <div style={{ margin: '70px', fontStyle: 'italic' }}>
                <label>Click on a Quiz's Questions to view Questions</label>
              </div>
              {user.createQuiz.map((quiz, i) => {
                return (
                  <QuizView
                    key={i}
                    quiz={quiz}
                    editQuiz={() => {
                      setUpdateRequest('edit')
                      setEditQuiz(quiz)
                      setShowUpdate(true)
                    }}
                    removeQuiz={(quiz) => {
                      handleRemoveQuiz(quiz)
                    }}
                    shareQuiz={(quiz) => {
                      setEditQuiz(quiz)
                      setShowQuizShareModal(true)
                    }}
                    viewQuestions={(quiz) => {
                      viewQuestions(quiz)
                    }}
                  />
                )
              })}
            </div>
          ) : (
            <div
              style={{
                margin: '80px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Click The Add Button Below To Add A New Quiz
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateQuiz
