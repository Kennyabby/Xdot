import React, { useEffect, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const Curr = () => {
  return <div className='curr'></div>
}
const Current = ({ setRef }) => {
  const { darkMode } = useContext(ContextProvider)
  const event = useRef(null)
  useEffect(() => {
    setRef(event)
  }, [])
  return (
    <>
      <div
        className='current'
        style={{
          backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
        }}
        ref={event}
      >
        <Curr />
        <Curr />
      </div>
    </>
  )
}

export default Current
