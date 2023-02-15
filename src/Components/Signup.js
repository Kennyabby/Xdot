import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import BasicInfo from './BasicInfo'
import SchoolInfo from './SchoolInfo'
import ContactInfo from './ContactInfo'
import SignupInfo from './SignupInfo'
import FewBasicInfo from './FewBasicInfo'
import FewSchoolInfo from './FewSchoolInfo'
import FewSignupInfo from './FewSinupInfo'
import Finish from './Finish'
import Intro from './Intro'
import SideNavigator from './SideNavigator'

const Signup = ({ showNavbar, showNavOpt, server }) => {
  const history = useHistory()
  const [content, setContent] = useState('Loading Form...')
  const [labelRefs, setLabelRefs] = useState([])
  const [coverList, setCoverList] = useState([])
  const [confidentials, setConfidentials] = useState({
    password: '',
    confirmPassword: '',
  })
  const [verifiedMail, setVerifiedMail] = useState('')
  const [fillAllFields, setFillAllFields] = useState(false)
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
    showNavbar(false)
    showNavOpt(false)
    if (id === undefined) {
      setShowView(false)
    } else {
      setShowView(true)
    }
  }, [id])
  const getCoverList = (list) => {
    setCoverList(list)
  }
  const getCoverPos = (pos) => {
    setCoverPos(pos)
  }
  useEffect(() => {
    const faf = window.localStorage.getItem('fill-all-fields')
    if (faf !== null) {
      if (faf === 'true') {
        setFillAllFields(true)
      } else {
        setFillAllFields(false)
      }
    }
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
          labelRef.current.scrollIntoView()
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
          labelRef.current.scrollIntoView()
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
    if (id === undefined) {
      setContent(
        <Intro
          fillAllFields={fillAllFields}
          setFillAllFields={setFillAllFields}
        />
      )
    } else if (id === 'basicInfo') {
      if (fillAllFields) {
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
      } else {
        setContent(
          <FewBasicInfo
            setBasicConfirmed={(isConfirmed) => {
              setBasicConfirmed((setConfirmed) => {
                return { ...setConfirmed, check: isConfirmed }
              })
            }}
          />
        )
      }
    } else if (id === 'schoolInfo') {
      if (fillAllFields) {
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
      } else {
        setContent(
          <FewSchoolInfo
            verifiedMail={verifiedMail}
            setVerifiedMail={(email) => {
              setVerifiedMail(email)
            }}
            schoolConfirmed={schoolConfirmed}
            setSchoolConfirmed={(isConfirmed) => {
              setSchoolConfirmed((setConfirmed) => {
                return { ...setConfirmed, check: isConfirmed }
              })
            }}
          />
        )
      }
    } else if (id === 'contactInfo') {
      if (fillAllFields) {
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
      }
    } else if (id === 'signupInfo') {
      if (fillAllFields) {
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
      } else {
        setContent(
          <FewSignupInfo
            sever={server}
            basicConfirmed={basicConfirmed}
            schoolConfirmed={schoolConfirmed}
            credentials={confidentials}
            setValidate={(validate) => {
              setIsStartValidating(validate)
            }}
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
      }
    } else if (id === 'finish') {
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
    }
  }, [id, fillAllFields])
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
                width: 'fit-content',
                height: 'fit-content',
                zIndex: '2',
                top: '8px',
                right: '7px',
                cursor: 'pointer',
              }}
            >
              <FaTimes style={{ fontSize: '1.3rem' }} />
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
            {showView && fillAllFields && (
              <SideNavigator
                setValidate={(validate) => {
                  setIsStartValidating(validate)
                }}
                infoConfirmedList={infoConfirmedList}
                getLabelRefs={getLabelRefs}
              />
            )}
            <AnimatePresence exitBeforeEnter>
              <motion.div>
                {content}
                {showView && fillAllFields ? (
                  <div className='currv' ref={currRef}>
                    {cover.map((v, i) => {
                      return <div key={i} className='viewcurr'></div>
                    })}
                  </div>
                ) : undefined}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
