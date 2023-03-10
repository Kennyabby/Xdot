import { React, useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaTimes, FaSearch, FaBars, FaMoon, FaSun } from 'react-icons/fa'
import ContextProvider from '../ContextProvider'
import userimg from './profile.png'
import paceup from './paceup.png'
const NavOptbar = ({ getTopBar, isShow, setBackShow, setShowNavOpt }) => {
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const history = useHistory(null)
  const [show, setShow] = useState(isShow)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState({})
  const [userImgUrl, setUserImgUrl] = useState(userimg)
  const [logoutStatus, setLogoutStatus] = useState('Log out')
  const [showSearch, setShowSearch] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const [showBorder, setShowBorder] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50
  const { darkMode, setDarkMode, server } = useContext(ContextProvider)
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
  const fetchUserAPI = async ({ data, req }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      const resp = await fetch(server + '/' + req, opts)
      const response = await resp.json()
      if (response.user === null) {
        window.localStorage.removeItem('sess-recg-id')
        window.localStorage.removeItem('idt-curr-usr')
        window.localStorage.removeItem('user-id')
      } else {
        const user = response.user
        setUser(user)
        const opts1 = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imgUrl: user.img, userName: user.userName }),
        }
        const resp1 = await fetch(server + '/getImgUrl', opts1)
        const response1 = await resp1.json()
        const url = response1.url
        setUserImgUrl(url)
      }
    } catch (TypeError) {}
  }
  useEffect(() => {
    const uid = window.localStorage.getItem('user-id')
    if (uid !== null) {
      fetchUserAPI({ data: { sessionId: uid }, req: 'getUserDetails' })
    } else {
    }
  }, [])
  const removeSessions = () => {
    window.localStorage.removeItem('sess-recg-id')
    window.localStorage.removeItem('idt-curr-usr')
    window.localStorage.removeItem('user-id')
  }
  const logout = async () => {
    setLogoutStatus('Ending Session...')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [{ _id: user._id }],
        }),
      }
      const resp = await fetch(server + '/closeSession', opts)
      const response = await resp.json()
      const sessionClosed = response.sessionClosed
      if (sessionClosed) {
        removeSessions()
        setUser({})
      } else {
        setLogoutStatus('Log out')
      }
    } catch (TypeError) {
      setLogoutStatus('Log out')
    }
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
    getTopBar([homeRef, currentRef, eventRef, aboutRef])
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', checkPageYOffset)
    return () => {
      window.removeEventListener('scroll', checkPageYOffset)
    }
  }, [])
  useEffect(() => {
    if (search) {
      setShowSearch(true)
    } else {
      setShowSearch(false)
    }
  }, [search])
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
  const handleBarClick = (e) => {
    const name = e.target.getAttribute('name')

    if (['home', 'services', 'offers', 'about'].includes(name)) {
      setShowNavOpt(false)
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
              backgroundColor: showBorder
                ? darkMode
                  ? 'rgba(0, 0, 0, 0.7)'
                  : 'rgba(255,255,255,0.7)'
                : '',
              borderBottom: showBorder
                ? darkMode
                  ? 'solid black 2px'
                  : 'solid white 2px'
                : '',
              width: '100vw',
              color: darkMode ? 'white' : 'black',
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
                <div
                  style={{
                    height: '40px',
                    borderRadius: '7px',
                  }}
                >
                  <img src={paceup} height='100%' />
                </div>
                <label
                  style={{
                    fontFamily: 'SourceCodeProBold',
                    fontSize: '1.5rem',
                    color: darkMode ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Pace Up
                </label>
              </div>

              <div
                style={{
                  width: 'fit-content',
                  height: 'fit-content',
                  marginLeft: 'auto',
                }}
                onClick={showBar}
              >
                <FaBars
                  style={{
                    fontSize: '1.6rem',
                    color: darkMode ? 'white' : 'black',
                  }}
                />
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
              onClick={handleBarClick}
              style={{
                position: 'absolute',
                left: String(xOffset) + 'px',
                zIndex: '3',
                backgroundColor: darkMode ? 'rgba(6,6,6,0.98)' : 'whitesmoke',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    borderRadius: '7px',
                    backgroundColor: darkMode
                      ? 'rgba(3,3,3,1)'
                      : 'rgba(249,249,255,1)',
                    color: darkMode ? 'white' : 'black',
                  }}
                >
                  <div
                    style={{
                      borderTopLeftRadius: '7px',
                      borderTopRightRadius: '7px',
                      backgroundColor: darkMode
                        ? 'rgba(6,6,15,1)'
                        : 'rgba(237,237,245,1)',
                      height: '80px',
                    }}
                  >
                    <section
                      style={{
                        display: 'flex',
                        padding: '10px',
                        fontSize: '.8rem',
                        justifyContent: 'space-between',
                      }}
                    >
                      <LazyLoadImage
                        src={userImgUrl}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'left',
                          justifyContent: 'left',
                          fontFamily: 'SourceCodeProRegular',
                          cursor: 'pointer',
                          margin: '10px',
                          marginTop: '7px',
                          fontSize: '1.4rem',
                        }}
                        onClick={() => {
                          setDarkMode(!darkMode)
                        }}
                      >
                        {darkMode ? (
                          <FaSun style={{ color: 'white' }} />
                        ) : (
                          <FaMoon style={{ color: 'black' }} />
                        )}
                      </div>
                    </section>
                  </div>
                  <div
                    style={{
                      padding: '10px',
                      marginTop: '-40px',
                      fontFamily: 'SourceCodeProRegular',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'darkorange',
                        height: '60px',
                        width: '60px',
                        margin: 'auto',
                        fontSize: '2.9rem',
                        border: darkMode
                          ? 'solid rgba(10,10,10,1) 2px'
                          : 'solid rgba(200,200,200,1) 2px',
                        borderRadius: '50%',
                        color: 'white',
                        lineHeight: '60px',
                      }}
                    >
                      {user.firstName !== undefined
                        ? user.firstName.slice(0, 1).toUpperCase()
                        : 'G'}
                    </div>
                    <div style={{ margin: '10px' }}>
                      {user.firstName !== undefined
                        ? user.firstName.slice(0, 1).toUpperCase() +
                          user.firstName.slice(1) +
                          ' ' +
                          user.lastName.slice(0, 1).toUpperCase() +
                          user.lastName.slice(1)
                        : 'Guest User'}
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: darkMode
                          ? 'rgba(125,130,135)'
                          : 'rgba(100,110,115)',
                      }}
                    >
                      {user.otherEmail !== undefined
                        ? user.otherEmail.slice(0, 1) + user.otherEmail.slice(1)
                        : 'You are always welcome to subscribe to our newsletter'}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'left',
                      padding: '10px',
                      fontSize: '.8rem',
                      fontFamily: 'SourceCodeProRegular',
                      borderTop: darkMode
                        ? 'solid rgba(15,15,15,1) 1px'
                        : 'solid rgba(200,200,200,1) 1px',
                    }}
                  >
                    <label>. . .</label>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          color: 'darkorange',
                          outline: 'none',
                          fontFamily: 'SourceCodePro',
                          backgroundColor: 'rgba(0,0,0,0)',
                          margin: '10px',
                          border: 'solid rgba(39,39,40,1) 2px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (user.firstName !== undefined) {
                            logout()
                          } else {
                            history.push('/signup')
                          }
                        }}
                      >
                        {user.firstName !== undefined
                          ? logoutStatus
                          : 'Get Started'}
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: '95%',
                    borderRadius: '25px',
                    backgroundColor: darkMode
                      ? 'rgba(250,250,250,0.2)'
                      : 'rgba(255,255,255,0.9)',
                    margin: '5px',
                    marginTop: '30px',
                  }}
                >
                  <motion.div
                    initial={{ x: '40px' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <FaSearch
                      style={{
                        color: darkMode ? 'white' : 'black',
                        fontSize: '1.3rem',
                        marginTop: '18px',
                      }}
                    />
                  </motion.div>
                  <input
                    type='search'
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                    }}
                    placeholder='Search For Services, Offers, Applications...'
                    style={{
                      color: darkMode ? 'white' : 'black',
                      fontFamily: 'SourceCodeProRegular',
                      width: '80%',
                      padding: '20px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255,255,255,0)',
                      outline: 'none',
                      margin: 'auto 5px',
                      border: 'solid black 0px',
                    }}
                  />
                </div>
              </div>
              {showSearch && (
                <div
                  style={{
                    position: 'relative',
                    height: '70vh',
                    overflowY: 'auto',
                    marginTop: '20px',
                    backgroundColor: darkMode ? 'black' : 'white',
                  }}
                >
                  <FaTimes
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '7px',
                      cursor: 'pointer',
                      color: darkMode ? 'white' : 'black',
                    }}
                    onClick={() => {
                      setSearch('')
                    }}
                  />
                </div>
              )}
              <li>
                <Link to='/'>
                  <label
                    className='opt-left'
                    ref={homeRef}
                    name='home'
                    style={{
                      color: darkMode
                        ? 'rgb(187, 183, 183)'
                        : 'rgba(120, 125, 125)',
                    }}
                  >
                    Home
                  </label>
                </Link>
              </li>
              <li>
                <Link to='/services'>
                  <label
                    className='opt-left'
                    ref={currentRef}
                    name='services'
                    style={{
                      color: darkMode
                        ? 'rgb(187, 183, 183)'
                        : 'rgba(120, 125, 125)',
                    }}
                  >
                    Services
                  </label>
                </Link>
              </li>
              <li>
                <Link to='/offers'>
                  <label
                    className='opt-left'
                    ref={eventRef}
                    name='offers'
                    style={{
                      color: darkMode
                        ? 'rgb(187, 183, 183)'
                        : 'rgba(120, 125, 125)',
                    }}
                  >
                    Offers
                  </label>
                </Link>
              </li>
              <li>
                <Link to='/about'>
                  <label
                    className='opt-left'
                    ref={aboutRef}
                    name='about'
                    style={{
                      color: darkMode
                        ? 'rgb(187, 183, 183)'
                        : 'rgba(120, 125, 125)',
                    }}
                  >
                    About
                  </label>
                </Link>
              </li>
              <li>
                <Link
                  className='opt-left'
                  to='/signin'
                  style={{
                    textDecoration: 'none',
                    fontFamily: 'SourceCodeProRegular',
                    color: 'white',
                    fontWeight: 'bold',
                    height: 'fit-content',
                    backgroundColor: 'rgba(15,105,213)',
                    border: 'solid rgba(15,105,213) 2px',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    width: 'fit-content',
                    margin: '20px auto',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    name='signin'
                    style={{ color: 'white', cursor: 'pointer' }}
                  >
                    sign in
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className='opt-left'
                  to='/signup'
                  style={{
                    fontFamily: 'SourceCodeProRegular',
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    height: 'fit-content',
                    backgroundColor: 'red',
                    border: 'solid red 2px',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    width: 'fit-content',
                    margin: '20px auto',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    name='signup'
                    style={{ color: 'white', cursor: 'pointer' }}
                  >
                    Get Started
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
