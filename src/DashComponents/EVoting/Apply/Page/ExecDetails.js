import { React, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfirmationModal from '../../../ConfirmationModal'

const ExecDetails = ({ exco, viewForm, user, currentSession, server }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toggleStatus, setToggleStatus] = useState('<< >>')
  const [buttonStatus, setButtonStatus] = useState('Apply >>')
  const [message, setMessage] = useState('')

  const handleToggle = () => {
    if (showDetails) {
      setShowDetails(false)
      setToggleStatus('<< >>')
    } else {
      setShowDetails(true)
      setToggleStatus('>><<')
    }
  }
  const updateUserApplication = async ({ nw }) => {
    var body = user.votingApplication
    if (body !== undefined) {
      var isCurrentSession = false
      body.forEach((application) => {
        if (application.currentSession === currentSession) {
          isCurrentSession = true
          application.post = nw.post
          application.isCompleted = nw.isCompleted
        }
      })

      if (!isCurrentSession) {
        nw.currentSession = currentSession
        body = body.concat([nw])
      }
    } else {
      body = []
      nw.currentSession = currentSession
      body = body.concat([nw])
    }
    const votingApplication = body
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
              votingApplication: votingApplication,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        viewForm({ data: exco.title })
      }
    } catch (TypeError) {}
  }
  const handleShowForm = () => {
    setButtonStatus('Hold on..')
    const nw = {
      post: exco.title,
      isCompleted: false,
    }
    const applications = user.votingApplication
    if (applications !== undefined) {
      var isCurrentSession = false
      applications.forEach((application) => {
        if (application.currentSession === currentSession) {
          isCurrentSession = true
          if (application.post !== exco.title) {
            setMessage(
              'You are currently applying for the ' +
                application.post +
                "'s position. Do you wish to cancel the application and apply newly for the office of " +
                exco.title +
                '?'
            )
            setShowModal(true)
          } else {
            viewForm({ data: exco.title })
          }
        }
      })
      if (!isCurrentSession) {
        updateUserApplication({ nw: nw })
      }
    } else {
      updateUserApplication({ nw: nw })
    }
  }
  return (
    <>
      <AnimatePresence>
        {showModal ? (
          <ConfirmationModal
            title={'Please Confirm'}
            message={message}
            button1={'Cancel'}
            button2={'Proceed'}
            func1={() => {
              setShowModal(false)
              setButtonStatus('Apply >>')
            }}
            func2={() => {
              const nw = {
                post: exco.title,
                isCompleted: false,
              }
              setShowModal(false)
              updateUserApplication({ nw: nw })
            }}
          />
        ) : undefined}
      </AnimatePresence>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '1rem',
          backgroundColor: 'rgba(220,220,220)',
          boxShadow: '0px 0px 7px black',
          borderRadius: '5px',
          paddingBottom: '15px',
          margin: '7px',
          marginBottom: '20px',
        }}
      >
        <div style={{ padding: '10px' }}>
          <h2>{exco.title.toUpperCase()}</h2>
          <label
            style={{
              fontStyle: 'italic',
              fontFamily: 'Courier New',
              fontWeight: 'bold',
            }}
          >
            {exco.brief}
          </label>
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.8, ease: 'easeIn' },
                }}
                style={{
                  textAlign: 'left',
                  backgroundColor: 'white',
                  marginTop: '10px',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <h3 style={{ fontWeight: 'bold' }}>Duties</h3>
                {exco.details.map((detail, id) => {
                  return (
                    <p style={{ fontSize: '0.8rem' }} key={id}>
                      {detail}
                    </p>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <div style={{ margin: '10px' }}>
            <button
              style={{
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '10px',
                color: 'red',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
              onClick={handleShowForm}
            >
              {buttonStatus}
            </button>
          </div>
        </div>
        <div
          onClick={handleToggle}
          style={{
            cursor: 'pointer',
            backgroundColor: 'white',
            padding: '5px',
          }}
        >
          <label style={{ cursor: 'pointer' }}>{toggleStatus}</label>
        </div>
      </div>
    </>
  )
}

export default ExecDetails
