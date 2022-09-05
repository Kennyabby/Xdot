import { React, useState, useEffect } from 'react'
import '../../EVoting.css'

const Form = ({ server, viewPage, user, data }) => {
  useEffect(() => {}, [])
  return (
    <>
      <div>
        <div
          className='bpd'
          onClick={() => {
            viewPage()
          }}
        >
          {'<< View Post Duties'}
        </div>
        <div></div>
      </div>
    </>
  )
}

export default Form
