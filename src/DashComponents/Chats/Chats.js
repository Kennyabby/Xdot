import { React, useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'

import ContextProvider from '../../ContextProvider'

import home from './assets/home.png'
import xdotlogo from './assets/xdotlogo.png'
import notifications from './assets/notifications.png'

const Chats = ({
  homerf,
  chatrf,
  notificationsrf,
  setShowNavigator,
  showHomeToggle,
}) => {
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(false)
    setShowNavigator()
  }, [chatrf])
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            position: 'fixed',
            top: '10px',
            right: '0px',
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
        </div>
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: 'whitesmoke',
              margin: 'auto 5px',
            }}
          ></div>
          <div
            style={{
              height: '100%',
              width: '40%',
              backgroundColor: 'tomato',
              opacity: '0.8',
              margin: 'auto 5px',
            }}
          ></div>
          <div
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: 'tomato',
              margin: 'auto 5px',
            }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default Chats
