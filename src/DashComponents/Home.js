import { React, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const Home = ({
  homerf,
  chatrf,
  notificationsrf,
  setBodyLeft,
  setShowNavigator,
}) => {
  useEffect(() => {
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
    homerf.current.style.borderBottom = 'solid blue 2px'
    chatrf.current.style.borderBottom = 'solid blue 0px'
    setBodyLeft()
    setShowNavigator()
  }, [homerf])

  return (
    <>
      <div>
        <div className='srchcover'>
          <input
            className='srch'
            placeholder='Search for applications and view your recent pages'
          />
        </div>
      </div>
    </>
  )
}

export default Home
