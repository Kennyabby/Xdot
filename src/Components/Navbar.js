import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ getTopBar }) => {
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const signupRef = useRef(null)
  useEffect(() => {
    getTopBar([homeRef, currentRef, eventRef, aboutRef, signupRef])
  }, [])
  return (
    <>
      <div className='navbar'>
        <ul className='bar'>
          <li className='top-left'>
            <div>NAPS UI</div>
          </li>
          <li>
            <Link to='/'>
              <label className='top' ref={homeRef} name='home'>
                Home
              </label>
            </Link>
          </li>
          <li>
            <Link to='/current'>
              <label className='top' ref={currentRef} name='current'>
                Current
              </label>
            </Link>
          </li>
          <li>
            <Link to='/events'>
              <label className='top' ref={eventRef} name='events'>
                Events
              </label>
            </Link>
          </li>
          <li>
            <Link to='/about'>
              <label className='top' ref={aboutRef} name='about'>
                About
              </label>
            </Link>
          </li>
          <li>
            <Link className='top' to='/signin'>
              <div className='top-right'>
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

export default Navbar
