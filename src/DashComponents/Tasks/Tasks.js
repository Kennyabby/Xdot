import { React, useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import ContextProvider from '../../ContextProvider'

import home from './assets/home.png'
import whome from './assets/whome.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Tasks = ({ homerf, chatrf, notificationsrf, showHomeToggle }) => {
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].src = darkMode ? whome : home
        homerf.current.childNodes[0].childNodes[1].style.color = 'blue'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color = darkMode
        ? 'white'
        : 'black'
    }
  }, [homerf])
  const [view, setView] = useState('Tasks')
  const { id } = useParams()
  useEffect(() => {}, [id])

  return (
    <>
      <div style={{ color: 'black' }}>{view}</div>
    </>
  )
}

export default Tasks
