import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  FaTimes,
  FaSearch,
  FaMoon,
  FaSun,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa'

import ContextProvider from '../ContextProvider'

import userImg from './profile.png'
import paceup from './paceup.png'

const Navbar = ({ getTopBar }) => {
  const [showBorder, setShowBorder] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showBar, setShowBar] = useState(true)
  const [showViewInfo, setShowViewInfo] = useState(false)
  const [showIconLabel, setShowIconLabel] = useState(true)
  const [userImgUrl, setUserImgUrl] = useState(userImg)
  const [showDrop, setShowDrop] = useState(false)
  const [user, setUser] = useState({})
  const [logoutStatus, setLogoutStatus] = useState('Log out')
  const homeRef = useRef(null)
  const currentRef = useRef(null)
  const eventRef = useRef(null)
  const aboutRef = useRef(null)
  const history = useHistory(null)
  const { darkMode, setDarkMode, server } = useContext(ContextProvider)

  const checkPageYOffset = () => {
    var yOffSet = window.pageYOffset
    if (yOffSet) {
      if (yOffSet > 203) {
        setShowBar(false)
      } else {
        setShowBar(true)
      }
      setShowBorder(true)
    } else {
      setShowBorder(false)
    }
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
        if (![undefined, null, ''].includes(user.img)) {
          const opts1 = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imgUrl: user.img.url,
              userName: user.userName,
            }),
          }
          const resp1 = await fetch(server + '/getImgUrl', opts1)
          const response1 = await resp1.json()
          const url = response1.url
          setUserImgUrl(url)
        }
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

  useEffect(() => {
    if (window.pageYOffset <= 203) {
      setShowBar(true)
    }
  }, [window.pageYOffset])
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
        setShowIconLabel(!showIconLabel)
        setShowViewInfo(!showViewInfo)
      } else {
        setLogoutStatus('Log out')
      }
    } catch (TypeError) {
      setLogoutStatus('Log out')
    }
  }
  return (
    <>
      {showBar && (
        <div
          className='navbar'
          style={{
            borderBottom: showBorder
              ? darkMode
                ? 'solid rgba(255,255,255,1) 2px'
                : 'solid rgba(10,10,10,1) 2px'
              : '',
            background: showBorder
              ? darkMode
                ? 'rgba(10, 10, 10, 0.8)'
                : 'rgba(250,250,250,0.8)'
              : '',
          }}
        >
          <div className='bar' style={{ color: darkMode ? 'white' : 'black' }}>
            <li
              className='top-left'
              style={{
                color: darkMode ? 'white' : 'black',
                fontFamily: 'SourceCodeProBold',
              }}
            >
              <div
                style={{
                  height: '30px',
                  borderRadius: '7px',
                }}
              >
                <img src={paceup} height='100%' />
              </div>
              <div>Pace Up</div>
            </li>
            <li>
              <Link to='/' className='top'>
                <label
                  className='top'
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
              <Link to='/services' className='top'>
                <label
                  className='top'
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
              <Link to='/offers' className='top'>
                <label
                  className='top'
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
              <Link to='/about' className='top'>
                <label
                  className='top'
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
            <Link
              to='/signin'
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                height: 'fit-content',
                backgroundColor: 'rgba(15,105,213)',
                border: 'solid rgba(15,105,213) 2px',
                padding: '5px 15px',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
            >
              <label
                name='signin'
                style={{ color: 'white', cursor: 'pointer' }}
              >
                sign in
              </label>
            </Link>
            <Link
              to='/signup'
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                height: 'fit-content',
                backgroundColor: 'red',
                border: 'solid red 2px',
                padding: '5px 15px',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
            >
              <label
                className='top'
                name='signup'
                style={{
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Get Started
              </label>
            </Link>
          </div>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                textAlign: 'center',
                justifyContent: 'center',
                width: '40vw',
                borderRadius: '20px',
                backgroundColor: darkMode
                  ? 'rgba(250,250,250,0.3)'
                  : 'rgba(255,255,255,0.9)',
                margin: '5px',
                marginTop: '30px',
              }}
            >
              <FaSearch
                style={{
                  marginTop: '15px',
                  color: darkMode ? 'white' : 'black',
                }}
              />
              <input
                type='search'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                placeholder='Search For Services, Offers, Applications...'
                style={{
                  color: darkMode ? 'white' : 'black',
                  width: '85%',
                  padding: '15px 10px',
                  fontFamily: 'MonteserratRegular',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255,255,255,0)',
                  outline: 'none',
                  margin: 'auto 5px',
                  border: 'solid black 0px',
                }}
              />
            </div>
            <div style={{ position: 'absolute', right: '20px', top: '15px' }}>
              <div style={{ display: 'flex' }}>
                {showIconLabel && (
                  <div
                    style={{
                      backgroundColor: 'darkorange',
                      height: '30px',
                      width: '30px',
                      marginTop: '10px',
                      marginRight: '10px',
                      fontSize: '1.3rem',
                      borderRadius: '50%',
                      color: 'white',
                    }}
                  >
                    {user.firstName !== undefined
                      ? user.firstName.slice(0, 1).toUpperCase()
                      : 'G'}
                  </div>
                )}
                <div
                  style={{ display: 'block', position: 'relative' }}
                  onMouseEnter={() => {
                    setShowDrop(true)
                  }}
                  onMouseLeave={() => {
                    setShowDrop(false)
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
                    onClick={() => {
                      setShowViewInfo(!showViewInfo)
                      setShowIconLabel(!showIconLabel)
                    }}
                  />
                  {showDrop ? (
                    <div
                      style={{ marginTop: '-7px' }}
                      onClick={() => {
                        setShowViewInfo(!showViewInfo)
                        setShowIconLabel(!showIconLabel)
                      }}
                    >
                      {showViewInfo ? (
                        <FaChevronUp
                          style={{
                            cursor: 'pointer',
                            color: darkMode ? 'white' : 'black',
                          }}
                        />
                      ) : (
                        <FaChevronDown
                          style={{
                            cursor: 'pointer',
                            color: darkMode ? 'white' : 'black',
                          }}
                        />
                      )}
                    </div>
                  ) : undefined}
                  {showViewInfo && (
                    <div
                      style={{
                        width: '240px',
                        position: 'absolute',
                        right: '5px',
                        zIndex: '2',
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
                            padding: '5px',
                            fontSize: '.8rem',
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 'bold',
                              textAlign: 'left',
                              justifyContent: 'left',
                              fontFamily: 'monospace',
                              cursor: 'pointer',
                              margin: '10px',
                              color: darkMode ? 'white' : 'black',
                              fontSize: '1.3rem',
                            }}
                            onClick={() => {
                              setDarkMode(!darkMode)
                            }}
                          >
                            {darkMode ? <FaSun /> : <FaMoon />}
                          </div>
                        </section>
                      </div>
                      <div style={{ padding: '10px', marginTop: '-40px' }}>
                        {!showIconLabel && (
                          <div
                            style={{
                              backgroundColor: 'darkorange',
                              height: '60px',
                              width: '60px',
                              margin: 'auto',
                              fontSize: '2.65rem',
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
                        )}
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
                            ? user.otherEmail.slice(0, 1) +
                              user.otherEmail.slice(1)
                            : 'You are always welcome to subscribe to our newsletter'}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: 'left',
                          padding: '10px',
                          fontSize: '.8rem',
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
                              fontFamily: 'monospace',
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
                  )}
                </div>
              </div>
              <div></div>
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
                  top: '10px',
                  color: darkMode ? 'white' : 'black',
                  right: '23px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSearch('')
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Navbar
