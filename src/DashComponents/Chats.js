import { React, useState, useEffect, useRef } from 'react'

const Chats = ({
  homerf,
  chatrf,
  notificationsrf,
  setBodyLeft,
  setShowNavigator,
  showHomeToggle,
}) => {
  useEffect(() => {
    showHomeToggle(true)
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.backgroundColor = 'rgba(0,0,0,0)'
      notificationsrf.current.style.boxShadow = 'none'
    }
    chatrf.current.style.backgroundColor = 'rgba(250,250,255,.8)'
    chatrf.current.style.boxShadow = '0px 0px 8px black'
    homerf.current.style.backgroundColor = 'rgba(0,0,0,0)'
    homerf.current.style.boxShadow = 'none'

    setBodyLeft()
    setShowNavigator()
  }, [chatrf])
  return (
    <>
      <div>Chats</div>
    </>
  )
}

export default Chats
