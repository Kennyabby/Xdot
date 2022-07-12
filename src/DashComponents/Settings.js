import { React, useState, useEffect } from 'react'

const Settings = ({ chatrf, homerf, notificationsrf }) => {
  useEffect(() => {
    if (homerf !== undefined && chatrf !== undefined) {
      homerf.current.style.borderBottom = 'solid blue 0px'
      chatrf.current.style.borderBottom = 'solid blue 0px'
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
  }, [homerf])
  return (
    <>
      <div>Settings</div>
    </>
  )
}

export default Settings
