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
  const { id } = useParams()
  useEffect(() => {
    showHomeToggle(true)
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      notificationsrf.current.style.boxShadow = 'none'
    }
    if (homerf.current !== null) {
      homerf.current.style.backgroundColor =
        id === undefined ? 'rgba(150,150,255,.8)' : 'rgba(250,250,255,.8)'
      homerf.current.style.boxShadow = '0px 0px 8px black'
      chatrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      chatrf.current.style.boxShadow = 'none'
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
