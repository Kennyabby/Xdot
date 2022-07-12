import { React, useState, useEffect } from 'react'

import back from '../assets/back.png'

const QuizNotePage = ({ quiz, showQuizUpdates, startQuiz, user }) => {
  useEffect(() => {}, [])
  return (
    <>
      <div>
        <img
          onClick={() => {
            showQuizUpdates()
          }}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: '1',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          src={back}
          alt='close quiz page'
          height='28px'
        />
        <div
          style={{
            margin: '60px',
            marginLeft: '40px',
            fontFamily: 'monospace',
            fontSize: '.9rem',
            backgroundColor: 'rgba(40,70,10,1)',
            boxShadow: 'black 6px 6px 7px',
            borderRadius: '10px',
            padding: '10px',
            color: 'white',
          }}
        >
          <label>
            {'Hi, ' +
              user.firstName.toUpperCase() +
              '. Welcome to XDot Quiz Board. Kindly Read The Instructions Below Before Proceeding.'}
          </label>
        </div>
        <div>
          <div style={{ margin: '50px' }}>
            <label
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {('Quiz: ' + quiz.title).toUpperCase()}
            </label>
          </div>
          <div
            style={{
              textAlign: 'left',
              margin: '10px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              fontStyle: 'italic',
            }}
          >
            <label>
              {quiz.note === undefined || quiz.note === ''
                ? 'No Notes Here...'
                : quiz.note}
            </label>
          </div>
        </div>
        <div
          style={{ margin: 'auto', width: 'fit-content', marginTop: '40px' }}
        >
          <label
            onClick={() => {
              startQuiz()
            }}
            style={{
              backgroundColor: 'black',
              borderRadius: '10px',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '1rem',
              width: '300px',
              padding: '10px',
              fontWeight: 'bold',
              border: 'solid blue 2px',
              cursor: 'pointer',
            }}
          >
            START QUIZ
          </label>
        </div>
      </div>
    </>
  )
}

export default QuizNotePage
