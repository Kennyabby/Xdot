import { React, useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import cancel from './cancel.png'
import menu from './menu.png'

const NavOptbar = ({ getTopBar }) => {
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const signupRef = useRef(null)
  const [show, setShow] = useState(true)
  useEffect(() => {
    getTopBar([homeRef, currentRef, eventRef, aboutRef, signupRef])
  }, [])
  const showBar = () => {
    if (show) {
      setShow(false)
    }
  }
  const cancelClick = () => {
    if (show === false) {
      setShow(true)
    }
  }
  if (show === true) {
    return (
      <>
        <div
          style={{ position: 'fixed', top: '3px', left: '3px' }}
          onClick={showBar}
        >
          <img src={menu} alt='menu' height='25px' />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='opt-navbar'>
          <div
            style={{
              position: 'fixed',
              top: '3px',
              left: '3px',
              cursor: 'pointer',
            }}
            onClick={cancelClick}
          >
            <img src={cancel} height='25px' alt='cancel' />
          </div>
          <ul className='opt-bar'>
            <li className='top-left-opt'>
              <div>NAPS-UI</div>
            </li>
            <li>
              <Link to='/'>
                <label className='opt-left' ref={homeRef} name='home'>
                  Home
                </label>
              </Link>
            </li>
            <li>
              <Link to='/current'>
                <label className='opt-left' ref={currentRef} name='current'>
                  Current
                </label>
              </Link>
            </li>
            <li>
              <Link to='/events'>
                <label className='opt-left' ref={eventRef} name='events'>
                  Events
                </label>
              </Link>
            </li>
            <li>
              <Link to='/about'>
                <label className='opt-left' ref={aboutRef} name='about'>
                  About
                </label>
              </Link>
            </li>
            <li>
              <Link className='opt-left' to='/signin'>
                <div className='top'>
                  <label className='top' ref={signupRef} name='signup'>
                    sign in
                  </label>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

export default NavOptbar
