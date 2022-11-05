import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from 'framer-motion'

import About from './About'
import Current from './Current'
import Events from './Events'
import Signup from './Signup'

import sitewall from './site-wall.png'

const Home = ({ bars, showNavbar, winSize, showNavOpt, setIsShow }) => {
  const [eventDimension, setEventDimension] = useState(null)
  const [aboutDimension, setAboutDimension] = useState(null)
  const [currentDimension, setCurrentDimension] = useState(null)
  const [isShowSignup, setIsShowSignup] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const { id } = useParams()
  const refHome = useRef(null)
  const history = useHistory()
  const minSwipeDistance = 50
  const refAbout = (ref) => {
    const dimension = ref.current.getBoundingClientRect()
    setAboutDimension(dimension)
  }
  const infoVariants = {
    hidden: {
      x: '100vw',
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.5,
        when: 'beforeChildren',
        ease: 'easeIn',
      },
    },
  }
  const noticeVariants = {
    hidden: {
      x: 50,
    },
    visible: {
      x: 0,
      type: 'spring',
      stiffness: 120,
      transition: {
        // ease: 'easeIn',
      },
    },
  }
  useEffect(() => {
    if (id === undefined) {
      if (winSize <= 700) {
        showNavbar(false)
        showNavOpt(true)
      } else {
        showNavbar(true)
        showNavOpt(false)
      }
    } else {
      if (id !== 'signup') {
        if (winSize <= 700) {
          showNavbar(false)
          showNavOpt(true)
        } else {
          showNavbar(true)
          showNavOpt(false)
        }
      }
    }
  }, [id])
  useEffect(() => {
    setIsShowSignup(false)
    if (eventDimension != null) {
      bars.map((bar) => {
        if (bar.current !== null) {
          bar.current.style.color = 'rgb(187, 183, 183)'
          if (bar.current.getAttribute('name') === id) {
            bar.current.style.color = 'white'
          }
          if (id === undefined && bar.current.getAttribute('name') === 'home') {
            bar.current.style.color = 'white'
          }
        }
      })
    }

    window.scrollTo(0, 0)
    if (id === 'events' && eventDimension != null) {
      window.scrollTo(eventDimension.x, eventDimension.y - 30)
    } else if (id === 'current' && currentDimension != null) {
      window.scrollTo(currentDimension.x, currentDimension.y - 30)
    } else if (id === 'about' && aboutDimension != null) {
      window.scrollTo(aboutDimension.x, aboutDimension.y - 30)
    }
    if (id === 'signup') {
      showNavbar(false)
      setIsShowSignup(true)
    }
  }, [id])
  const onTouchStart = (e) => {
    setTouchEnd(null)
    const firstTouch = e.targetTouches[0].clientX
    setTouchStart(firstTouch)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientX
    var distance = currentTouch - touchStart
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      const isRightSwipe = distance < -minSwipeDistance
      if (isRightSwipe && touchStart < 50) {
        setIsShow(false)
      }
    }
  }
  return (
    <>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        <div className='home' ref={refHome}>
          <div className='sitewall'>
            <LazyLoadImage
              src={sitewall}
              effect='blur'
              style={{ width: '100%' }}
            />
          </div>
          <motion.div
            className='info'
            variants={infoVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.h2 variants={noticeVariants}>Notice</motion.h2>
            <p>
              This page is strictly for members of the National Association of
              Physics Students University of Ibadan Division <b>(NAPS UI)</b>,
              as only members can access its priviledges. The Registration
              process requires that all members provide their University of
              Ibadan student <b>MATRIC NUMBER</b>. Click the button below to
              proceed.
            </p>
            <div
              style={{
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Link style={{ margin: 'atuo' }} to='/signup'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ yoyo: 10 }}
                  className='signup'
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Events
          setRef={(ref) => {
            setEventDimension(ref.current.getBoundingClientRect())
          }}
        />
        <Current
          setRef={(ref) => {
            setCurrentDimension(ref.current.getBoundingClientRect())
          }}
        />
        <About setRef={refAbout} />
      </div>
      {isShowSignup ? (
        <Signup
          setShowSignup={() => {
            setIsShowSignup(false)
          }}
        />
      ) : undefined}
    </>
  )
}

export default Home
