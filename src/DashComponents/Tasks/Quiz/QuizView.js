import { React, useState, useEffect } from 'react'

import edit from '../assets/edit.png'
import remove from '../assets/remove.png'
import share from '../assets/share.png'

const QuizView = ({ quiz, editQuiz, removeQuiz, viewQuestions, shareQuiz }) => {
  const labels = ['title', 'questions', 'days', 'hours', 'minutes', 'seconds']
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState('Delete')
  useEffect(() => {}, [])
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            backgroundColor: 'whitesmoke',
            boxShadow: '0px 0px 4px black',
            borderRadius: '10px',
            margin: '10px',
            padding: '10px',
            display: 'block',
          }}
        >
          <div className='quizview'>
            {labels
              .filter((label) => {
                return quiz[label] !== 0
              })
              .map((label, i) => {
                if (label === 'questions') {
                  return (
                    <div
                      style={{
                        textAlign: 'left',
                        display: 'inline-block',
                        fontFamily: 'monospace',
                        fontSize: '.8rem',
                      }}
                      key={i}
                    >
                      <p>
                        <label
                          onClick={() => {
                            viewQuestions(quiz)
                          }}
                          style={{
                            backgroundColor: 'rgba(255,2550,255.9)',
                            color: 'blue',
                            fontSize: '.7rem',
                            padding: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            boxShadow: 'black 5px 5px 6px',
                          }}
                        >
                          <b>{label.toUpperCase()}</b>
                        </label>
                      </p>
                      <p>
                        <label>{quiz[label].length}</label>
                      </p>
                    </div>
                  )
                }
                return (
                  <div
                    style={{
                      textAlign: 'left',
                      display: 'inline-block',
                      fontFamily: 'monospace',
                      fontSize: '.8rem',
                    }}
                    key={i}
                  >
                    <p>
                      <label>
                        <b>{label.toUpperCase()}</b>
                      </label>
                    </p>
                    <p>
                      <label>{String(quiz[label]).toUpperCase()}</label>
                    </p>
                  </div>
                )
              })}
            <div style={{ textAlign: 'left', fontSize: '.9rem', gap: '5px' }}>
              <p>
                <img
                  src={edit}
                  alt='edit'
                  onClick={() => {
                    editQuiz()
                  }}
                  style={{
                    padding: '5px',
                    color: 'lightgreen',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    zIndex: '1',
                  }}
                  height='18px'
                />
              </p>
              {!showDeleteConfirmation && (
                <p>
                  <img
                    src={remove}
                    alt='remove'
                    onClick={() => {
                      setShowDeleteConfirmation(true)
                    }}
                    style={{
                      padding: '5px',
                      color: 'red',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      zIndex: '1',
                    }}
                    height='18px'
                  />
                </p>
              )}
            </div>
          </div>
          {showDeleteConfirmation && (
            <div
              style={{
                display: 'flex',
                padding: '5px',
                color: 'red',
                borderRadius: '10px',
                fontStyle: 'italic',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                backgroundColor: 'rgba(255,0,0,0.2)',
                border: 'solid red 1px',
                textAlign: 'left',
                margin: '0px',
              }}
            >
              <label style={{ marginTop: '5px' }}>Delete this quiz</label>
              <button
                style={{
                  padding: '5px 10px',
                  marginLeft: 'auto',
                  border: 'solid red 1px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255,255,255,1)',
                  color: 'red',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  setShowDeleteConfirmation(false)
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '5px 10px',
                  marginLeft: 'auto',
                  border: 'solid red 1px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255,255,255,1)',
                  color: 'red',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  setDeleteStatus('Deleting...')
                  removeQuiz(quiz)
                }}
              >
                {deleteStatus}
              </button>
            </div>
          )}
        </div>
        {quiz.questions.length ? (
          <div>
            <img
              src={share}
              alt='share'
              onClick={() => {
                shareQuiz(quiz)
              }}
              style={{
                padding: '10px',
                borderBottom: 'solid blue 3px',
                borderRadius: '50%',
                color: 'blue',
                fontWeight: 'bold',
                cursor: 'pointer',
                zIndex: '1',
              }}
              height='20px'
            />
          </div>
        ) : undefined}
      </div>
    </>
  )
}

export default QuizView
