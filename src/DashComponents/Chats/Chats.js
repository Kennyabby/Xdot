import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import home from './assets/home.png'
import xdotlogo from './assets/xdotlogo.png'
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
      <div style={{ textAlign: 'center', width: '100vw', textAlign: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            display: 'flex',
            borderBottom: 'solid rgba(200,200,200,1) 2px',
          }}
        >
          <Link
            to='/dashboard'
            style={{
              cursor: 'pointer',
              width: '15%',
              textAlign: 'center',
              width: 'fit-content',
              flexWrap: 'wrap',
              textDecoration: 'none',
              margin: 'auto 10px',
              marginLeft: '10px',
              textShadow: '0px 0px 3px black',
              color: 'red',
              display: 'block',
              fontFamily: 'monospace',
              fontSize: '21px',
              fontWeight: 'bolder',
            }}
          >
            <img src={xdotlogo} height='30px' />
            <label style={{ margin: '5px' }}>XDot</label>
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
            <label>Chats</label>
          </div>
        </div>
        <div style={{ marginTop: '90px' }}>Chats Will Appear Here...</div>
      </div>
    </>
  )
}

export default Chats
