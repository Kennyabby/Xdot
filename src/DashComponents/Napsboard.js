import { React, useState, useEffect, useRef } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Napsboard.css'

import SideNavigator from './SideNavigator'
import Home from './Home/Home'
import Chats from './Chats/Chats'
import Profile from './Profile'
import Settings from './Settings/Settings'
import Events from './Events/Events'
import Tasks from './Tasks/Tasks'
import Notifications from './Notifications'
import CgpaCalc from './Tasks/Cgpa/CgpaCalc'
import TodoList from './Tasks/TodoList/TodoList'
import QuizApp from './Tasks/Quiz/QuizApp'
import GrandQuiz from './Events/Grand Quiz/GrandQuiz'
import DailyPuzzles from './Events/DailyPuzzles/DailyPuzzles'
import StudyTable from './Events/StudyTable/StudyTable'
import EVoting from './EVoting/EVoting'
import Vote from './EVoting/Vote/Vote'
import Apply from './EVoting/Apply/Apply'
import Admin from './Settings/Admin/Admin'
import Messaging from './Settings/Messaging/Messaging'
import Notifier from './Settings/Notifications/Notifier'
import Preferences from './Settings/Preferences/Preferences'
import Privacy from './Settings/Privacy/Privacy'

import userimg from './assets/user.png'
import home from './assets/home.png'
import chats from './assets/chat.png'
import notifications from './assets/notifications.png'
import navigatormenu from './assets/navigatormenu.png'
import close from './assets/cancel.png'

const Napsboard = ({ rootView, userId, winSize, server }) => {
  const { id } = useParams()
  const history = useHistory()
  const [showHomeToggle, setShowHomeToggle] = useState(true)
  const [isNewSession, setIsNewSession] = useState(false)
  const [view, setView] = useState('')
  const [user, setUser] = useState({})
  const [showNavigator, setShowNavigator] = useState(true)
  const [showNav, setShowNav] = useState(false)
  const [bodyLeft, setBodyLeft] = useState('0px')
  const [logoutStatus, setLogoutStatus] = useState('Log out')
  const [labelRefs, setLabelRefs] = useState([])
  const [tasksLabelRefs, setTasksLabelRefs] = useState([])
  const [eventsLabelRefs, setEventsLabelRefs] = useState([])
  const [eVotingLabelRefs, setEvotingLabelRefs] = useState([])
  const [userImgUrl, setUserImgUrl] = useState(userimg)
  const homeRef = useRef(null)
  const chatsRef = useRef(null)
  const notificationsRef = useRef(null)
  const viewRef = useRef(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50
  const shade = ({ width, prevPadding, newPadding, radius, shade }) => {
    return {
      padding: user.userName ? prevPadding : newPadding,
      borderRadius: radius,
      backgroundColor: user.userName ? 'rgba(0,0,0,0)' : shade,
      width: user.userName ? '' : width,
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
      const user = response.user
      setUser(user)
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgUrl: user.img, matricNo: user.matricNo }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
      setIsNewSession(true)
    } catch (TypeError) {}
  }
  useEffect(() => {
    labelRefs.map((elem) => {
      if (elem !== null && elem.current !== null) {
        if (
          elem.current.getAttribute('name') === id ||
          elem.current.getAttribute('name') === rootView
        ) {
          elem.current.parentElement.parentElement.style.backgroundColor =
            'black'
          elem.current.parentElement.parentElement.style.borderLeft =
            'solid white 3px'
        } else {
          elem.current.parentElement.parentElement.style.backgroundColor =
            'rgba(0,0,0,0)'
          elem.current.parentElement.parentElement.style.borderLeft =
            'solid white 0px'
        }
      }
    })
    eventsLabelRefs.map((dropitem) => {
      if (dropitem.current !== null) {
        if (dropitem.current.getAttribute('name') === id) {
          dropitem.current.style.borderLeft = 'solid darkorange 2px'
          dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
          dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
            'solid white 3px'
          dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
            'black'
        } else {
          dropitem.current.style.borderLeft = 'solid darkorange 0px'
          dropitem.current.style.boxShadow = '0px 0px 9px white'
        }
      }
    })
    tasksLabelRefs.map((dropitem) => {
      if (dropitem.current !== null) {
        if (dropitem.current.getAttribute('name') === id) {
          dropitem.current.style.borderLeft = 'solid darkorange 2px'
          dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
          dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
            'solid white 3px'
          dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
            'black'
        } else {
          dropitem.current.style.borderLeft = 'solid darkorange 0px'
          dropitem.current.style.boxShadow = '0px 0px 9px white'
        }
      }
    })
    eVotingLabelRefs.map((dropitem) => {
      if (dropitem.current !== null) {
        if (dropitem.current.getAttribute('name') === id) {
          dropitem.current.style.borderLeft = 'solid darkorange 2px'
          dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
          dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
            'solid white 3px'
          dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
            'black'
        } else {
          dropitem.current.style.borderLeft = 'solid darkorange 0px'
          dropitem.current.style.boxShadow = '0px 0px 9px white'
        }
      }
    })

    if (id === 'chats') {
      setView(
        <Chats
          server={server}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setBodyLeft={() => {
            setBodyLeft('0px')
          }}
          setShowNavigator={() => {
            setShowNavigator(false)
          }}
          setShowNav={setShowNav(false)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
        />
      )
    } else if (id === 'profile') {
      if (user !== null) {
        setView(
          <Profile
            server={server}
            chatrf={chatsRef}
            homerf={homeRef}
            notificationsrf={notificationsRef}
            user={user}
            setBodyLeft={setBodyLeft('150px')}
            setShowNavigator={setShowNavigator(true)}
            setShowNav={setShowNav(false)}
            padding={'0px'}
            margin={'0px'}
            clickAdmin={true}
            isSearched={false}
            showHomeToggle={(show) => {
              setShowHomeToggle(show)
            }}
          />
        )
      }
    } else if (id === 'tasks') {
      setView(
        <Tasks
          server={server}
          setBodyLeft={setBodyLeft('150px')}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setShowNav={setShowNav(false)}
          setShowNavigator={setShowNavigator(true)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
        />
      )
    } else if (id === 'events') {
      setView(
        <Events
          server={server}
          setBodyLeft={setBodyLeft('150px')}
          chatrf={chatsRef}
          homerf={homeRef}
          setShowNav={setShowNav(false)}
          notificationsrf={notificationsRef}
          setShowNavigator={setShowNavigator(true)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
        />
      )
    } else if (id === 'e-voting') {
      setView(
        <EVoting
          server={server}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setShowNav={setShowNav(false)}
          setBodyLeft={setBodyLeft('150px')}
          setShowNavigator={setShowNavigator(true)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
          user={user}
          viewRef={viewRef}
        />
      )
    } else if (id === 'notifications') {
      setView(
        <Notifications
          server={server}
          setBodyLeft={setBodyLeft('150px')}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setShowNavigator={setShowNavigator(true)}
          setShowNav={setShowNav(false)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
        />
      )
    } else if (id === 'settings') {
      setView(
        <Settings
          server={server}
          setBodyLeft={setBodyLeft('150px')}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setShowNavigator={setShowNavigator(true)}
          setShowNav={setShowNav(false)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
        />
      )
    } else if (id === undefined) {
      setView(
        <Home
          server={server}
          user={user}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setBodyLeft={() => {
            setBodyLeft('150px')
          }}
          setShowNavigator={() => {
            setShowNavigator(true)
          }}
          setShowNav={setShowNav(false)}
          showHomeToggle={(show) => {
            setShowHomeToggle(show)
          }}
          viewRef={viewRef}
        />
      )
    } else {
      if (rootView === 'tasks') {
        setShowHomeToggle(true)
        if (id === 'cgpa') {
          setView(
            <CgpaCalc
              server={server}
              user={user}
              updateUser={() => {
                fetchUserAPI({
                  data: { matricNo: user.matricNo },
                  req: 'getUserDetails',
                })
              }}
              winSize={winSize}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
            />
          )
        } else if (id === 'todolist') {
          setView(
            <TodoList
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
            />
          )
        } else if (id === 'quizapp') {
          setView(
            <QuizApp
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
            />
          )
        } else {
          setView(
            <Tasks
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              chatrf={chatsRef}
              homerf={homeRef}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
            />
          )
        }
      } else if (rootView === 'events') {
        setShowHomeToggle(true)
        if (id === 'grandquiz') {
          setView(
            <GrandQuiz
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
              viewRef={viewRef}
            />
          )
        } else if (id === 'dailypuzzles') {
          setView(
            <DailyPuzzles
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
            />
          )
        } else if (id === 'studytable') {
          setView(
            <StudyTable
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
            />
          )
        } else {
          setView(
            <Events
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              chatrf={chatsRef}
              homerf={homeRef}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
            />
          )
        }
      } else if (rootView === 'e-voting') {
        setShowHomeToggle(true)
        if (id === 'apply') {
          setView(
            <Apply
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
              winSize={winSize}
            />
          )
        } else if (id === 'vote') {
          setView(
            <Vote
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              viewRef={viewRef}
              winSize={winSize}
            />
          )
        } else {
          setView(
            <EVoting
              server={server}
              chatrf={chatsRef}
              homerf={homeRef}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
              user={user}
              viewRef={viewRef}
            />
          )
        }
      } else if (rootView === 'settings') {
        setShowHomeToggle(true)
        if (id === 'admin') {
          setView(
            <Admin
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'messaging') {
          setView(
            <Messaging
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'notifier') {
          setView(
            <Notifier
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'preferences') {
          setView(
            <Preferences
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'privacy') {
          setView(
            <Privacy
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else {
          setView(
            <Settings
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              chatrf={chatsRef}
              homerf={homeRef}
              notificationsrf={notificationsRef}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
            />
          )
        }
      } else {
        if (rootView !== undefined) {
          setView(
            <Home
              server={server}
              user={user}
              chatrf={chatsRef}
              homerf={homeRef}
              notificationsrf={notificationsRef}
              setBodyLeft={() => {
                setBodyLeft('150px')
              }}
              setShowNavigator={() => {
                setShowNavigator(true)
              }}
              setShowNav={setShowNav(false)}
              showHomeToggle={(show) => {
                setShowHomeToggle(show)
              }}
              viewRef={viewRef}
            />
          )
        }
      }
    }
  }, [id, user])

  useEffect(() => {
    labelRefs.map((elem) => {
      if (elem !== null && elem.current !== null) {
        if (
          elem.current.getAttribute('name') === id ||
          elem.current.getAttribute('name') === rootView
        ) {
          elem.current.parentElement.parentElement.style.backgroundColor =
            'black'
          elem.current.parentElement.parentElement.style.borderLeft =
            'solid white 3px'
        } else {
          elem.current.parentElement.parentElement.style.backgroundColor =
            'rgba(0,0,0,0)'
          elem.current.parentElement.parentElement.style.borderLeft =
            'solid white 0px'
        }
      }
    })
  }, [labelRefs])
  useEffect(() => {
    if (eventsLabelRefs) {
      eventsLabelRefs.map((dropitem) => {
        if (dropitem.current !== null) {
          if (dropitem.current.getAttribute('name') === id) {
            dropitem.current.style.borderLeft = 'solid darkorange 2px'
            dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
            dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
              'solid white 3px'
            dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
              'black'
          } else {
            dropitem.current.style.borderLeft = 'solid darkorange 0px'
            dropitem.current.style.boxShadow = '0px 0px 9px white'
          }
        }
      })
    }
  }, [eventsLabelRefs])
  useEffect(() => {
    if (tasksLabelRefs) {
      tasksLabelRefs.map((dropitem) => {
        if (dropitem.current !== null) {
          if (dropitem.current.getAttribute('name') === id) {
            dropitem.current.style.borderLeft = 'solid darkorange 2px'
            dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
            dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
              'solid white 3px'
            dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
              'black'
          } else {
            dropitem.current.style.borderLeft = 'solid darkorange 0px'
            dropitem.current.style.boxShadow = '0px 0px 9px white'
          }
        }
      })
    }
  }, [tasksLabelRefs])
  useEffect(() => {
    if (eVotingLabelRefs) {
      eVotingLabelRefs.map((dropitem) => {
        if (dropitem.current !== null) {
          if (dropitem.current.getAttribute('name') === id) {
            dropitem.current.style.borderLeft = 'solid darkorange 2px'
            dropitem.current.style.boxShadow = '0px 0px 9px darkorange'
            dropitem.current.parentElement.parentElement.parentElement.style.borderLeft =
              'solid white 3px'
            dropitem.current.parentElement.parentElement.parentElement.style.backgroundColor =
              'black'
          } else {
            dropitem.current.style.borderLeft = 'solid darkorange 0px'
            dropitem.current.style.boxShadow = '0px 0px 9px white'
          }
        }
      })
    }
  }, [eVotingLabelRefs])

  useEffect(async () => {
    var uid = window.sessionStorage.getItem('user-id')
    var sess = 0
    if (userId !== null) {
      userId.split('').forEach((elem) => {
        sess += elem.codePointAt(0)
      })
      const sesn = window.sessionStorage.getItem('sess-recg-id')
      const session = window.sessionStorage.getItem('idt-curr-usr')
      if (sesn !== null && session !== null) {
        if (sesn / session === sess) {
          fetchUserAPI({ data: { sessionId: userId }, req: 'getUserDetails' })
        } else {
          setIsNewSession(false)
          history.push('/signin')
          removeSessions()
        }
      } else {
        setIsNewSession(false)
        history.push('/signin')
        removeSessions()
      }
    } else {
      var sess = 0
      if (uid !== null) {
        uid.split('').forEach((elem) => {
          sess += elem.codePointAt(0)
        })
        const sesn = window.sessionStorage.getItem('sess-recg-id')
        const session = window.sessionStorage.getItem('idt-curr-usr')
        if (sesn !== null && session !== null) {
          if (sesn / session === sess) {
            fetchUserAPI({ data: { sessionId: uid }, req: 'getUserDetails' })
          } else {
            setIsNewSession(false)
            history.push('/signin')
            removeSessions()
          }
        } else {
          setIsNewSession(false)
          history.push('/signin')
          removeSessions()
        }
      } else {
        setIsNewSession(false)
        history.push('/signin')
        removeSessions()
      }
    }
  }, [userId])

  const getLabelRefs = (refs) => {
    setLabelRefs(refs)
  }
  const removeSessions = () => {
    window.sessionStorage.removeItem('sess-recg-id')
    window.sessionStorage.removeItem('idt-curr-usr')
    window.sessionStorage.removeItem('user-id')
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
        history.push('/signin')
        history.push('/signin')
        removeSessions()
      } else {
        setLogoutStatus('Log out')
      }
    } catch (TypeError) {
      setLogoutStatus('Log out')
    }
  }
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
        setShowNav(true)
      }
    }
  }
  return (
    <>
      {isNewSession ? (
        <div style={{ color: 'black' }}>
          <div
            className='body'
            style={{
              padding: '0px',
            }}
          >
            {user.userName ? (
              <div style={{ display: 'flex', width: '100%' }}>
                {winSize <= 700 ? (
                  <AnimatePresence>
                    {showNav && (
                      <SideNavigator
                        user={user}
                        getLabelRefs={getLabelRefs}
                        getTasksLabelRefs={(tasksLabelRefs) => {
                          setTasksLabelRefs(tasksLabelRefs)
                        }}
                        getEventsLabelRefs={(eventsLabelRefs) => {
                          setEventsLabelRefs(eventsLabelRefs)
                        }}
                        getEvotingLabelRefs={(eVotingLabelRefs) => {
                          setEvotingLabelRefs(eVotingLabelRefs)
                        }}
                        setShow={(show) => {
                          setShowNav(show)
                        }}
                        logOut={logout}
                        logoutStatus={logoutStatus}
                      />
                    )}
                  </AnimatePresence>
                ) : (
                  <AnimatePresence>
                    {showNavigator && (
                      <SideNavigator
                        user={user}
                        getLabelRefs={getLabelRefs}
                        getTasksLabelRefs={(tasksLabelRefs) => {
                          setTasksLabelRefs(tasksLabelRefs)
                        }}
                        getEventsLabelRefs={(eventsLabelRefs) => {
                          setEventsLabelRefs(eventsLabelRefs)
                        }}
                        getEvotingLabelRefs={(eVotingLabelRefs) => {
                          setEvotingLabelRefs(eVotingLabelRefs)
                        }}
                        logOut={logout}
                        logoutStatus={logoutStatus}
                      />
                    )}
                  </AnimatePresence>
                )}
                <div
                  ref={viewRef}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{
                    backgroundColor: 'rgba(250,250,250,1)',
                    height: winSize > 700 ? '100vh' : 'auto',
                    overflowY: winSize > 700 ? 'auto' : 'none',
                    // margin: '0px auto',
                    justifyContent: 'center',
                    width: winSize <= 700 ? '100%' : '87%',
                    textAlign: 'center',
                  }}
                >
                  {view}
                </div>
              </div>
            ) : (
              ['', '', '', '', ''].map((div, id) => {
                return (
                  <div
                    key={id}
                    style={{
                      margin: '20px',
                      marginTop: '60px',
                      textAlign: 'center',
                      display: 'inline-block',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        height: '300px',
                        width: '500px',
                        padding: '20px,',
                        backgroundColor: 'rgba(230,230,230,1)',
                        borderRadius: '20px',
                      }}
                    ></div>
                    <p
                      style={{
                        backgroundColor: 'rgba(230,230,230,1)',
                        width: '200px',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                    ></p>
                    <p
                      style={{
                        flexWrap: 'wrap',
                        width: '200px',
                        backgroundColor: 'rgba(230,230,230,1)',
                        padding: '10px',
                        borderRadius: '20px',
                      }}
                    ></p>
                  </div>
                )
              })
            )}
            <AnimatePresence>
              {showHomeToggle && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ease: 'easeOut',
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      ease: 'easeIn',
                    },
                  }}
                  className='imgCover'
                >
                  <div className='hometoggleCover'>
                    <div
                      className='hometoggle'
                      style={
                        {
                          // justifyContent: id === 'chats' ? ' center' : 'left',
                        }
                      }
                    >
                      {winSize <= 700 && showNavigator && (
                        <div
                          name='menu'
                          title='toggle to show or hide navigator'
                          className='hometoggleitem'
                          style={{ display: 'block' }}
                          onClick={() => {
                            if (showNav) {
                              setShowNav(false)
                            } else {
                              setShowNav(true)
                            }
                          }}
                        >
                          <img
                            style={{
                              cursor: 'pointer',
                            }}
                            name='menu'
                            alt='menu'
                            src={showNav ? close : navigatormenu}
                            height='18px'
                          />{' '}
                          <div
                            style={{
                              fontSize: '.7rem',
                              fontFamily: 'monospace',
                              color: 'black',
                            }}
                          >
                            <label>Menu</label>
                          </div>
                        </div>
                      )}
                      <Link
                        ref={homeRef}
                        to='/dashboard'
                        className='hometoggleitem'
                        style={{
                          textDecoration: 'none',
                          height: 'fit-content',
                        }}
                      >
                        <div
                          style={{ display: 'block' }}
                          name='home'
                          title='Clck to go to Home Page'
                        >
                          <img
                            style={{
                              borderRadius: '50%',
                              cursor: 'pointer',
                            }}
                            name='home'
                            src={home}
                            alt='home'
                            height='20px'
                          />
                          <div
                            style={{
                              fontSize: '.7rem',
                              fontFamily: 'monospace',
                              color: 'black',
                            }}
                          >
                            <label>Home</label>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className='hometoggleitem'
                        ref={chatsRef}
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                          height: 'fit-content',
                        }}
                        to='/dashboard/chats'
                      >
                        <div
                          style={{ display: 'block' }}
                          name='chats'
                          title='Clck to go to Chats'
                        >
                          <img
                            style={{
                              cursor: 'pointer',
                            }}
                            name='chats'
                            src={chats}
                            alt='chats'
                            height='20px'
                          />
                          <div
                            style={{
                              fontSize: '.7rem',
                              fontFamily: 'monospace',
                              color: 'black',
                            }}
                          >
                            <label>Chats</label>
                          </div>
                        </div>
                      </Link>
                      {winSize <= 700 && showNavigator ? (
                        <Link
                          to='/dashboard/notifications'
                          ref={notificationsRef}
                          className='hometoggleitem'
                          style={{
                            textDecoration: 'none',
                            height: 'fit-content',
                          }}
                        >
                          <div
                            style={{ display: 'block' }}
                            name='notifications'
                            title='Clck to go to Notifications'
                          >
                            <img
                              style={{
                                borderRadius: '50%',
                                cursor: 'pointer',
                              }}
                              name='notifications'
                              src={notifications}
                              alt='notifcations'
                              height='20px'
                            />
                            <div
                              style={{
                                fontSize: '.7rem',
                                fontFamily: 'monospace',
                                color: 'black',
                              }}
                            >
                              <label>Updates</label>
                            </div>
                          </div>
                        </Link>
                      ) : undefined}
                    </div>
                  </div>

                  {id === 'chats' ||
                  id === undefined ||
                  id === 'settings' ||
                  id === 'profile' ? undefined : (
                    <div className='coverDetail'>
                      <Link to='/dashboard/profile'>
                        <div
                          className='userimg'
                          title='go to your profile'
                          style={{
                            backgroundImage: `url(${userImgUrl})`,
                            backgroundSize: 'cover',
                            margin: 'auto',
                            border: 'solid rgba(220,220,220,1) 1px',
                            ...shade({
                              shade: 'rgba(230,230,230,1)',
                              prevPadding: '0px',
                              newPadding: '0px',
                              radius: '50%',
                            }),
                            width: '25px',
                            height: '25px',
                          }}
                        ></div>
                      </Link>
                      <div
                        className='usernameshadow'
                        style={{
                          fontWeight: 'bold',
                          fontSize: '.5rem',

                          ...shade({
                            // width: '100px',
                            prevPadding: '0px',
                            newPadding: '0px',
                            radius: '5px',
                            shade: 'rgba(230,230,230,1)',
                          }),
                        }}
                      ></div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div
          // variance={spinnerVariance}
          // initial='hidden'
          // animate='visible'
          style={{
            color: 'black',
            // position: 'fixed',
            // top: '0px',
            // left: '0px',
            // width: '100vw',
            // height: '100vh',
            // zIndex: '1',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '50%',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              padding: 'auto auto',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                width: 'fit-content',
                padding: '40px',
                fontSize: '1rem',
                margin: 'auto',
                borderRadius: '10px',
                boxShadow: '0px 0px 7px black',
              }}
            >
              XDot
            </div>
            <div style={{ display: 'inline-flex', gap: '0px' }}>
              <motion.div
                animate={{ x: [0, -20, 0, 20, 0], y: [-20, 0, 20, 0, -20] }}
                transition={{
                  x: { yoyo: Infinity, duration: 0.7, ease: 'easeIn' },
                  y: { yoyo: Infinity, duration: 0.7, ease: 'easeOut' },
                }}
                style={{
                  margin: '40px auto',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                }}
              ></motion.div>
              <motion.div
                animate={{ x: [0, 20, 0, -20, 0], y: [20, 0, -20, 0, 20] }}
                transition={{
                  x: { yoyo: Infinity, duration: 0.7, ease: 'easeOut' },
                  y: { yoyo: Infinity, duration: 0.7, ease: 'easeIn' },
                }}
                style={{
                  // padding: '5px',
                  margin: '40px auto',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'blue',
                }}
              ></motion.div>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              position: 'fixed',
              width: '100%',
              textAlign: 'center',
              bottom: '10%',
            }}
          >
            {'Loading...'}
          </div>
        </div>
      )}
    </>
  )
}

export default Napsboard
