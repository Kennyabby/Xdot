import { React, useState, useEffect, useRef } from 'react'
import cancel from '../assets/cancel.png'
const UpdateQuiz = ({ closeUpdate, request, user, notifyUpdate, editQuiz }) => {
  const [fields, setFields] = useState({
    title: '',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  var days = []
  for (var i = 0; i < 365; i++) {
    days = days.concat(i + 1)
  }
  var hours = []
  for (var n = 0; n < 24; n++) {
    hours = hours.concat(n + 1)
  }
  var minutes = []
  for (var j = 0; j < 60; j++) {
    minutes = minutes.concat(j + 1)
  }
  var seconds = []
  for (var k = 0; k < 60; k++) {
    seconds = seconds.concat(k + 1)
  }

  const labels = [
    { name: 'title' },
    { name: 'days', value: [0, ...days] },
    { name: 'hours', value: [0, ...hours] },
    { name: 'minutes', value: [0, ...minutes] },
    { name: 'seconds', value: [0, ...seconds] },
  ]

  useEffect(() => {
    if (editQuiz !== null) {
      setFields({
        title: editQuiz.title,
        days: editQuiz.days,
        hours: editQuiz.hours,
        minutes: editQuiz.minutes,
        seconds: editQuiz.seconds,
      })
    }
  }, [editQuiz])
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return {
        ...fields,
        [name]: value === '0' ? 0 : value,
      }
    })
  }
  const handleUpdate = async () => {
    setShowUpdateStatus(true)
    const newQuiz = {
      ...fields,
      questions: request === 'add' ? [] : editQuiz.questions,
    }
    var index = user.createQuiz.length
    user.createQuiz.forEach((quiz, i) => {
      if (quiz.title === newQuiz.title) {
        index = i
      }
    })
    user.createQuiz[index] = newQuiz
    const createQuiz = user.createQuiz
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
      const resp = await fetch('https://napsuiserver.herokuapp.com/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        closeUpdate()
        notifyUpdate(
          (request === 'add' ? 'Added Quiz: ' : 'Edited Quiz: ') +
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
          overflowY:'auto',
          width: '100%',
          height: '100%',
          zIndex: '1',
          backgroundColor: 'rgba(0,0,0,0.8)',
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
        <div
          style={{
            display: 'inline-block',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          onChange={handleInputChange}
        >
          <div
            style={{
              color: 'lightblue',
              margin: '50px',
              fontWeight: 'none',
              fontStyle: 'italic',
            }}
          >
            {request === 'add' ? (
              <label>
                Kindly Enter A Unique Title For This Quiz and Select The
                Duration Of Quiz
              </label>
            ) : (
              <label>{'Editing Quiz: ' + fields.title.toUpperCase()}</label>
            )}
          </div>
          {labels.map((label, i) => {
            if (label.name === 'title') {
              return request === 'add' ? (
                <div key={i}>
                  <p style={{ display: 'block' }}>
                    <p>
                      <label>{label.name.toUpperCase()}</label>
                    </p>
                    <p>
                      <input
                        className='updateinput'
                        defaultValue={fields[label.name]}
                        name={label.name}
                      />
                    </p>
                    <p>
                      <label style={{ fontSize: '1.2rem' }}>Duration</label>
                    </p>
                  </p>
                </div>
              ) : undefined
            } else {
              return (
                <div key={i}>
                  <p
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                    }}
                  >
                    <p>
                      <label>{label.name}</label>
                    </p>
                    <p>
                      <select
                        style={{
                          padding: '5px',
                          fontSize: '1.1rem',
                          borderRadius: '5px',
                          width: '200px',
                        }}
                        name={label.name}
                        value={fields[label.name]}
                      >
                        {label.value.map((value, i) => {
                          return (
                            <option key={i} value={value}>
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    </p>
                  </p>
                </div>
              )
            }
          })}

          {fields.title &&
          (fields.days || fields.hours || fields.minutes || fields.seconds) ? (
            <div style={{ margin: '50px' }}>
              <label
                onClick={handleUpdate}
                style={{
                  padding: '5px',
                  color: 'lightgreen',
                  border: 'solid white 1px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {request.slice(0, 1).toUpperCase() + request.slice(1) + ' Quiz'}
              </label>
            </div>
          ) : undefined}
          {showUpdateStatus && (
            <p>
              <label style={{ color: 'lightblue' }}>
                {'Proceeding to ' +
                  request.slice(0, 1).toUpperCase() +
                  request.slice(1) +
                  ' Quiz. Please Wait...'}
              </label>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default UpdateQuiz
