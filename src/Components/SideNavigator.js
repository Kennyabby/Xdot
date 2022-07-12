import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

const SideNavigator = ({ getLabelRefs, infoConfirmedList, setValidate }) => {
  const history = useHistory()
  const [reRender, setRerender] = useState(false)
  const basicLabel = useRef(null)
  const schoolLabel = useRef(null)
  const contactLabel = useRef(null)
  const signupLabel = useRef(null)
  const finishLabel = useRef(null)
  useEffect(() => {
    getLabelRefs([
      basicLabel,
      schoolLabel,
      contactLabel,
      signupLabel,
      finishLabel,
    ])
  }, [])
  const handleFinish = () => {
    setValidate(true)
    var count = 0
    infoConfirmedList.map((infoConfirmed) => {
      if (infoConfirmed.name !== 'finishInfo' && infoConfirmed.check === true) {
        count++
      }
    })
    if (count === infoConfirmedList.length - 1) {
      history.push('./finish')
      setRerender(true)
    }
  }
  return (
    <>
      <div className='bottomBar'>
        <ul className='sideBar'>
          <li>
            <Link to='/signup/basicInfo'>
              <label className='left' name='basicInfo' ref={basicLabel}>
                Basic-Info
              </label>
            </Link>
          </li>
          <li>
            <Link to='/signup/schoolInfo'>
              <label className='left' name='schoolInfo' ref={schoolLabel}>
                School-Info
              </label>
            </Link>
          </li>
          <li>
            <Link to='/signup/contactInfo'>
              <label className='left' name='contactInfo' ref={contactLabel}>
                Contact-Info
              </label>
            </Link>
          </li>
          <li>
            <Link to='/signup/signupInfo'>
              <label className='left' name='signupInfo' ref={signupLabel}>
                Signup-Info
              </label>
            </Link>
          </li>
          <li>
            <Link onClick={handleFinish}>
              <label className='left' name='finish' ref={finishLabel}>
                Finish
              </label>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideNavigator
