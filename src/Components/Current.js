import React, { useEffect, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const Curr = () => {
  return <div className='curr'></div>
}
const Current = ({ currentRef }) => {
  const { darkMode } = useContext(ContextProvider)

  return (
    <>
      <div
        className='current'
        style={{
          backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
        }}
        ref={currentRef}
      >
        <Curr />
        <Curr />
      </div>
    </>
  )
}

export default Current
