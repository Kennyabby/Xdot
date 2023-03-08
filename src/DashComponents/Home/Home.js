import { React, useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'

import ContextProvider from '../../ContextProvider'
import Updates from './Updates'

import home from './assets/home.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import whome from './assets/whome.png'
import blbell from './assets/blbell.png'

const Home = ({
  server,
  user,
  homerf,
  chatrf,
  notificationsrf,
  setShowNavigator,
  showHomeToggle,
  viewRef,
  winSize,
}) => {
  const [view, setView] = useState('')
  const [showUpdates, setShowUpdates] = useState(true)
  const { id } = useParams()
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(true)
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].style.color = darkMode
        ? 'rgba(190,190,230)'
        : 'rgba(16,16,66)'
      notificationsrf.current.childNodes[0].childNodes[1].style.color = darkMode
        ? 'rgba(190,190,230)'
        : 'rgba(16,16,66)'
      notificationsrf.current.childNodes[0].childNodes[1].style.fontWeight =
        'lighter'
    }
    if (homerf.current !== null) {
      homerf.current.childNodes[0].childNodes[0].style.color =
        id === undefined
          ? darkMode
            ? 'white'
            : 'black'
          : darkMode
          ? 'rgba(190,190,230)'
          : 'rgba(16,16,66)'
      homerf.current.childNodes[0].childNodes[1].style.color = darkMode
        ? 'white'
        : 'black'
      homerf.current.childNodes[0].childNodes[1].style.fontWeight = 'bold'
      // chatrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      // chatrf.current.style.boxShadow = 'none'
    }
    setShowNavigator()
  }, [homerf, id, darkMode])
  useEffect(() => {
    if (showUpdates) {
      setView(
        <Updates
          server={server}
          user={user}
          showHomeToggle={(show) => {
            showHomeToggle(show)
          }}
          viewRef={viewRef}
          winSize={winSize}
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
