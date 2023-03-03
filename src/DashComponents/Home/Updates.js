import { React, useState, useEffect, useRef, useContext } from 'react'
import '../Events/Events.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import profimg from '../Events/assets/profile.png'
import Post from './Post'
import PostPageModal from './PostPageModal'
import ContextProvider from '../../ContextProvider'

import events from './assets/events.png'
import tasks from './assets/tasks.png'
import voting from './assets/events.png'
import chat from './assets/chat.png'
import wchat from './assets/wchat.png'
import notifications from './assets/notifications.png'
import settings from './assets/settings.jpg'
import search from './assets/search.png'
import wsearch from './assets/wsearch.png'
import xdotlogo from './assets/xdotlogo.png'

const Updates = ({ user, server, showHomeToggle, viewRef }) => {
  const [updates, setUpdates] = useState([])
  const [prevUpdates, setPrevUpdates] = useState([])
  const postRef = useRef(null)
  const history = useHistory()
  const { id } = useParams()
  const lastPostRef = useRef(null)
  const [winSize, setWinSize] = useState(window.innerWidth)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [lastPostDimension, setLastPostDimension] = useState('')
  const [lastUpdatedPost, setLastUpdatedPost] = useState('')
  const [scrollCompleted, setScrollCompleted] = useState(true)
  const [showPostUpdatesStatus, setShowPostUpdatesStatus] = useState(false)
  const [showPostPage, setShowPostPage] = useState(false)
  const [gotUpdates, setGotUpdates] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [postUpdatesStatus, setPostUpdatesStatus] = useState('')
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [highlightedPost, setHighlightedPost] = useState(null)
  const [currentPostShow, setCurrentPostShow] = useState(null)
  const [newPostShow, setNewPostShow] = useState(null)
  const { darkMode } = useContext(ContextProvider)
  const minSwipeDistance = 20
  const maxNumberOfRequest = 4
  var stackPos = 0
  const notify = ({ message }) => {
    setShowNotification(true)
    setNotificationMessage(message)
    getNewUpdates(user.lastPostUpdate)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }
  const shufflePosts = (array) => {
    var currentIndex = array.length,
      randomIndex,
      temporaryValue
    while (0 !== currentIndex) {
      var randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  }
  useEffect(() => {
    showHomeToggle(true)
  }, [])
  const checkSize = () => {
    setWinSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [winSize])
  useEffect(async () => {
    if (user.userName !== undefined) {
      try {
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
      } catch (TypeError) {}
    }
  }, [user])
  useEffect(() => {
    setNewPostShow(currentPostShow)
  }, [currentPostShow])
  const handlePopState = () => {
    if (currentPostShow === null) {
      // stackPos = 1
      setHighlightedPost(null)
      showHomeToggle(true)
    }
    // else if (stackPos === 1) {
    //   stackPos = 0
    // }
  }
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'POP') {
        handlePopState()
      }
    })
    return () => {
      unlisten()
    }
  }, [currentPostShow])
  const checkLastPostDimension = async () => {
    setLastPostDimension(lastPostRef.current.getBoundingClientRect().y)
  }
  const getNewUpdates = async (lastPostUpdate) => {
    var updateFrom = lastPostUpdate
    if (updateFrom === undefined) {
      updateFrom = Date.now()
    }
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: 'NapsPublic',
          data: { createdAt: { $lt: updateFrom } },
          limit: maxNumberOfRequest,
        }),
      }
      const resp = await fetch(server + '/getUpdates', opts)
      const response = await resp.json()
      const updates = response.updates
      setLastUpdatedPost(updates[updates.length - 1])
      shufflePosts(updates)
      setUpdates(() => {
        return updates
      })
      setPrevUpdates(updates)
      setGotUpdates(true)
    } catch (TypeError) {}
  }
  useEffect(() => {
    viewRef.current.addEventListener('scroll', checkLastPostDimension)
    return () => {
      viewRef.current.removeEventListener('scroll', checkLastPostDimension)
    }
  }, [lastPostDimension])
  useEffect(() => {
    window.addEventListener('scroll', checkLastPostDimension)
    return () => {
      window.removeEventListener('scroll', checkLastPostDimension)
    }
  }, [lastPostDimension])
  useEffect(() => {
    getNewUpdates(user.lastPostUpdate)
  }, [user])

  useEffect(async () => {
    if (highlightedPost === null && scrollCompleted) {
      if (window.innerWidth <= 700) {
        window.sessionStorage.setItem('pageOffset', window.pageYOffset)
      } else {
        window.sessionStorage.setItem('pageOffset', viewRef.current.scrollTop)
      }
    }
    if (
      lastPostDimension < window.innerHeight &&
      updates !== undefined &&
      updates[updates.length - 1] !== undefined &&
      highlightedPost === null
    ) {
      var updateFrom = lastUpdatedPost.createdAt
      if (prevUpdates.length === maxNumberOfRequest) {
        setShowPostUpdatesStatus(true)
        setPostUpdatesStatus('More Updates...')
        try {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              collection: 'NapsPublic',
              data: { createdAt: { $lt: updateFrom } },
              limit: maxNumberOfRequest,
            }),
          }
          const resp = await fetch(server + '/getUpdates', opts)
          const response = await resp.json()
          const updt = response.updates
          if (updt.length) {
            setLastUpdatedPost(updt[updt.length - 1])
          }
          if (updt.length < maxNumberOfRequest) {
            setShowPostUpdatesStatus(true)
            setPostUpdatesStatus('No More Updates Available!')
          }
          var isIncludeItem = false
          prevUpdates.forEach((item) => {
            if (updt.includes(item)) {
              isIncludeItem = true
            }
          })
          shufflePosts(updt)
          setPrevUpdates(updt)
          if (!isIncludeItem) {
            setUpdates([...updates, ...updt])
          }
        } catch (TypeError) {}
      } else {
        setShowPostUpdatesStatus(true)
        setPostUpdatesStatus('No More Updates Available!')
      }
    } else {
      setShowPostUpdatesStatus(false)
      setPostUpdatesStatus('')
    }
  }, [lastPostDimension])
  const updatePostAt = async ({ createdAt, refresh, rct }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: 'NapsPublic',
          data: { createdAt: createdAt },
        }),
      }

      const resp = await fetch(server + '/getOneUpdate', opts)
      const response = await resp.json()
      const update = await response.update
      var newUpdates = updates
      var index
      newUpdates.forEach((update, i) => {
        if (update.createdAt === createdAt) {
          index = i
        }
      })
      newUpdates[index] = update
      if (refresh) {
        setUpdates(() => {
          return [...newUpdates]
        })
        if (highlightedPost !== null) {
          setHighlightedPost(() => {
            return update
          })
          update['comment'].forEach((comment, i) => {
            if (currentPostShow !== null) {
              if (comment.createdAt === currentPostShow.createdAt) {
                setNewPostShow(comment)
              }
            } else {
              setNewPostShow(null)
            }
          })
        }
      }
      var done = update
      return done
    } catch (TypeError) {}
  }
  const onTouchStart = (e) => {
    setTouchEnd(null)
    const firstTouch = e.targetTouches[0].clientY
    setTouchStart(firstTouch)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientY
    var distance = touchStart - currentTouch
    if (highlightedPost == null && window.pageYOffset > 112) {
      if (distance > minSwipeDistance) {
        setShowSearch(false)
      }
    }
    if (distance < -minSwipeDistance) {
      setShowSearch(true)
    }
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      const isUpSwipe = distance > minSwipeDistance
    }
  }
  return (
    <>
      <div
        style={{
          paddingTop:
            highlightedPost !== null
              ? '50px'
              : winSize <= 700
              ? '20px'
              : '25px',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {showNotification && (
          <div
            style={{
              padding: '10px',
              position: 'fixed',
              bottom: '80px',
              zIndex: '3',
              justifyContent: 'center',
              width: '100vw',
            }}
          >
            <label
              style={{
                margin: 'auto',
                padding: '10px',
                fontSize: '.8rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                backgroundColor: darkMode
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(0,0,0,0.9)',
                borderRadius: '10px',
                color: darkMode ? 'black' : 'white',
              }}
            >
              {notificationMessage}
            </label>
          </div>
        )}
        <AnimatePresence>
          {showPostPage && (
            <PostPageModal
              user={user}
              server={server}
              closeModal={() => {
                setShowPostPage(false)
              }}
              notifyUpdate={(message) => {
                notify({ message: message })
              }}
            />
          )}
        </AnimatePresence>
        <div
          style={{
            paddingTop: '0px',
            // position: 'relative',
            display: 'flex',
            width: '100%',
            textAlign: winSize <= 700 ? 'center' : 'left',
            justifyContent: winSize <= 700 ? 'center' : 'left',
          }}
        >
          <div
            style={{
              width: winSize <= 700 ? '100%' : '50%',
            }}
          >
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  style={{
                    position: 'sticky',
                    position: '-webkit-sticky',
                    display: 'flex',
                    zIndex: '2',
                    top: '0px',
                    left: '0px',
                    margin: '0px',
                    marginBottom: '10px',
                    padding: '5px 0px',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: darkMode
                      ? 'rgba(0,0,0,0)'
                      : 'rgba(255,255,255,0)',
                  }}
                >
                  <Link to='/dashboard/profile' style={{ margin: 'auto' }}>
                    <div
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <LazyLoadImage
                        src={userImgUrl}
                        width={40}
                        height={40}
                        style={{
                          boxShadow: darkMode
                            ? '-5px -5px 10px rgba(0,0,0,0.1),5px 5px 10px rgba(0,0,0,0.1)'
                            : '-5px -5px 10px rgba(250,250,250,0.1),5px 5px 10px rgba(250,250,250,0.1)',
                          backgroundColor: darkMode
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(240,240,240,1)',
                          backgroundSize: 'cover',
                          borderRadius: '50%',
                          border: 'solid rgba(220,220,220,1) 1px',
                          margin: '5px auto',
                        }}
                        PlaceholderSrc={profimg}
                        effect='blur'
                        alt='user photo'
                      />
                    </div>
                  </Link>
                  <div
                    style={{
                      backgroundColor: darkMode
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(255,255,255,1)',
                      width: winSize <= 700 ? '75%' : '80%',
                      margin: 'auto',
                      boxShadow: darkMode
                        ? '-5px -5px 10px rgba(0,0,0,0.1),5px 5px 10px rgba(0,0,0,0.1)'
                        : '-5px -5px 10px rgba(250,250,250,0.1),5px 5px 10px rgba(250,250,250,0.1)',
                      borderRadius: '20px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: darkMode
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,1)',
                        borderRadius: '20px',
                        width: '100%',
                        display: 'flex',
                      }}
                    >
                      <img
                        src={darkMode ? wsearch : search}
                        height={darkMode ? '15px' : '20px'}
                        style={{
                          marginTop: '15px',
                          marginLeft: '15px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {}}
                      />
                      <input
                        type='search'
                        placeholder='Search Pages, Posts, Clusters...'
                        style={{
                          backgroundColor: darkMode
                            ? 'rgba(255,255,255,0)'
                            : 'white',
                          color: darkMode ? 'white' : 'black',
                          padding: '15px 10px',
                          outline: 'none',
                          border: 'solid black 0px',
                          borderRadius: '20px',
                          width: '90%',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={() => {
                  setShowPostPage(true)
                }}
                className='saysm'
                style={{
                  backgroundColor: darkMode ? 'black' : 'white',
                  boxShadow: darkMode
                    ? '-4px -4px 10px rgba(10,10,18,0.1), 4px 4px 10px rgba(10,10,18,0.1)'
                    : '-4px -4px 10px rgba(240,240,255,0.1), 4px 4px 10px rgba(240,240,255,0.1)',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {'Something on your mind?'}
              </motion.div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: winSize <= 700 ? 'wrap-reverse' : 'wrap',
          }}
        >
          <div
            style={{
              width: winSize <= 700 ? '100%' : '50%',
              margin: winSize <= 700 ? '0px' : 'auto',
              marginTop: winSize <= 700 ? '0px' : '30px',
              borderRadius: winSize <= 700 ? '0px' : '10px',
              backgroundColor: darkMode ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
              boxShadow:
                winSize <= 700
                  ? ''
                  : darkMode
                  ? '-4px -4px 10px rgba(0,0,0,0.3), 4px 4px 10px rgba(0,0,0,0.3)'
                  : '-4px -4px 15px rgba(255,255,255,0.5), 4px 4px 15px rgba(255,255,255,0.5)',
            }}
          >
            <div
              style={{
                position: 'sticky',
                position: '-webkit-sticky',
                top: '0px',
                padding: '10px',
                marginBottom: '20px',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => {
                  getNewUpdates(user.lastPostUpdate)
                }}
                style={{
                  padding: '9px 25px',
                  borderRadius: '22px',
                  backgroundColor: 'blue',
                  color: 'white',
                  boxShadow: darkMode
                    ? '-5px -5px 10px rgba(10,10,18,0.1),5px 5px 10px rgba(10,10,18,0.1)'
                    : '-5px -5px 10px rgba(243,243,255,0.1),5px 5px 10px rgba(243,243,255,0.1)',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  border: 'solid rgba(0,0,255,1) 2px',
                  cursor: 'pointer',
                }}
              >
                New Posts
              </button>
            </div>
            {updates.length ? (
              <div>
                <div>
                  {updates.map((update, i) => {
                    return (
                      <div>
                        <Post
                          server={server}
                          key={i}
                          user={user}
                          updt={update}
                          updatePostAt={async ({ createdAt, refresh, rct }) => {
                            var done = await updatePostAt({
                              createdAt: createdAt,
                              refresh: refresh,
                              rct: rct,
                            })
                            return done
                          }}
                          currentPostShow={(post) => {
                            setCurrentPostShow(post)
                          }}
                          setHighlightedPost={(post) => {
                            history.push({
                              pathname: history.location.pathname,
                              state: { modal: true },
                            })
                            setHighlightedPost(post)
                          }}
                          showHomeToggle={(show) => {
                            showHomeToggle(show)
                          }}
                          viewRef={viewRef}
                        />
                      </div>
                    )
                  })}
                  <AnimatePresence>
                    {highlightedPost !== null && (
                      <motion.div
                        initial={{
                          scale: winSize <= 700 ? 0.7 : 1,
                          opacity: winSize <= 700 ? 1 : 0,
                        }}
                        animate={{
                          scale: winSize <= 700 ? 1 : 1,
                          opacity: winSize <= 700 ? 1 : 1,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        exit={{
                          scale: winSize <= 700 ? 0.7 : 1,
                          opacity: winSize <= 700 ? 1 : 0,
                          transition: { ease: 'easeIn' },
                        }}
                        ref={postRef}
                        style={{
                          position: 'fixed',
                          left: winSize <= 700 ? '0px' : '265px',
                          top: '0px',
                          width: winSize <= 700 ? '100vw' : '42%',
                          background: darkMode
                            ? 'rgba(10,10,15,1)'
                            : 'rgba(247,247,250,1)',
                          zIndex: '3',
                          height: '100%',
                          overflowY: 'auto',
                        }}
                      >
                        <Post
                          server={server}
                          status={'highlighted'}
                          user={user}
                          postRef={postRef}
                          updt={highlightedPost}
                          newPostShow={newPostShow}
                          updatePostAt={async ({ createdAt, refresh, rct }) => {
                            var done = await updatePostAt({
                              createdAt: createdAt,
                              refresh: refresh,
                              rct: rct,
                            })
                            return done
                          }}
                          goBack={() => {}}
                          currentPostShow={(post) => {
                            setCurrentPostShow(post)
                          }}
                          setHighlightedPost={(post) => {
                            setHighlightedPost(post)
                            if (post === null) {
                              history.goBack()
                            }
                          }}
                          showHomeToggle={(show) => {
                            showHomeToggle(show)
                          }}
                          setScrollCompleted={(scrollStatus) => {
                            setScrollCompleted(scrollStatus)
                          }}
                          viewRef={viewRef}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={lastPostRef} style={{ paddingBottom: '90px' }}>
                  {highlightedPost === null && showPostUpdatesStatus ? (
                    <label
                      style={{
                        color: 'back',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        fontSize: '.8rem',
                        padding: '10px',
                      }}
                    >
                      {postUpdatesStatus}
                    </label>
                  ) : undefined}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                style={{
                  fontFamily: 'Courier New',
                  fontWeight: 'bold',
                  margin: '40px',
                  marginBottom: '60px',
                  borderRadius: '15px',
                  boxShadow: '0px 0px 7px rgba(20,20,20,1)',
                  padding: '20px',
                }}
              >
                {gotUpdates
                  ? 'Hi, ' +
                    user.firstName +
                    '. Welcome to XDot Updates.\nMark history in the department by being the first to make a post on this feed.'
                  : 'Loading...'}
              </motion.div>
            )}
          </div>
          {winSize > 700 ? (
            <div
              style={{
                width: winSize <= 700 ? '100%' : '40%',
                margin: '10px auto',
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  margin: '10px auto',
                  padding: '10px 0px',
                  // borderTop: 'solid rgba(210,210,210,1) 4px',
                  // borderBottom: 'solid rgba(210,210,210,1) 4px',
                  textAlign: 'left',
                  fontFamily: 'monospace',
                }}
              >
                <Link to='/dashboard/settings'>
                  <div
                    style={{
                      position: 'absolute',
                      top: '7px',
                      right: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={settings} height='20px' />
                  </div>
                </Link>
                <label
                  style={{
                    fontWeight: 'bold',
                    padding: '0px 10px',
                    fontStyle: 'italic',
                  }}
                >
                  {'Go To >>'}
                </label>
                <motion.div
                  transition={{ when: 'beforeChildren', staggerChildren: 1 }}
                  style={{
                    margin: '10px 0px',
                    overflowX: 'auto',
                    overflowY: 'hide',
                    flexWrap: 'wrap',
                    // backgroundColor: darkMode ? 'black' : 'rgba(240,240,240,1)',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '160px',
                    flexDirection: 'column',
                  }}
                >
                  {[
                    { it: 'Voting', img: voting, endpoint: 'e-voting' },
                    { it: 'Tasks', img: tasks, endpoint: 'tasks' },
                    { it: 'Events', img: events, endpoint: 'events' },
                    { it: 'Chats', img: chat, endpoint: 'chats' },
                  ].map((item, i) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          opacity: { duration: 0.5 },
                          scale: { duration: 0.3, ease: 'easeOut' },
                        }}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          margin: '5px 20px',
                          width: '100px',
                          height: '130px',
                          backgroundColor: 'white',
                          boxShadow: darkMode
                            ? '-5px -5px 10px rgba(7,7,18,0.5),5px 5px 10px rgba(7,7,18,0.5)'
                            : '-5px -5px 10px rgba(240,240,255,0.5),5px 5px 10px rgba(240,240,255,0.5)',
                          borderRadius: '10px',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: 'black',
                          paddingTop: '5px',
                          fontWeight: 'bold',
                        }}
                      >
                        <label>{item.it}</label>
                        <Link
                          key={i}
                          style={{ textDecoration: 'none' }}
                          to={'/dashboard/' + item.endpoint}
                        >
                          <div
                            style={{
                              width: '85px',
                              height: '90px',
                              padding: '0px',
                              margin: '10px auto',
                              backgroundImage: `url(${item.img})`,
                              backgroundSize: 'cover',
                            }}
                          ></div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div
              style={{
                width: winSize <= 700 ? '100%' : '40%',
                margin: '10px auto',
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  margin: '10px auto',
                  padding: '10px 0px',
                  // borderTop: 'solid rgba(210,210,210,1) 4px',
                  // borderBottom: 'solid rgba(210,210,210,1) 4px',
                  textAlign: 'left',
                  fontFamily: 'monospace',
                }}
              >
                <Link to='/dashboard/settings'>
                  <div
                    style={{
                      position: 'absolute',
                      top: '7px',
                      right: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={settings} height='20px' />
                  </div>
                </Link>
                <label
                  style={{
                    fontWeight: 'bold',
                    padding: '0px 10px',
                    fontStyle: 'italic',
                  }}
                >
                  {'Go To >>'}
                </label>
                <motion.div
                  transition={{ when: 'beforeChildren', staggerChildren: 1 }}
                  style={{
                    margin: '10px 0px',
                    overflowX: 'auto',
                    overflowY: 'hide',
                    flexWrap: 'wrap',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '160px',
                    flexDirection: 'column',
                  }}
                >
                  {[
                    { it: 'Voting', img: voting, endpoint: 'e-voting' },
                    { it: 'Tasks', img: tasks, endpoint: 'tasks' },
                    { it: 'Events', img: events, endpoint: 'events' },
                    { it: 'Chats', img: chat, endpoint: 'chats' },
                  ].map((item, i) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          opacity: { duration: 0.5 },
                          scale: { duration: 0.3, ease: 'easeOut' },
                        }}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          margin: '5px 20px',
                          width: '100px',
                          height: '130px',
                          backgroundColor: 'white',
                          boxShadow: darkMode
                            ? '-5px -5px 10px rgba(7,7,18,0.5),5px 5px 10px rgba(7,7,18,0.5)'
                            : '-5px -5px 10px rgba(240,240,255,0.5),5px 5px 10px rgba(240,240,255,0.5)',
                          borderRadius: '10px',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: 'black',
                          paddingTop: '5px',
                          fontWeight: 'bold',
                        }}
                      >
                        <label>{item.it}</label>
                        <Link
                          key={i}
                          style={{ textDecoration: 'none' }}
                          to={'/dashboard/' + item.endpoint}
                        >
                          <div
                            style={{
                              width: '85px',
                              height: '90px',
                              padding: '0px',
                              margin: '10px auto',
                              backgroundImage: `url(${item.img})`,
                              backgroundSize: 'cover',
                            }}
                          ></div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Updates
