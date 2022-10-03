import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import logo from './UI-logo.png'
const Navbar = ({ getTopBar }) => {
  const [showBorder, setShowBorder] = useState(false)
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const signupRef = useRef(null)

  const checkPageYOffset = () => {
    if (window.pageYOffset) {
      setShowBorder(true)
    } else {
      setShowBorder(false)
    }
  }
  useEffect(() => {
    getTopBar([homeRef, currentRef, eventRef, aboutRef, signupRef])
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', checkPageYOffset)
    return () => {
      window.removeEventListener('scroll', checkPageYOffset)
    }
  }, [])
  return (
    <>
      <div
        className='navbar'
        style={{ borderBottom: showBorder ? 'solid rgba(50,49,49,1) 4px' : '' }}
      >
        <div className='bar'>
          <li className='top-left'>
            <img src={logo} alt='logo' height='50px' />
            <div>NAPS UI</div>
          </li>
          <li>
            <Link to='/' className='top'>
              <label className='top' ref={homeRef} name='home'>
                Home
              </label>
            </Link>
          </li>
          <li>
            <Link to='/current' className='top'>
              <label className='top' ref={currentRef} name='current'>
                Current
              </label>
            </Link>
          </li>
          <li>
            <Link to='/events' className='top'>
              <label className='top' ref={eventRef} name='events'>
                Events
              </label>
            </Link>
          </li>
          <li>
            <Link to='/about' className='top'>
              <label className='top' ref={aboutRef} name='about'>
                About
              </label>
            </Link>
          </li>
          <Link className='top-right' to='/signin'>
            <label className='top' ref={signupRef} name='signup'>
              sign in
            </label>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
