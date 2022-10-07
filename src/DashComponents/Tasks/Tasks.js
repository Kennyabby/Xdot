import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import home from './assets/home.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Tasks = ({ homerf, chatrf, notificationsrf, showHomeToggle }) => {
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].src = home
        homerf.current.childNodes[0].childNodes[1].style.color = 'blue'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color = 'black'
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
