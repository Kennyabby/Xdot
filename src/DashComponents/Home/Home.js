import { React, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Updates from './Updates'
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
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
    homerf.current.style.borderBottom = 'solid blue 2px'
    chatrf.current.style.borderBottom = 'solid blue 0px'
    setBodyLeft()
    setShowNavigator()
  }, [homerf])
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
