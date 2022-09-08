import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EVoting = ({ chatrf, homerf, notificationsrf, server }) => {
  const [votString, setVotString] = useState('')
  const [votingHours, setVotingHours] = useState('')
  const [formSaleStart, setFormSaleStart] = useState('')
  const [formSaleEnd, setFormSaleEnd] = useState('')

  useEffect(() => {
    if (homerf !== undefined && chatrf !== undefined) {
      homerf.current.style.borderBottom = 'solid blue 0px'
      chatrf.current.style.borderBottom = 'solid blue 0px'
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
  }, [homerf])
  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eVotingSettings: 1 }),
      }
      const resp = await fetch(server + '/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      const votingDate = settings[1].eVotingSettings.votingDate
      const votingHours = settings[1].eVotingSettings.votingHours
      const formSaleStart = settings[1].eVotingSettings.formSaleStart
      const formSaleEnd = settings[1].eVotingSettings.formSaleEnd
      setVotString(new Date(votingDate))
      setVotingHours(votingHours)
      setFormSaleStart(new Date(formSaleStart))
      setFormSaleEnd(new Date(formSaleEnd))
    } catch (error) {}
  }, [])

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
          style={{ margin: '25px' }}
        >
          <label
            style={{
              fontFamily: 'fantasy',
              letterSpacing: '.2rem',
              fontSize: '1.1rem',
              boxShadow: '0px 0px 6px black',
              // fontWeight: 'bold',
              // fontStyle: 'italic',
              borderRadius: '15px',
              padding: '10px 15px',
              borderBottom: 'solid rgba(0,50,0,0.9) 4px',
            }}
          >
            E-Voting
          </label>
        </motion.div>
        <div style={{ textAlign: 'left', padding: '10px' }}>
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
                  boxShadow: '0px 0px 7px black',
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                Both aspirants and voters must be bonafide NAPSITE according to
                the provisions of the constitution.
              </li>
              <br></br>
              <li
                style={{
                  padding: '10px',
                  boxShadow: '0px 0px 7px black',
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
        <div
          style={{
            fontFamily: 'monospace',
            padding: '20px',
            margin: '10px',
            border: 'solid rgba(210,210,210) 2px',
            boxShadow: '0px 0px 8px rgba(0,0,0,1)',
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
                  <b>Do Well To Vote In Your Preffered and Best Candidate.</b>
                </p>
              </div>
            </div>
          )}
          <div
            style={{
              padding: '20px',
              borderRadius: '20px',
              backgroundColor: 'rgba(0,50,0,0.9)',
              boxShadow: '0px 0px 6px black',
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
        <div
          style={{
            justifyContent: 'center',
            gap: '30px',
            margin: '10px',
          }}
        >
          <h3>Do You Wish To Be An Executive?</h3>
          <p>
            <i>Apply Below. You can check your eligibiliy for each post</i>
          </p>
        </div>
        <div
          style={{
            fontFamily: 'monospace',
            padding: '20px',
            margin: '10px',
            border: 'solid rgba(210,210,210) 2px',
            boxShadow: '0px 0px 8px rgba(0,0,0,1)',
            borderRadius: '10px',
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ textAlign: 'left', fontSize: '.9rem' }}>
              {formSaleEnd && new Date(formSaleEnd).getTime() > Date.now() ? (
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
                <div>
                  <p>{'Application for posts has ended for the session.'}</p>
                </div>
              )}
              <p>
                Do well to check the duties tied to each post before applying.
                Good luck.
              </p>
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              borderRadius: '20px',
              backgroundColor: 'rgba(0,0,50,0.9)',
              boxShadow: '0px 0px 6px black',
              color: 'white',
              fontFamily: 'Courier New',
              textAlign: 'center',
            }}
          >
            <h2>APPLY FOR A POST</h2>
            <p>Be A NAPS Executive</p>
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
      </div>
    </>
  )
}

export default EVoting
