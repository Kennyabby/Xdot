import { React, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../Tasks.css'

import CourseView from './CourseView'
import UpdateCourse from './UpdateCourse'

import add from '../assets/add.jpg'
import top from '../assets/top.png'
import bottom from '../assets/bottom.png'

const CgpaCalc = ({ user, updateUser, winSize, server }) => {
  const [currentSession, setCurrentSession] = useState(null)
  const [userSessions, setUserSessions] = useState([])
  const [updateRequest, setUpdateRequest] = useState('')
  const [showUpdateForm, setShowUpdateForm] = useState(0)
  const [gradingScale, setGradingScale] = useState('')
  const [skippedSessions, setSkippedSessions] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [edittingCourse, setEdittingCourse] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const sessionSelectRef = useRef(null)
  const [sessionValue, setSessionValue] = useState(
    sessionSelectRef.current === null && 'allSessions'
  )
  const [cgpaDimension, setCgpaDimension] = useState(null)
  const [sessionDimension, setSessionDimension] = useState({})
  const cgpaRef = useRef(null)
  const personalizeRef = useRef(null)
  const quickAccessRef = useRef(null)
  const [showStore, setShowStore] = useState(true)
  const checkCgpaDimension = () => {
    setCgpaDimension(cgpaRef.current.getBoundingClientRect())
  }
  useEffect(() => {
    personalizeRef.current.style.borderBottom = 'solid lightgreen 0px'
    quickAccessRef.current.style.borderBottom = 'solid lightgreen 0px'
    if (showStore) {
      personalizeRef.current.style.borderBottom = 'solid lightgreen 2px'
    } else {
      quickAccessRef.current.style.borderBottom = 'solid lightgreen 2px'
    }
  }, [showStore])
  useEffect(() => {
    window.addEventListener('scroll', checkCgpaDimension)
    return () => {
      window.removeEventListener('scroll', checkCgpaDimension)
    }
  }, [cgpaDimension])
  const checkSessionDimension = () => {
    setSessionDimension(sessionSelectRef.current.getBoundingClientRect())
  }
  useEffect(() => {
    window.addEventListener('scroll', checkSessionDimension)
    return () => {
      window.removeEventListener('scroll', checkSessionDimension)
    }
  }, [sessionDimension])

  useEffect(() => {
    if (sessionSelectRef.current !== null) {
      setSessionValue(sessionSelectRef.current.value)
    }
  }, [sessionSelectRef])

  useEffect(() => {
    if (showUpdateForm !== 0 && updateRequest === 'add') {
      window.scrollTo(0, window.innerHeight + Number.MAX_SAFE_INTEGER)
    }
  }, [showUpdateForm])

  const listUserSessions = ({ currentSession, admissionSession }) => {
    const admissionYear = Number(
      admissionSession.slice(currentSession.indexOf('/') + 1)
    )
    const currentYear = Number(
      currentSession.slice(currentSession.indexOf('/') + 1)
    )

    var sessionList = []
    for (var i = admissionYear; i <= currentYear; i++) {
      const year = String(i - 1 + '/' + i)
      sessionList = sessionList.concat(String(year))
    }

    const filteredSessionList = sessionList.filter((year) => {
      return !skippedSessions.includes(year)
    })
    return filteredSessionList
  }
  const getLevelForSession = (session) => {
    const noOfYears = Number(user.level.slice(0, 1))
    var level = ''
    const sessionList = listUserSessions({
      currentSession: currentSession,
      admissionSession: user.yearOfAdmission,
    })
    sessionList.forEach((ses, i) => {
      if (ses === session) {
        level = String((noOfYears - sessionList.length + i + 1) * 100)
      }
    })
    return level
  }
  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionSettings: 1 }),
      }
      const resp = await fetch(server + '/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      const currentSession = settings[0].sessionSettings.currentSession
      const gradingScale = settings[0].sessionSettings.gradingScale
      const skippedSessions = settings[0].sessionSettings.skippedSessions
      setCurrentSession(currentSession)
      setGradingScale(gradingScale)
      setSkippedSessions(skippedSessions)
    } catch (error) {}
  }, [])
  useEffect(() => {
    if (currentSession !== null) {
      setUserSessions(
        listUserSessions({
          currentSession: currentSession,
          admissionSession: user.yearOfAdmission,
        })
      )
    }
  }, [skippedSessions])
  const notify = ({ message }) => {
    setShowNotification(true)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage('')
      setShowNotification(false)
    }, 3000)
  }
  const getTotalUnitsForSession = (session) => {
    const totalSessions = userSessions.slice(
      0,
      userSessions.indexOf(session) + 1
    )
    var totalUnits = 0
    user.courseDetails.forEach((course) => {
      if (totalSessions.includes(course.session))
        totalUnits += Number(course.unit)
    })
    return totalUnits
  }
  const getGpWeightForSession = (session) => {
    const totalSessions = userSessions.slice(
      0,
      userSessions.indexOf(session) + 1
    )
    var gpWeight = 0
    user.courseDetails.forEach((course) => {
      if (totalSessions.includes(course.session))
        gpWeight += Number(course.unit) * Number(course.gp)
    })
    return gpWeight
  }
  const getCgpaForSession = (session) => {
    const cgpa =
      getGpWeightForSession(session) / getTotalUnitsForSession(session)

    return (
      String(cgpa).slice(0, 3) +
      String(
        Number(String(cgpa).slice(3, 4)) +
          (Number(String(cgpa).slice(4, 5)) >= 5 ? 1 : 0)
      )
    )
  }
  const handleRemoveCourse = async (course) => {
    user.courseDetails = user.courseDetails.filter((detail) => {
      return detail !== course
    })

    var courseDetails = user.courseDetails
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { matricNo: user.matricNo },
            {
              courseDetails: courseDetails,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        notify({
          message:
            'Removed Course: ' + course.code.toUpperCase() + ' Successfully',
        })
      }
    } catch (TypeError) {}
  }
  const filteredCourseDetails = () => {
    const filtered = user.courseDetails.filter((course) => {
      return (
        course.session === sessionValue || !userSessions.includes(sessionValue)
      )
    })
    return filtered
  }
  return (
    <>
      <div>
        <div
          onClick={(e) => {
            const name = e.target.getAttribute('name')
            if (name === 'personalize') {
              setShowStore(true)
            } else {
              setShowStore(false)
            }
          }}
          style={{
            display: 'flex',
            gap: '20px',
            width: 'fit-content',
            margin: 'auto',
            marginTop: '10px',
            fontWeight: 'bold',
          }}
        >
          <label
            name='personalize'
            ref={personalizeRef}
            style={{
              padding: '5px',
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              fontSize: 'italic',
              cursor: 'pointer',
            }}
          >
            Personalize
          </label>
          <label
            name='quickAccess'
            ref={quickAccessRef}
            style={{
              padding: '5px',
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              fontSize: 'italic',
              cursor: 'pointer',
            }}
          >
            Quick Access
          </label>
        </div>
        {showStore ? (
          <div style={{ textAlign: 'center', width: 'fit-content' }}>
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.7, ease: 'easeIn' },
                  }}
                  style={{
                    padding: '10px',
                    position: 'fixed',
                    top: '60px',
                    zIndex: '2',
                    justifyContent: 'center',
                    width: '100vw',
                  }}
                >
                  <label
                    style={{
                      margin: 'auto',
                      padding: '10px',
                      fontSize: '.9rem',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      backgroundColor: 'rgba(0,0,0,0.9)',
                      borderRadius: '10px',
                      color: 'white',
                    }}
                  >
                    {notificationMessage}
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {cgpaDimension !== null && cgpaDimension.y <= 0 && (
                <motion.label
                  initial={{ x: '-100vw' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  exit={{
                    x: '-100vw',
                    transition: { duration: 0.5, ease: 'easeIn' },
                  }}
                  className='cgpa'
                  style={{ position: 'fixed' }}
                >
                  {'CGPA: ' +
                    String(
                      sessionValue !== 'allSessions'
                        ? getCgpaForSession(sessionValue)
                        : getCgpaForSession(
                            userSessions[userSessions.length - 1]
                          )
                    )}
                </motion.label>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showUpdateForm && (
                <UpdateCourse
                  server={server}
                  user={user}
                  course={edittingCourse}
                  session={sessionValue}
                  gradingScale={gradingScale}
                  request={updateRequest}
                  closeUpdate={() => {
                    setShowUpdateForm(false)
                    setEdittingCourse(null)
                  }}
                  notifyUpdate={(message) => {
                    notify({ message: message })
                  }}
                />
              )}
            </AnimatePresence>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                textAlign: 'center',
                justifyContent: 'center',
                width: 'fit-content',
                marginTop: '20px',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className='cgpamessage'
              >
                {'Hi, ' + user.firstName + '. Welcome to '}
                <b>Xdot</b>
                {' CGPA Calculator and Organizer.'}
              </motion.div>
              <motion.div
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                className='cgpaview'
              >
                {user.courseDetails.length ? (
                  sessionValue !== 'allSessions' ? (
                    <div style={{ textAlign: 'left' }}>
                      <p>
                        <label>
                          <b>Level:</b>
                          {' ' + getLevelForSession(sessionValue)}
                        </label>
                      </p>
                      <p>
                        <label>
                          <b>Total Units:</b>
                          {' ' + getTotalUnitsForSession(sessionValue)}
                        </label>
                      </p>
                      <p>
                        <label>
                          <b>Weighted Grade Point:</b>
                          {' ' + getGpWeightForSession(sessionValue)}
                        </label>
                      </p>
                      <p>
                        <label ref={cgpaRef}>
                          <b>CGPA:</b>
                          {' ' + getCgpaForSession(sessionValue)}
                        </label>
                      </p>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'left' }}>
                      <p>
                        <label>
                          <b>Total Units:</b>
                          {' ' +
                            getTotalUnitsForSession(
                              userSessions[userSessions.length - 1]
                            )}
                        </label>
                      </p>
                      <p>
                        <label>
                          <b>Weighted Grade Point:</b>
                          {' ' +
                            getGpWeightForSession(
                              userSessions[userSessions.length - 1]
                            )}
                        </label>
                      </p>
                      <p>
                        <label ref={cgpaRef}>
                          <b>Cummulative Grade Point Average:</b>
                          {' ' +
                            getCgpaForSession(
                              userSessions[userSessions.length - 1]
                            )}
                        </label>
                      </p>
                    </div>
                  )
                ) : (
                  <div>Your CGPA Will Appear Here!</div>
                )}
              </motion.div>
            </div>
            <select
              className='selectsession'
              ref={sessionSelectRef}
              onChange={(e) => {
                const value = e.target.value
                setSessionValue(value)
              }}
            >
              <option value='allSessions'>All Sessions</option>
              {userSessions.map((session, i) => {
                return (
                  <option key={i} value={session}>
                    {session}
                  </option>
                )
              })}
            </select>

            {filteredCourseDetails().length ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: '100px',
                  fontFamily: 'monospace',
                }}
              >
                <label style={{ margin: '10px' }}>
                  {filteredCourseDetails().length +
                    (filteredCourseDetails().length > 1
                      ? ' Courses'
                      : ' Course') +
                    ' Listed'}
                </label>
                {filteredCourseDetails().map((course, i) => {
                  return (
                    <CourseView
                      editCourse={(course) => {
                        setEdittingCourse(course)
                        setUpdateRequest('edit')
                        setShowUpdateForm(true)
                      }}
                      removeCourse={(course) => {
                        handleRemoveCourse(course)
                      }}
                      index={i}
                      key={i}
                      course={course}
                    />
                  )
                })}
              </div>
            ) : (
              <div
                style={{
                  margin: '50px',
                  paddingBottom: '80px',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                }}
              >
                {sessionValue === 'allSessions'
                  ? 'Select a Session to Proceed.'
                  : 'Click The Add Button To Add Courses For ' +
                    sessionValue +
                    ' Session.'}
              </div>
            )}
            <AnimatePresence>
              {sessionValue !== 'allSessions' && (
                <motion.img
                  initial={{ x: '100vw' }}
                  animate={{ x: 0 }}
                  transition={{ ease: 'easeOut', duration: 0.7, delay: 0.5 }}
                  exit={{
                    x: '100vw',
                    transition: { ease: 'easeIn', duration: 0.7 },
                  }}
                  src={add}
                  alt='add'
                  className='addcourse'
                  style={{
                    position: 'fixed',
                    boxShadow: 'black 0px 0px 7px',
                    border: 'solid black 1px',
                    backgroundColor: 'black',
                  }}
                  onClick={() => {
                    setUpdateRequest('add')
                    setShowUpdateForm(true)
                  }}
                  height='25px'
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {filteredCourseDetails().length > 7 && (
                <motion.img
                  initial={{ x: '-100vw' }}
                  animate={{ x: 0 }}
                  transition={{ ease: 'easeOut', duration: 0.7, delay: 0.5 }}
                  exit={{
                    x: '-100vw',
                    transition: { ease: 'easeIn', duration: 0.7 },
                  }}
                  src={sessionDimension.y < 0 ? top : bottom}
                  className='scrollpos'
                  onClick={() => {
                    if (sessionDimension.y < 0) {
                      window.scrollTo(0, 0)
                    } else {
                      window.scrollTo(0, Number.MAX_SAFE_INTEGER)
                    }
                  }}
                  style={{ position: 'fixed' }}
                  height='20px'
                />
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div>others</div>
        )}
      </div>
    </>
  )
}

export default CgpaCalc
