import { React, useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import menu from './menu.png'
import logo from './UI-logo.png'
const NavOptbar = ({ getTopBar, isShow, setBackShow }) => {
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const signupRef = useRef(null)
  const [show, setShow] = useState(isShow)
  const [xOffset, setXOffset] = useState(0)
  const [showBorder, setShowBorder] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50
  const optVariants = {
    hidden: {
      x: '-100vw',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      type: 'spring',
      transition: {
        duration: 0.4,
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
    if (!isShow) {
      setShow(isShow)
    }
  }, [isShow])
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

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientX
    var distance = currentTouch - touchStart
    if (distance <= 0) {
      setXOffset(distance)
    }
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      if (isLeftSwipe) {
        setShow(true)
        setBackShow(true)
        setTimeout(() => {
          setXOffset(0)
        }, 500)
      } else {
        setXOffset(0)
      }
    }
  }
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {show && (
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
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {!show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
            className='opt-navbar'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.ul
              variants={optVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='opt-bar'
              style={{ position: 'absolute', left: String(xOffset) + 'px' }}
            >
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
            </motion.ul>
            <div
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                setShow(true)
                setBackShow(true)
              }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavOptbar
