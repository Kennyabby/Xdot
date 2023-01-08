import { React, useState, useEffect, useRef, useContext } from 'react'

import ContextProvider from '../../../../ContextProvider'

const SecondChild = ({
  setFields,
  fields,
  buttonStatus,
  left,
  size,
  top,
  position,
  secondChildRef,
  handleButtonEvent,
}) => {
  const { darkMode } = useContext(ContextProvider)
  return (
    <>
      <div
        ref={secondChildRef}
        style={{
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
          position: position,
          left: left + 'px',
          top: top + 'px',
          width: size <= 700 ? size : '100%',
        }}
      >
        <div
          className='forminfo'
          style={{
            backgroundColor: darkMode ? 'black' : 'white',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <div>{'Second Child'}</div>
          <div style={{ margin: '30px' }}>
            <button
              style={{
                padding: '10px 30px',
                borderRadius: '20px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
                textShadow: '0px 0px 5px white',
                boxShadow: '6px 6px 8px black',
                border: 'solid rgba(40,40,255,1) 2px',
                backgroundColor: 'rgba(40,40,255,1)',
              }}
              onClick={() => {
                handleButtonEvent()
              }}
            >
              {buttonStatus}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SecondChild
