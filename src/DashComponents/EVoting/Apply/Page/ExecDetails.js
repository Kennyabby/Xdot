import { React, useState } from 'react'
import ConfirmationModal from '../../../ConfirmationModal'

const ExecDetails = ({ exco, viewForm, user, currentSession, server }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toggleStatus, setToggleStatus] = useState('<<-->>')
  const [buttonStatus, setButtonStatus] = useState('Apply >>')
  const [message, setMessage] = useState('')

  const handleToggle = () => {
    if (showDetails) {
      setShowDetails(false)
      setToggleStatus('<<-->>')
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
                ' position. Do you wish to cancel the application and apply newly for the post of ' +
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
      {showModal ? (
        <div>
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
        </div>
      ) : undefined}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '1rem',
          backgroundColor: 'rgba(240,240,240)',
          paddingBottom: '7px',
          margin: '7px',
        }}
      >
        <div style={{ padding: '10px' }}>
          <h2>{exco.title.toUpperCase()}</h2>
          <label style={{ fontStyle: 'italic' }}>{exco.brief}</label>
          {showDetails ? (
            <div
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
                return <p key={id}>{detail}</p>
              })}
            </div>
          ) : undefined}
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
