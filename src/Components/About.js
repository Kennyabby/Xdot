import React, { useEffect, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const About = ({ aboutRef }) => {
  const { darkMode, server } = useContext(ContextProvider)
  return (
    <>
      <footer
        className='footer'
        style={{
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
          border: darkMode ? 'solid black 2px' : 'solid white 2px',
        }}
        ref={aboutRef}
      ></footer>
    </>
  )
}

export default About
