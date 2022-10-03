import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Intro = () => {
  return (
    <>
      <div style={{ overflowY: 'auto', marginBottom: '70px' }}>
        <div className='infos'>
          <div
            style={{
              width: 'fit-content',
              padding: '15px',
              margin: '3px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              borderRadius: '50px',
              boxShadow: '0px 0px 6px black',
            }}
          >
            <h2>Notice</h2>
            <p>
              This page is strictly for members of the National Association of
              Physics Students University of Ibadan Division <b>(NAPS UI)</b>,
              as only members can access its priviledges. The Registration
              process requires that all members provide their University of
              Ibadan student <b>MATRIC NUMBER</b>. Click the button below to
              proceed.
            </p>
            <p>
              If You Come Across Any Challenge As You Fill The Form, Kindly
              Click The Help Button Below To Get It Resolved.
            </p>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Link to='/help'>
                <button
                  style={{
                    margin: 'auto',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '10px',
                    color: 'red',
                  }}
                >
                  {'Help >>'}
                </button>
              </Link>
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <h4 style={{ textAlign: 'center' }}>
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
      </div>
    </>
  )
}

export default Intro
