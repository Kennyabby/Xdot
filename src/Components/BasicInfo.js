import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logo from './user.png'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    // dampness: 1000,
    // stiffness: 500,
    // mass: 0.5,
    transition: {
      duration: 1,
      // ease: 'easeInOut',
    },
  },
}
const headerVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}
const BasicInfo = ({ getCoverList, getCoverPos, setBasicConfirmed }) => {
  const history = useHistory()
  const basicCoverRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [viewPrev, setViewPrev] = useState(false)
  const firstNameRef = useRef(null)
  const middleNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const guardianNameRef = useRef(null)
  const dateOfBirthRef = useRef(null)
  const maleRef = useRef(null)
  const femaleRef = useRef(null)
  const basicLabelRef = useRef(null)
  const infoRefList = [
    firstNameRef,
    middleNameRef,
    lastNameRef,
    guardianNameRef,
    dateOfBirthRef,
  ]
  const [genderClicked, setGenderClicked] = useState(false)

  useEffect(() => {
    getCoverList(basicList)
  }, [])
  useEffect(() => {
    basicLabelRef.current.scrollIntoView()
  }, [pos])
  useEffect(() => {
    getCoverPos(pos)
    if (pos) {
      setViewPrev(true)
    } else {
      setViewPrev(false)
    }
  }, [pos])
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    guardianName: '',
    dateOfBirth: '',
  })

  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          } else {
            infoRef.current.style.borderBottom = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            count++
          }
        }
        if (basicInfo.gender === '') {
          setGenderClicked(true)
          count--
        } else {
          setGenderClicked(false)
        }
      }
    })

    if (infos.length === count) {
      setBasicConfirmed(true)
      return true
    }
    setBasicConfirmed(false)
    return false
  }
  const validateInput = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
          } else {
            count++
          }
        }
      }
    })
    if (infos.length === count) {
      setBasicConfirmed(true)
      return true
    }
    setBasicConfirmed(false)
    return false
  }
  useEffect(() => {
    if (window.localStorage.getItem('firstName') != null) {
      setBasicInfo({
        ...basicInfo,
        firstName: localStorage.getItem('firstName'),
        middleName: localStorage.getItem('middleName'),
        lastName: localStorage.getItem('lastName'),
        gender: localStorage.getItem('gender'),
        guardianName: localStorage.getItem('guardianName'),
        dateOfBirth: localStorage.getItem('dateOfBirth'),
      })
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('firstName', basicInfo.firstName)
    window.localStorage.setItem('middleName', basicInfo.middleName)
    window.localStorage.setItem('lastName', basicInfo.lastName)
    window.localStorage.setItem('gender', basicInfo.gender)
    window.localStorage.setItem('guardianName', basicInfo.guardianName)
    window.localStorage.setItem('dateOfBirth', basicInfo.dateOfBirth)
    validateInput()
    if (maleRef.current !== null) {
      if (basicInfo.gender === 'Male') {
        maleRef.current.click()
      } else if (basicInfo.gender === 'Female') {
        femaleRef.current.click()
      }
    }
  }, [basicInfo])
  useEffect(() => {
    if (pos === 0) {
      if (maleRef.current !== null) {
        if (basicInfo.gender === 'Male') {
          maleRef.current.click()
        } else if (basicInfo.gender === 'Female') {
          femaleRef.current.click()
        }
      }
    }
  }, [pos])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (validateInputs()) {
        if (pos === 1) {
          history.push('./schoolInfo')
          setPos(0)
        } else {
          setPos((pos) => {
            return pos + 1
          })
        }
      }
    }
    if (e.target.value === 'Prev') {
      setPos((pos) => {
        return pos - 1
      })
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
          setBasicConfirmed(false)
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.placeholder = ''
          infoRef.current.parentElement.scrollIntoView()
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
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
    setBasicInfo({ ...basicInfo, [name]: e.target.value })

    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          }
        }
      }
    })
    validateInput()
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {viewPrev ? (
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      ) : undefined}
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Next >>'}
        </button>
      }
    </div>
  )
  const basicList = [
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={firstNameRef}
          className='input'
          type='text'
          name='firstName'
          show={false}
          placeholder='Enter First Name'
          value={basicInfo.firstName}
          required
          title='Enter First Name'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={middleNameRef}
          className='input'
          type='text'
          name='middleName'
          placeholder='Enter Middle Name'
          value={basicInfo.middleName}
          title='Enter Middle Name'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={lastNameRef}
          className='input'
          type='text'
          name='lastName'
          placeholder='Enter Last Name'
          value={basicInfo.lastName}
          required
          title='Enter Last Name'
        />
        <p className='inputStyle'></p>
      </p>
      <div
        className='gender'
        onChange={(e) => {
          setBasicInfo({ ...basicInfo, gender: e.target.value })
        }}
      >
        <label>Male</label>
        <input
          ref={maleRef}
          className='radio'
          type='radio'
          name='gender'
          value='Male'
        />
        <label> Female</label>
        <input
          ref={femaleRef}
          className='radio'
          type='radio'
          name='gender'
          value='Female'
        />
        {genderClicked ? (
          <p style={{ color: 'red' }}>Choose Your Gender</p>
        ) : undefined}
      </div>
      {prevNext}
    </div>,
    <div
      className='container'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ x: '-100vw' }}
      onChange={getInputEvent}
      onFocus={handleFocus}
    >
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={guardianNameRef}
          className='input'
          type='text'
          name='guardianName'
          placeholder='Enter Your Guardian Name'
          value={basicInfo.guardianName}
          required
          title='Enter Your Guardian Name'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={dateOfBirthRef}
          className='input'
          type='date'
          name='dateOfBirth'
          placeholder='Select Your Date of Birth'
          value={basicInfo.dateOfBirth}
          required
          title='Select Your Date of Birth'
        />
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
  ]
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ opacity: 0 }}
      style={{ display: 'block' }}
      ref={basicCoverRef}
    >
      <motion.div
        variants={headerVariants}
        className='infotag'
        ref={basicLabelRef}
      >
        Basic Info
      </motion.div>
      {basicList[pos]}
    </motion.div>
  )
}

export default BasicInfo
