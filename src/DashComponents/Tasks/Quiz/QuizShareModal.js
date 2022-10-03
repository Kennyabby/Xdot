import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import cancel from '../assets/close.png'
const QuizShareModal = ({
  closeModal,
  notifyUpdate,
  editQuiz,
  user,
  server,
}) => {
  const history = useHistory()
  const shareLabel = ['grandQuiz', 'public', 'group']
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  const label = {
    grandQuiz: { collection: 'NapsGrandQuiz', value: 'Grand Quiz' },
    public: { collection: 'NapsPublic', value: 'Public' },
    group: { collection: 'NapsGroup', value: 'Group' },
  }
  const [fields, setFields] = useState({
    quizComment: '',
    shareQuizTo: 'Grand Quiz',
  })
  useEffect(() => {}, [])
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  useEffect(() => {}, [fields])
  const handleShareQuiz = async () => {
    setShowUpdateStatus(true)
    var shareQuizTo = fields.shareQuizTo
    var collection = 'NapsGrandQuiz'
    Object.values(label).forEach((labl) => {
      if (labl.value === fields.shareQuizTo) {
        collection = labl.collection
      }
    })
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: collection,
          update: {
            matricNo: user.matricNo,
            quiz: editQuiz,
            quizComment: fields.quizComment,
            createdAt: Date.now(),
          },
        }),
      }
      const resp = await fetch(server + '/postQuiz', opts)
      const response = await resp.json()
      const isDelivered = response.isDelivered
      if (isDelivered) {
        closeModal()
        notifyUpdate(
          'Shared ' +
            editQuiz.title.toUpperCase() +
            ' to ' +
            shareQuizTo +
            ' Successfully'
        )
        history.push('/dashboard/events/grandquiz')
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: '100vw' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
          when: 'beforeChildren',
        }}
        exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } }}
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          overflowY: 'auto',
          zIndex: '2',
          backgroundColor: 'rgba(255,255,255,1)',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          onClick={() => {
            closeModal()
          }}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            zIndex: '1',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          src={cancel}
          alt='close add quiz'
          height='20px'
        />
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <div
            style={{
              fontWeight: '1.1rem',
              width: 'fit-content',
              margin: '20px auto',
              fontWeight: 'bold',
              fontFamily: 'Courier New',
              padding: '10px',
              boxShadow: '0px 0px 7px',
              borderRadius: '10px',
            }}
          >
            <label>{('Share ' + editQuiz.title).toUpperCase()}</label>
          </div>
          <div
            onChange={handleInputChange}
            style={{
              margin: '10px auto',
              fontWeight: 'bold',
              textAlign: 'left',
              justifyContent: 'left',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <select
                className='updateinput'
                style={{
                  border: 'solid lightgreen 2px',
                  cursor: 'pointer',
                  fontSize: '.8rem',
                }}
                name='shareQuizTo'
                value={fields.shareQuizTo}
              >
                {shareLabel.map((labl) => {
                  return <option>{label[labl].value}</option>
                })}
              </select>
            </div>
            <div>
              <textarea
                name='quizComment'
                value={fields.quizComment}
                placeholder='Say Something...'
                style={{
                  padding: '10px',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  height: '200px',
                  width: '300px',
                }}
              />
            </div>
          </div>

          <div style={{ margin: '50px' }}>
            <button
              onClick={handleShareQuiz}
              style={{
                fontSize: '1rem',
                padding: '10px',
                borderRadius: '10px',
                fontFamily: 'monospace',
                color: 'green',
                border: 'solid green 2px',
                cursor: 'pointer',
              }}
            >
              {'Share Quiz >>'}
            </button>
          </div>
        </div>
        {showUpdateStatus && (
          <p>
            <label
              style={{
                color: 'blue',
                backgroundColor: 'lightblue',
                borderRadius: '10px',
                padding: '10px',
                marginBottom: '50px',
                fontStyle: 'italic',
                fontSize: '.8rem',
                border: 'solid blue 2px',
              }}
            >
              {'Sharing. Please Wait...'}
            </label>
          </p>
        )}
      </motion.div>
    </>
  )
}

export default QuizShareModal
