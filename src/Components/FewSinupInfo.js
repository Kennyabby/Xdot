import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaUserCircle,
  FaAngleLeft,
  FaUserAlt,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
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
const FewSignupInfo = ({
  setValidate,
  setSignupConfirmed,
  sendConfidentialDetails,
  basicConfirmed,
  schoolConfirmed,
  credentials,
}) => {
  const history = useHistory()
  const signupCoverRef = useRef(null)
  const [signupInfo, setSignupInfo] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  })
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const signupLabelRef = useRef(null)
  const infoRefList = [userNameRef, passwordRef, confirmPasswordRef]
  const confidentials = {
    password: signupInfo.password,
    confirmPassword: signupInfo.confirmPassword,
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.childNodes[1].required) {
          infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.childNodes[1].title}`
          if (infoRef.current.childNodes[1].value === '') {
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
      }
    })

    if (
      infos.length === count &&
      passwordRef.current.value === confirmPasswordRef.current.value
    ) {
      setSignupConfirmed(true)
      return true
    }
    setSignupConfirmed(false)
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
        if (infoRef.current.childNodes[1].required) {
          infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.childNodes[1].title}`
          if (infoRef.current.value === '') {
          } else {
            if (
              infoRef.current.getAttribute('name') === 'confirmPassword' &&
              infoRef.current.childNodes[1].value !== ''
            ) {
              if (
                passwordRef.current.childNodes[1].value ===
                confirmPasswordRef.current.childNodes[1].value
              ) {
                confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                  'green'
                confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                  'Password Confirmed!'
              } else {
                confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                  'red'
                confirmPasswordRef.current.style.border = 'solid red 2px'
                confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                  'Passwords Do Not Match!'
              }
            }
            count++
          }
        }
      }
    })

    if (
      infos.length === count &&
      passwordRef.current.childNodes[1].value ===
        confirmPasswordRef.current.childNodes[1].value
    ) {
      setSignupConfirmed(true)
      return true
    }
    setSignupConfirmed(false)
    return false
  }
  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setSignupInfo({
        ...signupInfo,
        userName: localStorage.getItem('userName'),
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      })
    }
  }, [])
  useEffect(() => {
    if (
      passwordRef.current.childNodes[1].value.length > 0 &&
      confirmPasswordRef.current.childNodes[1].value.length > 0
    ) {
      if (signupInfo.confirmPassword !== signupInfo.password) {
        confirmPasswordRef.current.style.border = 'solid red 2px'
        confirmPasswordRef.current.parentElement.childNodes[1].style.color =
          'red'
        confirmPasswordRef.current.style.border = 'solid red 2px'
        confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
          'Passwords Do Not Match!'
      } else {
        confirmPasswordRef.current.style.border = 'solid blue 2px'
        confirmPasswordRef.current.parentElement.childNodes[1].style.color =
          'green'
        confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
          'Password Confirmed!'
      }
    }
  }, [signupInfo.confirmPassword])
  useEffect(() => {
    window.localStorage.setItem('userName', signupInfo.userName)
    sendConfidentialDetails(confidentials)
    validateInput()
  }, [signupInfo])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      setValidate(true)
      if (validateInputs()) {
        sendConfidentialDetails(confidentials)
        if (basicConfirmed.check === true && schoolConfirmed.check === true) {
          // history.push('./finish')
        }
      }
    }
    if (
      e.target.value === 'Prev' ||
      e.target.getAttribute('value') === 'Prev'
    ) {
      history.push('./schoolInfo')
    }
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
        }
        if (infoRef.current.getAttribute('name') === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.chldNodes[1].title}`
          } else {
            infoRef.current.parentElement.childNodes[1].innerHTML =
              infoRef.current.childNodes[1].title
          }
          if (
            infoRef.current.getAttribute('name') === 'confirmPassword' &&
            infoRef.current.childNodes[1].value !== ''
          ) {
            if (
              passwordRef.current.childNodes[1].value ===
              confirmPasswordRef.current.childNodes[1].value
            ) {
              confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                'green'
              confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                'Password Confirmed!'
            } else {
              confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                'red'
              confirmPasswordRef.current.style.border = 'solid red 2px'
              confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                'Passwords Do Not Match!'
            }
          }
        }
      }
    })
  }
  const getInputEvent = (e) => {
    var name = e.target.getAttribute('name')
    setSignupInfo({ ...signupInfo, [name]: e.target.value })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.getAttribute('name') === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          if (
            infoRef.current.childNodes[1].value === '' &&
            infoRef.current.childNodes[1].required
          ) {
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          }
        }
      }
    })
    validateInput()
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {<FaAngleLeft className='prv' value='Prev' />}
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Submit'}
        </button>
      }
    </div>
  )

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ opacity: 0 }}
      ref={signupCoverRef}
    >
      <motion.div
        variants={headerVariants}
        className='infotag'
        ref={signupLabelRef}
      >
        Signup Info
      </motion.div>
      <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
        <FaUserCircle
          className='usr'
          style={{
            fontSize: '5rem',
            color: 'rgba(20,20,100,0.3)',
          }}
        />
        <div className='over' style={{ padding: '13px' }}>
          <div
            className='input'
            ref={userNameRef}
            name='userName'
            placeholder='Enter Your Username'
            value={signupInfo.userName}
            title='Enter Your Username'
            style={{ display: 'inline-flex' }}
          >
            <FaUserAlt />
            <input
              style={{
                margin: 'auto 15px',
                backgroundColor: 'rgba(0,0,0,0)',
                outline: 'none',
                border: 'solid black 0px',
              }}
              type='text'
              name='userName'
              placeholder='Enter Your Username'
              value={signupInfo.userName}
              required
              title='Enter Your Username'
            />
          </div>
          <p className='inputStyle'></p>
        </div>
        <div className='over' style={{ padding: '13px' }}>
          <div
            ref={passwordRef}
            className='input'
            type='password'
            name='password'
            placeholder='Enter Your Password'
            title='Enter Your Password'
            style={{ display: 'inline-flex' }}
          >
            <label></label>
            <input
              style={{
                margin: 'auto 15px',
                backgroundColor: 'rgba(0,0,0,0)',
                outline: 'none',
                border: 'solid black 0px',
              }}
              type={!showPassword ? 'password' : 'text'}
              name='password'
              placeholder='Enter Your Password'
              value={signupInfo.password}
              required
              title='Enter Your Password'
            />
            <div
              style={{
                width: 'fit-content',
                marginLeft: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <p className='inputStyle'></p>
        </div>
        <div className='over' style={{ padding: '13px' }}>
          <div
            ref={confirmPasswordRef}
            className='input'
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            title='Confirm Password'
            style={{ display: 'inline-flex' }}
          >
            <label></label>
            <input
              style={{
                margin: 'auto 15px',
                backgroundColor: 'rgba(0,0,0,0)',
                outline: 'none',
                border: 'solid black 0px',
              }}
              type={!showConfirmPassword ? 'password' : 'text'}
              name='confirmPassword'
              placeholder='Confirm Password'
              value={signupInfo.confirmPassword}
              onChange={(e) => {
                setSignupInfo({
                  ...signupInfo,
                  confirmPassword: e.target.value,
                })
              }}
              required
              title='Confirm Password'
            />
            <div
              style={{
                width: 'fit-content',
                marginLeft: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword)
              }}
            >
              {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <p className='inputStyle'></p>
        </div>
        {prevNext}
      </div>
    </motion.div>
  )
}

export default FewSignupInfo
