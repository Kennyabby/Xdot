import React, { useState, useEffect, useContext, useRef } from 'react'
import ContextProvider from '../../ContextProvider'
import { useHistory, Link } from 'react-router-dom'
import { BsCameraFill } from 'react-icons/bs'

import ConfirmationModal from '../ConfirmationModal'

const ProfileUpload = ({ user, setShowHomeToggle, viewCategories }) => {
  const history = useHistory()
  const { server, darkMode, winSize } = useContext(ContextProvider)
  const [showMessage, setShowMessage] = useState(false)
  const [viewImgStatus, setViewImgStatus] = useState(false)
  const [viewImgcoverStatus, setViewImgcoverStatus] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(true)
  const [showCoverUpload, setShowCoverUpload] = useState(false)
  const imgRef = useRef(null)
  const imgcoverRef = useRef(null)
  const [imgUpdateName, setImgUpdateName] = useState('')
  const [imgTag, setImgTag] = useState('')
  const [userImgUrl, setUserImgUrl] = useState('')
  const [userImgCoverUrl, setUserImgCoverUrl] = useState('')
  const [imgStatus, setImgStatus] = useState('')
  const [skipStats, setSkipStats] = useState('Skip')
  const [contStats, setContStats] = useState('Continue')
  useEffect(async () => {
    if (user !== null && user.img !== undefined && user.img.url !== '') {
      setShowPhotoUpload(true)
      setShowCoverUpload(true)
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgUrl: user.img.url, userName: user.userName }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
    }
    if (
      user !== null &&
      user.imgcover !== undefined &&
      user.imgcover.url !== ''
    ) {
      setShowCoverUpload(true)
      const opts2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imgUrl: user.imgcover.url,
          userName: user.userName,
        }),
      }
      const resp2 = await fetch(server + '/getImgUrl', opts2)
      const response2 = await resp2.json()
      const url = response2.url
      setUserImgUrl(url)
      // setUserImgCoverUrl(user.imgCover)
    }
  }, [user])
  const completeProfileUpload = async () => {
    setContStats('....')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { userName: user.userName },
            {
              skippedProfileUpload: false,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        history.push('/dashboard/profile')
        setShowMessage(false)
      } else {
        setShowMessage(true)
        setContStats('Continue')
      }
    } catch (TypeError) {
      setShowMessage(true)
      setContStats('Continue')
    }
  }
  const handleSkipped = async () => {
    setSkipStats('....')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { userName: user.userName },
            {
              skippedProfileUpload: true,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        history.push('/dashboard/profile')
        setShowMessage(false)
      } else {
        setShowMessage(true)
        setSkipStats('Skip')
      }
    } catch (TypeError) {
      setShowMessage(true)
      setSkipStats('Skip')
    }
  }
  const updateUserImage = () => {
    setImgUpdateName('Profile Photo')
    setImgTag('img')
    imgRef.current.click()
  }
  const updateUserImageCover = () => {
    setImgUpdateName('Cover Photo')
    setImgTag('imgcover')
    imgcoverRef.current.click()
  }
  const uploadImage = async ({
    convertedFile,
    file,
    dominantColor,
    width,
    height,
  }) => {
    if (imgUpdateName === 'Cover Photo') {
      setViewImgcoverStatus(true)
    } else {
      setViewImgStatus(true)
    }
    setImgStatus('Uploading Please Wait...')
    var imgSrc =
      imgUpdateName === 'Cover Photo'
        ? user.imgcover === undefined || user.imgcover.url === ''
          ? user.userName + '_cover'
          : user.imgcover.url
        : user.img === undefined || user.img.url === ''
        ? user.userName + '_img'
        : user.img.url
    const imageInfo = {
      image: convertedFile,
      imageName: imgSrc,
      imageType: file.type,
    }
    var studentInfo = {
      img: imgSrc,
      tag: imgTag,
    }

    const studentBody = {
      imageInfo: imageInfo,
    }
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { userName: user.userName },
            {
              [studentInfo.tag]: {
                url: studentInfo.img,
                dominantColor: dominantColor,
                width: width,
                height: height,
              },
              skippedProfileUpload: false,
            },
          ],
          ...studentBody,
        }),
      }
      const resp = await fetch(server + '/updateUserImg', opts)
      const feedBack = await resp.json()
      // setSubmitStatus('Submit')
      if (feedBack.isDelivered === true) {
        setViewImgStatus(false)
        setViewImgcoverStatus(false)
        setImgStatus('')
        if (imgTag === 'img') {
          user.img = { url: user.userName + '_img' }
          setUserImgUrl(convertedFile)
          setShowCoverUpload(true)
        } else {
          user.imgcover = { url: user.userName + '_cover' }
          setUserImgCoverUrl(convertedFile)
        }
      } else {
        // setErrorMessage(
        //   'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
        // )
        // setShowModal(true)
      }
      // setImgUpdateStatus('')
    } catch (TypeError) {
      setViewImgStatus(false)
      // setImgUpdateStatus('')
      // setErrorMessage(
      //   'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
      // )
      // setShowModal(true)
    }
  }
  const fileHandler = async (e) => {
    var file = e.target.files[0]
    var resize_width = 400
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.name = file.name //get the image's name
    reader.size = file.size //get the image's size
    reader.onload = function (event) {
      var img = new Image() //create a image
      img.src = event.target.result //result is base64-encoded Data URI
      img.name = event.target.name //set name (optional)
      img.size = event.target.size //set size (optional)
      img.onload = function (el) {
        var elem = document.createElement('canvas')
        var scaleFactor = resize_width / el.target.width
        var ctx = elem.getContext('2d')
        elem.width = resize_width
        elem.height = el.target.height * scaleFactor

        ctx.drawImage(el.target, 0, 0, elem.width, elem.height)
        const imageData = ctx.getImageData(0, 0, elem.width, elem.height).data

        const pixelColors = []
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i]
          const g = imageData[i + 1]
          const b = imageData[i + 2]
          const a = imageData[i + 3]
          pixelColors.push(`rgba(${r}, ${g}, ${b}, ${a})`)
        }

        const uniqueColors = new Set(pixelColors)

        const colorPalette = Array.from(uniqueColors)

        const colorCounts = {}
        let maxCount = 0
        let dominantColor = ''
        for (let i = 0; i < colorPalette.length; i++) {
          const color = colorPalette[i]
          colorCounts[color] = (colorCounts[color] || 0) + 1
          if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color]
            dominantColor = color
          }
        }
        var srcEncoded = elem.toDataURL('image/jpeg')
        uploadImage({
          convertedFile: srcEncoded,
          file: file,
          dominantColor: dominantColor,
          width: elem.width,
          height: elem.height,
        })
      }
    }
  }
  return (
    <>
      <div
        style={{
          height: '100vh',
          overflowY: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {showMessage && (
          <ConfirmationModal
            message='Could not connect to server. Check that you are still connected to the internet.'
            title='You Are Offline!!!'
            button1='Ok'
            button2='Reload'
            func1={() => {
              setShowMessage(false)
            }}
            func2={() => {
              window.location.reload()
            }}
          />
        )}
        <div style={{ fontFamily: 'MonteserratBold' }}>
          <h2>Let People Know It's You.</h2>
        </div>
        {!showCoverUpload && (
          <div
            style={{
              margin: '10px',
              marginTop: '30px',
              marginBottom: '30px',
              marginLeft: 'auto',
              width: 'fit-content',
            }}
          >
            <label
              style={{
                cursor: 'pointer',
                padding: '8px 15px',
                borderRadius: '10px',
                color: 'rgba(10, 105, 214)',
                fontFamily: 'SourceCodeProBold',
                boxShadow: darkMode
                  ? '0px 0px 10px white'
                  : '0px 0px 10px black',
              }}
              onClick={handleSkipped}
            >
              {skipStats}
            </label>
          </div>
        )}
        {showPhotoUpload && (
          <div>
            <div style={{ fontFamily: 'MonteserratRegular' }}>
              <h3>upload a profile picture</h3>
            </div>
            <div
              style={{
                borderRadius: '50%',
                backgroundImage: userImgUrl.length > 0 && `url(${userImgUrl})`,
                backgroundSize: 'cover',
                backgroundColor: 'grey',
                width: '150px',
                height: '150px',
                lineHeight: '150px',
                margin: 'auto',
                cursor: 'pointer',
              }}
              onClick={userImgUrl.length === 0 && updateUserImage}
            >
              <input
                name='Profile Photo'
                ref={imgRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={fileHandler}
              />
              {!viewImgStatus && (
                <div
                  style={{
                    display: 'block',
                    fontFamily: 'MonteserratRegular',
                    color: 'white',
                    fontSize: '2rem',
                  }}
                >
                  <BsCameraFill style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
            {viewImgStatus && <div>{imgStatus}</div>}
            {userImgUrl.length > 0 && (
              <div
                style={{
                  fontFamily: 'SourceCodeProRegular',
                  color: 'white',
                  background: 'rgba(15,105,213)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  width: 'fit-content',
                  margin: '10px auto',
                }}
                onClick={updateUserImage}
              >
                Change
              </div>
            )}
          </div>
        )}
        {showCoverUpload && (
          <div>
            <div style={{ fontFamily: 'MonteserratRegular' }}>
              <h3>upload cover photo</h3>
            </div>
            <div
              style={{
                backgroundImage:
                  userImgCoverUrl.length > 0 && `url(${userImgCoverUrl})`,
                backgroundSize: 'cover',
                background: 'grey',
                width: winSize <= 700 ? '90%' : '400px',
                height: '200px',
                lineHeight: '150px',
                margin: 'auto',
                cursor: 'pointer',
              }}
              onClick={userImgCoverUrl.length === 0 && updateUserImageCover}
            >
              <input
                name='Profile Photo'
                ref={imgcoverRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={fileHandler}
              />
              {!viewImgcoverStatus && (
                <div
                  style={{
                    display: 'block',
                    fontFamily: 'MonteserratRegular',
                    color: 'white',
                    fontSize: '2rem',
                  }}
                >
                  <BsCameraFill style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
            {viewImgcoverStatus && <div>{imgStatus}</div>}
            {userImgCoverUrl.length > 0 && (
              <div
                style={{
                  fontFamily: 'SourceCodeProRegular',
                  color: 'white',
                  background: 'rgba(15,105,213)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  width: 'fit-content',
                  margin: '10px auto',
                }}
                onClick={updateUserImageCover}
              >
                Change
              </div>
            )}
          </div>
        )}
        {userImgUrl.length > 0 && (
          <div
            style={{
              width: 'fit-content',
              margin: '10px',
              marginRight: 'auto',
              marginTop: '70px',
            }}
          >
            <label
              style={{
                fontFamily: 'SourceCodeProBold',
                padding: '8px 20px',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.3rem',
                color: 'rgba(10, 105, 214)',
                boxShadow: darkMode
                  ? '0px 0px 10px white'
                  : '0px 0px 10px black',
                // background: 'white',
              }}
              onClick={completeProfileUpload}
            >
              {contStats}
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileUpload
