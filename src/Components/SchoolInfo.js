import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import logo from './user.png'

const SchoolInfo = ({
  getCoverList,
  getCoverPos,
  setSchoolConfirmed,
  server,
}) => {
  const history = useHistory()
  const schoolCoverRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [schoolInfo, setSchoolInfo] = useState({
    matricNo: '',
    schoolEmail: '',
    otherEmail: '',
    level: '',
    hallOfResidence: '',
    yearOfAdmission: '',
    modeOfEntry: '',
  })
  const matricNoRef = useRef(null)
  const schoolEmailRef = useRef(null)
  const otherEmailRef = useRef(null)
  const levelRef = useRef(null)
  const hallOfResidenceRef = useRef(null)
  const yearOfAdmissionRef = useRef(null)
  const modeOfEntryRef = useRef(null)
  const infoRefList = [
    matricNoRef,
    schoolEmailRef,
    otherEmailRef,
    levelRef,
    hallOfResidenceRef,
    yearOfAdmissionRef,
    modeOfEntryRef,
  ]
  var matricValidated = false
  useEffect(() => {
    getCoverList(schoolList)
  }, [])
  useEffect(() => {
    getCoverPos(pos)
  }, [pos])

  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })

    infoRefList.forEach(async (infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          } else {
            infoRef.current.style.borderBottom = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            if (infoRef.current.name === 'matricNo') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                if (matricValidated) {
                  infoRef.current.style.borderBottom = 'solid red 1px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'This Matric Number Has Been Registered!'
                  count--
                }
              } else {
                count--
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Enter a Valid Matric Number'
              }
            }
            count++
          }
        }
      }
    })

    if (infos.length === count) {
      setSchoolConfirmed(true)
      return true
    } else {
      setSchoolConfirmed(false)
      return false
    }
  }
  const validateInput = async () => {
    var count = 0
    var response = ''
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach(async (infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
          } else {
            if (infoRef.current.name === 'matricNo') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                try {
                  const opts = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matricNo: 1, _id: 0 }),
                  }
                  const resp = await fetch(server + '/getMatricList', opts)
                  response = await resp.json()
                  const matricList = response.matricList
                  if (matricList.includes(infoRef.current.value)) {
                    infoRef.current.style.borderBottom = 'solid red 1px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'red'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'This Matric Number Has Been Registered!'
                    count--
                  } else {
                    // count++;
                    // console.log("increased to:",count);
                  }
                } catch (TypeError) {}
              } else {
                count--
              }
            }

            count++
            if (infos.length === count) {
              setSchoolConfirmed(true)
              return true
            } else {
              setSchoolConfirmed(false)
              return false
            }
          }
        }
      }
    })
    //  console.log(infos.length);
    //  console.log(count);
  }
  useEffect(() => {
    if (window.localStorage.getItem('matricNo') != null) {
      setSchoolInfo({
        ...schoolInfo,
        matricNo: localStorage.getItem('matricNo'),
        schoolEmail: localStorage.getItem('schoolEmail'),
        otherEmail: localStorage.getItem('otherEmail'),
        level: localStorage.getItem('level'),
        hallOfResidence: localStorage.getItem('hallOfResidence'),
        yearOfAdmission: localStorage.getItem('yearOfAdmission'),
        modeOfEntry: localStorage.getItem('modeOfEntry'),
      })
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('matricNo', schoolInfo.matricNo)
    window.localStorage.setItem('schoolEmail', schoolInfo.schoolEmail)
    window.localStorage.setItem('otherEmail', schoolInfo.otherEmail)
    window.localStorage.setItem('level', schoolInfo.level)
    window.localStorage.setItem('hallOfResidence', schoolInfo.hallOfResidence)
    window.localStorage.setItem('yearOfAdmission', schoolInfo.yearOfAdmission)
    window.localStorage.setItem('modeOfEntry', schoolInfo.modeOfEntry)
    validateInput()
  }, [schoolInfo])
  useEffect(() => {
    const first = localStorage.getItem('firstName').slice(0, 1)
    const last = localStorage.getItem('lastName')
    const matric = schoolInfo.matricNo.slice(3)
    setSchoolInfo((schoolInfo) => {
      return {
        ...schoolInfo,
        schoolEmail: (first + last + matric + '@stu.ui.edu.ng').toLowerCase(),
      }
    })
  }, [schoolInfo.matricNo])
  const getButtonEvent = async (e) => {
    if (e.target.value === 'Next') {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricNo: 1, _id: 0 }),
      }
      if (matricNoRef.current !== null) {
        fetch(server + '/getMatricList', opts).then(async (resp) => {
          const response = await resp.json()
          const matricList = response.matricList
          if (matricList.includes(matricNoRef.current.value)) {
            matricValidated = true
          }
          if (validateInputs()) {
            if (pos === 2) {
              history.push('./contactInfo')
              setPos(0)
            } else {
              setPos((pos) => {
                return pos + 1
              })
            }
          }
        })
      } else {
        if (validateInputs()) {
          console.log('yes')
          if (pos === 2) {
            history.push('./contactInfo')
            setPos(0)
          } else {
            setPos((pos) => {
              return pos + 1
            })
          }
        }
      }
    }
    if (e.target.value === 'Prev') {
      if (pos === 0) {
        history.push('./basicInfo')
        setPos(0)
      } else {
        setPos((pos) => {
          return pos - 1
        })
      }
    }
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.borderBottom = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.borderBottom = 'solid red 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'red'
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.placeholder = ''
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
            if (
              infoRef.current.name === 'matricNo' &&
              infoRef.current.value.length > 0
            ) {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Enter a Valid Matric Number'
              }
            }
          } else {
            infoRef.current.parentElement.childNodes[1].innerHTML =
              infoRef.current.title
          }
        }
      }
    })
  }
  const getInputEvent = (e) => {
    var name = e.target.getAttribute('name')
    setSchoolInfo({ ...schoolInfo, [name]: e.target.value })

    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          infoRef.current.parentElement.childNodes[1].innerHTML =
            infoRef.current.title
          if (
            infoRef.current.name === 'matricNo' &&
            infoRef.current.value.length > 0
          ) {
            if (
              Number(infoRef.current.value) &&
              infoRef.current.value.length === 6
            ) {
              infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
            } else {
              infoRef.current.style.borderBottom = 'solid red 1px'
              infoRef.current.parentElement.childNodes[1].style.display =
                'block'
              infoRef.current.parentElement.childNodes[1].style.color = 'red'
              infoRef.current.parentElement.childNodes[1].innerHTML =
                'Enter a Valid Matric Number'
            }
          }
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          }
        }
      }
    })
    validateInput()
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Next >>'}
        </button>
      }
    </div>
  )
  const schoolList = [
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={matricNoRef}
          className='input'
          type='text'
          name='matricNo'
          placeholder='Enter Your Matric No'
          value={schoolInfo.matricNo}
          required
          title='Enter Your Matric No'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={schoolEmailRef}
          className='input'
          type='email'
          name='schoolEmail'
          placeholder='Enter Your School Email'
          value={schoolInfo.schoolEmail}
          required
          title='Enter Your School Email'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={otherEmailRef}
          className='input'
          type='email'
          name='otherEmail'
          placeholder='Enter Your Personal Email'
          value={schoolInfo.otherEmail}
          title='Enter Your Personal Email'
        />
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={levelRef}
          className='input black'
          type='text'
          name='level'
          placeholder='Choose Your Level'
          value={schoolInfo.level}
          required
          title='Choose Your Level'
        >
          <option value=''>Level</option>
          <option value='100'>100</option>
          <option value='200'>200</option>
          <option value='300'>300</option>
          <option value='400'>400</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={hallOfResidenceRef}
          className='input black'
          type='text'
          name='hallOfResidence'
          placeholder='Choose Your Hall of Residence'
          value={schoolInfo.hallOfResidence}
          required
          title='Choose Your Hall of Residence'
        >
          <option value=''>Hall of Residence Allocated</option>
          <option value='MELLANBY'>MELLANBY</option>
          <option value='TEDDER'>TEDDER</option>
          <option value='KUTI'>KUTI</option>
          <option value='SULTAN BELLO'>SULTAN BELLO</option>
          <option value='QUEEN ELIZABETH II'>QUEEN ELIZABETH II</option>
          <option value='INDEPENDENCE'>INDEPENDENCE</option>
          <option value='IDIA'>IDIA</option>
          <option value='OBAFEMI AWOLOWO'>OBAFEMI AWOLOWO</option>
          <option value='ALEXANDER BROWN'>ALEXANDER BROWN</option>
          <option value='ABDULSALAMI ABUBAKAR'>ABDULSALAMI ABUBAKAR</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={modeOfEntryRef}
          className='input black'
          type='text'
          name='modeOfEntry'
          placeholder='Choose Your Admission Mode of Entry'
          value={schoolInfo.modeOfEntry}
          required
          title='Choose Your Admission Mode of Entry'
        >
          <option value=''>Admission Mode Of Entry</option>
          <option value='Direct Entry (D.E.)'>Direct Entry (D.E.)</option>
          <option value='UTME'>UTME</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={yearOfAdmissionRef}
          className='input black'
          type='text'
          name='yearOfAdmission'
          placeholder='Choose Your Year of Admission'
          value={schoolInfo.yearOfAdmission}
          required
          title='Choose Your Year of Admission'
        >
          <option value=''>Session Admitted</option>
          <option value='2016/2017'>2016/2017</option>
          <option value='2017/2018'>2017/2018</option>
          <option value='2018/2019'>2018/2019</option>
          <option value='2020/2021'>2020/2021</option>
          <option value='2021/2022'>2021/2022</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
  ]
  return (
    <div ref={schoolCoverRef}>
      <div className='infotag'>School Info</div>
      {schoolList[pos]}
    </div>
  )
}

export default SchoolInfo
