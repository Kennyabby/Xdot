import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import cancel from '../Events/assets/close.png'
const PostPageModal = ({ closeModal, notifyUpdate, user, server }) => {
  const history = useHistory()
  const postLabel = ['public', 'group', 'napsite']
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  const label = {
    napsite: { collection: 'NapsitesFeed', value: 'Napsites' },
    public: { collection: 'NapsPublic', value: 'Public' },
    group: { collection: 'NapsGroup', value: 'Group' },
  }
  const [fields, setFields] = useState({
    postComment: '',
    postTo: 'Public',
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
  const handlePost = async () => {
    setShowUpdateStatus(true)
    var postTo = fields.postTo
    var collection = 'NapsPublic'
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
            postComment: fields.postComment,
            createdAt: Date.now(),
          },
        }),
      }
      const resp = await fetch(server + '/postQuiz', opts)
      const response = await resp.json()
      const isDelivered = response.isDelivered
      if (isDelivered) {
        closeModal()
        notifyUpdate('Posted to ' + postTo + ' Successfully')
        closeModal()
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
          when: 'beforeChildren',
        }}
        exit={{
          x: '-100vw',
          opacity: 0,
          transition: { duration: 0.7, ease: 'easeIn' },
        }}
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          backgroundColor: 'rgba(255,255,255,1)',
          zIndex: '2',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          textAlign: 'center',
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
          alt='close post page'
          height='20px'
        />
        <div
          style={{
            margin: 'auto',
            overflowY: 'auto',
            width: '90%',
            height: '90%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              marginTop: '15px',
              width: 'fit-content',
              padding: '5px 10px',
              boxShadow: '0px 0px 7px',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: 'Courier New',
              fontWeight: 'bold',
            }}
          >
            <label style={{ margin: 'auto' }}>Create a Post</label>
          </div>

          <div
            onChange={handleInputChange}
            style={{
              textAlign: 'left',
              margin: '10px',
              marginTop: '20px',
              marginLeft: '15px',
              fontWeight: 'bold',
              justifyContent: 'left',
            }}
          >
            <select
              className='updateinput'
              style={{
                border: 'solid lightgreen 2px',
                cursor: 'pointer',
                padding: '5px 10px',
              }}
              name='postTo'
              value={fields.postTo}
            >
              {postLabel.map((labl) => {
                return <option>{label[labl].value}</option>
              })}
            </select>
          </div>
          <div onChange={handleInputChange}>
            <div>
              <textarea
                name='postComment'
                value={fields.postComment}
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
          <div
            style={{ width: 'fit-content', margin: '20px', marginLeft: 'auto' }}
          >
            <button
              onClick={handlePost}
              style={{
                marginRight: 'auto',
                fontFamily: 'monospace',
                fontSize: '1rem',
                padding: '10px',
                borderRadius: '10px',
                color: 'green',
                border: 'solid green 2px',
                cursor: 'pointer',
              }}
            >
              {'Post >>'}
            </button>
          </div>
          <div style={{ margin: '50px' }}></div>
          {showUpdateStatus && (
            <p>
              <label style={{ color: 'lightgreen' }}>
                {'Posting. Please Wait...'}
              </label>
            </p>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default PostPageModal
