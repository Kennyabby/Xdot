import React, { useState, useEffect, useRef } from 'react'
import Resizer from 'react-image-file-resizer'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import ConnectionModal from './ConnectionModal'

import logo from './user.png'

const containerVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      // ease: 'easeInOut',
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
const Finish = ({
  server,
  getCoverList,
  confidentials,
  getCoverPos,
  setShowView,
  setViewSessionLabel,
}) => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [viewNext, setViewNext] = useState(true)
  const finishCoverRef = useRef(null)
  const summaryLabelRef = useRef(null)
  const uploadLabelRef = useRef(null)
  const imgRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(logo)
  const [submitStatus, setSubmitStatus] = useState('Submit')
  const [warnImage, setWarnImage] = useState(false)
  const [userImg, setUserImg] = useState('')
  const [file, setFile] = useState(null)
  const [convertedFile, setConvertedFile] = useState(null)
  const [pos, setPos] = useState(0)
  const [show, setShow] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const basicInfo = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Gender',
    'Guardian Name',
    'Date of Birth',
  ]
  const schoolInfo = [
    'Matric No',
    'School Email',
    'Personal Email',
    'Level',
    'Hall of Residence Allocated',
    'Admission Mode of Entry',
    'Session Admitted',
  ]
  const contactInfo = [
    'Contact Number',
    'Other Contact Number',
    'Current Address',
    "Guardian's Contact Number",
    "Other Guardian's Contact Number",
    "Guardian's Current Address",
  ]

  const signupInfo = ['Username']
  const setCamelCase = (text) => {
    var first = text.slice(0, 1).toUpperCase()
    var others = text.slice(1).toLowerCase()
    return first + others
  }

  const basicInfoValues = [
    localStorage.getItem('firstName'),
    localStorage.getItem('middleName'),
    localStorage.getItem('lastName'),
    localStorage.getItem('gender'),
    localStorage.getItem('guardianName'),
    localStorage.getItem('dateOfBirth'),
  ]

  const schoolInfoValues = [
    localStorage.getItem('matricNo'),
    localStorage.getItem('schoolEmail'),
    localStorage.getItem('otherEmail'),
    localStorage.getItem('level'),
    localStorage.getItem('hallOfResidence'),
    localStorage.getItem('modeOfEntry'),
    localStorage.getItem('yearOfAdmission'),
  ]

  const contactInfoValues = [
    localStorage.getItem('contactNo'),
    localStorage.getItem('otherContactNo'),
    localStorage.getItem('currentAddress'),
    localStorage.getItem('guardianContactNo'),
    localStorage.getItem('otherGuardianContactNo'),
    localStorage.getItem('guardianCurrentAddress'),
  ]
  const signupInfoValues = [localStorage.getItem('userName')]

  const studentInfo = {
    firstName: setCamelCase(localStorage.getItem('firstName')),
    middleName: setCamelCase(localStorage.getItem('middleName')),
    lastName: setCamelCase(localStorage.getItem('lastName')),
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
    userName: setCamelCase(localStorage.getItem('userName')),
    img: '',
    password: confidentials.password,
    access: 'User',
    isEditable: 'false',
    createdAt: Date.now(),
    courseDetails: [],
    createQuiz: [],
  }
  useEffect(() => {
    getCoverList(finishList)
    if (confidentials.password === '') {
      history.push('./signupInfo')
    }
  }, [])
  useEffect(() => {
    getCoverPos(pos)
  }, [pos])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (pos === 1) {
        setPos(0)
      } else {
        setViewNext(false)
        setPos((pos) => {
          return pos + 1
        })
      }
    }
    if (e.target.value === 'Prev') {
      if (pos === 0) {
        history.push('./signupInfo')
        setPos(0)
      } else {
        setViewNext(true)
        setPos((pos) => {
          return pos - 1
        })
      }
    }
  }
  const resizeFile = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        600,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri)
        },
        'byte'
      )
    })
  }
  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
    })
  }
  useEffect(() => {
    if (pos) {
      uploadLabelRef.current.scrollIntoView()
    } else {
      summaryLabelRef.current.scrollIntoView()
    }
  }, [pos])
  // useEffect(async () => {
  //   if (file !== null) {
  //     const newFile = await convertToBase64(file)
  //     setConvertedFile(newFile)
  //   }
  // }, [file])
  useEffect(() => {
    if (userImg === '') {
    } else {
      setWarnImage(false)
    }
  }, [userImg])
  const notifyUserMail = async (mailList) => {
    const message =
      "<h2>Napsite Account Created Successfully</h2><p style='font-family:monospace; font-size: 1rem;'>Hi, <b>" +
      studentInfo.firstName +
      "</b>.</p><p style='font-family:monospace; font-size: 1rem;'>You are getting this email to confirm that you have just created an account with the National Association Of Physics Students, University of Ibadan Chapter <b>(NAPS UI)</b>, using the Matric No: <b>" +
      studentInfo.matricNo +
      "</b>.</p> <h2>What Do I Need To Do?</h2><p style='font-family:monospace; font-size: 1rem;'>If this is you, you don't need to do anything. If this was not you, kindly <a href='https://napsui.herokuapp.com/help'>click here</a>. </p><p style='margin-top: 50px; font-family:monospace;'>Regards. <b>The XDot Team</b> in partnership with <b>Zerox</b>.</p><p style='margin-top: 150px; font-family:monospace'>If you do no want to get future notifications through this email, kindly <a href='https://napsui.herokuapp.com/help'>stop it here</a>.</p>"
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

  const fileHandler = async (e) => {
    var file = e.target.files[0]
    // const image = await resizeFile(file)
    // setConvertedFile(image)
    // console.log(image)
    var resize_width = 600
    var reader = new FileReader()

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(file)
    reader.name = file.name //get the image's name
    reader.size = file.size //get the image's size
    reader.onload = function (event) {
      var img = new Image() //create a image
      img.src = event.target.result //result is base64-encoded Data URI
      img.name = event.target.name //set name (optional)
      img.size = event.target.size //set size (optional)
      img.onload = function (el) {
        var elem = document.createElement('canvas') //create a canvas

        //scale the image to 600 (width) and keep aspect ratio
        var scaleFactor = resize_width / el.target.width
        elem.width = resize_width
        elem.height = el.target.height * scaleFactor

        //draw in canvas
        var ctx = elem.getContext('2d')
        ctx.drawImage(el.target, 0, 0, elem.width, elem.height)

        //get the base64-encoded Data URI from the resize image
        var srcEncoded = ctx.canvas.toDataURL('image/jpeg', 1)

        //assign it to thumb src
        // document.querySelector('#image').src = srcEncoded

        /*Now you can send "srcEncoded" to the server and
      convert it to a png o jpg. Also can send
      "el.target.name" that is the file's name.*/
        setFile(file)
        // const url = URL.createObjectURL(file)
        console.log(srcEncoded)
        setImgUrl(srcEncoded)
        setUserImg(srcEncoded)
        setConvertedFile(srcEncoded)
      }
    }
    // studentInfo.img=imgSrc;
  }
  const uploadImg = () => {
    imgRef.current.click()
  }
  const handleSubmit = async () => {
    if (userImg === '') {
      setWarnImage(true)
    } else {
      setSubmitStatus('Please wait...')
      const imgSrc = studentInfo.matricNo + '_' + studentInfo.firstName
      setUserImg(imgSrc)
      studentInfo.img = imgSrc
      const imageInfo = {
        image: convertedFile,
        imageName: imgSrc,
        imageType: file.type,
      }
      const studentBody = {
        studentInfo: studentInfo,
        imageInfo: imageInfo,
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
          setShow(false)
          setIsSuccess(true)
          setViewSessionLabel(false)
          setShowView(false)
          notifyUserMail([studentInfo.otherEmail, studentInfo.schoolEmail])
        } else {
          setErrorMessage(
            'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
          )
          setShowModal(true)
        }
      } catch (TypeError) {
        setErrorMessage(
          'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
        )
        setShowModal(true)
      }
    }
  }
  const prevNext = (
    <div className='np' style={{ margin: '0px' }} onClick={getButtonEvent}>
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {viewNext && (
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Next >>'}
        </button>
      )}
    </div>
  )
  const finishList = [
    <div className='container'>
      <h2
        style={{ fontFamily: 'fantasy', letterSpacing: '.2rem' }}
        ref={summaryLabelRef}
      >
        Info Summary
      </h2>
      <div className='regInfo'>
        <h3
          style={{
            marginLeft: '15px',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
          }}
        >
          Basic Info
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
            fontFamily: 'Courier New',
            fontWeight: 'bold',
          }}
        >
          School Info
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
            fontFamily: 'Courier New',
            fontWeight: 'bold',
          }}
        >
          Contact Info
        </h3>
        {contactInfo.map((info, i) => {
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
                {contactInfoValues[i]}
              </label>
            </div>
          )
        })}
      </div>
      <div className='regInfo'>
        <h3
          style={{
            marginLeft: '15px',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
          }}
        >
          Signup Info
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
    </div>,
    <motion.div variants={submitVariants} className='container'>
      <motion.div
        variants={headerVariants}
        className='infotag'
        ref={uploadLabelRef}
      >
        Upload Profile Picture
      </motion.div>
      <img
        className='usr'
        src={imgUrl}
        alt='user'
        height='100px'
        width='100px'
      />
      <input
        ref={imgRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={fileHandler}
      />
      {warnImage && <p style={{ color: 'red' }}>please choose an image</p>}
      <p>
        <button
          className='nxt'
          style={{ backgroundColor: 'blue', color: 'white' }}
          title='Upload Image'
          type='submit'
          name='button'
          value='Upload'
          onClick={uploadImg}
        >
          Upload Here
        </button>
      </p>
      {prevNext}
      <p>
        <motion.button
          variants={buttonVariants}
          className='nxt'
          style={{
            backgroundColor: 'green',
            color: 'white',
            paddingLeft: '80px',
            paddingRight: '80px',
            marginTop: '30px',
          }}
          title='Submit'
          type='submit'
          name='button'
          value='Submit'
          onClick={handleSubmit}
        >
          {submitStatus}
        </motion.button>
      </p>
    </motion.div>,
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ x: -1000 }}
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
      {show && finishList[pos]}
      {isSuccess && (
        <motion.div variants={submitVariants}>
          <p style={{ color: 'black', marginTop: '100px', margin: '50px' }}>
            Dear {setCamelCase(studentInfo.lastName)}{' '}
            {setCamelCase(studentInfo.firstName)}{' '}
            {setCamelCase(studentInfo.middleName)}, Thank You For Your Time.
            Your Details Have Been Submited Succesfully.
          </p>
          <Link to='/signin'>
            <motion.button
              variants={buttonVariants}
              className='nxt'
              style={{ backgroundColor: 'green', color: 'white' }}
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
