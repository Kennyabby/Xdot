import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

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
const FewBasicInfo = ({ setBasicConfirmed }) => {
  const history = useHistory()
  const firstNameRef = useRef(null)
  const middleNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const contactNoRef = useRef(null)
  const maleRef = useRef(null)
  const femaleRef = useRef(null)
  const infoRefList = [firstNameRef, middleNameRef, lastNameRef, contactNoRef]
  const [genderClicked, setGenderClicked] = useState(false)
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    contactNo: '',
  })

  useEffect(() => {
    if (window.localStorage.getItem('firstName') != null) {
      setBasicInfo({
        ...basicInfo,
        firstName: localStorage.getItem('firstName'),
        middleName: localStorage.getItem('middleName'),
        lastName: localStorage.getItem('lastName'),
        contactNo: localStorage.getItem('contactNo'),
        gender: localStorage.getItem('gender'),
      })
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('firstName', basicInfo.firstName)
    window.localStorage.setItem('middleName', basicInfo.middleName)
    window.localStorage.setItem('lastName', basicInfo.lastName)
    window.localStorage.setItem('contactNo', basicInfo.contactNo)
    window.localStorage.setItem('gender', basicInfo.gender)
    validateInput()
    if (maleRef.current !== null) {
      if (basicInfo.gender === 'Male') {
        maleRef.current.click()
      } else if (basicInfo.gender === 'Female') {
        femaleRef.current.click()
      }
    }
  }, [basicInfo])
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
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          } else {
            infoRef.current.style.border = 'solid black 1px'
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
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.border = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.border = 'solid red 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'red'
          setBasicConfirmed(false)
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.placeholder = ''
          // infoRef.current.parentElement.scrollIntoView()
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
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          }
        }
      }
    })
    validateInput()
  }
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (validateInputs()) {
        history.push('./schoolInfo')
      }
    }
  }
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit={{ opacity: 0 }}
        style={{ display: 'block' }}
      >
        <motion.div variants={headerVariants} className='infotag'>
          Basic Info
        </motion.div>
        <div
          className='container'
          onChange={getInputEvent}
          onFocus={handleFocus}
        >
          <FaUserCircle
            className='usr'
            style={{
              fontSize: '5rem',
              color: 'rgba(20,20,100,0.3)',
            }}
          />
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
          <p className='over' style={{ padding: '13px' }}>
            <input
              ref={contactNoRef}
              className='input'
              type='number'
              name='contactNo'
              placeholder='Enter Your Contact Number'
              value={basicInfo.contactNo}
              required
              title='Enter Your Contact Number'
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
          <div className='np' onClick={getButtonEvent}>
            <button className='nxt' type='submit' name='button' value='Next'>
              {'Next >>'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FewBasicInfo
