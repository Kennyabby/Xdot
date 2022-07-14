import { React, useState, useEffect, useRef } from 'react'
import '../Events.css'
import { Link } from 'react-router-dom'

import QuizPost from './QuizPost'

const QuizUpdates = ({ user, showQuizPage }) => {
  const [updates, setUpdates] = useState([])
  const [prevUpdates, setPrevUpdates] = useState([])
  const lastPostRef = useRef(null)
  const [lastPostDimension, setLastPostDimension] = useState('')
  const [lastUpdatedPost, setLastUpdatedPost] = useState('')
  const [showPostUpdatesStatus, setShowPostUpdatesStatus] = useState(false)
  const [gotUpdates, setGotUpdates] = useState(false)
  const [postUpdatesStatus, setPostUpdatesStatus] = useState('')
  const [highlightedPost, setHighlightedPost] = useState(null)
  const [currentPostShow, setCurrentPostShow] = useState(null)
  const [newPostShow, setNewPostShow] = useState(null)
  const maxNumberOfRequest = 4

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
    setNewPostShow(currentPostShow)
  }, [currentPostShow])
  const checkLastPostDimension = async () => {
    setLastPostDimension(lastPostRef.current.getBoundingClientRect().y)
  }
  const getNewUpdates = async (lastQuizUpdate) => {
    var updateFrom = lastQuizUpdate
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
          collection: 'NapsGrandQuiz',
          data: { createdAt: { $lt: updateFrom } },
          limit: maxNumberOfRequest,
        }),
      }
      const resp = await fetch('https://napsuiserver.herokuapp.com/getUpdates', opts)
      const response = await resp.json()
      const updates = response.updates
      setLastUpdatedPost(updates[updates.length - 1])
      shufflePosts(updates)
      setUpdates(updates)
      setPrevUpdates(updates)
      setGotUpdates(true)
    } catch (TypeError) {}
  }
  useEffect(() => {
    window.addEventListener('scroll', checkLastPostDimension)
    return () => {
      window.removeEventListener('scroll', checkLastPostDimension)
    }
  }, [lastPostDimension])
  useEffect(() => {
    getNewUpdates(user.lastQuizUpdate)
  }, [user])
  useEffect(async () => {
    if (highlightedPost === null) {
      window.sessionStorage.setItem('pageOffset', window.pageYOffset)
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
        setPostUpdatesStatus('Getting More Updates...')
        try {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              collection: 'NapsGrandQuiz',
              data: { createdAt: { $lt: updateFrom } },
              limit: maxNumberOfRequest,
            }),
          }
          const resp = await fetch('https://napsuiserver.herokuapp.com/getUpdates', opts)
          const response = await resp.json()
          const updt = response.updates
          setLastUpdatedPost(updt[updt.length - 1])
          if (updt.length < maxNumberOfRequest) {
            setShowPostUpdatesStatus(true)
            setPostUpdatesStatus('No More Updates Availble!')
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
        setPostUpdatesStatus('No More Updates Availble!')
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
          collection: 'NapsGrandQuiz',
          data: { createdAt: createdAt },
        }),
      }

      const resp = await fetch('https://napsuiserver.herokuapp.com/getOneUpdate', opts)
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
            }else{
              setNewPostShow(null)
            }
          })
        }

        if (rct === 'comment') {
          setTimeout(() => {
            window.scrollTo(0, Number.MAX_SAFE_INTEGER)
          }, 500)
        }
      }
      var done = update
      return done
    } catch (TypeError) {}
  }
  return (
    <>
      <div style={{ paddingTop: highlightedPost !== null ? '50px' : '2px' }}>
        {highlightedPost === null ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <Link to='/dashboard/tasks/quizapp'>
              <button
                style={{
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  padding: '5px',
                  fontWeight: 'bolder',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  borderRadius: '10px',
                  border: 'solid darkblue 2px',
                  backgroundColor: 'blue',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                POST A QUIZ
              </button>
            </Link>
          </div>
        ) : undefined}
        {updates.length ? (
          <div>
            <div>
              {highlightedPost === null ? (
                updates.map((update, i) => {
                  return (
                    <QuizPost
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
                      showQuizPage={(quiz) => {
                        showQuizPage(quiz)
                      }}
                    />
                  )
                })
              ) : (
                <QuizPost
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
                  showQuizPage={(quiz) => {
                    showQuizPage(quiz)
                  }}
                />
              )}
            </div>
            <div ref={lastPostRef} style={{ paddingBottom: '70px' }}>
              {highlightedPost === null && showPostUpdatesStatus ? (
                <label
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    padding: '10px',
                  }}
                >
                  {postUpdatesStatus}
                </label>
              ) : undefined}
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: 'Courier New', margin: '50px' }}>
            {gotUpdates
              ? 'Hi, ' +
                user.firstName +
                '. Welcome to XDot Quiz Updates.\nMark history in the department by being the first to post a quiz on this page.'
              : ''}
          </div>
        )}
      </div>
    </>
  )
}

export default QuizUpdates
