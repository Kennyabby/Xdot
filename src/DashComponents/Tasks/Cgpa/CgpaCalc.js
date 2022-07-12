import { React, useState, useEffect, useRef } from 'react'
import '../Tasks.css'

import CourseView from './CourseView'
import UpdateCourse from './UpdateCourse'

import add from '../assets/add.jpg'
import top from '../assets/top.png'
import bottom from '../assets/bottom.png'

const CgpaCalc = ({ user, updateUser, winSize }) => {
  const [currentSession, setCurrentSession] = useState(null)
  const [userSessions, setUserSessions] = useState([])
  const [updateRequest, setUpdateRequest] = useState('')
  const [showUpdateForm, setShowUpdateForm] = useState(0)
  const [gradingScale, setGradingScale] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [edittingCourse, setEdittingCourse] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [sessionValue, setSessionValue] = useState('allSessions')
  const sessionSelectRef = useRef(null)
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
    const skipedSessions = ['2019/2020']

    var sessionList = []
    for (var i = admissionYear; i <= currentYear; i++) {
      const year = String(i - 1 + '/' + i)
      sessionList = sessionList.concat(String(year))
    }

    const filteredSessionList = sessionList.filter((year) => {
      return !skipedSessions.includes(year)
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
      const resp = await fetch('https://napsuiserver.herokuapp.com/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      const currentSession = settings.sessionSettings.currentSession
      const gradingScale = settings.sessionSettings.gradingScale
      setCurrentSession(currentSession)
      setGradingScale(gradingScale)
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
  }, [currentSession])
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
      const resp = await fetch('https://napsuiserver.herokuapp.com/updateOneUser', opts)
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
          <div style={{ textAlign: 'center' }}>
            {showNotification && (
              <label
                style={{
                  padding: '10px',
                  position: 'fixed',
                  top: '0px',
                  zIndex: '1',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  borderRadius: '10px',
                  color: 'white',
                }}
              >
                {notificationMessage}
              </label>
            )}
            {cgpaDimension !== null && cgpaDimension.y <= 0 && (
              <div style={{ backgroundColor: 'blue', textAlign: 'center' }}>
                <label className='cgpa'>
                  {'CGPA: ' +
                    String(
                      sessionValue !== 'allSessions'
                        ? getCgpaForSession(sessionValue)
                        : getCgpaForSession(
                            userSessions[userSessions.length - 1]
                          )
                    )}
                </label>
              </div>
            )}

            {showUpdateForm ? (
              <UpdateCourse
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
            ) : undefined}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '50px',
                marginTop: '20px',
              }}
            >
              <div className='cgpamessage'>
                {'Hi, ' +
                  user.firstName +
                  '. Welcome to Xdot CGPA Calculator and Organizer.'}
              </div>
              <div className='cgpaview'>
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
              </div>
            </div>
            <select
              className='selectsession'
              ref={sessionSelectRef}
              onChange={(e) => {
                const value = e.target.value
                setSessionValue(value)
              }}
            >
              {userSessions.map((session, i) => {
                return (
                  <option key={i} value={session}>
                    {session}
                  </option>
                )
              })}
              <option value='allSessions'>All Sessions</option>
            </select>

            {filteredCourseDetails().length ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: '50px',
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
            {sessionValue !== 'allSessions' && (
              <img
                src={add}
                alt='add'
                className='addcourse'
                style={{
                  boxShadow: 'black 6px 6px 7px',
                  border: 'solid black 1px',
                }}
                onClick={() => {
                  setUpdateRequest('add')
                  setShowUpdateForm(true)
                }}
                height='25px'
              />
            )}
            {filteredCourseDetails().length > 7 ? (
              <img
                src={sessionDimension.y < 0 ? top : bottom}
                className='scrollpos'
                onClick={() => {
                  if (sessionDimension.y < 0) {
                    window.scrollTo(0, 0)
                  } else {
                    window.scrollTo(0, Number.MAX_SAFE_INTEGER)
                  }
                }}
                height='25px'
              />
            ) : undefined}
          </div>
        ) : (
          <div>others</div>
        )}
      </div>
    </>
  )
}

export default CgpaCalc
