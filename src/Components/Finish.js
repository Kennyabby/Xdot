import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from './user.png'

const Finish = ({
  getCoverList,
  confidentials,
  getCoverPos,
  setShowView,
  setViewSessionLabel,
}) => {
  const history = useHistory()
  const [viewNext, setViewNext] = useState(true)
  const finishCoverRef = useRef(null)
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
    identificationKey: confidentials.identificationKey,
    access: 'User',
    isEditable: 'false',
    createdAt: Date.now(),
    courseDetails: [],
    createQuiz: [],
  }
  useEffect(() => {
    getCoverList(finishList)
    if (
      confidentials.password === '' ||
      confidentials.identificationKey === ''
    ) {
      history.push('./signupInfo')
    }
  }, [])
  useEffect(() => {
    getCoverPos(pos)
  }, [pos])
  const getButtonEvent = (e) => {
    if (e.target.value === 'Next') {
      if (pos === 1) {
        // history.push('./signupInfo');
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
  const convertToBase64 = (file)=>{
    return new Promise (resolve =>{
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload=()=>{
        resolve(reader.result)
      }
    })
  }
  useEffect(async ()=>{
    if (file!==null){
      const newFile = await convertToBase64(file)
      setConvertedFile(newFile)
    }
  },[file])
  useEffect(() => {
    if (userImg === '') {
    } else {
      setWarnImage(false)
    }
  }, [userImg])
  const fileHandler = (e) => {
    var file = e.target.files[0]
    console.log('type: '+file.type)
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
      const imageInfo={
        image: convertedFile,
        imageName: imgSrc,
        imageType: file.type
      }
      try {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({info:studentInfo, imageInfo:imageInfo}),
        }
        const resp = await fetch('https://napsuiserver.herokuapp.com/postUserDetails', opts)
        const feedBack = await resp.json()
        if (feedBack.isDelivered === true) {
          setShow(false)
          setIsSuccess(true)
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
          Prev
        </button>
      }
      {viewNext && (
        <button className='nxt' type='submit' name='button' value='Next'>
          Next
        </button>
      )}
    </div>
  )
  const finishList = [
    <div className='container'>
      {regInfos.map((regInfo, i) => {
        return (
          <p className='regInfo' key={i}>
            {regInfo}: <label style={{fontWeight:'light', fontStyle:'italic'}}>{regInfoValues[i]}</label>
          </p>
        )
      })}
      {prevNext}
    </div>,
    <div className='container'>
      <img className='usr' src={imgUrl} alt='user' height='100px' />
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
          Upload Your Profile Picture
        </button>
      </p>
      <p>
        <button
          className='nxt'
          style={{ backgroundColor: 'green', color: 'white' }}
          title='Submit'
          type='submit'
          name='button'
          value='Submit'
          onClick={handleSubmit}
        >
          {submitStatus}
        </button>
      </p>
      {prevNext}
    </div>,
  ]
  
  return (
    <div ref={finishCoverRef}>
      {show && finishList[pos]}
      {isSuccess && (
        <div>
          <p style={{ color: 'white', marginTop: '100px' }}>
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
