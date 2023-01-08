import { React, useState, useEffect, useRef, useContext } from 'react'

import ContextProvider from '../../../../ContextProvider'

const FirstChild = ({
  setFields,
  fields,
  buttonStatus,
  size,
  left,
  top,
  position,
  firstChildRef,
  handleButtonEvent,
}) => {
  const [fields1, setFields1] = useState({
    cgpa: '',
    contestantOfficesHeld: '',
    facultycontributions: '',
    reasons: '',
    academicStaffName: '',
    academicStaffNumber: '',
    studentMatricNo: '',
    studentName: '',
    studentLevel: '',
    studentOfficesHeld: '',
  })
  const forminfoRef = useRef(null)
  const { darkMode } = useContext(ContextProvider)
  const onInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields1((fields1) => {
      return { ...fields1, [name]: value }
    })
  }
  const handleFocus = (e) => {
    const name = e.target.getAttribute('name')
    var refList = []
    refList = refList.concat([...forminfoRef.current.childNodes[0].childNodes])
    refList = refList.concat([...forminfoRef.current.childNodes[1].childNodes])

    refList.forEach((ref) => {
      if (
        ref.childNodes[1] !== null &&
        ref.childNodes[1] !== undefined &&
        ref.childNodes[1].getAttribute('name') !== null
      ) {
        if (ref.childNodes[1].getAttribute('name') === name) {
          ref.childNodes[0].style.color = darkMode ? 'lightgreen' : 'green'
          ref.childNodes[0].style.backgroundColor = darkMode
            ? 'rgba(52,52,52,0)'
            : 'white'
          ref.childNodes[0].style.fontWeight = 'bold'
          ref.childNodes[1].style.border = darkMode
            ? 'solid lightgreen 2px'
            : 'solid green 2px'
          ref.childNodes[1].style.borderTop = 'solid lightgreen 0px'
        } else {
          ref.childNodes[0].style.color = darkMode ? 'white' : 'black'
          ref.childNodes[0].style.backgroundColor = darkMode
            ? 'rgba(52,52,52,1)'
            : 'white'
          ref.childNodes[0].style.fontWeight = ''
          ref.childNodes[1].style.border = darkMode
            ? 'solid rgba(190,190,190) 2px'
            : 'solid black 1px'
          ref.childNodes[1].style.borderTop = darkMode
            ? 'solid rgba(190,190,190) 2px'
            : 'solid black 1px'
        }
      }
    })
  }
  useEffect(() => {
    setFields(fields1)
  }, [fields1])
  return (
    <>
      <div
        ref={firstChildRef}
        style={{
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
          position: position,
          left: left + 'px',
          top: top + 'px',
          width: size <= 700 ? size : '100%',
        }}
        onChange={onInputChange}
        onFocus={handleFocus}
      >
        <div
          className='forminfo'
          ref={forminfoRef}
          style={{
            backgroundColor: darkMode ? 'black' : 'white',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <div
            className='forminfochild'
            style={{
              backgroundColor: darkMode ? 'black' : 'white',
              color: darkMode ? 'white' : 'black',
            }}
          >
            <h2 className='infoheader'>Personal Info</h2>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Enter your CGPA
              </label>
              <input
                placeholder='cgpa'
                type='number'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                name='cgpa'
                value={fields.cgpa}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {'Previous Office(s) Held'}
              </label>
              <textarea
                name='contestantOfficesHeld'
                placeholder='previous office(s) held'
                type='text'
                className='formtextarea'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.contestantOfficesHeld}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {'Contributions To The Faculty'}
              </label>
              <textarea
                name='facultyContributions'
                placeholder='contributions to the faculty (if any)'
                type='text'
                className='formtextarea'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.facultycontributions}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {'Reason For Vying For This Office'}
              </label>
              <textarea
                name='reasons'
                placeholder='reasons(s) for vying'
                type='text'
                className='formtextarea'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.reasons}
              />
            </div>
          </div>
          <div className='forminfochild'>
            <div className='infoheader'>
              <h2>{'REFEREES '}</h2>
              <label>{'(in the department)'}</label>
            </div>
            <div className='reftype'>
              <label>Academic Staff</label>
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Academic Staff's Name
              </label>
              <input
                name='academicStaffName'
                placeholder="academic staff's name"
                type='text'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.academicStaffName}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Academic Staff's Phone Number
              </label>
              <input
                name='academicStaffNumber'
                placeholder="academic staff's phone number"
                type='number'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.academicStaffNumber}
              />
            </div>
            <div className='reftype'>
              <label>Student</label>
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Student's Matriculation Number
              </label>
              <input
                name='studentMatricNo'
                placeholder="student's matric number"
                type='number'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.studentMatricNo}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Student's Name
              </label>
              <input
                name='studentName'
                placeholder="student's name"
                type='text'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.studentName}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                Student's Level
              </label>
              <input
                name='studentLevel'
                placeholder="student's level"
                type='text'
                className='forminput'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.studentLevel}
              />
            </div>
            <div
              className='forminputcover'
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <label
                className='formlabel'
                style={{
                  backgroundColor: darkMode ? 'rgba(52,52,52,1)' : 'white',
                  borderRadius: '10px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {'Office(s) Held By Student (if any)'}
              </label>
              <textarea
                name='studentOfficesHeld'
                placeholder='previous office(s) held (if any)'
                type='text'
                className='formtextarea'
                style={{
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
                  color: darkMode ? 'white' : 'black',
                  border: darkMode
                    ? 'solid rgba(190,190,190,1) 2px'
                    : 'solid black 2px',
                }}
                value={fields.studentOfficesHeld}
              />
            </div>
          </div>
          <div style={{ margin: '30px' }}>
            <button
              style={{
                padding: '10px 30px',
                borderRadius: '20px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
                textShadow: '0px 0px 5px white',
                boxShadow: '6px 6px 8px black',
                border: 'solid rgba(40,40,255,1) 2px',
                backgroundColor: 'rgba(40,40,255,1)',
              }}
              onClick={() => {
                handleButtonEvent()
              }}
            >
              {buttonStatus}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FirstChild
