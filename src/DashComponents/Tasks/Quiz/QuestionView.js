import { React, useState, useEffect } from 'react'

const QuestionView = ({ question, index, editQuestion, removeQuestion }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState('Delete')
  useEffect(() => {}, [])
  return (
    <>
      <div
        style={{
          backgroundColor: 'black',
          borderRadius: '10px',
          margin: '10px',
          padding: '10px',
          boxShadow: '0px 0px 7px black',
        }}
      >
        <div className='questionview'>
          <div style={{ padding: '10px', marginTop: '20px' }}>
            <label
              style={{
                padding: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: 'blue',
                borderRadius: '50%',
                color: 'white',
              }}
            >
              {String(index + 1)}
            </label>
          </div>
          <div>
            <p>
              <label style={{ fontWeight: 'bold', fontSize: '.9rem' }}>
                Type
              </label>
            </p>
            <p>
              <label>
                {question.type === 'obj' ? 'Multiple-Choice' : 'Others'}
              </label>
            </p>
          </div>
          <div>
            <p>
              <label style={{ fontWeight: 'bold', fontSize: '.9rem' }}>
                Question
              </label>
            </p>
            <p>
              <label>{question.question}</label>
            </p>
          </div>
          <div style={{ textAlign: 'left', fontSize: '.9rem', gap: '5px' }}>
            <p>
              <label
                onClick={() => {
                  editQuestion()
                }}
                style={{
                  padding: '5px',
                  margin: '10px',
                  color: 'lightgreen',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  zIndex: '1',
                }}
              >
                edit
              </label>
            </p>
            {!showDeleteConfirmation && (
              <p>
                <label
                  onClick={() => {
                    setShowDeleteConfirmation(true)
                  }}
                  style={{
                    padding: '5px',
                    margin: '10px',
                    marginTop: 'auto',
                    color: 'red',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    zIndex: '1',
                  }}
                >
                  remove
                </label>
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
              fontWeight: 'bold',
              backgroundColor: 'rgba(255,0,0,0.2)',
              border: 'solid red 1px',
              textAlign: 'left',
              margin: '0px',
            }}
          >
            <label style={{ marginTop: '5px' }}>Delete this question</label>
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
                removeQuestion(question)
              }}
            >
              {deleteStatus}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default QuestionView
