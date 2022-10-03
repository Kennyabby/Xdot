import { React, useState, useEffect } from 'react'

const Events = ({ chatrf, homerf, notificationsrf, showHomeToggle }) => {
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.style.borderBottom = 'solid blue 0px'
        chatrf.current.style.borderBottom = 'solid blue 0px'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
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
