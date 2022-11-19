import { React, useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GoogleLogin } from 'react-google-login'
import ConnectionModal from '../Components/ConnectionModal'

import usrImg from './usrImg.png'
import viewImg from './view.jpg'
import noViewImg from './noview.png'
import signinwall from './signin-wall.jpg'

const Signin = ({ showNavbar, showNavOpt, sendId, server }) => {
  const [fields, setFields] = useState({
    matricNo: '',
    password: '',
    id: '',
  })
  // const [GOOGLE_CLIENT_ID, setGoogleId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const [view, setView] = useState(true)
  const [noView, setNoView] = useState(false)
  const [passValidated, setPassValidated] = useState(false)
  const [passType, setPassType] = useState('password')
  const [signView, setSignView] = useState('Sign in')
  const [error, setError] = useState('')
  const matricNoRef = useRef(null)
  const passwordRef = useRef(null)
  const submitRef = useRef(null)
  useEffect(() => {
    showNavbar(false)
    showNavOpt(false)
  })
  useEffect(async () => {
    if (window.sessionStorage.getItem('user-id') !== null) {
      history.push('./dashboard')
    }
    // const opts1 = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }

    // try {
    //   const resp = await fetch(server + '/get_google_id', opts1)
    //   const response = await resp.json()
    //   setGoogleId(response.google_id)
    // } catch (error) {
    //   setErrorMessage(
    //     'A problem was encountered while trying to load page content. Kindly check if you are still connected to the internet.'
    //   )
    //   setShowModal(true)
    // }
  }, [])
  useEffect(() => {
    if (passValidated) {
      var idVal = fields.id
      sendId(idVal)
      var now = Date.now()
      setFields((fields) => {
        return { ...fields, matricNo: '', password: '', id: '' }
      })
      var sess = 0
      idVal.split('').forEach((elem) => {
        sess += elem.codePointAt(0)
      })
      window.sessionStorage.setItem('sess-recg-id', now * sess)
      window.sessionStorage.setItem('idt-curr-usr', now)
      window.sessionStorage.setItem('user-id', idVal)
      history.push('./dashboard')
      setPassValidated(false)
    }
  }, [passValidated])
  const handleInput = (e) => {
    const name = e.target.getAttribute('name')
    setFields((fields) => {
      return { ...fields, [name]: e.target.value }
    })
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignin()
    }
  }
  const handleFocus = (e) => {
    const name = e.target.getAttribute('name')
    matricNoRef.current.style.borderBottom = 'solid black 1px'
    passwordRef.current.style.borderBottom = 'solid black 1px'
    matricNoRef.current.parentElement.childNodes[1].style.color = 'lightgreen'
    passwordRef.current.parentElement.childNodes[1].style.color = 'lightgreen'
    passwordRef.current.parentElement.childNodes[1].style.display = 'none'
    matricNoRef.current.parentElement.childNodes[1].style.display = 'none'
    if (name === 'password') {
      passwordRef.current.style.borderBottom = 'solid lightgreen 2px'
      passwordRef.current.parentElement.childNodes[1].style.display = 'block'
      passwordRef.current.parentElement.childNodes[1].innerHTML =
        passwordRef.current.title
    } else if (name === 'matricNo') {
      matricNoRef.current.style.borderBottom = 'solid lightgreen 2px'
      matricNoRef.current.parentElement.childNodes[1].style.display = 'block'
      matricNoRef.current.parentElement.childNodes[1].innerHTML =
        matricNoRef.current.title
    }
  }
  const handleView = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'view') {
      setView(false)
      setNoView(true)
      setPassType('text')
    } else if (name === 'noView') {
      setView(true)
      setNoView(false)
      setPassType('password')
    }
  }
  const validateInput = async () => {
    const opts1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prop: { matricNo: fields.matricNo },
        pass: fields.password,
      }),
    }

    try {
      const resp = await fetch(server + '/getpassList', opts1)
      const response = await resp.json()
      const idVal = await response.id
      setFields((fields) => {
        return { ...fields, id: idVal }
      })
      const valid = await response.confirmed
      if (valid) {
        setSignView('Signin in...')
        setPassValidated(true)
      } else {
        setPassValidated(false)
        setError('Unrecognized Matric No or Invalid Password!')
        setSignView('Sign in')
      }
      setSignView('hold on...')
    } catch (error) {
      setErrorMessage(
        'A problem was encountered while trying to validate your log in details. Kindly check if you are still connected to the internet.'
      )
      setShowModal(true)
    }
  }
  const handleSignin = () => {
    setSignView('hold on...')
    submitRef.current.focus()
    setError('')
    matricNoRef.current.parentElement.childNodes[1].style.display = 'none'
    passwordRef.current.parentElement.childNodes[1].style.display = 'none'
    matricNoRef.current.style.borderBottom = 'solid black 1px'
    passwordRef.current.style.borderBottom = 'solid black 1px'
    if (fields.password === '') {
      passwordRef.current.style.borderBottom = 'solid red 2px'
      passwordRef.current.parentElement.childNodes[1].style.color = 'red'
      passwordRef.current.parentElement.childNodes[1].style.display = 'block'
      passwordRef.current.parentElement.childNodes[1].innerHTML =
        'Please Enter This Field!'
      setSignView('Sign in')
    }
    if (fields.matricNo === '') {
      matricNoRef.current.style.borderBottom = 'solid red 2px'
      matricNoRef.current.parentElement.childNodes[1].style.color = 'red'
      matricNoRef.current.parentElement.childNodes[1].style.display = 'block'
      matricNoRef.current.parentElement.childNodes[1].innerHTML =
        'Please Enter This Field!'
      setSignView('Sign in')
    }
    if (fields.matricNo !== '' && fields.password !== '') {
      validateInput()
    }
  }
  const handleGoogleSuccess = async (googleData) => {
    setSignView('hold on...')
    const res = await fetch('/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    const user = data.user
    const res1 = await fetch('/isEmailPresent', {
      method: 'POST',
      body: JSON.stringify({
        schoolEmail: user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resp = await res1.json()
    const isPresent = resp.isPresent
    if (isPresent) {
      const user_id = resp.id
      setSignView('Signin in...')
      setFields((fields) => {
        return { ...fields, id: user_id }
      })
      setPassValidated(true)
    } else {
      setPassValidated(false)
      setError('This Email is not Authorized, Use Registered School Email!')
      setTimeout(() => {
        setError('')
      }, 5000)
      setSignView('Sign in')
    }
  }
  const handleGoogleFailure = async () => {
    setPassValidated(false)
    setError('No Email To Validate!')
    setTimeout(() => {
      setError('')
    }, 5000)
    setSignView('Sign in')
  }
  return (
    <>
      <div className='signin'>
        {showModal && (
          <ConnectionModal
            title='Ooops... Connection Error'
            message={errorMessage}
            multiple={true}
            button1='Ok'
            button2='Retry'
            func1={() => {
              setShowModal(false)
              setSignView('Sign in')
            }}
            func2={() => {
              setShowModal(false)
              handleSignin()
            }}
          />
        )}
        <div className='signinregion'>
          <div className='signincov'>
            <div
              className='signinCover'
              onChange={handleInput}
              onFocus={handleFocus}
            >
              <motion.p
                initial={{ y: '-100vh' }}
                animate={{ y: 0 }}
                transition={{ ease: 'easeOut', duration: 0.7 }}
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.6rem',
                  fontFamily: 'Courier New',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/')
                }}
              >
                NAPS UI
              </motion.p>
              <img
                className='usr'
                src={usrImg}
                alt='profImg'
                height='120px'
                width='120px'
              />
              <div className='signover' style={{ padding: '13px' }}>
                <input
                  ref={matricNoRef}
                  className='signinfield'
                  type='number'
                  name='matricNo'
                  placeholder='Enter Your Matric No'
                  title='Enter Your Matric No'
                  defaultValue={fields.matricNo}
                  required
                />
                <p className='inputStyle'></p>
                <img
                  style={{ marginLeft: '10px' }}
                  src={usrImg}
                  name='userMatric'
                  alt='user matric'
                  height='25px'
                />
              </div>
              <div className='signover' style={{ padding: '13px' }}>
                <input
                  ref={passwordRef}
                  className='signinfield'
                  type={passType}
                  name='password'
                  placeholder='Enter Password'
                  title='Enter Password'
                  defaultValue={fields.password}
                  onKeyUp={handleKeyPress}
                  required
                />
                <p className='inputStyle'></p>
                {view && (
                  <img
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    title='show password'
                    src={viewImg}
                    name='view'
                    alt='view'
                    height='25px'
                    onClick={handleView}
                  />
                )}
                {noView && (
                  <img
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    title='hide password'
                    src={noViewImg}
                    name='noView'
                    alt='no view'
                    height='25px'
                    onClick={handleView}
                  />
                )}
              </div>
            </div>
            <p style={{ color: 'red', fontStyle: 'italic' }}>{error}</p>
            <p
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                fontStyle: 'italic',
              }}
            >
              <Link style={{ color: 'black', fontSize: '0.9rem' }} to='/help'>
                Forgot Password?
              </Link>
            </p>
            <GoogleLogin
              clientId='30205901409-culi5qq2f0mfq7jbhcro85279idkh3ns.apps.googleusercontent.com'
              buttonText='Sign in with Google'
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={'single_host_origin'}
            />

            <p>
              <button
                ref={submitRef}
                className='nxt'
                style={{
                  padding: '15px 100px',
                  backgroundColor: 'white',
                  color: 'blue',
                  border: 'solid blue 1px',
                  marginTop: '30px',
                  fontSize: '1rem',
                }}
                name='button'
                title='Sign in'
                onClick={handleSignin}
              >
                {signView}
              </button>
            </p>
          </div>
          <div className='signinside'>
            <LazyLoadImage
              src={signinwall}
              effect='blur'
              style={{ width: '100%', height: '100vh' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
