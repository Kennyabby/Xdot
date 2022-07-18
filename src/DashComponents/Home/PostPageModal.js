import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cancel from '../Events/assets/close.png'
const PostPageModal = ({ closeModal, notifyUpdate, user, server }) => {
  const history = useHistory()
  const postLabel = ['public', 'group','napsite']
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
      const resp = await fetch(server+'/postQuiz', opts)
      const response = await resp.json()
      const isDelivered = response.isDelivered
      if (isDelivered) {
        closeModal()
        notifyUpdate(
          'Posted to ' +
            postTo +
            ' Successfully'
        )
        closeModal()
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          zIndex: '1',
          width: '100vw',
          height: '100vh',
          justifyContent:'center',
          textAlign:'center',
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
            margin:'auto',
            overflowY: 'auto',
            width:'90%',
            height:'90%',
          }}
        >
          <div
            style={{ display:'flex', justifyContent:'center', margin:'10px',fontWeight: '1.2rem', fontWeight: 'bold' }}
          >
            <label
              onClick={handlePost}
              style={{
                marginRight:'auto',
                fontSize: '1rem',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'lightgreen',
                border: 'solid white 2px',
                cursor: 'pointer',
              }}
            >
              Post
            </label>
            <label style={{margin:'auto'}}>Create a Post</label>
          </div>
          <div style={{ margin: '20px', fontWeight: '1rem' }}>
            <label>Say Something...</label>
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
            <div
              style={{
                display: 'inline-flex',
                gap: '20px',
                margin: '10px',
                fontWeight: 'bold',
                justifyContent: 'center',
              }}
            >
              <select
                className='updateinput'
                style={{ border: 'solid lightgreen 2px', cursor: 'pointer' }}
                name='postTo'
                value={fields.postTo}
              >
                {postLabel.map((labl) => {
                  return <option>{label[labl].value}</option>
                })}
              </select>
            </div>
          </div>
          <div style={{ margin: '50px' }}>
            
          </div>
          {showUpdateStatus && (
            <p>
              <label style={{ color: 'lightgreen' }}>
                {'Posting. Please Wait...'}
              </label>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default PostPageModal
