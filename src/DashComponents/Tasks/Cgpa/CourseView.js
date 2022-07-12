import { React, useState, useEffect } from 'react'

import edit from '../assets/edit.png'
import remove from '../assets/remove.png'
import right from '../assets/right.png'
import left from '../assets/left.png'

const CourseView = ({ editCourse, removeCourse, course, index }) => {
  const [showFew, setShowFew] = useState(true)
  const [showLabel, setShowLabel] = useState(right)
  const [winSize, setWinSize] = useState(window.innerWidth)
  const checkSize = () => {
    setWinSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [winSize])
  const title = [
    'session',
    'code',
    'description',
    'unit',
    'score',
    'gp',
    'grade',
    'remark',
  ]
  return (
    <>
      <div
        style={{
          overflowX: 'auto',
          display: 'flex',
          width: '95%',
          gap: '20px',
          padding: '7px',
          margin: '3px',
          backgroundColor: index % 2 === 0 ? 'rgba(230,230,230,1)' : 'white',
        }}
      >
        {winSize <= 700 ? (
          <div
            style={{
              display: 'flex',
              gap: '35px',
            }}
          >
            {title.map((field, i) => {
              if (showFew) {
                if (['session', 'code', 'grade'].includes(field)) {
                  return <Field course={course} field={field} key={i} />
                }
              } else {
                return <Field course={course} field={field} key={i} />
              }
            })}
            <div style={{ display: 'block' }}>
              <p>
                <img
                  src={edit}
                  alt='edit'
                  onClick={() => {
                    editCourse(course)
                  }}
                  className='updatebtn'
                  style={{ color: 'blue' }}
                  height='18px'
                />
              </p>
              <p>
                <img
                  src={remove}
                  alt='remove'
                  onClick={() => {
                    removeCourse(course)
                  }}
                  className='updatebtn'
                  style={{ color: 'red' }}
                  height='18px'
                />
              </p>
            </div>
            <div
              onClick={() => {
                if (showFew) {
                  setShowFew(false)
                  setShowLabel(left)
                } else {
                  setShowFew(true)
                  setShowLabel(right)
                }
              }}
              style={{
                display: 'block',
                textAlign: 'center',
                margin: '20px',
                marginRight: '5px',
                marginLeft: '20px',
                padding: '10px',
                borderRadius: '50%',
                height: 'fit-content',
                cursor: 'pointer',
              }}
            >
              <img src={showLabel} alt='right/left' height='20px' />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '50px' }}>
            {title.map((field, i) => {
              return <Field course={course} field={field} key={i} />
            })}
            <div style={{ display: 'block' }}>
              <p>
                <img
                  src={edit}
                  alt='edit'
                  onClick={() => {
                    editCourse(course)
                  }}
                  className='updatebtn'
                  style={{ color: 'blue' }}
                  height='20px'
                />
              </p>
              <p>
                <img
                  src={remove}
                  alt='remove'
                  onClick={() => {
                    removeCourse(course)
                  }}
                  className='updatebtn'
                  style={{ color: 'red' }}
                  height='20px'
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const Field = ({ field, course }) => {
  return (
    <div
      style={{
        textAlign: 'left',
        width: 'fit-content',
        display: 'block',
        gap: '10px',
      }}
    >
      <p>
        <label style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
          {field.toUpperCase()}
        </label>
      </p>
      <p>
        <label style={{ fontFamily: 'monospace' }}>
          {field === 'code' ? course[field].toUpperCase() : course[field]}
        </label>
      </p>
    </div>
  )
}
export default CourseView
