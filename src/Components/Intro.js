import React from 'react'
import { Link } from 'react-router-dom'

const Intro = () => {
  return (
    <>
      <div style={{overflowY:"auto", marginBottom:'70px'}}>
        <div className='infos'>
          <p>
            This page is strictly for members of the National Association of
            Physics Students University of Ibadan Division <b>(NAPS UI)</b>, as
            only members can access its priviledges. The Registration process
            requires that all members provide their University of Ibadan student{' '}
            <b>MATRIC NUMBER</b>. Click the button below to proceed.
          </p>
          <ul>
            <b>
              Listed below are instructions that are to be followed as you fill
              the form:
            </b>
            <li>
              <p>Click on a field to know if it is required or not.</p>
            </li>
            <li>
              <p>The required fields are preffixed with a '*'.</p>
            </li>
            <li>
              <p>
                Make sure you fill all required fields, as you may face
                challenges finishing up if you do not.
              </p>
            </li>
            <li>
              <p>
                As you fill in the <b>signup-info section</b>, kindly take your
                time to enter carefully a <b>four digit number</b> (This will be
                your identification number) that you should always remember.
              </p>
            </li>
            <li>
              <p>
                If you face any challenge as you fill the form, kindly click on{' '}
                <b>help</b> below to get it resolved.
              </p>
            </li>
            <li>
              <p>
                <Link to='/help'>
                  <button
                    className='close'
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Help
                  </button>
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <Link to='/signup/basicInfo'>
          <button className='close' style={{color:'green', marginBottom:"70px"}}>Continue</button>
        </Link>
      </div>
      
    </>
  )
}

export default Intro
