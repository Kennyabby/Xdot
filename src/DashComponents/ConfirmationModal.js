import { React, useContext } from 'react'
import { motion } from 'framer-motion'

import ContextProvider from '../ContextProvider'

const ConfirmationModal = ({
  message,
  title,
  button1,
  button2,
  func1,
  func2,
}) => {
  const { darkMode } = useContext(ContextProvider)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, when: 'beforeChildren' }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          zIndex: '3',
          backgroundColor: darkMode ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)',
          alignContent: 'center',
          textAlign: 'center',
          paddingTop: '50px',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          exit={{
            y: '-100vh',
            transition: {
              delay: 0,
              when: 'beforeParent',
              ease: 'easeIn',
              duration: 0.7,
            },
          }}
          style={{
            width: '70%',
            margin: 'auto',
            textAlign: 'left',
            backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'white',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '1rem',
            padding: '15px',
          }}
        >
          <h2>
            <center>{title}</center>
          </h2>
          <div>{message}</div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
              marginTop: '50px',
              width: '90%',
            }}
          >
            <button
              className='ebtn'
              style={{
                color: 'red',
                marginRight: 'auto',
              }}
              onClick={() => {
                func1()
              }}
            >
              {button1}
            </button>
            <button
              className='ebtn'
              style={{
                color: 'white',
                backgroundColor: 'blue',
                marginLeft: 'auto',
              }}
              onClick={() => {
                func2()
              }}
            >
              {button2}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default ConfirmationModal
