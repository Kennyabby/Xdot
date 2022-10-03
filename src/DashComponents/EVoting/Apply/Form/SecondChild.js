import { React, useState, useEffect, useRef } from 'react'

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
  return (
    <>
      <div
        ref={secondChildRef}
        style={{
          position: position,
          left: left + 'px',
          top: top + 'px',
          width: size <= 700 ? size : '100%',
        }}
      >
        <div className='forminfo'>
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
