import React, { useEffect, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const About = ({ setRef }) => {
  const { darkMode, server } = useContext(ContextProvider)
  const event = useRef(null)
  useEffect(() => {
    setRef(event)
  }, [])
  return (
    <>
      <footer
        className='footer'
        style={{
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
          border: darkMode ? 'solid black 2px' : 'solid white 2px',
        }}
        ref={event}
      ></footer>
    </>
  )
}

export default About
