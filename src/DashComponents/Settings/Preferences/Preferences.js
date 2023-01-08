import { useEffect } from 'react'
import { React, useState, useContext } from 'react'

import ContextProvider from '../../../ContextProvider'
const Preferences = () => {
  const { darkMode, setDarkMode } = useContext(ContextProvider)
  useEffect(() => {
    console.log(darkMode)
  }, [darkMode])
  return (
    <>
      <div>
        <div>{'Preferences Settings'}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '25px',
          }}
        >
          <div>Dark Mode</div>
          <input
            type='radio'
            checked={darkMode}
            name='mode'
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Preferences
