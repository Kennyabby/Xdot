import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cancel from '../assets/close.png'
const QuizShareModal = ({ closeModal, notifyUpdate, editQuiz, user }) => {
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
      const resp = await fetch('http://localhost:3001/postQuiz', opts)
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
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '2px',
          overflowY: 'auto',
          zIndex: '1',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: 'solid blue 1px',
          width: '98%',
          height: '70%',
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
          height='40px'
        />
        <div
          style={{ margin: '20px', fontWeight: '1.2rem', fontWeight: 'bold' }}
        >
          <label>{('Share ' + editQuiz.title).toUpperCase()}</label>
        </div>
        <div style={{ margin: '20px', fontWeight: '1rem' }}>
          <label>Say Something...</label>
        </div>
        <div onChange={handleInputChange}>
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
          <div
            style={{
              display: 'inline-flex',
              gap: '20px',
              margin: '10px',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}
          >
            <div style={{ margin: '5px' }}>
              <label>Share To</label>
            </div>
            <select
              className='updateinput'
              style={{ border: 'solid lightgreen 2px', cursor: 'pointer' }}
              name='shareQuizTo'
              value={fields.shareQuizTo}
            >
              {shareLabel.map((labl) => {
                return <option>{label[labl].value}</option>
              })}
            </select>
          </div>
        </div>
        <div style={{ margin: '50px' }}>
          <label
            onClick={handleShareQuiz}
            style={{
              fontSize: '1rem',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'lightgreen',
              border: 'solid white 2px',
              cursor: 'pointer',
            }}
          >
            Share Quiz
          </label>
        </div>
        {showUpdateStatus && (
          <p>
            <label style={{ color: 'lightgreen' }}>
              {'Sharing. Please Wait...'}
            </label>
          </p>
        )}
      </div>
    </>
  )
}

export default QuizShareModal
