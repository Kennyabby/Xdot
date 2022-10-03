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
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
    homerf.current.style.borderBottom = 'solid blue 0px'
    chatrf.current.style.borderBottom = 'solid blue 2px'

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
