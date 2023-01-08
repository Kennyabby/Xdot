import { React, useState, useEffect } from 'react'

import back from '../assets/back.png'

const QuizReviewPage = ({ user, quiz, answers, showQuizUpdates }) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correcAnswers, setCorrectAnswers] = useState('Calculating...')
  const handleNextPrev = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'next') {
      setQuestionIndex((questionIndex) => {
        return questionIndex + 1
      })
    } else if (name === 'prev') {
      setQuestionIndex((questionIndex) => {
        return questionIndex - 1
      })
    }
  }
  useEffect(() => {
    var count = 0
    answers.forEach((answer) => {
      if (
        answer.answer.toLowerCase().trim() ===
        quiz.questions[answer.questionIndex].answer.toLowerCase().trim()
      ) {
        count++
      }
    })
    setCorrectAnswers(count)
  }, [answers])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        <img
          onClick={() => {
            showQuizUpdates()
          }}
          className='qback'
          src={back}
          alt='close quiz page'
          height='28px'
        />
        <div style={{ padding: '10px' }}>
          <div style={{ margin: '20px' }}>
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'monospace',
              }}
            >
              {quiz.title.toUpperCase()}
            </label>
          </div>
          <div>
            <div style={{ margin: '40px' }}>
              <label
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}
              >
                {'You Scored "' +
                  correcAnswers +
                  '" Out of "' +
                  answers.length +
                  '" ' +
                  (answers.length > 1 ? 'Questions' : 'Question') +
                  ' During This Quiz'}
              </label>
            </div>
          </div>
          <div style={{ flexWrap: 'wrap', display: 'flex', margin: '30px' }}>
            {answers.map((answer, index) => {
              return (
                <div
                  onClick={() => {
                    setQuestionIndex(index)
                  }}
                  key={index}
                  style={{
                    padding: '5px',
                    margin: '5px',
                    border:
                      answer.answer === ''
                        ? questionIndex === index
                          ? 'solid brown 2px'
                          : 'solid black 1px'
                        : questionIndex === index
                        ? 'solid brown 2px'
                        : 'solid orange 2px',
                    backgroundColor: answer.answer === '' ? 'white' : 'orange',
                    color: answer.answer === '' ? 'black' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '20px' }} onClick={handleNextPrev}>
            {questionIndex !== quiz.questions.length - 1 ? (
              <div
                name='next'
                style={{
                  width: '300px',
                  margin: 'auto',
                  marginTop: '20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  color: 'blue',
                  border: 'solid lightgreen 2px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <label name='next' style={{ cursor: 'pointer' }}>
                  Next
                </label>
              </div>
            ) : undefined}
            {questionIndex !== 0 ? (
              <div
                name='prev'
                style={{
                  width: '300px',
                  margin: 'auto',
                  marginTop: '20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  color: 'blue',
                  border: 'solid lightgreen 2px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <label name='prev' style={{ cursor: 'pointer' }}>
                  Prev
                </label>
              </div>
            ) : undefined}
          </div>
          <div
            style={{
              padding: '20px',
              paddingTop: '40px',
              fontFamily: 'monospace',
              fontSize: '1rem',
            }}
          >
            {String(questionIndex + 1) +
              '. ' +
              quiz.questions[questionIndex].question}
          </div>
          <div>
            {quiz.questions[questionIndex]['A'] !== undefined ? (
              <div>
                {answers[questionIndex].answer ? undefined : (
                  <label
                    style={{
                      color: 'red',
                      fontFamily: 'monospace',
                      fontSize: '.9rem',
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                    }}
                  >
                    {'You Did Not Attempt This Question'}
                  </label>
                )}
                {Object.keys(quiz.questions[questionIndex])
                  .filter((prop) => {
                    return (
                      prop !== 'question' &&
                      prop !== 'index' &&
                      prop !== 'answer' &&
                      prop !== 'type'
                    )
                  })
                  .map((opt, i) => {
                    return (
                      <div key={i}>
                        <p>
                          <label style={{ margin: '20px' }}>{opt}</label>
                          <div
                            style={{
                              backgroundColor:
                                quiz.questions[questionIndex].answer === opt
                                  ? 'lightgreen'
                                  : answers[questionIndex].answer === opt
                                  ? 'red'
                                  : 'white',
                              color:
                                quiz.questions[questionIndex].answer === opt
                                  ? 'white'
                                  : answers[questionIndex].answer === opt
                                  ? 'white'
                                  : 'black',
                              border:
                                quiz.questions[questionIndex].answer === opt
                                  ? 'solid lightgreen 2px'
                                  : answers[questionIndex].answer === opt
                                  ? 'slid red 2px'
                                  : 'solid black 1px',
                              padding: '15px',
                              paddingLeft: '20px',
                              textAlign: 'left',
                              fontWeight:
                                quiz.questions[questionIndex].answer === opt
                                  ? 'bold'
                                  : answers[questionIndex].answer === opt
                                  ? 'bold'
                                  : 'normal',
                              margin: 'auto',
                              width: '300px',
                              marginTop: '10px',
                              borderRadius: '30px',
                              cursor: 'pointer',
                            }}
                          >
                            <label name={opt} style={{ cursor: 'pointer' }}>
                              {quiz.questions[questionIndex][opt]}
                            </label>
                          </div>
                        </p>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <div style={{ display: 'block' }}>
                <p>
                  <label style={{ fontStyle: 'italic' }}> Your Answer </label>
                </p>
                <p>
                  <label
                    style={{
                      color:
                        quiz.questions[questionIndex].answer
                          .toLowerCase()
                          .trim() ===
                        answers[questionIndex].answer.toLowerCase().trim()
                          ? 'green'
                          : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {answers[questionIndex].answer
                      ? answers[questionIndex].answer
                      : 'You Did Not Attempt This Question'}
                  </label>
                </p>
                <p>
                  <label style={{ fontStyle: 'italic' }}>
                    {' '}
                    Correct Answer{' '}
                  </label>
                </p>
                <p>
                  <label style={{ color: 'green', fontWeight: 'bold' }}>
                    {quiz.questions[questionIndex].answer}
                  </label>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizReviewPage
