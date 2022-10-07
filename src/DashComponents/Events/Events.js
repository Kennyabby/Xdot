import { React, useState, useEffect } from 'react'

const Events = ({ chatrf, homerf, notificationsrf, showHomeToggle }) => {
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.style.backgroundColor = 'rgba(250,250,255,.8)'
        homerf.current.style.boxShadow = '0px 0px 8px black'
        chatrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
        chatrf.current.style.boxShadow = 'none'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      notificationsrf.current.style.boxShadow = 'none'
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
