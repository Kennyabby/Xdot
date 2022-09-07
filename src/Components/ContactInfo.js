import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import logo from './user.png'

const ContactInfo = ({ getCoverList, getCoverPos, setContactConfirmed }) => {
  const history = useHistory()
  const contactCoverRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [contactInfo, setContactInfo] = useState({
    contactNo: '',
    otherContactNo: '',
    currentAddress: '',
    guardianContactNo: '',
    otherGuardianContactNo: '',
    guardianCurrentAddress: '',
  })
  const contactNoRef = useRef(null)
  const otherContactNoRef = useRef(null)
  const currentAddressRef = useRef(null)
  const guardianContactNoRef = useRef(null)
  const otherGuardianContactNoRef = useRef(null)
  const guardianCurrentAddressRef = useRef(null)
  const contactLabelRef = useRef(null)
  const infoRefList = [
    contactNoRef,
    otherContactNoRef,
    currentAddressRef,
    guardianContactNoRef,
    otherGuardianContactNoRef,
    guardianCurrentAddressRef,
  ]
  useEffect(() => {
    getCoverList(contactList)
  }, [])
  useEffect(() => {
    contactLabelRef.current.scrollIntoView()
  }, [pos])
  useEffect(() => {
    getCoverPos(pos)
  }, [pos])
  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          } else {
            infoRef.current.style.borderBottom = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            count++
          }
        }
      }
    })

    if (infos.length === count) {
      setContactConfirmed(true)
      return true
    }
    setContactConfirmed(false)
    return false
  }
  const validateInput = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach((infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
          } else {
            count++
          }
        }
      }
    })

    if (infos.length === count) {
      setContactConfirmed(true)
      return true
    }
    setContactConfirmed(false)
    return false
  }
  useEffect(() => {
    if (localStorage.getItem('contactNo') != null) {
      setContactInfo({
        ...contactInfo,
        contactNo: localStorage.getItem('contactNo'),
        otherContactNo: localStorage.getItem('otherContactNo'),
        currentAddress: localStorage.getItem('currentAddress'),
        guardianContactNo: localStorage.getItem('guardianContactNo'),
        otherGuardianContactNo: localStorage.getItem('otherGuardianContactNo'),
        guardianCurrentAddress: localStorage.getItem('guardianCurrentAddress'),
      })
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('contactNo', contactInfo.contactNo)
    window.localStorage.setItem('otherContactNo', contactInfo.otherContactNo)
    window.localStorage.setItem('currentAddress', contactInfo.currentAddress)
    window.localStorage.setItem(
      'guardianContactNo',
      contactInfo.guardianContactNo
    )
    window.localStorage.setItem(
      'otherGuardianContactNo',
      contactInfo.otherGuardianContactNo
    )
    window.localStorage.setItem(
      'guardianCurrentAddress',
      contactInfo.guardianCurrentAddress
    )
    validateInput()
  }, [contactInfo])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (validateInputs()) {
        if (pos === 1) {
          history.push('./signupInfo')
          setPos(0)
        } else {
          setPos((pos) => {
            return pos + 1
          })
        }
      }
    }
    if (e.target.value === 'Prev') {
      if (pos === 0) {
        history.push('./schoolInfo')
        setPos(0)
      } else {
        setPos((pos) => {
          return pos - 1
        })
      }
    }
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.borderBottom = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.borderBottom = 'solid red 1px'
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.placeholder = ''
          infoRef.current.parentElement.scrollIntoView()
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          } else {
            infoRef.current.parentElement.childNodes[1].innerHTML =
              infoRef.current.title
          }
        }
      }
    })
  }
  const getInputEvent = (e) => {
    var name = e.target.getAttribute('name')
    setContactInfo({ ...contactInfo, [name]: e.target.value })

    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.borderBottom = 'solid red 1px'
          }
        }
      }
    })
    validateInput()
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Next >>'}
        </button>
      }
    </div>
  )
  const contactList = [
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={contactNoRef}
          className='input'
          type='text'
          name='contactNo'
          placeholder='Enter Your Contact Number'
          value={contactInfo.contactNo}
          required
          title='Enter Your Contact Number'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={otherContactNoRef}
          className='input'
          type='text'
          name='otherContactNo'
          placeholder='Enter Other Contact Number'
          value={contactInfo.otherContactNo}
          title='Enter Other Contact Number'
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={currentAddressRef}
          className='input'
          type='text'
          name='currentAddress'
          placeholder='Enter Your Current Address'
          value={contactInfo.currentAddress}
          required
          title='Enter YOur Current Address'
        />
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={guardianContactNoRef}
          className='input'
          type='text'
          name='guardianContactNo'
          placeholder="Enter Your Guardian's Contact Number"
          value={contactInfo.guardianContactNo}
          required
          title="Enter Your Guardian's Contact Number"
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          ref={otherGuardianContactNoRef}
          className='input'
          type='text'
          name='otherGuardianContactNo'
          placeholder="Enter Other Guardian's Contact Number"
          value={contactInfo.otherGuardianContactNo}
          title="Enter Other Guardian's Contact Number"
        />
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <input
          className='input'
          ref={guardianCurrentAddressRef}
          type='text'
          name='guardianCurrentAddress'
          placeholder="Enter Your Guardian's Current Address"
          value={contactInfo.guardianCurrentAddress}
          required
          title="Enter Your Guardian's Current Address"
        />
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
  ]
  return (
    <div ref={contactCoverRef}>
      <div className='infotag' ref={contactLabelRef}>
        Contact Info
      </div>
      {contactList[pos]}
    </div>
  )
}

export default ContactInfo
