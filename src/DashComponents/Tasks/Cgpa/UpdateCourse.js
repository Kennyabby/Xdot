import { React, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import cancel from '../assets/cancel.png'

const UpdateCourse = ({
  server,
  user,
  course,
  session,
  gradingScale,
  request,
  notifyUpdate,
  closeUpdate,
}) => {
  const [fields, setFields] = useState({
    description: '',
    code: '',
    unit: '',
    score: '',
  })
  const descriptionRef = useRef(null)
  const codeRef = useRef(null)
  const unitRef = useRef(null)
  const scoreRef = useRef(null)
  const title = [
    { ref: codeRef, name: 'code' },
    { ref: descriptionRef, name: 'description' },
    { ref: unitRef, name: 'unit' },
    { ref: scoreRef, name: 'score' },
  ]
  const [showButton, setShowButton] = useState(false)
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  const removeSpace = (val) => {
    var newVal = ''
    val.split('').forEach((str) => {
      if (str !== ' ') {
        newVal += str
      }
    })
    return newVal
  }
  useEffect(() => {
    if (course !== null) {
      setFields({
        description: course.description,
        code: course.code,
        unit: course.unit,
        score: course.score,
      })
    }
  }, [course])
  useEffect(() => {
    if (
      fields.description.length &&
      fields.code.length &&
      fields.unit.length &&
      fields.score.length
    ) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [fields])
  const getGrade = (score) => {
    const scr = Number(score)
    const scale = Number(gradingScale)
    if (scr >= 70) {
      return { gp: scale, grade: 'A', remark: 'Passed' }
    } else if (scr >= 60 && scr <= 69) {
      return { gp: scale - 1, grade: 'B', remark: 'Passed' }
    } else if (scr >= 50 && scr <= 59) {
      return { gp: scale - 2, grade: 'C', remark: 'Passed' }
    } else if (scr >= 45 && scr <= 49) {
      return { gp: scale - 3, grade: 'D', remark: 'Passed' }
    }
    return { gp: 0, grade: 'F', remark: 'Failed' }
  }
  const swapDetails = ({ details, swap, code }) => {
    var index = details.length

    details.forEach((detail, i) => {
      if (
        detail.code === code &&
        detail.session === (course !== null ? course.session : session)
      ) {
        index = i
      }
    })
    details[index] = swap
    return details
  }
  const handleUpdate = async () => {
    setShowUpdateStatus(true)
    setUpdateStatus(
      'Proceeding to ' +
        request.slice(0, 1).toUpperCase() +
        request.slice(1) +
        ' Course. Please Wait...'
    )

    const scoreAnalysis = getGrade(fields.score)
    const gp = scoreAnalysis.gp
    const grade = scoreAnalysis.grade
    const remark = scoreAnalysis.remark

    const allFields = {
      session: course !== null ? course.session : session,
      ...fields,
      gp: gp,
      grade: grade,
      remark: remark,
    }

    allFields.code = removeSpace(fields.code)
    var courseDetails = swapDetails({
      details: user.courseDetails,
      swap: allFields,
      code: fields.code,
    })
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
              courseDetails: courseDetails,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        closeUpdate()
        notifyUpdate(
          (request === 'add' ? 'Added Course: ' : 'Edited Course: ') +
            allFields.code.toUpperCase() +
            ' Successfully'
        )
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', when: 'beforeChildren' }}
        exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } }}
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: '3',
          backgroundColor: 'rgba(0,0,0,0.95)',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <img
          height='20px'
          style={{
            position: 'fixed',
            top: '5px',
            right: '5px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          src={cancel}
          alt='cancel course update'
          onClick={() => {
            closeUpdate()
          }}
        />
        <div style={{ color: 'white', textAlign: 'center' }}>
          {request === 'edit' ? (
            <p>
              <label
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                }}
              >
                Editing{' ' + course.code.toUpperCase()}
              </label>
            </p>
          ) : undefined}
          {title.map((label, i) => {
            if (request === 'edit') {
              if (label.name !== 'code') {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'block',
                      margin: '30px',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    <label>{label.name.toUpperCase()}</label>
                    <p>
                      <input
                        type={
                          label.name === 'unit' || label.name === 'score'
                            ? 'number'
                            : 'text'
                        }
                        value={fields[label.name]}
                        onChange={handleInputChange}
                        ref={label.ref}
                        name={label.name}
                        className='updateinput'
                        placeholder={label.name.toUpperCase()}
                      />
                    </p>
                  </div>
                )
              }
            } else {
              return (
                <div
                  key={i}
                  style={{
                    display: 'block',
                    margin: '30px',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  <label>{label.name.toUpperCase()}</label>
                  <p>
                    <input
                      type={
                        label.name === 'unit' || label.name === 'score'
                          ? 'number'
                          : 'text'
                      }
                      value={fields[label.name]}
                      onChange={handleInputChange}
                      ref={label.ref}
                      name={label.name}
                      className='updateinput'
                      placeholder={label.name.toUpperCase()}
                    />
                  </p>
                </div>
              )
            }
          })}
          <div style={{ display: 'inline-flex', gap: '20px', margin: '30px' }}>
            <button
              className='updatebutton'
              style={{ border: 'solid red 2px' }}
              onClick={() => {
                setFields((fields) => {
                  return {
                    ...fields,
                    description: '',
                    code: '',
                    unit: '',
                    score: '',
                  }
                })
              }}
            >
              Clear All Fields
            </button>
            {showButton && (
              <button
                onClick={handleUpdate}
                className='updatebutton'
                style={{ border: 'solid lightgreen 2px' }}
              >
                {request.slice(0, 1).toUpperCase() +
                  request.slice(1) +
                  ' Fields'}
              </button>
            )}
          </div>
          {showUpdateStatus && (
            <p>
              <label
                style={{
                  color: 'blue',
                  backgroundColor: 'lightblue',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '50px',
                  fontSize: '.8rem',
                  border: 'solid blue 2px',
                }}
              >
                {updateStatus}
              </label>
            </p>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default UpdateCourse
