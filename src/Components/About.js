import React, { useEffect, useRef } from 'react'

const About = ({ setRef }) => {
  const event = useRef(null)
  useEffect(() => {
    setRef(event)
  }, [])
  return (
    <>
      <footer className='footer' ref={event}></footer>
    </>
  )
}

export default About
