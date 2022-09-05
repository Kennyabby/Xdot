import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import logo from './user.png'

const SignupInfo = ({
  setValidate,
  getCoverList,
  getCoverPos,
  setSignupConfirmed,
  sendConfidentialDetails,
  basicConfirmed,
  schoolConfirmed,
  contactConfirmed,
  credentials,
}) => {
  const ct = 0
  const history = useHistory()
  const signupCoverRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [signupInfo, setSignupInfo] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    identificationKey: '',
  })
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)
  const identificationKeyRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const infoRefList = [
    userNameRef,
    passwordRef,
    confirmPasswordRef,
    identificationKeyRef,
  ]
  const confidentials = {
    password: signupInfo.password,
    confirmPassword: signupInfo.confirmPassword,
    identificationKey: signupInfo.identificationKey,
  }
  useEffect(() => {
    getCoverList(signupList)
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
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          if (infoRef.current.value === '') {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          } else {
            infoRef.current.style.borderBottom = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            if (infoRef.current.name === 'identificationKey') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 4
              ) {
              } else {
                count--
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Kidly Enter a four digit number'
              }
            }
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
        if (infoRef.current.required) {
          infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          if (infoRef.current.value === '') {
          } else {
            if (infoRef.current.name === 'identificationKey') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 4
              ) {
                infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
              } else {
                count--
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Kidly Enter a four digit number'
              }
            }
            if (
              infoRef.current.name === 'confirmPassword' &&
              infoRef.current.value !== ''
            ) {
              if (
                passwordRef.current.value === confirmPasswordRef.current.value
              ) {
                confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                  'lightgreen'
                confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                  'Password Confirmed!'
              } else {
                confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                  'red'
                confirmPasswordRef.current.style.borderBottom = 'solid red 1px'
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
      passwordRef.current.value === confirmPasswordRef.current.value
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
        identificationKey: credentials.identificationKey,
      })
    }
  }, [])
  useEffect(() => {
    if (
      passwordRef.current.value.length > 0 &&
      confirmPasswordRef.current.value.length > 0
    ) {
      if (signupInfo.confirmPassword !== signupInfo.password) {
        confirmPasswordRef.current.style.borderBottom = 'solid red 1px'
        confirmPasswordRef.current.parentElement.childNodes[1].style.color =
          'red'
        confirmPasswordRef.current.style.borderBottom = 'solid red 1px'
        confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
          'Passwords Do Not Match!'
      } else {
        confirmPasswordRef.current.style.borderBottom = 'solid blue 1px'
        confirmPasswordRef.current.parentElement.childNodes[1].style.color =
          'lightgreen'
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
        if (pos === 0) {
          if (
            basicConfirmed.check === true &&
            schoolConfirmed.check === true &&
            contactConfirmed.check === true
          ) {
            history.push('./finish')
          }
          setPos(0)
        } else {
          setPos((pos) => {
            return pos + 1
          })
        }
      }
    }
    if (e.target.value === 'Prev') {
      if (pos === 0) {
        history.push('./contactInfo')
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
          } else {
            infoRef.current.parentElement.childNodes[1].innerHTML =
              infoRef.current.title
          }
          if (
            infoRef.current.name === 'confirmPassword' &&
            infoRef.current.value !== ''
          ) {
            if (
              passwordRef.current.value === confirmPasswordRef.current.value
            ) {
              confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                'lightgreen'
              confirmPasswordRef.current.parentElement.childNodes[1].innerHTML =
                'Password Confirmed!'
            } else {
              confirmPasswordRef.current.parentElement.childNodes[1].style.color =
                'red'
              confirmPasswordRef.current.style.borderBottom = 'solid red 1px'
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
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Finish >>'}
        </button>
      }
    </div>
  )
  const signupList = [
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={userNameRef}
          className='input'
          type='text'
          name='userName'
          placeholder='Enter Your Username'
          value={signupInfo.userName}
          required
          title='Enter Your Username'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={identificationKeyRef}
          className='input'
          type='password'
          name='identificationKey'
          placeholder='Enter a Four Digit Identification Key'
          value={signupInfo.identificationKey}
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, identificationKey: e.target.value })
          }}
          required
          title='Enter a Four Digit Identification Key'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={passwordRef}
          className='input'
          type='password'
          name='password'
          placeholder='Enter Your Password'
          value={signupInfo.password}
          required
          title='Enter Your Password'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={confirmPasswordRef}
          className='input'
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={signupInfo.confirmPassword}
          onChange={(e) => {
            setSignupInfo({ ...signupInfo, confirmPassword: e.target.value })
          }}
          required
          title='Confirm Password'
        />
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
  ]
  return (
    <div ref={signupCoverRef}>
      <div className='infotag'>Signup Info</div>
      {signupList[pos]}
    </div>
  )
}

export default SignupInfo
