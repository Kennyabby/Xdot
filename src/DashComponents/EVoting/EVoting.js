import { React, useState, useEffect, useRef, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import ContextProvider from '../../ContextProvider'

import home from './assets/home.png'
import whome from './assets/whome.png'
import notifications from './assets/notifications.png'
import profile from './assets/profile.png'

const EVoting = ({
  chatrf,
  homerf,
  user,
  notificationsrf,
  server,
  showHomeToggle,
  viewRef,
}) => {
  const history = useHistory()
  const postHeldRef = useRef(null)
  const postAvailableRef = useRef(null)
  const postContestedRef = useRef(null)
  const [votString, setVotString] = useState('')
  const [votingHours, setVotingHours] = useState('')
  const [formSaleStart, setFormSaleStart] = useState('')
  const [formSaleEnd, setFormSaleEnd] = useState('')
  const [currentSession, setCurrentSession] = useState('')
  const [currentApplication, setCurrentApplication] = useState({})
  const [postView, setPostView] = useState([])
  const [postViewLabel, setPostViewLabel] = useState('')
  const [postHeld, setPostHeld] = useState([])
  const [postAvailable, setPostAvailable] = useState([])
  const [postContested, setPostContested] = useState([])
  const postsLabelRef = [postHeldRef, postAvailableRef, postContestedRef]
  const { darkMode, winSize } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(true)
    if (
      homerf !== undefined &&
      chatrf !== undefined &&
      notificationsrf !== undefined
    ) {
      if (
        notificationsrf.current !== null &&
        homerf.current !== null &&
        chatrf.current !== null
      ) {
        homerf.current.childNodes[0].childNodes[0].src = darkMode ? whome : home
        homerf.current.childNodes[0].childNodes[1].style.color = darkMode
          ? 'white'
          : 'blue'
        notificationsrf.current.childNodes[0].childNodes[0].src = notifications
        notificationsrf.current.childNodes[0].childNodes[1].style.color =
          darkMode ? 'white' : 'black'
      }
    }
  }, [homerf])

  const highlightPostLabel = (ref) => {
    postsLabelRef.forEach((labelRef) => {
      labelRef.current.style.boxShadow = 'none'
    })
    ref.current.style.boxShadow = darkMode
      ? ' -5px -5px 15px rgba(255,255,255,0.1),5px 5px 15px rgba(255,255,255,0.1)'
      : ' -5px -5px 15px rgba(0,0,0,0.1),5px 5px 15px rgba(0,0,0,0.1)'
  }

  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eVotingSettings: 1,
          positionSettings: 1,
          sessionSettings: 1,
        }),
      }
      const resp = await fetch(server + '/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      const votingDate = settings[1].eVotingSettings.votingDate
      const votingHours = settings[1].eVotingSettings.votingHours
      const formSaleStart = settings[1].eVotingSettings.formSaleStart
      const formSaleEnd = settings[1].eVotingSettings.formSaleEnd
      const currentSession = settings[0].sessionSettings.currentSession

      setVotString(new Date(votingDate))
      setVotingHours(votingHours)
      setFormSaleStart(new Date(formSaleStart))
      setFormSaleEnd(new Date(formSaleEnd))
      setCurrentSession(currentSession)

      const positionSettings = settings[2].positionSettings
      setPostAvailable([])
      positionSettings.forEach((post) => {
        if (post.requirements.level.includes(user.level)) {
          setPostAvailable((postAvailable) => {
            return [...postAvailable, post]
          })
        }
      })
    } catch (error) {}
  }, [])

  useEffect(() => {
    const applications = user.votingApplication
    if (applications !== undefined) {
      applications.forEach((application) => {
        if (application.isCompleted) {
          setPostContested((postContested) => {
            return [...postContested, application]
          })
          if (application.voted !== undefined && application.isVoted) {
            setPostHeld((postHeld) => {
              return [...postHeld, application]
            })
          }
        }
        if (application.currentSession === currentSession) {
          if (!application.isCompleted) {
            setCurrentApplication(application)
          }
        }
      })
    }
  }, [currentSession])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        <motion.div
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: { duration: 0.7, ease: 'easeOut' },
            opacity: { delay: 0.7, ease: 'easeOut', duration: 0.7 },
          }}
          style={{ margin: '35px', marginTop: '0px' }}
        >
          <label
            style={{
              fontFamily: 'fantasy',
              letterSpacing: '.2rem',
              fontSize: '1.1rem',
              borderRadius: '15px',
              padding: '15px 15px',
              border: 'solid rgba(200,200,200,1) 2px',
              backgroundColor: darkMode ? 'black' : 'white',
              borderBottom: 'solid rgba(0,50,0,0.9) 4px',
            }}
          >
            E-Voting
          </label>
        </motion.div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexWrap: winSize <= 700 ? 'wrap-reverse' : 'auto',
          }}
        >
          <div
            style={{
              width: winSize <= 700 ? 'auto' : '140%',
              margin: 'auto' + (winSize <= 700 ? '' : ' 20px'),
            }}
          >
            <div
              style={{
                margin: '20px 10px',
                borderRadius: '20px',
                border: 'solid rgba(210,210,210) 2px',
                backgroundColor: darkMode ? 'black' : 'white',
              }}
            >
              <div
                style={{
                  textAlign: 'left',
                  margin: '10px',
                  fontFamily: 'courier New',
                  fontWeight: 'bold',
                }}
              >
                <label>Office/Post</label>
              </div>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  margin: '5px auto',
                  backgroundImage: `url(${profile})`,
                  backgroundSize: 'cover',
                  border: 'solid rgba(210,210,210) 2px',
                }}
              ></div>
              <div
                style={{
                  padding: '10px',
                  borderBottom: 'solid rgba(200,200,200,1) 2px',
                }}
              >
                {user.firstName}
                <label
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    cursor: 'pointer',
                  }}
                >
                  {' (' +
                    (user.currentPost === undefined
                      ? 'Napsite'
                      : user.currentPost) +
                    ')'}
                </label>
              </div>
              <div
                style={{
                  margin: '10px',
                  borderBottom: 'solid rgba(210,210,210) 2px',
                  paddingBottom: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontWeight: 'bold',
                  }}
                >
                  <div
                    ref={postHeldRef}
                    style={{
                      display: 'block',
                      margin: 'auto',
                      borderRadius: '15px',
                    }}
                  >
                    <label>{postHeld.length}</label>
                    <div>
                      <button
                        onClick={() => {
                          setPostView(postHeld)
                          setPostViewLabel('held')
                          highlightPostLabel(postHeldRef)
                        }}
                        style={{
                          margin: '5px',
                          padding: '5px 10px',
                          color: 'red',
                          border: 'solid red 2px',
                          fontWeight: 'bold',
                          backgroundColor: darkMode
                            ? 'rgba(50,50,50,1)'
                            : 'white',
                          borderRadius: '10px',
                          fontFamily: 'monospace',
                          cursor: 'pointer',
                        }}
                      >
                        {'Held'}
                      </button>
                    </div>
                  </div>
                  <div
                    ref={postAvailableRef}
                    style={{
                      display: 'block',
                      margin: 'auto',
                      borderRadius: '15px',
                    }}
                  >
                    <label>{postAvailable.length}</label>
                    <div>
                      <button
                        onClick={() => {
                          setPostView(postAvailable)
                          setPostViewLabel('available')
                          highlightPostLabel(postAvailableRef)
                        }}
                        style={{
                          margin: '5px',
                          padding: '5px 10px',
                          color: 'red',
                          border: 'solid red 2px',
                          fontWeight: 'bold',
                          backgroundColor: darkMode
                            ? 'rgba(50,50,50,1)'
                            : 'white',
                          borderRadius: '10px',
                          fontFamily: 'monospace',
                          cursor: 'pointer',
                        }}
                      >
                        {'Available'}
                      </button>
                    </div>
                  </div>
                  <div
                    ref={postContestedRef}
                    style={{
                      display: 'block',
                      margin: 'auto',
                      borderRadius: '15px',
                    }}
                  >
                    <label>{postContested.length}</label>
                    <div>
                      <button
                        onClick={() => {
                          setPostView(postContested)
                          setPostViewLabel('contested')
                          highlightPostLabel(postContestedRef)
                        }}
                        style={{
                          margin: '5px',
                          padding: '5px 10px',
                          color: 'red',
                          border: 'solid red 2px',
                          fontWeight: 'bold',
                          backgroundColor: darkMode
                            ? 'rgba(50,50,50,1)'
                            : 'white',
                          borderRadius: '10px',
                          fontFamily: 'monospace',
                          cursor: 'pointer',
                        }}
                      >
                        {'Contested'}
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: '20px auto',
                  }}
                >
                  {postView.length
                    ? postView.map((position) => {
                        return (
                          <div
                            style={{
                              position: 'relative',
                              display: 'flex',
                              margin: '10px',
                              padding: '20px',
                              borderRadius: '10px',
                              justifyContent: 'left',
                              textAlign: 'left',
                              border: 'solid rgba(200,200,200,1) 1px',
                            }}
                          >
                            <div
                              style={{
                                width: '80px',
                                height: '80px',
                                margin: 'auto',
                                marginRight: '10px',
                                borderRadius: '50%',
                                boxShadow: darkMode
                                  ? '-4px -4px 10px rgba(255,255,255,0.1), 4px 4px 10px rgba(255,255,255,0.1)'
                                  : '-4px -4px 10px rgba(0,0,0,0.1), 4px 4px 10px rgba(0,0,0,0.1)',
                              }}
                            ></div>
                            <div
                              style={{ width: 'fit-content', margin: 'auto' }}
                            >
                              <div
                                style={{
                                  fontWeight: 'bold',
                                  width: 'fit-content',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  window.sessionStorage.setItem(
                                    'scrl-dt',
                                    position.position
                                  )
                                  history.push('/dashboard/e-voting/apply')
                                }}
                              >
                                {position.position.toUpperCase()}
                              </div>
                              <label
                                style={{
                                  fontFamily: 'monospace',
                                  fontStyle: 'italic',
                                }}
                              >
                                {position.description}
                              </label>
                            </div>
                            {postViewLabel === 'available' &&
                              currentApplication.post !== undefined &&
                              currentApplication.post.toLowerCase() ===
                                position.position.toLowerCase() && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    fontFamily: 'monospace',
                                    color: darkMode ? 'lightgreen' : 'green',
                                    fontSize: '.7rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    window.sessionStorage.setItem(
                                      'fm-dt',
                                      position.position
                                    )
                                    window.sessionStorage.setItem(
                                      'fm-z-cr-pg',
                                      'true'
                                    )
                                    history.push('/dashboard/e-voting/apply')
                                  }}
                                >
                                  application in progress...
                                </div>
                              )}
                          </div>
                        )
                      })
                    : postViewLabel !== '' && (
                        <div>{'No ' + postViewLabel + ' Posts.'}</div>
                      )}
                </div>
              </div>
              <div
                style={{
                  justifyContent: 'center',
                  margin: '20px 10px',
                  borderBottom: 'solid rgba(200,200,200,1) 2px',
                }}
              >
                <h3>Do You Wish To Be An Executive?</h3>
                <p>
                  <i>
                    Apply Below. You can check your eligibiliy for each post
                  </i>
                </p>
              </div>
              <div style={{ margin: '10px', fontFamily: 'monospace' }}>
                <div style={{ textAlign: 'left', fontSize: '.9rem' }}>
                  {formSaleEnd &&
                  new Date(formSaleEnd).getTime() > Date.now() ? (
                    <div>
                      {formSaleStart && new Date(formSaleStart) > Date.now() ? (
                        <div>
                          <h2>Starts By</h2>
                          <label>{new Date(formSaleStart).toString()}</label>
                        </div>
                      ) : (
                        <div>
                          <label>Application Is Currently On Going.</label>
                        </div>
                      )}
                      <h2>Ends By</h2>
                      <label>{new Date(formSaleEnd).toString()}</label>
                      <p style={{ fontStyle: 'italic' }}>
                        {
                          'Application for posts will go on within the period indicated. All applicants are required to have uploaded the neccessary documents and completed all required registrations before the deadline.'
                        }
                      </p>
                    </div>
                  ) : (
                    <div style={{ fontWeight: 'bold' }}>
                      <p>
                        {'Application for posts has ended for the session.'}
                      </p>
                    </div>
                  )}
                  <p>
                    Do well to check the duties tied to each post before
                    applying. Good luck.
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(0,0,50,0.9)',
                  boxShadow:
                    '-7px -7px 15px rgb(0,0,0,0.1),7px 7px 15px rgb(0,0,0,0.1)',
                  color: 'white',
                  fontFamily: 'Courier New',
                  textAlign: 'center',
                }}
              >
                <h2>APPLY FOR A POSITION</h2>
                <p>Be A NAPS Executive</p>
                <p>PSRC Member</p>
                <Link to='/dashboard/e-voting/apply'>
                  <button
                    style={{
                      padding: '8px',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: 'red',
                      borderRadius: '10px',
                    }}
                  >
                    {'Continue ->'}
                  </button>
                </Link>
              </div>
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                padding: '20px',
                margin: '10px',
                backgroundColor: darkMode ? 'black' : 'white',
                boxShadow:
                  '-7px -7px 15px rgb(0,0,0,0.1),7px 7px 15px rgb(0,0,0,0.1)',
                borderRadius: '10px',
                textAlign: 'left',
              }}
            >
              {votString && new Date(votString).getTime() > Date.now() ? (
                <div>
                  <h2>Voting Commences By</h2>
                  <div style={{ textAlign: 'left', fontSize: '.9rem' }}>
                    <label>{new Date(votString).toString()}</label>
                    <p style={{ fontStyle: 'italic' }}>
                      {'The Voting Will Go On For A Period Of ' +
                        votingHours +
                        ' Hours Starting From the Time Indicated Above.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'left', fontSize: '.9rem' }}>
                    <p style={{ fontStyle: 'italic' }}>
                      {'The Voting Will Go On For A Period Of ' +
                        votingHours +
                        ' Hours Starting From the Time Indicated Above.'}
                    </p>
                    <p>
                      <b>
                        Do Well To Vote In Your Preffered and Best Candidate.
                      </b>
                    </p>
                  </div>
                </div>
              )}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(0,50,0,0.9)',
                  boxShadow:
                    '-7px -7px 15px rgb(0,0,0,0.1),7px 7px 15px rgb(0,0,0,0.1)',
                  color: 'white',
                  fontFamily: 'Courier New',
                  textAlign: 'center',
                }}
              >
                <p>Know Your Candidate</p>
                <h2>CAST YOUR VOTE HERE</h2>
                <p>Make Your Vote Count</p>

                <Link to='/dashboard/e-voting/vote'>
                  <button
                    style={{
                      padding: '8px',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: 'red',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                    }}
                  >
                    {'Continue ->'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'left',
              padding: '10px',
              border: 'solid rgba(200,200,200,1) 2px',
              backgroundColor: darkMode ? 'black' : 'white',
              borderRadius: '15px',
              margin: '10px',
            }}
          >
            <h2 style={{ fontFamily: 'fantasy' }}>GENERAL REQUIREMENTS</h2>
            <p style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
              {' '}
              <i>The following are required of both aspirants and voters</i>
            </p>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 1, delay: 0.7 }}
                style={{
                  margin: '10px',
                  display: 'block',
                  fontFamily: 'monospace',
                  listStyle: 'none',
                }}
              >
                <li
                  style={{
                    padding: '10px',
                    boxShadow: darkMode
                      ? '-5px -5px 15px rgb(255,255,255,0.1),5px 5px 15px rgb(255,255,255,0.1)'
                      : '-5px -5px 15px rgb(10,10,10,0.1),5px 5px 15px rgb(10,10,10,0.1)',
                    borderRadius: '15px',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  Both aspirants and voters must be bonafide NAPSITE according
                  to the provisions of the constitution.
                </li>
                <br></br>
                <li
                  style={{
                    padding: '10px',
                    boxShadow: darkMode
                      ? '-5px -5px 15px rgb(255,255,255,0.1),5px 5px 15px rgb(255,255,255,0.1)'
                      : '-5px -5px 15px rgb(0,0,0,0.1),5px 5px 15px rgb(0,0,0,0.1)',
                    borderRadius: '15px',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  Must have paid his/her NAPS due for the session.
                </li>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EVoting
