import { React, useState, useEffect } from 'react'

import cancel from '../assets/cancel.png'
const UpdateQuestion = ({
  server,
  closeUpdate,
  request,
  type,
  updattingQuestion,
  quiz,
  user,
  notifyUpdate,
}) => {
  const [options, setOptions] = useState([])
  const labels = ['question', 'answer']
  const [fields, setFields] = useState({ question: '', answer: '' })
  const [number, setNumber] = useState('')
  const optList = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  useEffect(() => {
    if (updattingQuestion !== null) {
      const optionNo = Object.values(updattingQuestion).length - 4
      var opt = []
      for (var i = 0; i < optionNo; i++) {
        opt = opt.concat(optList[i])
      }
      setOptions(() => {
        return [...opt]
      })
      setFields({
        ...updattingQuestion,
      })
    }
  }, [updattingQuestion])
  useEffect(() => {
    window.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [showUpdateStatus])
  useEffect(() => {
    var index = quiz.questions.length
    const newQuestion = {
      ...fields,
    }
    quiz.questions.forEach((question, i) => {
      if (question.index === newQuestion.index) {
        index = i
      }
    })
    setNumber(index + 1)
  })
  const handleAddOptions = () => {
    setOptions((options) => {
      if (options.length === 0) {
        setFields((fields) => {
          return { ...fields, answer: optList[options.length] }
        })
      }
      setFields((fields) => {
        return { ...fields, [optList[options.length]]: '' }
      })
      return [...options, optList[options.length]]
    })
  }
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  const handleQuestionUpdate = async () => {
    setShowUpdateStatus(true)

    var index = quiz.questions.length
    const newQuestion = {
      ...fields,
    }
    quiz.questions.forEach((question, i) => {
      if (question.index === newQuestion.index) {
        index = i
      }
    })
    newQuestion.type =
      updattingQuestion !== null ? updattingQuestion.type : type
    newQuestion.index =
      updattingQuestion !== null ? updattingQuestion.index : Date.now()
    quiz.questions[index] = newQuestion

    const newQuiz = {
      ...quiz,
    }
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
      const resp = await fetch(server+'/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        closeUpdate()
        notifyUpdate(
          (request === 'add' ? 'Added Question: ' : 'Edited Question: ') +
            newQuestion.index +
            ' to Quiz: ' +
            newQuiz.title.toUpperCase() +
            ' Successfully'
        )
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          overflowY: 'auto',
          zIndex: '1',
          backgroundColor: 'rgba(0,0,0,0.8)',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          onClick={() => {
            closeUpdate()
          }}
          style={{
            position: 'fixed',
            top: '5px',
            right: '5px',
            zIndex: '1',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          src={cancel}
          alt='close add quiz'
          height='40px'
        />
        <div onChange={handleInputChange}>
          {labels.map((label) => {
            if (label === 'question') {
              return (
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: 'white',
                  }}
                >
                  <p>
                    <label>{label.toUpperCase() + ' ' + String(number)}</label>
                  </p>

                  <textarea
                    name={label}
                    value={fields[label]}
                    style={{
                      width: '300px',
                      height: '150px',
                      padding: '20px',
                      fontSize: '1rem',
                      borderRadius: '10px',
                    }}
                  />
                  {(request === 'add' && type === 'obj') ||
                  (request === 'edit' && updattingQuestion.type === 'obj') ? (
                    <div>
                      {options.length
                        ? options.map((option) => {
                            return (
                              <div>
                                <p>
                                  <label>{option}</label>
                                </p>
                                <input
                                  name={option}
                                  value={
                                    fields[option] === undefined
                                      ? ''
                                      : fields[option]
                                  }
                                  className='updateinput'
                                />
                              </div>
                            )
                          })
                        : undefined}
                      <p style={{ margin: '30px' }}>
                        <label
                          onClick={handleAddOptions}
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '1rem',
                            color: 'lightgreen',
                            padding: '5px',
                            border: 'solid white 2px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Add Options
                        </label>
                      </p>
                    </div>
                  ) : undefined}
                </div>
              )
            }
            return (
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  color: 'white',
                }}
              >
                <p>
                  <label>
                    {type === 'obj'
                      ? options.length
                        ? 'SELECT AN ANSWER'
                        : undefined
                      : label.toUpperCase()}
                  </label>
                </p>
                {(request === 'add' && type === 'obj') ||
                (request === 'edit' && updattingQuestion.type === 'obj') ? (
                  options.length ? (
                    <select
                      name={label}
                      value={fields[label]}
                      className='updateinput'
                    >
                      {options.map((option) => {
                        return (
                          <option name={option} value={option}>
                            {option}
                          </option>
                        )
                      })}
                    </select>
                  ) : undefined
                ) : (
                  <input
                    name={label}
                    value={fields[label]}
                    className='updateinput'
                  />
                )}
              </div>
            )
          })}
          {!Object.values(fields).includes('') ? (
            <p style={{ margin: '30px' }}>
              <label
                onClick={handleQuestionUpdate}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  color: 'lightgreen',
                  padding: '5px',
                  border: 'solid white 2px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {request.slice(0, 1).toUpperCase() +
                  request.slice(1) +
                  ' Question'}
              </label>
            </p>
          ) : undefined}
          {showUpdateStatus && (
            <p>
              <label style={{ color: 'lightblue' }}>
                {'Proceeding to ' +
                  request.slice(0, 1).toUpperCase() +
                  request.slice(1) +
                  ' Question. Please Wait...'}
              </label>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default UpdateQuestion
