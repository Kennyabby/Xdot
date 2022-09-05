import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import BasicInfo from './BasicInfo'
import SchoolInfo from './SchoolInfo'
import ContactInfo from './ContactInfo'
import SignupInfo from './SignupInfo'
import Finish from './Finish'
import Intro from './Intro'
import SideNavigator from './SideNavigator'
import cancel from './cancel.png'
const Signup = ({ showNavbar, server }) => {
  const history = useHistory()
  const [content, setContent] = useState('Loading Form...')
  const [labelRefs, setLabelRefs] = useState([])
  const [coverList, setCoverList] = useState([])
  const [confidentials, setConfidentials] = useState({
    password: '',
    confirmPassword: '',
  })
  const [isStartValidating, setIsStartValidating] = useState(false)
  const [basicConfirmed, setBasicConfirmed] = useState({
    check: false,
    name: 'basicInfo',
  })
  const [schoolConfirmed, setSchoolConfirmed] = useState({
    check: false,
    name: 'schoolInfo',
  })
  const [contactConfirmed, setContactConfirmed] = useState({
    check: false,
    name: 'contactInfo',
  })
  const [signupConfirmed, setSignupConfirmed] = useState({
    check: false,
    name: 'signupInfo',
  })
  const [finishConfirmed, setFinishConfirmed] = useState({
    check: false,
    name: 'finishInfo',
  })
  const [sessionStatus, setSessionStatus] = useState(false)
  const [viewSessionLabel, setViewSessionLabel] = useState(false)
  const infoConfirmedList = [
    basicConfirmed,
    schoolConfirmed,
    contactConfirmed,
    signupConfirmed,
    finishConfirmed,
  ]
  const [coverPos, setCoverPos] = useState(0)
  const [showView, setShowView] = useState(true)
  const [cover, setCover] = useState([])
  const { id } = useParams()
  const currRef = useRef(null)
  const basicInfo = [
    'firstName',
    'lastName',
    'gender',
    'guardianName',
    'dateOfBirth',
  ]
  const schoolInfo = [
    'matricNo',
    'schoolEmail',
    'level',
    'hallOfResidence',
    'modeOfEntry',
    'yearOfAdmission',
  ]
  const contactInfo = [
    'contactNo',
    'currentAddress',
    'guardianContactNo',
    'guardianCurrentAddress',
  ]
  const studentInfo = {
    firstName: localStorage.getItem('firstName'),
    middleName: localStorage.getItem('middleName'),
    lastName: localStorage.getItem('lastName'),
    gender: localStorage.getItem('gender'),
    guardianName: localStorage.getItem('guardianName'),
    dateOfBirth: localStorage.getItem('dateOfBirth'),
    matricNo: localStorage.getItem('matricNo'),
    schoolEmail: localStorage.getItem('schoolEmail'),
    otherEmail: localStorage.getItem('otherEmail'),
    level: localStorage.getItem('level'),
    hallOfResidence: localStorage.getItem('hallOfResidence'),
    modeOfEntry: localStorage.getItem('modeOfEntry'),
    yearOfAdmission: localStorage.getItem('yearOfAdmission'),
    contactNo: localStorage.getItem('contactNo'),
    otherContactNo: localStorage.getItem('otherContactNo'),
    currentAddress: localStorage.getItem('currentAddress'),
    guardianContactNo: localStorage.getItem('guardianContactNo'),
    otherGuardianContactNo: localStorage.getItem('otherGuardianContactNo'),
    guardianCurrentAddress: localStorage.getItem('guardianCurrentAddress'),
    userName: localStorage.getItem('userName'),
  }
  const getLabelRefs = (refs) => {
    setLabelRefs(refs)
  }
  useEffect(() => {
    if (id !== 'signup' && id !== undefined) {
      showNavbar(false)
    } else {
      setShowView(false)
    }
  }, [id])
  const getCoverList = (list) => {
    setCoverList(list)
  }
  const getCoverPos = (pos) => {
    setCoverPos(pos)
  }
  useEffect(() => {
    var basicCount = 0
    basicInfo.map((info) => {
      if (studentInfo[info] !== '') {
        basicCount++
      }
    })
    var schoolCount = 0
    schoolInfo.map((info) => {
      if (studentInfo[info] !== '') {
        schoolCount++
      }
    })
    var contactCount = 0
    contactInfo.map((info) => {
      if (studentInfo[info] !== '') {
        contactCount++
      }
    })

    if (basicCount === basicInfo.length) {
      setBasicConfirmed({ ...basicConfirmed, check: true })
    }
    if (schoolCount === schoolInfo.length) {
      setSchoolConfirmed({ ...schoolConfirmed, check: true })
    }
    if (contactCount === contactInfo.length) {
      setContactConfirmed({ ...contactConfirmed, check: true })
    }
    if (basicCount > 0 || schoolCount > 0 || contactCount > 0) {
      setSessionStatus(true)
      setTimeout(() => {
        setSessionStatus(false)
        setViewSessionLabel(true)
        if (id === 'signup') {
          setSessionStatus(false)
          setViewSessionLabel(false)
        }
      }, 3000)
      if (id === 'signup') {
        setSessionStatus(false)
      }
    }
    if (
      basicCount === basicInfo.length ||
      schoolCount === schoolInfo.length ||
      contactCount === contactInfo.length
    ) {
    }
  }, [])
  useEffect(() => {
    setCover(coverList)
  }, [coverList])
  useEffect(() => {
    labelRefs.map((labelRef) => {
      if (labelRef.current !== null) {
        labelRef.current.style.borderBottom = '0px'
        labelRef.current.style.borderRadius = '5px'
        if (labelRef.current.getAttribute('name') === id) {
          labelRef.current.style.borderBottom = 'solid lightgreen 3px'
        }
      }
    })
  }, [labelRefs])
  useEffect(() => {
    if (currRef.current !== null) {
      for (var i = 0; i < currRef.current.childNodes.length; i++) {
        currRef.current.childNodes[i].style.backgroundColor = 'white'
      }
      if (currRef.current.childNodes.length != 0) {
        currRef.current.childNodes[coverPos].style.backgroundColor = 'blue'
      }
    }
  })
  useEffect(() => {
    if (isStartValidating) {
      infoConfirmedList.map((infoConfirmed) => {
        labelRefs.map((labelRef) => {
          if (labelRef.current !== null) {
            labelRef.current.style.borderRadius = '5px'
            if (labelRef.current.getAttribute('name') === infoConfirmed.name) {
              if (infoConfirmed.check === false) {
                labelRef.current.style.borderBottom = 'solid red 3px'
              } else {
                if (labelRef.current.getAttribute('name') === id) {
                  labelRef.current.style.borderBottom = 'solid lightgreen 3px'
                }
              }
            }
          }
        })
      })
    }
  }, [infoConfirmedList])
  useEffect(() => {
    labelRefs.map((labelRef) => {
      if (labelRef.current !== null) {
        labelRef.current.style.borderBottom = '0px'
        labelRef.current.style.borderRadius = '5px'
        if (labelRef.current.getAttribute('name') === id) {
          labelRef.current.style.borderBottom = 'solid lightgreen 3px'
          if (isStartValidating) {
            infoConfirmedList.map((infoConfirmed) => {
              if (id === infoConfirmed.name && infoConfirmed.check === false) {
                labelRef.current.style.borderBottom = 'solid red 3px'
              }
            })
          }
        }
      }
    })
    window.scrollTo(0, 0)
    if (id === 'basicInfo') {
      window.scrollTo(0, 0)
      setContent(
        <BasicInfo
          getCoverList={getCoverList}
          getCoverPos={getCoverPos}
          setBasicConfirmed={(isConfirmed) => {
            setBasicConfirmed((setConfirmed) => {
              return { ...setConfirmed, check: isConfirmed }
            })
          }}
        />
      )
    } else if (id === 'schoolInfo') {
      window.scrollTo(0, 0)
      setContent(
        <SchoolInfo
          server={server}
          getCoverList={getCoverList}
          getCoverPos={getCoverPos}
          setSchoolConfirmed={(isConfirmed) => {
            setSchoolConfirmed((setConfirmed) => {
              return { ...setConfirmed, check: isConfirmed }
            })
          }}
        />
      )
    } else if (id === 'contactInfo') {
      window.scrollTo(0, 0)
      setContent(
        <ContactInfo
          getCoverList={getCoverList}
          getCoverPos={getCoverPos}
          setContactConfirmed={(isConfirmed) => {
            setContactConfirmed((setConfirmed) => {
              return { ...setConfirmed, check: isConfirmed }
            })
          }}
        />
      )
    } else if (id === 'signupInfo') {
      window.scrollTo(0, 0)
      setContent(
        <SignupInfo
          basicConfirmed={basicConfirmed}
          schoolConfirmed={schoolConfirmed}
          contactConfirmed={contactConfirmed}
          credentials={confidentials}
          setValidate={(validate) => {
            setIsStartValidating(validate)
          }}
          getCoverList={getCoverList}
          getCoverPos={getCoverPos}
          setSignupConfirmed={(isConfirmed) => {
            setSignupConfirmed((setConfirmed) => {
              return { ...setConfirmed, check: isConfirmed }
            })
          }}
          sendConfidentialDetails={(confidentials) => {
            setConfidentials(confidentials)
          }}
        />
      )
    } else if (id === 'finish') {
      window.scrollTo(0, 0)
      setContent(
        <Finish
          server={server}
          setViewSessionLabel={(showLabel) => {
            setViewSessionLabel(() => {
              return showLabel
            })
          }}
          setShowView={(isShow) => {
            setShowView(() => {
              return isShow
            })
          }}
          confidentials={confidentials}
          getCoverList={getCoverList}
          getCoverPos={getCoverPos}
          setFinishConfirmed={(isConfirmed) => {
            setFinishConfirmed((setConfirmed) => {
              return { ...setConfirmed, check: isConfirmed }
            })
          }}
        />
      )
    } else {
      window.scrollTo(0, 0)
      setContent(<Intro />)
    }
  }, [id])
  const resetThisSession = () => {
    var infos = []
    infos = infos.concat(basicInfo)
    infos = infos.concat(schoolInfo)
    infos = infos.concat(contactInfo)
    infos.map((info) => {
      localStorage.removeItem(info)
    })
    localStorage.removeItem('userName')
    history.push('./')
  }
  return (
    <>
      <div className='signBack'>
        <div className='sign'>
          <Link to='/'>
            <div
              style={{
                position: 'fixed',
                top: '8px',
                right: '7px',
                cursor: 'pointer',
              }}
            >
              <img src={cancel} height='20px' title='Close Sign up Page' />
            </div>
          </Link>
          {sessionStatus ? (
            <p>
              <button
                style={{
                  cursor: 'auto',
                  color: 'red',
                  backgroundColor: 'white',
                }}
                className='inf'
              >
                Sesion Restored
              </button>
            </p>
          ) : undefined}
          {viewSessionLabel ? (
            <p>
              <button
                style={{ color: 'white', backgroundColor: 'green' }}
                title='Click to clear all fields'
                className='inf'
                onClick={resetThisSession}
              >
                Reset This Session
              </button>
            </p>
          ) : undefined}
          <div className='cover'>
            {showView ? (
              <SideNavigator
                setValidate={(validate) => {
                  setIsStartValidating(validate)
                }}
                infoConfirmedList={infoConfirmedList}
                getLabelRefs={getLabelRefs}
              />
            ) : undefined}
            <div style={{ overflowY: 'auto', height: '100vh' }}>
              {content}
              {showView ? (
                <div className='currv' ref={currRef}>
                  {cover.map((v, i) => {
                    return <div key={i} className='viewcurr'></div>
                  })}
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
