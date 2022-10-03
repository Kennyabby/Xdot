import { React, useState, useEffect } from 'react'

const Notifications = ({ homerf, chatrf, notificationsrf }) => {
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 2px'
    }
    homerf.current.style.borderBottom = 'solid blue 0px'
    chatrf.current.style.borderBottom = 'solid blue 0px'
  }, [notificationsrf])
  return (
    <>
      <div>Notifications</div>
    </>
  )
}

export default Notifications
