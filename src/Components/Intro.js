import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckSquare } from 'react-icons/fa'

import ContextProvider from '../ContextProvider'

const Intro = ({ fillAllFields, setFillAllFields }) => {
  const { darkMode, winSize } = useContext(ContextProvider)

  useEffect(() => {
    window.localStorage.setItem('fill-all-fields', fillAllFields)
  }, [fillAllFields])
  return (
    <>
      <div
        style={{
          overflowY: 'auto',
          marginBottom: '70px',
          width: winSize <= 700 ? '100%' : '40%',
          margin: 'auto',
        }}
      >
        <div className='infos'>
          <h2>WelCome</h2>
          <section style={{ fontFamily: 'Calibri', fontSize: '1rem' }}>
            <div>
              We are glad to see you take your first step towards contributing
              to the network.
            </div>
            <div style={{ marginTop: '10px' }}>
              The registration process requires, not a lot but, quit
              considerable amount of data from you to get you started. It should
              take you only three minutes to fill in the required fields
            </div>
            <div style={{ marginTop: '10px' }}>
              {
                'We know how tedious and time taken that can be. So we have provided you with a choice to choose wether to fill the "must fill fields" and fill the rest as required later on, or fill in all your details at once.'
              }
            </div>
          </section>
          <div style={{ marginTop: '20px' }}>
            <li className='introLabel'>
              Click on a field to know if it is required or not.
            </li>
            <li className='introLabel'>
              The required fields are preffixed with a '*'.
            </li>
            <li className='introLabel'>
              Make sure you fill all required fields, as you may face some
              challenges finishing up if you do not.
            </li>
          </div>
          <div
            style={{
              margin: '10px',
              fontSize: '1.1rem',
              display: 'flex',
            }}
          >
            <div
              style={{ width: 'fit-content', marginRight: '20px' }}
              onClick={() => {
                setFillAllFields(!fillAllFields)
              }}
            >
              {fillAllFields ? (
                <FaCheckSquare
                  style={{
                    cursor: 'pointer',
                    color: 'green',
                  }}
                />
              ) : (
                <input
                  type='checkbox'
                  checked={false}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                />
              )}
            </div>

            <label>Fill in all required fields</label>
          </div>
        </div>
        <Link to='/signup/basicInfo'>
          <motion.button
            style={{
              margin: '15px auto',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              cursor: 'pointer',
              padding: '12px 20px',
              backgroundColor: 'red',
              border: 'solid red 1px',
              borderRadius: '20px',
              color: 'white',
              marginBottom: '50px',
            }}
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {'Continue'}
          </motion.button>
        </Link>
        <div style={{ color: 'black' }}>
          <label>Already have an account?{'  '}</label>
          <Link to='/signin' style={{ color: 'blue' }}>
            <label style={{ cursor: 'pointer' }}>{'Sign in'}</label>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Intro
