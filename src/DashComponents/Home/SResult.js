import { React, useState, useEffect, useRef, useContext } from 'react'
import '../Events/Events.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import profimg from '../Events/assets/profile.png'
import ContextProvider from '../../ContextProvider'

const SResult = ({ user, currentUser }) => {
  const [userUrl, setUserUrl] = useState('')
  const { darkMode, server } = useContext(ContextProvider)
  const history = useHistory()
  useEffect(async () => {
    if (user.userName !== undefined && user.img !== '') {
      try {
        const opts1 = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imgUrl: user.img.url,
            userName: user.userName,
          }),
        }
        const resp1 = await fetch(server + '/getImgUrl', opts1)
        const response1 = await resp1.json()
        const url = response1.url
        setUserUrl(url)
      } catch (TypeError) {}
    }
  }, [user])

  const handleClick = () => {
    history.push('/dashboard/profile-view/' + user.userName)
  }
  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'left',
        marginBottom: '10px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <div>
        <LazyLoadImage
          src={userUrl}
          width={40}
          height={40}
          style={{
            backgroundColor: user.img !== '' ? user.img.dominantColor : '',
            boxShadow: darkMode
              ? '-5px -5px 10px rgba(0,0,0,0.1),5px 5px 10px rgba(0,0,0,0.1)'
              : '-5px -5px 10px rgba(250,250,250,0.1),5px 5px 10px rgba(250,250,250,0.1)',
            backgroundSize: 'cover',
            borderRadius: '50%',
            border: 'solid rgba(220,220,220,1) 1px',
            margin: '5px auto',
          }}
          PlaceholderSrc={profimg}
          effect='blur'
          alt='user photo'
        />
      </div>
      <div style={{ display: 'block', textAlign: 'left', margin: '7px' }}>
        <div style={{ fontWeight: 'bold' }}>
          {user.firstName + ' ' + user.middleName + ' ' + user.lastName}
        </div>
        <div
          style={{
            color: darkMode ? 'rgba(190,190,200)' : 'rgba(16,16,16)',
          }}
        >
          {'@' + user.userName}
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default SResult
