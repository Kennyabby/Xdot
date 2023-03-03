import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUserCircle,
  FaAngleLeft,
  FaUserAlt,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import ContextProvider from '../ContextProvider'
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
  const { server } = useContext(ContextProvider)
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const signupLabelRef = useRef(null)
  const infoRefList = [userNameRef, passwordRef, confirmPasswordRef]
  const confidentials = {
    password: signupInfo.password,
    confirmPassword: signupInfo.confirmPassword,
  }
  const [userNameError, setUserNameError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userValidated, setUserValidated] = useState(false)

  const validateUserName = (name) => {
    var nameList = name.split('')
    const hasSpace = name.split(' ').length > 1
    const unWantedCharacters = [
      '@',
      '/',
      '\\',
      ',',
      '+',
      '=',
      '`',
      '?',
      '<',
      '>',
      '.',
      '|',
      '(',
      ')',
      '^',
      '*',
      '%',
      '!',
    ]
    var hasUnwantedCharacter = false
    const lessThanMinimum = name.length < 6
    unWantedCharacters.forEach((char) => {
      if (nameList.includes(char)) {
        hasUnwantedCharacter = true
      }
    })
    if (hasSpace || hasUnwantedCharacter || lessThanMinimum) {
      return {
        check: false,
        message:
          'Username cannot contain space. Your combinations must be a minimum of any 6 charachters of ("-","_","~","#","$" numbers and alphabets)',
      }
    }
    return { check: true }
  }
  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.childNodes[1].required
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
            count--
          } else {
            infoRef.current.style.border = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            if (infoRef.current.getAttribute('name') === 'confirmPassword') {
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
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Passwords Do Not Match!'
                count--
              }
            }
            if (infoRef.current.getAttribute('name') === 'userName') {
              const isValid = validateUserName(
                infoRef.current.childNodes[1].value
              )
              if (isValid.check) {
                if (!userValidated) {
                  infoRef.current.style.border = 'solid red 2px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'This Username is taken!'
                  count--
                } else {
                  infoRef.current.style.border = 'solid darkorange 2px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'darkorange'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'Username Accepted!'
                }
              } else {
                setUserNameError(isValid.message)
                setUserValidated(false)
                count--
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
  const validateInput = async (name) => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.childNodes[1].required
      }
    })
    infoRefList.forEach(async (infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.childNodes[1].required) {
          infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.childNodes[1].title}`
          if (infoRef.current.childNodes[1].value === '') {
            if (
              infoRef.current.getAttribute('name') === 'userName' &&
              infoRef.current.getAttribute('name') === name
            ) {
              infoRef.current.style.border = 'solid red 2px'
              infoRef.current.parentElement.childNodes[1].style.display =
                'block'
              infoRef.current.parentElement.childNodes[1].style.color = 'red'
              setUserValidated(false)
            }
            count--
          } else {
            console.log(name)
            if (
              infoRef.current.getAttribute('name') === 'confirmPassword' &&
              infoRef.current.getAttribute('name') === name
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
            if (
              infoRef.current.getAttribute('name') === 'userName' &&
              infoRef.current.getAttribute('name') === name
            ) {
              const isValid = validateUserName(
                infoRef.current.childNodes[1].value
              )
              if (isValid.check) {
                setUserNameError('')
                try {
                  const opts = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userName:
                        infoRef.current.childNodes[1].value.toLowerCase(),
                    }),
                  }

                  const resp = await fetch(server + '/isUserPresent', opts)
                  const response = await resp.json()
                  const isPresent = response.isPresent
                  if (isPresent) {
                    setUserValidated(false)
                    infoRef.current.style.border = 'solid red 2px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'red'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'This Username is taken!'
                    count--
                  } else {
                    setUserValidated(true)
                    infoRef.current.style.border = 'solid darkorange 2px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'darkorange'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'Username Accepted!'
                  }
                } catch (TypeError) {}
              } else {
                setUserNameError(isValid.message)
                setUserValidated(false)
                count--
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
          history.push('./finish')
        } else {
          if (basicConfirmed.check === false) {
            history.push('./basicInfo')
          } else if (schoolConfirmed === false) {
            history.push('./schoolInfo')
          } else {
            history.push('./basicInfo')
          }
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
    validateInput(name)
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {<FaAngleLeft className='prv' value='Prev' />}
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Confirm'}
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
          <AnimatePresence>
            {userNameError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '5px',
                  margin: '5px auto',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(22,22,220,0.7)',
                  fontSize: '.8rem',
                  color: 'white',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  width: '270px',
                }}
              >
                {userNameError}
              </motion.div>
            )}
          </AnimatePresence>
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
