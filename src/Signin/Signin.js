import { React, useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import usrImg from './usrImg.png'
import viewImg from './view.jpg'
import noViewImg from './noview.png'

const Signin = ({ showNavbar, showNavOpt, sendId }) => {
  const [fields, setFields] = useState({
    matricNo: '',
    password: '',
    id: '',
  })
  const history = useHistory()
  const [view, setView] = useState(true)
  const [noView, setNoView] = useState(false)
  const [passValidated, setPassValidated] = useState(false)
  const [passType, setPassType] = useState('password')
  const [signView, setSignView] = useState('Sign in')
  const [error, setError] = useState('')
  const matricNoRef = useRef(null)
  const passwordRef = useRef(null)
  useEffect(() => {
    showNavbar(false)
    showNavOpt(false)
  })
  useEffect(() => {
    if (passValidated) {
      var idVal = fields.id
      var matric = fields.matricNo
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
      window.sessionStorage.setItem('user-id', matric)
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
    matricNoRef.current.style.borderBottom = 'solid white 1px'
    passwordRef.current.style.borderBottom = 'solid white 1px'
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
  const validateInput = () => {
    const opts1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricNo: fields.matricNo }),
    }

    fetch('https://napsuiserver.herokuapp.com/getpassList', opts1).then(async (resp) => {
      const response = await resp.json()
      const idVal = await response.id

      setFields((fields) => {
        return { ...fields, id: idVal }
      })
      const passVal = await response.password
      if (passVal.length !== 0 && passVal.trim() === fields.password) {
        setSignView('Signin in...')
        setPassValidated(true)
      } else {
        setPassValidated(false)
        setError('Unrecognized Matric No or Invalid Password!')
        setSignView('Sign in')
      }
    })
    setSignView('hold on...')
  }
  const handleSignin = () => {
    setSignView('hold on...')
    setError('')
    matricNoRef.current.parentElement.childNodes[1].style.display = 'none'
    passwordRef.current.parentElement.childNodes[1].style.display = 'none'
    matricNoRef.current.style.borderBottom = 'solid white 1px'
    passwordRef.current.style.borderBottom = 'solid white 1px'
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
  return (
    <>
      <div className='signin'>
        <div
          className='signinCover'
          onChange={handleInput}
          onFocus={handleFocus}
        >
          <p style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>NAPS-UI</p>
          <img
            className='usr'
            src={usrImg}
            alt='profImg'
            height='100px'
            width='120px'
          />
          <div className='signover' style={{ padding: '13px' }}>
            <input
              ref={matricNoRef}
              className='signinfield'
              type='text'
              name='matricNo'
              placeholder='Enter Your Matric No'
              title='Enter Your Matric No'
              defaultValue={fields.matricNo}
              required
            />
            <p className='inputStyle'></p>
            <img
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
                style={{ cursor: 'pointer' }}
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
                style={{ cursor: 'pointer' }}
                title='hide password'
                src={noViewImg}
                name='noView'
                alt='no view'
                height='25px'
                onClick={handleView}
              />
            )}
          </div>
          <p style={{ color: 'red', fontStyle: 'italic' }}>{error}</p>
        </div>
        <p
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontStyle: 'italic',
          }}
        >
          <Link style={{ color: 'white' }} to='/help'>
            Forgot Password?
          </Link>
        </p>
        <div style={{ display: 'inline-block' }}>
          <p
            style={{
              fontWeight: 'bold',
              color: 'blue',
              fontStyle: 'italic',
              cursor: 'pointer',
            }}
          >
            Sign in with Google
          </p>
        </div>
        <p>
          <button
            className='nxt'
            style={{ paddingLeft: '120px', paddingRight: '120px' }}
            name='button'
            title='Sign in'
            onClick={handleSignin}
          >
            {signView}
          </button>
        </p>
      </div>
    </>
  )
}

export default Signin
