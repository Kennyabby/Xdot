import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

import logo from './user.png'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    // dampness: 1000,
    // stiffness: 500,
    // mass: 0.5,
    transition: {
      duration: 1,
      // ease: 'easeInOut',
    },
  },
}
const headerVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}
const FewBasicInfo = ({ setBasicConfirmed }) => {
  const history = useHistory()
  const firstNameRef = useRef(null)
  const middleNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const contactNoRef = useRef(null)
  const genderRef = useRef(null)
  const identityRef = useRef(null)
  const nationalityRef = useRef(null)
  const infoRefList = [
    firstNameRef,
    middleNameRef,
    lastNameRef,
    genderRef,
    identityRef,
    nationalityRef,
    contactNoRef,
  ]
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    identity: '',
    nationality: '',
    countryInfo: [],
    contactNo: '',
  })
  const [countries, setCountries] = useState([])
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setCountries(data)
      })
      .catch((error) => {
        console.log('Error getting countries:', error)
      })
    // fetch('https://restcountries.com/v3.1/all?fields=callingCodes')
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     // console.log(data)
    //   })
    //   .catch((error) => {
    //     console.log('Error getting countries:', error)
    //   })
    // fetch('https://api.ipdata.co/')
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((data) => console.log(data))
  }, [])

  useEffect(() => {
    const value = basicInfo.nationality
    countries.forEach((country, i) => {
      if (country.demonyms !== undefined) {
        if (value === country.demonyms.eng.m) {
          setBasicInfo({ ...basicInfo, country: country })
        }
      } else {
        if (value === country.name.common) {
          setBasicInfo({ ...basicInfo, country: country })
        }
      }
    })
  }, [basicInfo.nationality])
  useEffect(() => {
    if (window.localStorage.getItem('firstName') != null) {
      setBasicInfo({
        ...basicInfo,
        firstName: localStorage.getItem('firstName'),
        middleName: localStorage.getItem('middleName'),
        lastName: localStorage.getItem('lastName'),
        contactNo: localStorage.getItem('contactNo'),
        gender: localStorage.getItem('gender'),
        identity: localStorage.getItem('identity'),
        nationality: localStorage.getItem('nationality'),
      })
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('firstName', basicInfo.firstName)
    window.localStorage.setItem('middleName', basicInfo.middleName)
    window.localStorage.setItem('lastName', basicInfo.lastName)
    window.localStorage.setItem('contactNo', basicInfo.contactNo)
    window.localStorage.setItem('gender', basicInfo.gender)
    window.localStorage.setItem('identity', basicInfo.identity)
    window.localStorage.setItem('nationality', basicInfo.nationality)
    validateInput()
  }, [basicInfo])
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
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          } else {
            infoRef.current.style.border = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            count++
          }
        }
      }
    })

    if (infos.length === count) {
      setBasicConfirmed(true)
      return true
    }
    setBasicConfirmed(false)
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
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.border = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.border = 'solid red 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'red'
          setBasicConfirmed(false)
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.placeholder = ''
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
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setBasicInfo((basicInfo) => {
      return { ...basicInfo, [name]: value }
    })
    if (name === 'nationality') {
      countries.forEach((country, i) => {
        if (country.demonyms !== undefined) {
          if (value === country.demonyms.eng.m) {
            setBasicInfo((basicInfo) => {
              return { ...basicInfo, country: country }
            })
          }
        } else {
          if (value === country.name.common) {
            setBasicInfo((basicInfo) => {
              return { ...basicInfo, country: country }
            })
          }
        }
      })
    }
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
          }
        }
      }
    })
    validateInput()
  }
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (validateInputs()) {
        history.push('./schoolInfo')
      }
    }
  }
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit={{ opacity: 0 }}
        style={{ display: 'block' }}
      >
        <motion.div variants={headerVariants} className='infotag'>
          Basic Info
        </motion.div>
        <div
          className='container'
          onChange={getInputEvent}
          onFocus={handleFocus}
        >
          <FaUserCircle
            className='usr'
            style={{
              fontSize: '5rem',
              color: 'rgba(20,20,100,0.3)',
            }}
          />
          <div
            style={{
              width: 'fit-content',
              borderRadius: '20px',
              padding: '10px',
              margin: '15px auto',
              boxShadow:
                '-5px -5px 10px rgba(0, 0, 0, 0.1), 5px 5px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p className='over' style={{ padding: '13px' }}>
              <input
                ref={firstNameRef}
                className='input'
                type='text'
                name='firstName'
                show={false}
                placeholder='Enter First Name'
                value={basicInfo.firstName}
                required
                title='Enter First Name'
              />
              <p className='inputStyle'></p>
            </p>
            <p className='over' style={{ padding: '13px' }}>
              <input
                ref={middleNameRef}
                className='input'
                type='text'
                name='middleName'
                placeholder='Enter Middle Name'
                value={basicInfo.middleName}
                title='Enter Middle Name'
              />
              <p className='inputStyle'></p>
            </p>
            <p className='over' style={{ padding: '13px' }}>
              <input
                ref={lastNameRef}
                className='input'
                type='text'
                name='lastName'
                placeholder='Enter Last Name'
                value={basicInfo.lastName}
                required
                title='Enter Last Name'
              />
              <p className='inputStyle'></p>
            </p>
            <p className='over' style={{ padding: '13px' }}>
              <select
                ref={genderRef}
                className='input'
                name='gender'
                value={basicInfo.gender}
                required
                placeholder='Select Your Gender'
                title='Select Your Gender'
              >
                <option value=''>{'Select Your Gender'}</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Non Binary'>Non Binary</option>
                <option value="Don't wish to disclose">
                  Don't wish to disclose
                </option>
                <option value='Others'>Others</option>
              </select>
              <p className='inputStyle'></p>
            </p>
            <p className='over' style={{ padding: '13px' }}>
              <select
                ref={identityRef}
                className='input'
                name='identity'
                value={basicInfo.identity}
                required
                placeholder='What Do You Identity As?'
                title='What Do You Identify As?'
              >
                <option value=''>{'What Do You Identify As?'}</option>
                <option value='He/His'>He/His</option>
                <option value='She/Her'>She/Her</option>
                <option value='They/Them'>They/Them</option>
                <option value='Their/Those'>Their/Those</option>
                <option value="Don't wish to disclose">
                  Don't wish to disclose
                </option>
                <option value='Others'>Others</option>
              </select>
              <p className='inputStyle'></p>
            </p>
            <p className='over' style={{ padding: '13px' }}>
              <select
                ref={nationalityRef}
                className='input'
                name='nationality'
                value={basicInfo.nationality}
                placeholder='Select Your Nationality'
                title='Select Your Nationality'
              >
                <option index='' value=''>
                  {'Select Your Nationality'}
                </option>
                <option index='' value="Don't wish to disclose">
                  Don't wish to disclose
                </option>
                <option index='' value='Others'>
                  Others
                </option>
                {countries.length
                  ? countries.sort().map((country, i) => {
                      if (country.demonyms !== undefined) {
                        return (
                          <option
                            num={i}
                            value={country.demonyms.eng.m}
                            key={i}
                          >
                            {country.demonyms.eng.m}
                          </option>
                        )
                      } else {
                        return (
                          <option num={i} value={country.name.common} key={i}>
                            {country.name.common}
                          </option>
                        )
                      }
                    })
                  : undefined}
              </select>
              <p className='inputStyle'></p>
            </p>

            <p className='over' style={{ padding: '13px' }}>
              <input
                ref={contactNoRef}
                className='input'
                type='number'
                name='contactNo'
                placeholder='Enter Your Contact Number'
                value={basicInfo.contactNo}
                required
                title='Enter Your Contact Number'
              />
              <p className='inputStyle'></p>
            </p>
          </div>
          <div className='np' onClick={getButtonEvent}>
            <button className='nxt' type='submit' name='button' value='Next'>
              {'Next >>'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FewBasicInfo
