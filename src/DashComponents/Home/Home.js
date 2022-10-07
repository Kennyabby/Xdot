import { React, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Updates from './Updates'

import home from './assets/home.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Home = ({
  server,
  user,
  homerf,
  chatrf,
  notificationsrf,
  setBodyLeft,
  setShowNavigator,
  showHomeToggle,
}) => {
  const [view, setView] = useState('')
  const [showUpdates, setShowUpdates] = useState(true)
  const { id } = useParams()
  useEffect(() => {
    showHomeToggle(true)
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color = 'black'
    }
    if (homerf.current !== null) {
      homerf.current.childNodes[0].childNodes[0].src =
        id === undefined ? blhome : home
      homerf.current.childNodes[0].childNodes[1].style.color = 'blue'
      // chatrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      // chatrf.current.style.boxShadow = 'none'
    }
    setBodyLeft()
    setShowNavigator()
  }, [homerf, id])
  useEffect(() => {
    if (showUpdates) {
      setView(
        <Updates
          server={server}
          user={user}
          showHomeToggle={(show) => {
            showHomeToggle(show)
          }}
        />
      )
    }
  }, [showUpdates])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default Home
