import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import ContextProvider from '../ContextProvider'

import home from './assets/home.png'
import whome from './assets/whome.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Notifications = ({ homerf, chatrf, notificationsrf }) => {
  const { id } = useParams()
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src =
        id === 'notifications' ? blbell : notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color =
        id === 'notifications' ? 'blue' : darkMode ? 'white' : 'black'
    }
    homerf.current.childNodes[0].childNodes[0].src = darkMode ? whome : home
    homerf.current.childNodes[0].childNodes[1].style.color =
      id === 'notifications' ? (darkMode ? 'white' : 'black') : 'blue'
  }, [notificationsrf, id])
  return (
    <>
      <div>Notifications</div>
    </>
  )
}

export default Notifications
