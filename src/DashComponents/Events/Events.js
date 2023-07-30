import { React, useState, useEffect, useContext } from 'react'

import ContextProvider from '../../ContextProvider'

import home from './assets/home.png'
import whome from './assets/whome.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Events = ({ chatrf, homerf, notificationsrf, showHomeToggle }) => {
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].src = darkMode ? whome : home
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
    }
  }, [homerf])
  const [view, setView] = useState('Events')
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default Events
