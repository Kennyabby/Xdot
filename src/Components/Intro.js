import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Intro = () => {
  return (
    <>
      <div style={{ overflowY: 'auto', marginBottom: '70px' }}>
        <div className='infos'>
          <h2>Instructions</h2>
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ textAlign: 'center', fontFamily: 'Courier New' }}>
              Listed below are instructions that are to be followed as you fill
              the form:
            </h4>
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
            <li className='introLabel'>
              As you fill in the <b>signup-info section</b>, kindly take your
              time to enter carefully a <b>four digit number</b> (This will be
              your identification number) that you should always remember.
            </li>
          </div>
        </div>
        <Link to='/signup/basicInfo'>
          <motion.button
            style={{
              margin: 'auto',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '10px',
              color: 'green',
              marginBottom: '70px',
            }}
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {'Continue >>'}
          </motion.button>
        </Link>
        <div style={{ color: 'black' }}>
          <label>Already have an account?</label>
          <Link to='/signin'>
            <label style={{ cursor: 'pointer' }}>{' Sign in'}</label>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Intro
