import { React, useState, useEffect, useRef } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import './Napsboard.css'

import SideNavigator from './SideNavigator'
import Home from './Home/Home'
import Chats from './Chats'
import Profile from './Profile'
import Settings from './Settings'
import Events from './Events/Events'
import Tasks from './Tasks/Tasks'
import Notifications from './Notifications'
import CgpaCalc from './Tasks/Cgpa/CgpaCalc'
import TodoList from './Tasks/TodoList/TodoList'
import QuizApp from './Tasks/Quiz/QuizApp'
import GrandQuiz from './Events/Grand Quiz/GrandQuiz'
import DailyPuzzles from './Events/DailyPuzzles/DailyPuzzles'
import StudyTable from './Events/StudyTable/StudyTable'
import EVoting from './Events/EVoting/EVoting'

import userimg from './assets/user.png'
import home from './assets/home.png'
import chats from './assets/chat.png'
import notifications from './assets/notifications.png'
import navigatormenu from './assets/navigatormenu.png'
import close from './assets/close.png'

const Napsboard = ({ rootView, userId, winSize, server }) => {
  const { id } = useParams()
  const history = useHistory()
  const [isNewSession, setIsNewSession] = useState(false)
  const [view, setView] = useState('')
  const [user, setUser] = useState({})
  const [showNavigator, setShowNavigator] = useState(true)
  const [showNav, setShowNav] = useState(false)
  const [bodyLeft, setBodyLeft] = useState('0px')
  const [labelRefs, setLabelRefs] = useState([])
  const [tasksLabelRefs, setTasksLabelRefs] = useState([])
  const [eventsLabelRefs, setEventsLabelRefs] = useState([])
  const [userImgUrl, setUserImgUrl] = useState(userimg)
  const homeRef = useRef(null)
  const chatsRef = useRef(null)
  const notificationsRef = useRef(null)

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
      const resp = await fetch(server+'/' + req, opts)
      const response = await resp.json()
      const user = response.user
      setUser(user)
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imgUrl: user.img, matricNo: user.matricNo}),
      }
      const resp1 = await fetch(server+'/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
      setIsNewSession(true)
    } catch (TypeError) {}
  }
  useEffect(() => {
    labelRefs.map((elem) => {
      if (elem !== null && elem.current !== null) {
        if (elem.current.getAttribute('name') === id) {
          elem.current.parentElement.style.backgroundColor = 'black'
          elem.current.parentElement.style.borderLeft = 'solid white 3px'
        } else {
          elem.current.parentElement.style.backgroundColor = 'rgba(0,0,0,0)'
          elem.current.parentElement.style.borderLeft = 'solid white 0px'
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
            padding={winSize <= 700 ? '3px' : '10px'}
            clickAdmin={true}
            isSearched={false}
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
          setShowNavigator={setShowNavigator(true)}
        />
      )
    } else if (id === 'events') {
      setView(
        <Events
          server={server}
          setBodyLeft={setBodyLeft('150px')}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          setShowNavigator={setShowNavigator(true)}
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
        />
      )
    } else if (id===undefined){
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
        />
      )  
    }else {
      if (rootView === 'tasks') {
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
            />
          )
        }
      } else if (rootView === 'events') {
        if (id === 'grandquiz') {
          setView(
            <GrandQuiz
              server={server}
              user={user}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'dailypuzzles') {
          setView(
            <DailyPuzzles
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'studytable') {
          setView(
            <StudyTable
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
            />
          )
        } else if (id === 'e-voting'){
          setView(
            <EVoting
              server={server}
              setBodyLeft={setBodyLeft('150px')}
              setShowNavigator={setShowNavigator(true)}
              setShowNav={setShowNav(false)}
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
            />
          )
        }
      } else {
        if (rootView!==undefined){
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
            />
          )  
        }
      }
    }
  }, [id])
  useEffect(() => {
    if (id === 'profile') {
      setView(
        <Profile
          server={server}
          chatrf={chatsRef}
          homerf={homeRef}
          notificationsrf={notificationsRef}
          user={user}
          setBodyLeft={setBodyLeft('150px')}
          setShowNavigator={setShowNavigator(true)}
          margin={'10px'}
          clickAdmin={true}
          isSearched={false}
        />
      )
    }else if (id===undefined){
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
        />
      )  
    }
    if (rootView === 'tasks') {
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
          />
        )
      }
    } else if (rootView === 'events') {
      if (id === 'grandquiz') {
        setView(
          <GrandQuiz
            server={server}
            user={user}
            setBodyLeft={setBodyLeft('150px')}
            setShowNavigator={setShowNavigator(true)}
            setShowNav={setShowNav(false)}
          />
        )
      } else if (id === 'dailypuzzles') {
        setView(
          <DailyPuzzles
            server={server}
            setBodyLeft={setBodyLeft('150px')}
            setShowNavigator={setShowNavigator(true)}
            setShowNav={setShowNav(false)}
          />
        )
      } else if (id === 'studytable') {
        setView(
          <StudyTable
            server={server}
            setBodyLeft={setBodyLeft('150px')}
            setShowNavigator={setShowNavigator(true)}
            setShowNav={setShowNav(false)}
          />
        )
      } else if (id === 'e-voting'){
        setView(
          <EVoting
            server={server}
            setBodyLeft={setBodyLeft('150px')}
            setShowNavigator={setShowNavigator(true)}
            setShowNav={setShowNav(false)}
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
          />
        )
      }
    }else{
      if (rootView!==undefined){
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
          />
        )  
      }
      
    }
  }, [user])
  useEffect(() => {
    labelRefs.map((elem) => {
      if (elem !== null && elem.current !== null) {
        if (elem.current.getAttribute('name') === id) {
          elem.current.parentElement.style.backgroundColor = 'black'
          elem.current.parentElement.style.borderLeft = 'solid white 3px'
        } else {
          elem.current.parentElement.style.backgroundColor = 'rgba(0,0,0,0)'
          elem.current.parentElement.style.borderLeft = 'solid white 0px'
        }
      }
    })
  }, [labelRefs])

  useEffect(async () => {
    var matric = window.sessionStorage.getItem('user-id')
    var sess = 0
    if (userId !== null) {
      userId.split('').forEach((elem) => {
        sess += elem.codePointAt(0)
      })
      const sesn = window.sessionStorage.getItem('sess-recg-id')
      const session = window.sessionStorage.getItem('idt-curr-usr')
      if (sesn !== null && session !== null) {
        if (sesn / session === sess) {
          fetchUserAPI({ data: { _id: userId }, req: 'getUserDetails' })
        } else {
          setIsNewSession(false)
          history.push('/signin')
        }
      } else {
        setIsNewSession(false)
        history.push('/signin')
      }
    } else {
      fetchUserAPI({ data: { matricNo: matric }, req: 'getUserDetails' })
    }
  }, [userId])

  const getLabelRefs = (refs) => {
    setLabelRefs(refs)
  }
  const logout = () => {
    history.push('/signin')
    history.push('/signin')
    window.sessionStorage.removeItem('sess-recg-id')
    window.sessionStorage.removeItem('idt-curr-usr')
    window.sessionStorage.removeItem('user-id')
  }

  if (isNewSession) {
    return (
      <>
        <div style={{ color: 'black' }}>
          <div
            className='body'
            style={{ marginLeft: winSize <= 700 ? '0px' : bodyLeft }}
          >
            {user.userName ? (
              <div>
                {winSize <= 700
                  ? showNav && (
                      <div>
                        <SideNavigator
                          user={user}
                          getLabelRefs={getLabelRefs}
                          getTasksLabelRefs={(tasksLabelRefs) => {
                            setTasksLabelRefs(tasksLabelRefs)
                          }}
                          getEventsLabelRefs={(eventsLabelRefs) => {
                            setEventsLabelRefs(eventsLabelRefs)
                          }}
                          logOut={logout}
                        />
                      </div>
                    )
                  : showNavigator && (
                      <div>
                        <SideNavigator
                          user={user}
                          getLabelRefs={getLabelRefs}
                          getTasksLabelRefs={(tasksLabelRefs) => {
                            setTasksLabelRefs(tasksLabelRefs)
                          }}
                          getEventsLabelRefs={(eventsLabelRefs) => {
                            setEventsLabelRefs(eventsLabelRefs)
                          }}
                          logOut={logout}
                        />
                      </div>
                    )}
                {view}
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

            <div className='imgCover'>
              <div className='hometoggleCover'>
                <div className='hometoggle' style={{justifyContent: id==='chats'?' center' : 'left'}}>
                  {winSize <= 700 && showNavigator && (
                    <div
                      name='menu'
                      title='toggle to open or close navigator'
                      className='hometoggleitem'
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
                    </div>
                  )}
                  <Link
                    to='/dashboard'
                    style={{ textDecoration: 'none', height: 'fit-content' }}
                  >
                    <div
                      ref={homeRef}
                      name='home'
                      title='Clck to go to Home Page'
                      className='hometoggleitem'
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
                    </div>
                  </Link>
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      height: 'fit-content',
                    }}
                    to='/dashboard/chats'
                  >
                    <div
                      ref={chatsRef}
                      name='chats'
                      title='Clck to go to Chats'
                      className='hometoggleitem'
                    >
                      <img
                        style={{
                          borderRadius: '50%',
                          cursor: 'pointer',
                        }}
                        name='chats'
                        src={chats}
                        alt='chats'
                        height='28px'
                      />
                    </div>
                  </Link>
                  {winSize <= 700 && showNavigator ? (
                    <Link
                      to='/dashboard/notifications'
                      style={{ textDecoration: 'none', height: 'fit-content' }}
                    >
                      <div
                        ref={notificationsRef}
                        name='home'
                        title='Clck to go to Notifications'
                        className='hometoggleitem'
                      >
                        <img
                          style={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                          }}
                          name='notifications'
                          src={notifications}
                          alt='notifcations'
                          height='25px'
                        />
                      </div>
                    </Link>
                  ) : undefined}
                </div>
              </div>
              
              {(id==='chats'|| id===undefined|| id==='profile')? undefined 
              :(<div className='coverDetail'>
                <Link to='/dashboard/profile'>
                  <img
                    className='userimg'
                    src={userImgUrl}
                    height='50px'
                    width='50px'
                    title='go to your profile'
                    style={{
                      ...shade({
                        shade: 'rgba(230,230,230,1)',
                        prevPadding: '0px',
                        newPadding: '0px',
                        radius: '50%',
                        width: '50px',
                      }),
                    }}
                  />
                </Link>
                <p
                  className='usernameshadow'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '.8rem',

                    ...shade({
                      width: '100px',
                      prevPadding: '0px',
                      newPadding: '0px',
                      radius: '5px',
                      shade: 'rgba(230,230,230,1)',
                    }),
                  }}
                >
                  {user.userName ? user.userName.toUpperCase() : user.userName}
                </p>
              </div>)}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div style={{ color: 'black' }}>Redirecting...</div>
      </>
    )
  }
}

export default Napsboard
