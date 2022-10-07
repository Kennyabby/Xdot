import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import home from './assets/home.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Notifications = ({ homerf, chatrf, notificationsrf }) => {
  const { id } = useParams()
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src =
        id === 'notifications' ? blbell : notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color =
        id === 'notifications' ? 'blue' : 'black'
    }
    homerf.current.childNodes[0].childNodes[0].src = home
    homerf.current.childNodes[0].childNodes[1].style.color =
      id === 'notifications' ? 'black' : 'blue'
  }, [notificationsrf, id])
  return (
    <>
      <div>Notifications</div>
    </>
  )
}

export default Notifications
