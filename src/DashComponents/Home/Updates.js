import { React, useState, useEffect, useRef } from 'react'
import '../Events/Events.css'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import profimg from '../Events/assets/profile.png'
import Post from './Post'
import PostPageModal from './PostPageModal'

import events from './assets/events.png'
import tasks from './assets/tasks.png'
import voting from './assets/events.png'
import chat from './assets/chat.png'
import notifications from './assets/notifications.png'
import settings from './assets/settings.jpg'
import search from './assets/search.png'
import xdotlogo from './assets/xdotlogo.png'

const Updates = ({ user, server, showHomeToggle, viewRef, winSize }) => {
  const [updates, setUpdates] = useState([])
  const [prevUpdates, setPrevUpdates] = useState([])
  const lastPostRef = useRef(null)
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
  const minSwipeDistance = 20
  const maxNumberOfRequest = 4

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
  useEffect(async () => {
    if (user.matricNo !== undefined) {
      try {
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
      } catch (TypeError) {}
    }
  }, [user])
  useEffect(() => {
    setNewPostShow(currentPostShow)
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
        style={{ paddingTop: highlightedPost !== null ? '50px' : '10px' }}
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
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderRadius: '10px',
                color: 'white',
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
        {highlightedPost === null ? (
          <div
            style={{
              paddingTop: '65px',
              position: 'relative',
              textAlign: 'center',
              justifyContent: 'center',
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
                    position: 'fixed',
                    display: 'flex',
                    width: '100%',
                    zIndex: '2',
                    top: '0px',
                    left: '0px',
                    margin: '0px',
                    marginBottom: '10px',
                    padding: '10px 0px',
                    justifyContent: winSize<=700?'center':'left',
                    textAlign: 'left',
                    backgroundColor: 'rgba(255,255,255,1)',
                  }}
                >
                  <div
                    style={{
                      width: '15%',
                      textAlign: 'center',
                      marginTop: '8px',
                      width: 'fit-content',
                      flexWrap: 'wrap',
                      margin: winSize <= 700 ? 'auto' : 'auto 50px',
                      textShadow: '0px 0px 3px black',
                      color: 'blue',
                      display: 'block',
                      fontFamily: 'monospace',
                      fontSize: '21px',
                      fontWeight: 'bolder',
                    }}
                  >
                    <img src={xdotlogo} height='30px' />

                    <label style={{ margin: '5px' }}>XDot</label>
                  </div>
                  <div
                    style={{
                      width: winSize <= 700 ? '70%' : '40%',
                      margin: winSize <= 700 ? 'auto' : 'auto 50px',
                      boxShadow:
                        '-5px -5px 15px rgba(0,0,0,0.1),5px 5px 15px rgba(0,0,0,0.1)',
                      borderRadius: '20px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        width: '98%',
                        display: 'flex',
                      }}
                    >
                      <img
                        src={search}
                        height='20px'
                        style={{
                          marginTop: '15px',
                          marginLeft: '15px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {}}
                      />
                      <input
                        type='text'
                        placeholder='Search Pages, Posts, Clusters...'
                        style={{
                          padding: '15px 10px',
                          outline: 'none',
                          border: 'solid black 0px',
                          borderRadius: '20px',
                          width: '80%',
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
                // margin: '10px',
                width: winSize <= 700 ? '100%' : '60%',
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
                      boxShadow:
                        '-5px -5px 8px rgba(0,0,0,0.1),5px 5px 8px rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(240,240,240,1)',
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={() => {
                  setShowPostPage(true)
                }}
                className='saysm'
              >
                {'Something on your mind?'}
              </motion.div>
            </div>
          </div>
        ) : undefined}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: winSize <= 700 ? 'wrap-reverse' : 'wrap',
          }}
        >
          <div
            style={{
              width: winSize <= 700 ? '100%' : '40%',
              margin: winSize <= 700 ? '0px' : 'auto',
            }}
          >
            {highlightedPost === null ? (
              <div
                style={{
                  padding: '10px',
                  marginBottom: '20px',
                  justifyContent: 'center',
                  // borderBottom: 'solid rgba(210,210,210,1) 2px',
                }}
              >
                <button
                  onClick={() => {
                    getNewUpdates(user.lastPostUpdate)
                  }}
                  style={{
                    padding: '7px 20px',
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    color: 'blue',
                    fontFamily: 'monospace',
                    border: 'solid rgba(0,0,255,1) 2px',
                    cursor: 'pointer',
                  }}
                >
                  New Posts
                </button>
              </div>
            ) : undefined}
            {updates.length ? (
              <div>
                <div>
                  {highlightedPost === null ? (
                    updates.map((update, i) => {
                      return (
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
                            setHighlightedPost(post)
                          }}
                          showHomeToggle={(show) => {
                            showHomeToggle(show)
                          }}
                          viewRef={viewRef}
                        />
                      )
                    })
                  ) : (
                    <Post
                      server={server}
                      status={'highlighted'}
                      user={user}
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
                      currentPostShow={(post) => {
                        setCurrentPostShow(post)
                      }}
                      setHighlightedPost={(post) => {
                        setHighlightedPost(post)
                      }}
                      showHomeToggle={(show) => {
                        showHomeToggle(show)
                      }}
                      setScrollCompleted={(scrollStatus) => {
                        setScrollCompleted(scrollStatus)
                      }}
                      viewRef={viewRef}
                    />
                  )}
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
                  borderTop: 'solid rgba(210,210,210,1) 4px',
                  borderBottom: 'solid rgba(210,210,210,1) 4px',
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
                    backgroundColor: 'rgba(240,240,240,1)',
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
                          boxShadow:
                            '-4px -4px 20px rgba(0,0,0,0.1),4px 4px 20px rgba(0,0,0,0.1)',
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
          ) : highlightedPost === null ? (
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
                  borderTop: 'solid rgba(210,210,210,1) 4px',
                  borderBottom: 'solid rgba(210,210,210,1) 4px',
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
                    backgroundColor: 'rgba(240,240,240,1)',
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
                          boxShadow:
                            '-4px -4px 20px rgba(0,0,0,0.1),4px 4px 20px rgba(0,0,0,0.1)',
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
          ) : undefined}
        </div>
      </div>
    </>
  )
}

export default Updates
