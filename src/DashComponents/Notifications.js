import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
const Notifications = ({ homerf, chatrf, notificationsrf }) => {
  const { id } = useParams()
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.backgroundColor =
        id === 'notifications' ? 'rgba(150,150,255,.8)' : 'rgba(0,0,0,0)'
      notificationsrf.current.style.boxShadow =
        id === 'notifications' ? '0px 0px 8px black' : 'none'
    }
    homerf.current.style.backgroundColor =
      id === 'notifications' ? 'rgba(0,0,0,0)' : 'rgba(250,250,255,.8)'
    homerf.current.style.boxShadow =
      id === 'notifications' ? 'none' : '0px 0px 8px black'
    chatrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
    chatrf.current.style.boxShadow = 'none'
  }, [notificationsrf, id])
  return (
    <>
      <div>Notifications</div>
    </>
  )
}

export default Notifications
