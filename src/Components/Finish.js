import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import ConnectionModal from './ConnectionModal'
import { FaAngleLeft, FaTemperatureLow } from 'react-icons/fa'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      ease: 'easeInOut',
    },
  },
}
const submitVariants = {
  hidden: {
    // x: '100vw',
    opacity: 0,
  },
  visible: {
    // x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
}
const buttonVariants = {
  hidden: {
    x: -1000,
    // opacity: 0,
  },
  visible: {
    x: 0,
    // opacity: 1,
    type: 'spring',
    stiffness: 500,
    transition: {
      delay: 0.5,
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
const Finish = ({ server, confidentials }) => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const finishCoverRef = useRef(null)
  const summaryLabelRef = useRef(null)
  const [submitStatus, setSubmitStatus] = useState('Submit')
  const [isSuccess, setIsSuccess] = useState(false)

  const basicInfo = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Gender',
    'Identity',
    'Nationality',
    'Contact No',
  ]
  const basicInfoValues = [
    localStorage.getItem('firstName'),
    localStorage.getItem('middleName'),
    localStorage.getItem('lastName'),
    localStorage.getItem('gender'),
    localStorage.getItem('identity'),
    localStorage.getItem('nationality'),
    localStorage.getItem('contactNo'),
  ]
  const schoolInfo = [
    'Highest Qualification',
    'Student',
    'Institute Country Name',
    'Institute Name',
    'Department',
    'Matric No',
    'School Email',
    'Personal Email',
    'Level',
  ]
  const schoolInfoValues = [
    localStorage.getItem('educationQualification'),
    localStorage.getItem('student') === String(true) ? 'yes' : 'no',
    localStorage.getItem('instituteContryName'),

    localStorage.getItem('instituteName') !== null
      ? localStorage.getItem('instituteName')
      : '',

    localStorage.getItem('department') !== null
      ? localStorage.getItem('department')
      : '',
    localStorage.getItem('matricNo'),
    localStorage.getItem('schoolEmail'),
    localStorage.getItem('otherEmail'),
    localStorage.getItem('level'),
  ]

  const signupInfo = ['Username']
  const signupInfoValues = [localStorage.getItem('userName')]

  const setCamelCase = (text) => {
    var first = text.slice(0, 1).toUpperCase()
    var others = text.slice(1).toLowerCase()
    return first + others
  }

  const studentInfo = {
    firstName: setCamelCase(localStorage.getItem('firstName')),
    middleName: setCamelCase(localStorage.getItem('middleName')),
    lastName: setCamelCase(localStorage.getItem('lastName')),
    gender: localStorage.getItem('gender'),
    dateOfBirth: '',
    otherEmail: localStorage.getItem('otherEmail'),
    contactNo: localStorage.getItem('contactNo'),
    identity: localStorage.getItem('identity'),
    nationality: localStorage.getItem('nationality'),
    userName: localStorage.getItem('userName').trim(),
    img: {
      url: '',
    },
    imgcover: {
      url: '',
    },
    password: confidentials.password,
    access: 'User',
    isEditable: 'true',
    isPublic: true,
    createdAt: Date.now(),
    educationQualification: localStorage.getItem('educationQualification'),
    student:
      localStorage.getItem('student') === String(true)
        ? {
            check: true,
            matricNo: localStorage.getItem('matricNo'),
            schoolEmail: localStorage.getItem('schoolEmail'),
            level: localStorage.getItem('level'),

            instituteCountryName: localStorage.getItem('instituteContryName'),

            instituteName:
              localStorage.getItem('instituteName') !== null
                ? localStorage.getItem('instituteName')
                : '',
            department:
              localStorage.getItem('department') !== null
                ? localStorage.getItem('department')
                : '',
          }
        : { check: false },
    courseDetails: [],
    createQuiz: [],
  }
  useEffect(() => {
    if (confidentials.password === '') {
      history.push('./signupInfo')
    }
  }, [])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Submit') {
      handleSubmit()
    }
    if (
      e.target.value === 'Prev' ||
      e.target.getAttribute('value') === 'Prev'
    ) {
      history.push('./signupInfo')
    }
  }
  // const resizeFile = (file) => {
  //   return new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       500,
  //       600,
  //       'JPEG',
  //       80,
  //       0,
  //       (uri) => {
  //         resolve(uri)
  //       },
  //       'byte'
  //     )
  //   })
  // }
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => {
  //       resolve(reader.result)
  //     }
  //   })
  // }

  // useEffect(async () => {
  //   if (file !== null) {
  //     const newFile = await convertToBase64(file)
  //     setConvertedFile(newFile)
  //   }
  // }, [file])
  const notifyUserMail = async (mailList) => {
    const message =
      "<h2>Account Created Successfully</h2><p style='font-family:monospace; font-size: 1rem;'>Hi, <b>" +
      studentInfo.firstName +
      "</b>.</p><p style='font-family:monospace; font-size: 1rem;'>You are getting this email to confirm that you have just created an account with <b>Pace Up</b>." +
      ".</p> <h2>What Do I Need To Do?</h2><p style='font-family:Calibri; font-size: 1rem;'>If this is you, you don't need to do anything. If this was not you, kindly <a href='https://xdot.vercel.app/help'>click here</a>. </p><p style='margin-top: 50px; font-family:Calibri;'>Regards. <b>The XDot Team</b> in partnership with <b>Zerox</b>.</p><p style='margin-top: 150px; font-family:Calibri'>If you do no want to get future notifications through this email, kindly <a href='https://xdot.vercel.app/help'>stop it here</a>.</p>"
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: mailList,
        type: 'html',
        subject: 'Your Account is Ready For Use',
        message: message,
      }),
    }
    const resp = await fetch(server + '/mailUser', opts)
  }

  // const fileHandler = async (e) => {
  //   var file = e.target.files[0]
  //   var resize_width = 400
  //   var reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.name = file.name //get the image's name
  //   reader.size = file.size //get the image's size
  //   reader.onload = function (event) {
  //     var img = new Image() //create a image
  //     img.src = event.target.result //result is base64-encoded Data URI
  //     img.name = event.target.name //set name (optional)
  //     img.size = event.target.size //set size (optional)
  //     img.onload = function (el) {
  //       var elem = document.createElement('canvas')

  //       var scaleFactor = resize_width / el.target.width
  //       var ctx = elem.getContext('2d')
  //       elem.width = resize_width
  //       elem.height = el.target.height * scaleFactor

  //       ctx.drawImage(el.target, 0, 0, elem.width, elem.height)

  //       var srcEncoded = elem.toDataURL('image/jpeg')
  //       setFile(file)
  //       setImgUrl(srcEncoded)
  //       setUserImg(srcEncoded)
  //       setConvertedFile(srcEncoded)
  //     }
  //   }
  // }
  // const uploadImg = () => {
  //   imgRef.current.click()
  // }
  const handleSubmit = async () => {
    setSubmitStatus('Please wait...')
    const studentBody = {
      studentInfo: studentInfo,
    }
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentBody),
      }
      const resp = await fetch(server + '/postUserDetails', opts)
      const feedBack = await resp.json()
      setSubmitStatus('Submit')
      if (feedBack.isDelivered === true) {
        notifyUserMail([studentInfo.otherEmail])
        setIsSuccess(true)
        setTimeout(() => {
          history.push('/signin')
        }, 3000)
      } else {
        setErrorMessage(
          'An Error Occured. Could not submit your details. Kindly check that your device is connected to a stable internet.'
        )
        setShowModal(true)
      }
    } catch (TypeError) {
      setErrorMessage(
        'An Error Occured. Could not submit your details. Kindly check that your device is connected to a stable internet.'
      )
      setShowModal(true)
    }
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {<FaAngleLeft className='prv' value='Prev' />}
      {isSuccess ? (
        <div
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'center',
            fontFamily: 'MonteserratRegular',
          }}
        >
          {'Your Account Was Created Successfully!'}
        </div>
      ) : (
        <button className='nxt' type='submit' name='button' value='Submit'>
          {submitStatus}
        </button>
      )}
    </div>
  )
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ opacity: 0 }}
      ref={finishCoverRef}
    >
      {showModal && (
        <ConnectionModal
          title='Ooops... Connection Error'
          message={errorMessage}
          multiple={true}
          button1='Ok'
          button2='Retry'
          func1={() => {
            setShowModal(false)
            setSubmitStatus('Submit')
          }}
          func2={() => {
            setShowModal(false)
            handleSubmit()
          }}
        />
      )}
      {
        <div className='container'>
          <h2
            style={{ fontFamily: 'MonteserratBold', letterSpacing: '.2rem' }}
            ref={summaryLabelRef}
          >
            Info Summary
          </h2>
          <div className='regInfo'>
            <h3
              style={{
                marginLeft: '15px',
                fontFamily: 'MonteserratBold',
                fontWeight: 'bold',
                position: 'relative',
              }}
            >
              {
                <FaAngleLeft
                  className='prv'
                  style={{ position: 'absolute', top: '0px' }}
                  onClick={() => {
                    history.push('./basicInfo')
                  }}
                />
              }
              <label>Basic Info</label>
            </h3>
            {basicInfo.map((info, i) => {
              return (
                <div
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    backgroundColor: i % 2 ? 'white' : 'rgba(220,220,220,1)',
                  }}
                  key={i}
                >
                  <label style={{ fontWeight: 'bold' }}>{info}: </label>
                  <label style={{ fontWeight: 'light', fontStyle: 'italic' }}>
                    {basicInfoValues[i]}
                  </label>
                </div>
              )
            })}
          </div>
          <div className='regInfo'>
            <h3
              style={{
                marginLeft: '15px',
                fontFamily: 'MonteserratBold',
                fontWeight: 'bold',
                position: 'relative',
              }}
            >
              {
                <FaAngleLeft
                  className='prv'
                  style={{ position: 'absolute', top: '0px' }}
                  onClick={() => {
                    history.push('./schoolInfo')
                  }}
                />
              }
              <label>School Info</label>
            </h3>
            {schoolInfo.map((info, i) => {
              return (
                <div
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    backgroundColor: i % 2 ? 'white' : 'rgba(220,220,220,1)',
                  }}
                  key={i}
                >
                  <label style={{ fontWeight: 'bold' }}>{info}: </label>
                  <label style={{ fontWeight: 'light', fontStyle: 'italic' }}>
                    {schoolInfoValues[i]}
                  </label>
                </div>
              )
            })}
          </div>
          <div className='regInfo'>
            <h3
              style={{
                marginLeft: '15px',
                fontFamily: 'MonteserratBold',
                fontWeight: 'bold',
                position: 'relative',
              }}
            >
              {
                <FaAngleLeft
                  className='prv'
                  style={{ position: 'absolute', top: '0px' }}
                  onClick={() => {
                    history.push('./signupInfo')
                  }}
                />
              }
              <label>Signup Info</label>
            </h3>
            {signupInfo.map((info, i) => {
              return (
                <div
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    backgroundColor: i % 2 ? 'white' : 'rgba(220,220,220,1)',
                  }}
                  key={i}
                >
                  <label style={{ fontWeight: 'bold' }}>{info}: </label>
                  <label style={{ fontWeight: 'light', fontStyle: 'italic' }}>
                    {signupInfoValues[i]}
                  </label>
                </div>
              )
            })}
          </div>
          {prevNext}
        </div>
      }
      {isSuccess && (
        <motion.div variants={submitVariants}>
          <p
            style={{
              color: 'black',
              marginTop: '100px',
              margin: '50px',
              fontFamily: 'MonteserratRegular',
            }}
          >
            Dear {setCamelCase(studentInfo.lastName)}{' '}
            {setCamelCase(studentInfo.firstName)}{' '}
            {setCamelCase(studentInfo.middleName)}, Thank You For Your Time.
            Your Details Have Been Submited Succesfully.
          </p>
          <Link to='/signin'>
            <motion.button
              variants={buttonVariants}
              className='nxt'
              style={{
                backgroundColor: 'green',
                color: 'white',
                fontFamily: 'MonteserratRegular',
              }}
              title='Sign in'
              type='submit'
              name='button'
              value='Sign in'
            >
              Proceed to Sign in
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Finish
