import { React, useState, useEffect } from 'react'

const QuestionView = ({ question, index, editQuestion, removeQuestion }) => {
  useEffect(() => {}, [])
  return (
    <>
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
          <p>
            <label
              onClick={() => {
                removeQuestion(question)
              }}
              style={{
                padding: '5px',
                margin: '10px',
                color: 'red',
                fontWeight: 'bold',
                cursor: 'pointer',
                zIndex: '1',
              }}
            >
              remove
            </label>
          </p>
        </div>
      </div>
    </>
  )
}

export default QuestionView
