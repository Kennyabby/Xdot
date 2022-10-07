import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import home from './assets/home.png'
import notifications from './assets/notifications.png'

const Chats = ({
  homerf,
  chatrf,
  notificationsrf,
  setBodyLeft,
  setShowNavigator,
  showHomeToggle,
}) => {
  useEffect(() => {
    showHomeToggle(false)

    setBodyLeft()
    setShowNavigator()
  }, [chatrf])
  return (
    <>
      <div style={{ textAlign: 'center', width: '100vw' }}>
        <Link to='/dashboard'>
          <div style={{ position: 'fixed', top: '10px', left: '10px' }}>
            <img src={home} height='25px' />
          </div>
        </Link>
        <div
          style={{
            fontSize: '1.1rem',
            fontFamily: 'fantasy',
            fontWeight: 'bold',
            letterSpacing: '.2rem',
            padding: '10px 20px',
            width: 'fit-content',
            margin: '10px auto',
            borderRadius: '10px',
            border: 'solid rgba(200,200,200,1) 1px',
          }}
        >
          <label>XDot Chats</label>
        </div>
      </div>
    </>
  )
}

export default Chats
