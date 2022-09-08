import { React, useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import cancel from './cancel.png'
import menu from './menu.png'
import logo from './UI-logo.png'
const NavOptbar = ({ getTopBar }) => {
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const signupRef = useRef(null)
  const [show, setShow] = useState(true)
  const [showBorder, setShowBorder] = useState(false)
  const optVariants = {
    hidden: {
      x: '-100vw',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      type: 'spring',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }
  const optsVariants = {
    hidden: {
      y: '-100vw',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      type: 'spring',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }
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
        <AnimatePresence exitBeforeEnter>
          <motion.div
            variants={optsVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            style={{
              backgroundColor: showBorder ? 'rgba(50, 49, 49, 0.95)' : '',
              borderBottom: showBorder ? 'solid black 2px' : '',
              width: '100vw',
              position: 'fixed',
              zIndex: '1',
              top: '0px',
              left: '0px',
              borderBottomLeftRadius: '30px',
              borderBottomRightRadius: '30px',
            }}
          >
            <div
              style={{
                padding: '15px',
                display: 'flex',
                justifyContent: 'center',
                width: '90%',
              }}
            >
              <div style={{ display: 'flex', gap: '20px' }}>
                <img src={logo} alt='logo' height='45px' />
                <label
                  style={{
                    fontFamily: 'Courier New',
                    fontSize: '1.5rem',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  NAPS UI
                </label>
              </div>

              <div
                style={{
                  width: 'fit-content',
                  marginLeft: 'auto',
                }}
                onClick={showBar}
              >
                <img src={menu} alt='menu' height='20px' />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </>
    )
  } else {
    return (
      <AnimatePresence exitBeforeEnter>
        <>
          <div
            style={{
              position: 'fixed',
              top: '10px',
              right: '25px',
              cursor: 'pointer',
              padding: '2px',
              borderRadius: '10px',
              backgroundColor: 'rgba(60,60,60)',
              border: 'solid rgba(20,19,19,1) 3px',
            }}
            onClick={cancelClick}
          >
            <img src={cancel} height='20px' alt='cancel' />
          </div>

          <motion.div
            variants={optVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='opt-navbar'
          >
            <ul className='opt-bar'>
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
                      Sign in
                    </label>
                  </div>
                </Link>
              </li>
            </ul>
          </motion.div>
        </>
      </AnimatePresence>
    )
  }
}

export default NavOptbar
