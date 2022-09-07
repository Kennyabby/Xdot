import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from './user.png'

const Finish = ({
  server,
  getCoverList,
  confidentials,
  getCoverPos,
  setShowView,
  setViewSessionLabel,
}) => {
  const history = useHistory()
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
  const regInfos = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Gender',
    'Guardian Name',
    'Date of Birth',
    'Matric No',
    'School Email',
    'Personal Email',
    'Level',
    'Hall of Residence Allocated',
    'Admission Mode of Entry',
    'Session Admitted',
    'Contact Number',
    'Other Contact Number',
    'Current Address',
    "Guardian's Contact Number",
    "Other Guardian's Contact Number",
    "Guardian's Current Address",
    'Username',
  ]
  const setCamelCase = (text) => {
    var first = text.slice(0, 1).toUpperCase()
    var others = text.slice(1).toLowerCase()
    return first + others
  }
  const regInfoValues = [
    localStorage.getItem('firstName'),
    localStorage.getItem('middleName'),
    localStorage.getItem('lastName'),
    localStorage.getItem('gender'),
    localStorage.getItem('guardianName'),
    localStorage.getItem('dateOfBirth'),
    localStorage.getItem('matricNo'),
    localStorage.getItem('schoolEmail'),
    localStorage.getItem('otherEmail'),
    localStorage.getItem('level'),
    localStorage.getItem('hallOfResidence'),
    localStorage.getItem('modeOfEntry'),
    localStorage.getItem('yearOfAdmission'),
    localStorage.getItem('contactNo'),
    localStorage.getItem('otherContactNo'),
    localStorage.getItem('currentAddress'),
    localStorage.getItem('guardianContactNo'),
    localStorage.getItem('otherGuardianContactNo'),
    localStorage.getItem('guardianCurrentAddress'),
    localStorage.getItem('userName'),
  ]

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
  useEffect(async () => {
    if (file !== null) {
      const newFile = await convertToBase64(file)
      setConvertedFile(newFile)
    }
  }, [file])
  useEffect(() => {
    if (userImg === '') {
    } else {
      setWarnImage(false)
    }
  }, [userImg])
  const notifyUserMail = async (mail) => {
    const message =
      '<h1>Naps Account Creation Confirmation</h1><p>Hi, <b>' +
      studentInfo.firstName +
      "</b>.</p><p>You are getting this email to confirm that you have just created an account with the National Association Of Physics Students, University of Ibadan Chapter <b>(NAPS UI)</b>. If This is you, you don't need to do anything.</p><p>If this is not you, kindly click on the link below. </p><p><a href='https://napsui.herokuapp.com/help'><button style='padding:5px; border-radius:10px; color:red'; background-color:white; font-family:monospace;>Help >></button></a></p><p>Regards.</p>"
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: [mail],
        type: 'html',
        subject: '(NAPSUI) ACCOUNT CREATED BY YOU',
        message: message,
      }),
    }
    const resp = await fetch(server + '/mailUser', opts)
  }

  const fileHandler = (e) => {
    var file = e.target.files[0]
    console.log('type: ' + file.type)
    setFile(file)
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    setUserImg(url)
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
      const imgSrc = Date.now() + file.name
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
        if (feedBack.isDelivered === true) {
          setShow(false)
          setIsSuccess(true)
          notifyUserMail(studentInfo.otherEmail)
          setViewSessionLabel(false)
          setShowView(false)
        }
      } catch (TypeError) {}
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
      <h3 ref={summaryLabelRef}>Info Summary</h3>
      {regInfos.map((regInfo, i) => {
        return (
          <p className='regInfo' key={i}>
            <label style={{ fontWeight: 'bold' }}>{regInfo}: </label>
            <label style={{ fontWeight: 'light', fontStyle: 'italic' }}>
              {regInfoValues[i]}
            </label>
          </p>
        )
      })}
      {prevNext}
    </div>,
    <div className='container'>
      <div className='infotag' ref={uploadLabelRef}>
        Upload Profile Picture
      </div>
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
        <button
          className='nxt'
          style={{
            backgroundColor: 'green',
            color: 'white',
            paddingLeft: '100px',
            paddingRight: '100px',
            marginTop: '30px',
          }}
          title='Submit'
          type='submit'
          name='button'
          value='Submit'
          onClick={handleSubmit}
        >
          {submitStatus}
        </button>
      </p>
    </div>,
  ]

  return (
    <div ref={finishCoverRef}>
      {show && finishList[pos]}
      {isSuccess && (
        <div>
          <p style={{ color: 'black', marginTop: '100px', margin: '50px' }}>
            Dear {setCamelCase(studentInfo.lastName)}{' '}
            {setCamelCase(studentInfo.firstName)}{' '}
            {setCamelCase(studentInfo.middleName)}, Thank You For Your Time.
            Your Details Have Been Submited Succesfully.
          </p>
          <Link to='/signin'>
            <button
              className='nxt'
              style={{ backgroundColor: 'green', color: 'white' }}
              title='Sign in'
              type='submit'
              name='button'
              value='Sign in'
            >
              Proceed to Sign in
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Finish
