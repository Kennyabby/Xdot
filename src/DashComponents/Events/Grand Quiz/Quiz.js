import { React, useState, useEffect } from 'react'
import '../Events.css'

import back from '../assets/back.png'

const Quiz = ({ user, showQuizUpdates, quiz, setAns, showQuizReview }) => {
  var ans = []
  quiz.questions.forEach((quest, i) => {
    ans = ans.concat({ questionIndex: i, answer: '' })
  })
  const [answers, setAnswers] = useState(ans)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(Number(quiz.minutes))
  const [hr, setHr] = useState(Number(quiz.hours))
  const [dy, setDy] = useState(Number(quiz.days))
  useEffect(() => {
    var start = Date.now()
    var startSec = quiz.seconds
    setInterval(() => {
      const timeLength = (Date.now() - start) / 1000
      if (startSec === 0 || startSec - Math.floor(timeLength) < 0) {
        startSec = 59
        setSec(59)
        setMin((min) => {
          if (min - 1 < 0) {
            setHr((hr) => {
              if (hr - 1 < 0) {
                setDy((dy) => {
                  return dy - 1
                })
                return 23
              }
              return hr - 1
            })
            return 59
          }
          return min - 1
        })
        start = Date.now()
      } else {
        setSec(startSec - Math.floor(timeLength))
      }
    }, 200)
  }, [])

  useEffect(() => {
    if (sec === 0 && min === 0 && hr === 0 && dy === 0) {
      setAns(answers)
      showQuizReview()
    }
  })
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
    } else if (name === 'submit') {
      setAns(answers)
      showQuizReview()
    }
  }
  useEffect(() => {}, [answers])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
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
          <div
            style={{
              fontFamily: 'monospace',
              textAlign: 'left',
              fontSize: '1rem',
            }}
          >
            <label style={{ fontWeight: 'bold' }}>
              <p>Quiz Will End in:</p>
            </label>
            <label style={{ fontStyle: 'italic' }}>
              {(quiz.days === 0
                ? ''
                : String(dy) + (dy > 1 ? ' days ' : ' day ')) +
                (String(hr) + (hr > 1 ? ' hours ' : ' hour ')) +
                (String(min) + (min > 1 ? ' minutes ' : ' minute ')) +
                (String(sec) + (sec > 1 ? ' seconds.' : ' second.'))}
            </label>
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
            ) : (
              <div
                name='submit'
                style={{
                  width: '300px',
                  margin: 'auto',
                  marginTop: '20px',
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  border: 'solid blue 2px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <label name='submit' style={{ cursor: 'pointer' }}>
                  SUBMIT
                </label>
              </div>
            )}
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
              <div
                onClick={(e) => {
                  var ans = answers
                  if (e.target.getAttribute('name') !== null) {
                    ans.forEach((objt) => {
                      if (objt.questionIndex === questionIndex) {
                        if (objt.answer === e.target.getAttribute('name')) {
                          objt.answer = ''
                        } else {
                          objt.answer = e.target.getAttribute('name')
                        }
                      }
                    })
                    setAnswers(() => {
                      return [...ans]
                    })
                  }
                }}
              >
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
                            name={opt}
                            value={quiz.questions[questionIndex][opt]}
                            style={{
                              backgroundColor:
                                answers[questionIndex].answer === opt
                                  ? 'lightgreen'
                                  : 'white',
                              color:
                                answers[questionIndex].answer === opt
                                  ? 'white'
                                  : 'black',
                              border:
                                answers[questionIndex].answer === opt
                                  ? 'solid lightgreen 2px'
                                  : 'solid black 1px',
                              padding: '15px',
                              paddingLeft: '20px',
                              textAlign: 'left',
                              fontWeight:
                                answers[questionIndex].answer === opt
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
                  <label style={{ fontStyle: 'italic' }}> Write Answer </label>
                </p>
                <textarea
                  style={{
                    border: 'solid black 1px',
                    width: '300px',
                    height: '200px',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    padding: '15px',
                  }}
                  value={answers[questionIndex].answer}
                  onChange={(e) => {
                    var ans = answers
                    ans.forEach((objt) => {
                      if (objt.questionIndex === questionIndex) {
                        objt.answer = e.target.value
                      }
                    })
                    setAnswers(() => {
                      return [...ans]
                    })
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Quiz
