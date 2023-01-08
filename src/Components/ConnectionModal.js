import { React, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const ConnectionModal = ({
  title,
  message,
  multiple,
  button1,
  button2,
  func1,
  func2,
}) => {
  const { darkMode } = useContext(ContextProvider)
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: '1',
        }}
      >
        <div
          style={{
            padding: '20px',
            margin: '40px',
            backgroundColor: darkMode ? 'white' : 'rgba(0,0,0,0.9)',
            color: darkMode ? 'black' : 'white',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            borderRadius: '15px',
            textAlign: 'left',
          }}
        >
          <h2>{title}</h2>
          <label>{message}</label>
          <div
            style={{
              display: 'flex',
              width: '100%',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <button
              onClick={() => {
                func1()
              }}
              style={{
                marginRight: 'auto',
                marginLeft: multiple ? '10px' : 'auto',
                color: multiple ? 'blue' : 'red',
                padding: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              {button1}
            </button>
            {multiple ? (
              <button
                onClick={() => {
                  func2()
                }}
                style={{
                  marginRight: '10px',
                  marginLeft: 'auto',
                  padding: '10px',
                  color: 'red',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                {button2}
              </button>
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectionModal
