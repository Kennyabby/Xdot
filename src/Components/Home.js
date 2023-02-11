import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import About from './About'
import Current from './Current'
import Events from './Events'
import ContextProvider from '../ContextProvider'

import vision from './vision.jpg'
import neural from './neural.jpg'
import roboai from './roboai.jpg'
import evolve from './evolve.jpg'
import complex from './complex.jpg'
import matrix from './matrix.jpg'
import right from './right.png'
import left from './left.png'

const Home = ({ bars, showNavbar, winSize, showNavOpt, setIsShow }) => {
  const [eventDimension, setEventDimension] = useState(null)
  const [aboutDimension, setAboutDimension] = useState(null)
  const [currentDimension, setCurrentDimension] = useState(null)
  const [scrollTop, setScrollTop] = useState(false)
  const [showRL, setShowRL] = useState(false)
  const [initialXOffset, setInitialXOffset] = useState(100)
  const [isShowSignup, setIsShowSignup] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)
  const [carousel, setCarousel] = useState([
    {
      title: 'Set Your Pace Rack',
      info: 'People do not learn in the same way, and do not learn in the same Pace, Everyone have different interests, yet are all thought in the same way. This Method is clearly not effective. We have provided an alternative that presents you with various options which are available in categories (Pace Racks). Pace Racks are designed to monitor your pace and improve it over time.',
      src: matrix,
      button: 'Set Your Pace Rack Now',
      buttonPath: '',
      show: false,
    },
    {
      title: 'Meet Your AI (Kabby)',
      info: 'As You preceed in your Learning and Goal orientated Objectives, get comfortable as you sit back and watch Kabby make your schedules and provide personal and experienced suggestions based on your activities and needs.',
      src: roboai,
      button: 'Get Familiar With Kabby',
      buttonPath: '',
      show: false,
    },
    {
      title: 'Space Walk 3',
      info: 'This term is reffered to as the event of being present in a region where the gravitaional force has no effect 3.',
      src: complex,
      button: 'Button 3',
      buttonPath: '',
      show: false,
    },
    {
      title: 'Space Walk 4',
      info: 'This term is reffered to as the event of being present in a region where the gravitaional force has no effect 4.',
      src: evolve,
      button: 'Button 4',
      buttonPath: '',
      show: false,
    },
    {
      title: 'Space Walk 5',
      info: 'This term is reffered to as the event of being present in a region where the gravitaional force has no effect 5.',
      src: neural,
      button: 'Button 5',
      buttonPath: '',
      show: false,
    },
  ])
  const [pos, setPos] = useState(0)
  const [touchEnd, setTouchEnd] = useState(null)
  const { id } = useParams()
  const refHome = useRef(null)
  const eventRef = useRef(null)
  const currentRef = useRef(null)
  const aboutRef = useRef(null)
  const history = useHistory()
  const { darkMode } = useContext(ContextProvider)
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
  const checkPageYOffset = () => {
    var yOffSet = window.pageYOffset
    if (yOffSet > 250) {
      setScrollTop(true)
    } else {
      setScrollTop(false)
    }
  }
  useEffect(() => {
    if (window.pageYOffset <= 250) {
      setScrollTop(false)
    }
  }, [window.pageYOffset])
  useEffect(() => {
    window.addEventListener('scroll', checkPageYOffset)
    return () => {
      window.removeEventListener('scroll', checkPageYOffset)
    }
  }, [])
  const updatePos = () => {
    const tId = setTimeout(() => {
      setPos((pos) => {
        return pos + 1
      })
    }, 25000)
    setTimeoutId(tId)
  }
  useEffect(() => {
    setCarousel((carousel) => {
      carousel.forEach((csl, i) => {
        const index = pos % carousel.length
        if (i === index) {
          csl.show = true
        } else {
          csl.show = false
        }
      })
      return [...carousel]
    })
    clearTimeout(timeoutId)
    updatePos()
    setInitialXOffset(100)
  }, [pos])

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
  }, [id, winSize])
  useEffect(() => {
    setIsShowSignup(false)
    if (eventDimension != null) {
      bars.map((bar) => {
        if (bar.current !== null) {
          bar.current.style.color = darkMode
            ? 'rgb(187, 183, 183)'
            : 'rgba(120, 125, 125)'
          if (bar.current.getAttribute('name') === id) {
            console.log(bar.current.getAttribute('name'))
            bar.current.style.color = darkMode ? 'white' : 'black'
            bar.current.style.fontWeight = 'bold'
          }
          if (id === undefined && bar.current.getAttribute('name') === 'home') {
            bar.current.style.color = darkMode ? 'white' : 'black'
            bar.current.style.fontWeight = 'bold'
          }
        }
      })
    }

    if (id === 'offers') {
      // window.scrollTo(eventDimension.x, eventDimension.y - 30, {
      //   behavior: 'smooth',
      // })
      eventRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'services') {
      // window.scrollTo(currentDimension.x, currentDimension.y - 30)
      currentRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'about') {
      // window.scrollTo(aboutDimension.x, aboutDimension.y - 30)
      aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (id === undefined) {
      refHome.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, bars])
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
        <div
          className='home'
          ref={refHome}
          style={{
            backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
          }}
        >
          <AnimatePresence>
            {scrollTop && (
              <motion.div
                initial={{ x: '100vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                exit={{
                  x: '100vw',
                  opacity: 0,
                  transition: { duration: 1, ease: 'easeIn' },
                }}
                style={{
                  position: 'fixed',
                  right: '20px',
                  bottom: '50px',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,255,0.8)',
                  zIndex: '1',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/')
                  refHome.current.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <FaChevronUp />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            style={{
              fontSize: '.8rem',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: darkMode
                ? 'rgba(29,29,30,0.8)'
                : 'rgba(240,240,241,0.8)',
              color: darkMode ? 'white' : 'black',
              margin: winSize <= 700 ? '30px' : '30px auto',
              marginTop: winSize <= 700 ? '75px' : '145px',
            }}
          >
            Connect, Meet New People, Set Goals, Develop Your Self and Skills,
            Build Your Vision.
          </div>
          <div
            style={{
              position: 'relative',
              backgroundColor: darkMode
                ? 'rgba(6,6,6,1)'
                : 'rgba(249,249,249,1)',
              color: darkMode ? 'white' : 'black',
              height: winSize <= 700 ? 'fit-content' : '70vh',
              margin: '0px',
              padding: '0px',
              width: '100vw',
              overflowX: 'auto',
              display: 'inline-flex',
            }}
          >
            {carousel.map((csl, i) => {
              return (
                <AnimatePresence exitBeforeEnter key={i}>
                  {csl.show && (
                    <motion.div
                      key={i}
                      style={{
                        display: 'flex',
                        width: '100vw',
                        height: '100%',
                        margin: '0px',
                        marginBottom: '0px',
                        padding: '0px',
                        backgroundColor: darkMode
                          ? 'rgba(0,0,0,1)'
                          : 'rgba(255,255,255,1)',
                        flexWrap: winSize < 700 ? 'wrap' : 'nowrap',
                      }}
                      initial={{ x: String(initialXOffset) + 'vw', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      exit={{
                        x: String(-initialXOffset) + 'vw',
                        opacity: 0,
                        transition: { duration: 1, ease: 'easeIn' },
                      }}
                    >
                      <div
                        style={{
                          width: winSize < 700 ? '100%' : '30%',
                          margin: '20px',
                          color: darkMode ? 'white' : 'black',
                          overflowY: 'auto',
                        }}
                      >
                        <motion.h2
                          initial={{ x: '10vw' }}
                          animate={{ x: 0 }}
                          transition={{
                            delay: 0.7,
                            duration: 1,
                            ease: 'easeOut',
                          }}
                        >
                          {csl.title}
                        </motion.h2>
                        <div
                          style={{
                            fontFamily: 'Courier New',
                            fontStyle: 'italic',
                            fontSize: winSize < 700 ? '' : '1rem',
                            backgroundColor: darkMode
                              ? 'rgba(10,10,10,1)'
                              : 'whitesmoke',
                            padding: '10px',
                            borderRadius: '10px',
                          }}
                        >
                          {csl.info}
                        </div>
                        <div>
                          <button
                            style={{
                              margin: '20px auto',
                              marginBottom: '0px',
                              padding: '10px 15px',
                              borderRadius: '10px',
                              border: 'solid red 2px',
                              color: 'white',
                              backgroundColor: 'red',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              fontFamily: 'monospace',
                            }}
                          >
                            {csl.button}
                          </button>
                        </div>
                      </div>
                      {winSize < 700 ? (
                        <LazyLoadImage
                          src={csl.src}
                          style={{
                            height: '100%',
                            width: '100%',
                            margin: '0px',
                            padding: '0px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                          }}
                          effect='blur'
                        />
                      ) : (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            margin: '0px',
                            padding: '0px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backgroundImage: `url(${csl.src})`,
                            backgroundSize: 'cover',
                          }}
                          onMouseEnter={() => {
                            setShowRL(true)
                          }}
                          onMouseLeave={() => {
                            setShowRL(false)
                          }}
                        >
                          <AnimatePresence>
                            {showRL && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{
                                  opacity: 0,
                                  transition: { duration: 0.5 },
                                }}
                                style={{ fontSize: '2.2rem' }}
                              >
                                <FaChevronLeft
                                  style={{
                                    position: 'absolute',
                                    left: '30px',
                                    top: '40%',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                  }}
                                  onClick={() => {
                                    setInitialXOffset(-100)
                                    setPos((pos) => {
                                      if (pos > 0) {
                                        return pos - 1
                                      } else {
                                        return 4
                                      }
                                    })
                                  }}
                                />
                                <FaChevronRight
                                  style={{
                                    position: 'absolute',
                                    right: '30px',
                                    top: '40%',
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                  }}
                                  onClick={() => {
                                    setPos((pos) => {
                                      return pos + 1
                                    })
                                  }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            })}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                bottom: '0px',
                left: '0px',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  width: '200px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  padding: '10px',
                  margin: '10px auto',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {carousel.map((csl, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        padding: '7px',
                        borderRadius: '50%',
                        backgroundColor:
                          pos % carousel.length === i ? 'white' : 'black',
                        margin: 'auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (i < pos % carousel.length) {
                          setInitialXOffset(-100)
                        } else {
                          setInitialXOffset(100)
                        }
                        setPos(() => {
                          return i
                        })
                      }}
                    ></div>
                  )
                })}
              </div>
            </div>
          </div>

          <motion.div
            className='info'
            style={{ marginTop: '10px', color: darkMode ? 'white' : 'black' }}
            variants={infoVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.h2 variants={noticeVariants}>For You</motion.h2>
            <p>
              {
                'Evolvle and Grow with Encart oO Tech. Categorize your Chain of Thoughts, Learn at your Pace, Meet like Minds, Build your Vision and Own your Future.'
              }
            </p>
            <p>
              {
                'Contribute to the network by joining and profiling your worth and talents for the world to see.'
              }
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
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div
            className='homep'
            style={{ backgroundColor: darkMode ? 'black' : 'white' }}
          >
            <motion.div
              className='info'
              style={{ color: darkMode ? 'white' : 'black' }}
              variants={infoVariants}
              initial='hidden'
              animate='visible'
            >
              <div style={{ display: 'flex' }}>
                <motion.h2 variants={noticeVariants}>CONNECT</motion.h2>
                <div
                  style={{
                    marginLeft: 'auto',
                    marginTop: '40px',
                    width: '110px',
                    height: '5px',
                    borderBottom: darkMode
                      ? 'solid white 2px'
                      : 'solid black 2px',
                  }}
                ></div>
              </div>
              <p>
                {
                  'Meet and interact with like minds by choosing your preffered Clusters.'
                }
              </p>
              <p>
                {
                  'Engage in life changing challenges and meet new people. Create a Network.'
                }
              </p>
              <p>
                Key Words: <b>Clusters</b>, <b>Network</b>
              </p>
            </motion.div>
            <div className='sitewall'>
              <LazyLoadImage src={neural} effect='blur' className='homepimg' />
            </div>
          </div>
          <div
            className='homep hreverse'
            style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            <div className='sitewall'>
              <LazyLoadImage src={vision} effect='blur' className='homepimg' />
            </div>
            <motion.div
              className='info'
              style={{ marginTop: '10px', color: darkMode ? 'white' : 'black' }}
              variants={infoVariants}
              initial='hidden'
              animate='visible'
            >
              <div style={{ display: 'flex' }}>
                <motion.h2 variants={noticeVariants}>YOUR VISION</motion.h2>
                <div
                  style={{
                    marginLeft: 'auto',
                    marginTop: '40px',
                    width: '110px',
                    height: '5px',
                    borderBottom: darkMode
                      ? 'solid white 2px'
                      : 'solid black 2px',
                  }}
                ></div>
              </div>
              <p>
                {
                  'Profile your worth and talents, Learn at your own pace and Build a Vision.'
                }
              </p>
              <p>{'Unlock Your Pace Racks as you build on your abilities.'}</p>
              <p>
                Key Words: <b>Profile</b>, <b>Pace Racks</b>
              </p>
            </motion.div>
          </div>
          <div
            className='homep'
            style={{ backgroundColor: darkMode ? 'black' : 'white' }}
          >
            <motion.div
              className='info'
              variants={infoVariants}
              style={{ color: darkMode ? 'white' : 'black' }}
              initial='hidden'
              animate='visible'
            >
              <div style={{ display: 'flex' }}>
                <motion.h2 variants={noticeVariants}>YOUR AI</motion.h2>
                <div
                  style={{
                    marginLeft: 'auto',
                    marginTop: '40px',
                    width: '110px',
                    height: '5px',
                    borderBottom: darkMode
                      ? 'solid white 2px'
                      : 'solid black 2px',
                  }}
                ></div>
              </div>
              <p>
                {
                  'Interactive, AI improved personal assistant and chat bot available just for you.'
                }
              </p>
              <p>
                {
                  'Get Comfortable as you sit back and watch Kabby make your schedules and provide personal and experienced suggestions based on your activities and needs.'
                }
              </p>
              <p>
                Key Words: <b>Kabby</b>
              </p>
            </motion.div>
            <div className='sitewall'>
              <LazyLoadImage src={roboai} effect='blur' className='homepimg' />
            </div>
          </div>
          <div
            className='homep hreverse'
            style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            <div className='sitewall'>
              <LazyLoadImage src={evolve} effect='blur' className='homepimg' />
            </div>
            <motion.div
              className='info'
              style={{ marginTop: '10px', color: darkMode ? 'white' : 'black' }}
              variants={infoVariants}
              initial='hidden'
              animate='visible'
            >
              <div style={{ display: 'flex' }}>
                <motion.h2 variants={noticeVariants}>EVOLVE</motion.h2>
                <div
                  style={{
                    marginLeft: 'auto',
                    marginTop: '40px',
                    width: '110px',
                    height: '5px',
                    borderBottom: darkMode
                      ? 'solid white 2px'
                      : 'solid black 2px',
                  }}
                ></div>
              </div>
              <p>
                {
                  'Set Goals inline with your passion, complete the Graded Challenges and showcase your talents.'
                }
              </p>
              <p>{'Evolve as you learn at your own pace.'}</p>
              <p>
                Key Words: <b>Graded Challenges</b>
              </p>
            </motion.div>
          </div>
        </div>
        <Events
          // setRef={(ref) => {
          //   setEventDimension(ref.current.getBoundingClientRect())
          // }}
          eventRef={eventRef}
        />
        <Current
          // setRef={(ref) => {
          //   setCurrentDimension(ref.current.getBoundingClientRect())
          // }}
          currentRef={currentRef}
        />
        <About aboutRef={aboutRef} />
      </div>
    </>
  )
}

export default Home
