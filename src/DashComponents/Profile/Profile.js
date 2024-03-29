import { React, useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PaystackButton } from 'react-paystack'
import { BsCameraFill } from 'react-icons/bs'
import { FiEdit3 } from 'react-icons/fi'
import { BiLoaderCircle } from 'react-icons/bi'

import ContextProvider from '../../ContextProvider'

import imgcover from '../assets/userimgcover.jpg'
import profimg from '../assets/user.png'
import usercontrolopt from '../assets/usercontrolopt.png'
import settings from '../assets/settings.jpg'
import close from '../assets/close.png'
import cancel from '../assets/cancel.png'
import sblike from '../assets/sblike.png'

import AdminBoard from './AdminBoard'

const Profile = ({
  server,
  chatrf,
  homerf,
  notificationsrf,
  user,
  accountUser,
  margin,
  backgroundColor,
  overflow,
  padding,
  isSearched,
  clickAdmin,
  showHomeToggle,
}) => {
  const [showProfMenuDrop, setShowProfMenuDrop] = useState(false)
  const [showAllDetails, setShowAllDetails] = useState(false)
  const [showStatus, setShowStatus] = useState('View All Details')
  const [aboutSaveStatus, setAboutSaveStatus] = useState('Done')
  const [followPointerEvent, setFollowPointerEvent] = useState('auto')
  const [allowedLength, setAllowedLength] = useState(61)
  const [imgUpdateName, setImgUpdateName] = useState('')
  const [file, setFile] = useState(null)
  const [convertedFile, setConvertedFile] = useState(null)
  const [imgUpdateStatus, setImgUpdateStatus] = useState('')
  const [viewImgStatus, setViewImgStatus] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showControlOpt, setShowControlOpt] = useState(false)
  const [showUpdateCover, setShowUpdateCover] = useState(false)
  const [followStatus, setFollowStatus] = useState('')
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [userImgCoverUrl, setUserImgCoverUrl] = useState(imgcover)
  const [displayImg, setDisplayImg] = useState(profimg)
  const [showImage, setShowImage] = useState({ show: false })
  const [payedDues, setPayedDues] = useState([])
  const aboutEditRef = useRef(null)
  const imgRef = useRef(null)
  const [addSummary, setAddSummary] = useState(false)
  const [editStatus, setEditStatus] = useState(
    user.isEditable === 'false' ? 'Enable Edit Access' : 'Disable Edit Access'
  )
  const [editMain, setEditMain] = useState(false)
  const [mainField, setMainField] = useState({
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    level: user.student.level,
    hallOfResidence: user.hallOfResidence,
    access: user.access,
  })
  const [viewMainSave, setViewMainSave] = useState(false)
  const [mainUpdateStatus, setMainUpdateStatus] = useState('Save')
  const [otherField, setOtherField] = useState({
    matricNo: user.student.matricNo,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    nationality: user.nationality,
    educationQualification: user.educationQualification,
    instituteCountryName: user.student.instituteCountryName,
  })
  const [editOtherInfo, setEditOtherInfo] = useState(false)
  const [otherProfileUpdateStatus, setOtherProfileUpdateStatus] =
    useState('Save')
  const [contactField, setContactField] = useState({
    schoolEmail: user.student.schoolEmail,
    otherEmail: user.otherEmail,
    contactNo: user.contactNo,
  })
  const [editContactInfo, setEditContactInfo] = useState(false)
  const [contactProfileUpdateStatus, setContactProfileUpdateStatus] =
    useState('Save')
  const [aboutField, setAboutField] = useState(user.aboutField || '')
  const [enterPressed, setEnterPressed] = useState(false)
  const [selectedDues, setSelectedDues] = useState([])
  const [dueFields, setDueFields] = useState({
    basic: {
      name: 'Basic',
      selected: true,
      amount: '3000',
      compulsory: ['100', '200', '300', '400'],
      available: ['100', '200', '300', '400'],
    },
    shirt: {
      name: 'Shirt',
      selected: false,
      amount: '2500',
      compulsory: ['100'],
      available: ['100', '200', '300', '400'],
    },
    excursion: {
      name: 'Excursion',
      selected: false,
      amount: '3000',
      compulsory: ['100'],
      available: ['100', '200', '300', '400'],
    },
    dinner: {
      name: 'Dinner',
      selected: false,
      amount: '2000',
      compulsory: ['100', '400'],
      available: ['100', '200', '300', '400'],
    },
    finalYearBook: {
      name: 'Final Year Book',
      selected: false,
      amount: '1000',
      compulsory: ['400'],
      available: ['400'],
    },
    freshersOrientation: {
      name: 'Freshers Orientation',
      selected: false,
      amount: '1000',
      compulsory: ['100'],
      available: ['100'],
    },
  })
  const { darkMode } = useContext(ContextProvider)
  const [showPayments, setShowPayments] = useState(false)
  const [paystackButtonLabel, setPaystackButtonLabel] =
    useState('Continue Payment')
  // const publicKey = 'pk_test_d549d69753f15dc9b34d94061e053e7c058a989e'
  const publicKey = 'pk_live_b086de2ee46109d65c3b6b42a202c71ba8921059'
  const [dueInfo, setDueInfo] = useState({
    email: user.otherEmail,
    name: user.firstName + ' ' + user.middleName + ' ' + user.lastName,
    phone: user.contactNo,
  })
  const [amount, setAmount] = useState(0)
  const [availableDues, setAvailableDues] = useState(0)
  const [showPayStack, setShowPayStack] = useState(false)
  const [payments, setPayments] = useState(user.payments)
  const [currentSession, setCurrentSession] = useState('2021/2022')
  const [paymentLabelStatus, setPaymentLabelStatus] = useState('View')
  const [showAdminOpt, setShowAdminOpt] = useState(true)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [personal, setPersonal] = useState([])
  const [followRequests, setFollowRequests] = useState([])
  const [gotPersonal, setGotPersonal] = useState(false)
  const [gotFollowers, setGotFollowers] = useState(false)
  const [gotFollowing, setGotFollowing] = useState(false)
  const [userNotifications, setUserNotifications] = useState([])
  useEffect(() => {
    var amt = 0
    setSelectedDues([])
    setPayedDues([])
    const dues = Object.keys(dueFields)
    Object.values(dueFields).forEach((due, i) => {
      const value = Number(due.amount) * 100
      if (
        due.selected ||
        due.compulsory.includes(user.level) ||
        (payments !== undefined &&
          payments[currentSession]['basicDue'][dues[i]] !== undefined &&
          payments[currentSession]['basicDue'][dues[i]]['payed'] === true)
      ) {
        amt += value
        if (
          payments !== undefined &&
          payments[currentSession]['basicDue'][dues[i]] !== undefined &&
          payments[currentSession]['basicDue'][dues[i]]['payed'] === true
        ) {
          amt -= value
          setPayedDues((payedDues) => {
            return [...payedDues, dues[i]]
          })
        } else {
          setSelectedDues((selectedDues) => {
            return [...selectedDues, dues[i]]
          })
        }
      }
    })

    setAmount(amt)
  }, [dueFields, currentSession, payments])
  useEffect(() => {
    var ct = 0
    Object.values(dueFields).forEach((due, i) => {
      if (due.available.includes(user.level)) {
        ct++
      }
    })
    setAvailableDues(ct)
  }, [availableDues])
  const updateOneUser = async ({ findBy, update }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [findBy, update],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        return true
      } else {
        return false
      }
    } catch (TypeError) {}
  }
  const handlePaymentSuccess = async (reference) => {
    setShowPayStack(false)
    var paym = payments
    if (paym === undefined) {
      paym = {}
      if (paym[currentSession] === undefined) {
        paym[currentSession] = {}
        if (paym[currentSession]['basicDue'] === undefined) {
          paym[currentSession]['basicDue'] = {}
        }
      }
    }
    selectedDues.forEach((due) => {
      if (paym[currentSession]['basicDue'][due] === undefined) {
        paym[currentSession]['basicDue'][due] = {}
      }
      paym[currentSession]['basicDue'][due]['payed'] = true
      paym[currentSession]['basicDue'][due]['amount'] = dueFields[due]['amount']
      paym[currentSession]['basicDue'][due]['createdAt'] = reference
    })
    try {
      const updated = await updateOneUser({
        findBy: { matricNo: user.matricNo },
        update: { payments: paym },
      })
      if (updated) {
        setDueFields({
          basic: {
            name: 'Basic',
            selected: true,
            amount: '3000',
            compulsory: ['100', '200', '300', '400'],
            available: ['100', '200', '300', '400'],
          },
          shirt: {
            name: 'Shirt',
            selected: false,
            amount: '3500',
            compulsory: ['100'],
            available: ['100', '200', '300', '400'],
          },
          excursion: {
            name: 'Excursion',
            selected: false,
            amount: '3000',
            compulsory: ['100'],
            available: ['100', '200', '300', '400'],
          },
          dinner: {
            name: 'Dinner',
            selected: false,
            amount: '3000',
            compulsory: ['100', '400'],
            available: ['100', '200', '300', '400'],
          },
          finalYearBook: {
            name: 'Final Year Book',
            selected: false,
            amount: '1500',
            compulsory: ['400'],
            available: ['400'],
          },
          freshersOrientation: {
            name: 'Freshers Orientation',
            selected: false,
            amount: '1000',
            compulsory: ['100'],
            available: ['100'],
          },
        })
        setPayments(paym)
      } else {
      }
    } catch (error) {}
  }
  const handlePaymentClosed = () => {
    setShowPayStack(false)
  }
  const componentProps = {
    reference: new Date().getTime().toString(),
    email: dueInfo.email,
    amount,
    metadata: {
      name: dueInfo.name,
      phone: dueInfo.phone,
    },
    publicKey,
    text: paystackButtonLabel,
    onSuccess: (reference) => handlePaymentSuccess(reference),
    onClose: handlePaymentClosed,
  }

  const contactDetailsName = ['School Email', 'Other Email', 'Contact No']
  const contactDetailsValue = ['schoolEmail', 'otherEmail', 'contactNo']
  const allUserDetailName = [
    'Matric No',
    'Gender',
    'Date Of Birth',
    'Nationality',
    'Institute Origin',
    'Education Qualification',
  ]
  const allUserDetailValue = [
    'matricNo',
    'gender',
    'dateOfBirth',
    'nationality',
    'instituteCountryName',
    'educationQualification',
  ]
  useEffect(async () => {
    if (user !== null) {
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
      if (user.imgcover.url !== undefined && user.imgcover.url !== null) {
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
        const url1 = response2.url
        setUserImgCoverUrl(url1)
      }
    }
  }, [user])
  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'User_' + user.userName,
          collection: 'followers',
          data: {},
        }),
      }

      const resp = await fetch(server + '/getManyUpdates', opts)
      const response = await resp.json()
      const updates = await response.updates
      setGotFollowers(true)
      setFollowers(updates)
    } catch (TypeError) {}
    try {
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'User_' + user.userName,
          collection: 'following',
          data: {},
        }),
      }

      const resp1 = await fetch(server + '/getManyUpdates', opts1)
      const response1 = await resp1.json()
      const updates1 = await response1.updates
      setGotFollowing(true)
      setFollowing(updates1)
    } catch (TypeError) {}
    try {
      const opts2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'User_' + user.userName,
          collection: 'followRequests',
          data: {},
        }),
      }

      const resp2 = await fetch(server + '/getManyUpdates', opts2)
      const response2 = await resp2.json()
      const updates2 = await response2.updates
      setFollowRequests(updates2)
    } catch (TypeError) {}
    try {
      const opts3 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'User_' + user.userName,
          collection: 'personal',
          data: {},
        }),
      }

      const resp3 = await fetch(server + '/getManyUpdates', opts3)
      const response3 = await resp3.json()
      const updates3 = await response3.updates
      setGotPersonal(true)
      setPersonal(updates3)
    } catch (TypeError) {}
  }, [])
  useEffect(async () => {
    if (isSearched) {
      try {
        const opts3 = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            database: 'User_' + user.userName,
            collection: 'followers',
            data: { userName: accountUser.userName },
          }),
        }
        const resp3 = await fetch(server + '/isDocPresent', opts3)
        const response3 = await resp3.json()
        const isPresent = await response3.isPresent
        if (isPresent) {
          setFollowStatus('Following')
        } else {
          if (!user.isPublic) {
            const opts3 = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                database: 'User_' + user.userName,
                collection: 'followRequests',
                data: { userName: accountUser.userName },
              }),
            }
            const resp3 = await fetch(server + '/isDocPresent', opts3)
            const response3 = await resp3.json()
            const isPresent = await response3.isPresent
            if (isPresent) {
              setFollowStatus('Request Sent')
            } else {
              setFollowStatus('Follow')
            }
          } else {
            setFollowStatus('Follow')
          }
        }
      } catch (TypeError) {}
    }
  }, [followers])
  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionSettings: 1 }),
      }
      const resp = await fetch(server + '/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      const currentSession = settings[0].sessionSettings.currentSession
      setCurrentSession(currentSession)
    } catch (error) {}
  }, [])
  useEffect(() => {
    if (!isSearched) {
      showHomeToggle(true)
    }
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].style.color = darkMode
          ? 'rgba(190,190,230)'
          : 'rgba(16,16,66)'
      }
    }
    if (notificationsrf !== undefined) {
      if (
        notificationsrf.current !== null &&
        notificationsrf.current !== undefined
      ) {
        notificationsrf.current.childNodes[0].childNodes[0].style.color =
          darkMode ? 'rgba(190,190,230)' : 'rgba(16,16,66)'
      }
    }
  }, [homerf, darkMode])
  const handleFollowStatus = async () => {
    setFollowPointerEvent('none')
    if (followStatus === 'Follow') {
      try {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            database: 'User_' + user.userName,
            collection: user.isPublic ? 'followers' : 'followRequests',
            update: {
              userName: accountUser.userName,
              firstName: accountUser.firstName,
              middleName: accountUser.middleName,
              lastName: accountUser.lastName,
              img: accountUser.img,
              createdAt: Date.now(),
            },
          }),
        }
        const resp = await fetch(server + '/createDoc', opts)
        const response = await resp.json()
        const isDelivered = await response.isDelivered
        if (isDelivered) {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              database: 'User_' + accountUser.userName,
              collection: 'following',
              update: {
                userName: user.userName,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                img: user.img,
                creatdeAt: Date.now(),
              },
            }),
          }
          const resp = await fetch(server + '/createDoc', opts)
          const response = await resp.json()
          const isDelivered1 = await response.isDelivered
          if (isDelivered1) {
            if (user.isPublic) {
              setFollowStatus('Following')
            } else {
              setFollowStatus('Request Sent')
            }
          }
        }
      } catch (TypeError) {}
    } else if (
      followStatus === 'Following' ||
      followStatus === 'Request Sent'
    ) {
      try {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            database: 'User_' + user.userName,
            collection:
              followStatus === 'Request Sent' ? 'followRequests' : 'followers',
            update: { userName: accountUser.userName },
          }),
        }
        const resp = await fetch(server + '/removeDoc', opts)
        const response = await resp.json()
        const isRemoved = await response.isRemoved
        if (isRemoved) {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              database: 'User_' + accountUser.userName,
              collection: 'following',
              update: { userName: user.userName },
            }),
          }
          const resp = await fetch(server + '/removeDoc', opts)
          const response = await resp.json()
          const isRemoved1 = await response.isRemoved
          if (isRemoved1) {
            setFollowStatus('Follow')
          }
        }
      } catch (TypeError) {}
    }
    setFollowPointerEvent('auto')
  }
  const handleProfMenuDrop = () => {
    if (showProfMenuDrop) {
      setShowProfMenuDrop(false)
    } else {
      setShowProfMenuDrop(true)
    }
  }
  const handleMenuItem = (e) => {
    setShowProfMenuDrop(false)
    const name = e.target.getAttribute('name')
    if (name === 'viewprof') {
      setShowImage((showImage) => {
        return { ...showImage, show: true, src: userImgUrl }
      })
    } else if (name === 'viewcover') {
      setShowImage((showImage) => {
        return { ...showImage, show: true, src: userImgCoverUrl }
      })
    } else if (name === 'changeprof') {
      setDisplayImg(userImgUrl)
      setImgUpdateName('Profile Image')
      setShowUpdateCover(true)
    } else if (name === 'changecover') {
      setDisplayImg(userImgCoverUrl)
      setImgUpdateName('Cover Photo')
      setShowUpdateCover(true)
    }
  }
  const updateUserImage = () => {
    imgRef.current.click()
  }
  const uploadImage = async ({
    convertedFile,
    file,
    dominantColor,
    width,
    height,
  }) => {
    setViewImgStatus(true)
    setImgUpdateStatus('Uploading Image Please Wait...')
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
      tag: imgUpdateName === 'Cover Photo' ? 'imgcover' : 'img',
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
            },
          ],
          ...studentBody,
        }),
      }
      const resp = await fetch(server + '/updateUserImg', opts)
      const feedBack = await resp.json()
      // setSubmitStatus('Submit')
      if (feedBack.isDelivered === true) {
        if (studentInfo.tag === 'img') {
          setUserImgUrl(convertedFile)
        } else {
          setUserImgCoverUrl(convertedFile)
        }
        setShowUpdateCover(false)
      } else {
        // setErrorMessage(
        //   'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
        // )
        // setShowModal(true)
      }
      setViewImgStatus(false)
      setImgUpdateStatus('')
    } catch (TypeError) {
      setViewImgStatus(false)
      setImgUpdateStatus('')
      // setErrorMessage(
      //   'An Error Occured, Could not submit your details. Kindly check that your device is connected to a stable internet.'
      // )
      // setShowModal(true)
    }
  }
  const fileHandler = async (e) => {
    var file = e.target.files[0]
    setFile(file)
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
        setDisplayImg(srcEncoded)
        setConvertedFile(srcEncoded)
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
  useEffect(() => {
    if (showAllDetails) {
      setShowStatus('View Few Details')
    } else {
      setShowStatus('View More Details')
    }
  }, [showAllDetails])
  const handleShowDetails = () => {
    setShowAllDetails(!showAllDetails)
  }
  const handleAdminBoard = () => {
    setShowAdminBoard(true)
  }

  const handleUserControlOpt = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'usercontrolopt') {
      if (showControlOpt) {
        setShowControlOpt(false)
      } else {
        setShowControlOpt(true)
      }
    }
  }
  const updateEditStatus = async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { matricNo: user.matricNo },
            {
              isEditable:
                editStatus === 'Enable Edit Access' ? 'true' : 'false',
            },
          ],
        }),
      }

      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        setEditStatus(
          editStatus === 'Enable Edit Access'
            ? 'Disable Edit Access'
            : 'Enable Edit Access'
        )
        setShowControlOpt(false)
      }
    } catch (TypeError) {}
  }
  const updateAdminStatus = async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { matricNo: user.matricNo },
            {
              access: 'Admin',
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        setShowAdminOpt(false)
        setShowControlOpt(false)
      }
    } catch (TypeError) {}
  }

  const suspendUser = () => {}
  const handleDuesInput = (e) => {
    const name = e.target.getAttribute('name')
    if (name !== 'basic' && dueFields[name] !== undefined) {
      if (dueFields[name]['selected']) {
        setDueFields((dueFields) => {
          return {
            ...dueFields,
            [name]: { ...dueFields[name], selected: false },
          }
        })
      } else {
        setDueFields((dueFields) => {
          return {
            ...dueFields,
            [name]: { ...dueFields[name], selected: true },
          }
        })
      }
    }
  }
  const updateContactProfile = async () => {
    setContactProfileUpdateStatus('Saving...')
    console.log(!['', null, 'null', undefined].includes(mainField.level))
    const body = {
      student: {
        ...user.student,
        check: !['', null, 'null', undefined].includes(mainField.level)
          ? true
          : false,
        schoolEmail: contactField.schoolEmail,
      },
      otherEmail: contactField.otherEmail,
      contactNo: contactField.contactNo,
    }
    const updated = await updateOneUser({
      findBy: { userName: user.userName },
      update: body,
    })
    if (updated) {
      setContactProfileUpdateStatus('Saved')
      Object.keys(contactField).forEach((field) => {
        user[field] = contactField[field]
      })
      setEditContactInfo(false)
      setContactProfileUpdateStatus('Save')
    } else {
      setContactProfileUpdateStatus('An Error Occured')
    }
  }
  const handleContactFieldUpdate = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setContactField((contactField) => {
      return { ...contactField, [name]: value }
    })
  }
  const updateOtherProfile = async () => {
    setOtherProfileUpdateStatus('Saving...')
    const body = {
      student: {
        ...user.student,
        check: !['', null, 'null', undefined].includes(mainField.level)
          ? true
          : false,
        matricNo: otherField.matricNo,
        instituteCountryName: otherField.instituteCountryName,
      },
      gender: otherField.gender,
      dateOfBirth: otherField.dateOfBirth,
      nationality: otherField.nationality,
      educationQualification: otherField.educationQualification,
    }
    const updated = await updateOneUser({
      findBy: { userName: user.userName },
      update: body,
    })
    if (updated) {
      setOtherProfileUpdateStatus('Saved')
      Object.keys(otherField).forEach((field) => {
        user[field] = otherField[field]
      })
      setEditOtherInfo(false)
      setOtherProfileUpdateStatus('Save')
    } else {
      setOtherProfileUpdateStatus('An Error Occured')
    }
  }
  const handleOtherFieldUpdate = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setOtherField((otherField) => {
      return { ...otherField, [name]: value }
    })
  }
  useEffect(() => {
    setViewMainSave(true)
  }, [mainField])
  const updateMainProfile = async () => {
    setMainUpdateStatus('Saving...')
    const updated = await updateOneUser({
      findBy: { userName: user.userName },
      update: mainField,
    })
    if (updated) {
      setMainUpdateStatus('Saved')
      Object.keys(mainField).forEach((field) => {
        user[field] = mainField[field]
      })
      setEditMain(false)
      setMainUpdateStatus('Save')
    } else {
      setMainUpdateStatus('An Error Occured')
    }
  }
  const handleMainFieldUpdate = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setMainField((mainField) => {
      return { ...mainField, [name]: value }
    })
  }

  const setCaretPosition = (el, pos) => {
    const range = document.createRange()
    range.selectNodeContents(el.current)
    range.setStart(range.endContainer, 0)
    const childNodes = el.current.childNodes
    let found = false
    let offset = 0
    for (const childNode of childNodes) {
      if (offset + childNode.textContent.length >= pos) {
        range.setStart(childNode, pos - offset)
        range.setEnd(childNode, pos - offset)
        found = true
        break
      }
      offset += childNode.textContent.length
    }
    if (found) {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  const getCaretPosition = (el) => {
    let caretOffset = 0
    const doc = el.current.ownerDocument || el.current.document
    const win = doc.defaultView || doc.parentWindow
    const sel = win.getSelection()
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(el.current)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }

    return caretOffset
  }
  useEffect(() => {
    if (aboutEditRef.current !== null) {
      const caretPos = getCaretPosition(aboutEditRef)
      aboutEditRef.current.textContent = aboutField
      if (enterPressed) {
        setCaretPosition(aboutEditRef, caretPos + 1)
        setEnterPressed(false)
      } else {
        setCaretPosition(aboutEditRef, caretPos)
      }
    }
  }, [aboutField])
  const mainLabelStyle = {
    color: darkMode ? 'white' : 'black',
    display: 'block',
    padding: '15px',
    margin: '10px auto',
  }
  const mainFieldStyle = {
    padding: '15px',
    margin: '10px auto',
    border: 'solid black 0px',
    color: darkMode ? 'white' : 'black',
    borderRadius: '10px',
    background: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
  }
  return (
    <>
      <div
        style={{
          margin: margin,
          padding: padding,
          backgroundColor: backgroundColor,
          overflowY: overflow,
          boxShadow: 'none',
          flexWrap: 'wrap',
          height: 'auto',
          paddingBottom: '70px',
          fontFamily: 'MonteserratRegular',
        }}
      >
        {showProfMenuDrop && (
          <div
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: '0px',
              left: '0px',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onTouchStart={() => {
              setShowProfMenuDrop(false)
            }}
            onClick={() => {
              setShowProfMenuDrop(false)
            }}
          ></div>
        )}
        {showControlOpt && (
          <div
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: '0px',
              left: '0px',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onTouchStart={() => {
              setShowControlOpt(false)
            }}
            onClick={() => {
              setShowControlOpt(false)
            }}
          ></div>
        )}
        {showAdminBoard && (
          <AdminBoard
            server={server}
            closeAdminBoard={() => {
              setShowAdminBoard(false)
            }}
            currentUser={user}
          />
        )}
        {showUpdateCover && (
          <div
            className='updatecov'
            style={{ backgroundColor: ' rgba(250,250,250,0.9)' }}
          >
            <div
              className='updatecovchild'
              style={{ backgroundColor: 'white' }}
            >
              <img
                src={cancel}
                style={{
                  position: 'absolute',
                  top: '5px',
                  left: '5px',
                  zIndex: '3',
                  cursor: 'pointer',
                }}
                height='20px'
                onClick={() => {
                  setShowUpdateCover(false)
                }}
              />
              <LazyLoadImage
                src={displayImg}
                effect='blur'
                style={{
                  borderRadius: imgUpdateName === 'Cover Photo' ? '0px' : '50%',
                  width: imgUpdateName === 'Cover Photo' ? '90%' : '150px',
                  height: imgUpdateName === 'Cover Photo' ? '70vh' : '100px',
                  margin: 'auto',
                }}
              />
              <input
                ref={imgRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={fileHandler}
              />
              {viewImgStatus && <div>{imgUpdateStatus}</div>}

              {!viewImgStatus && (
                <div>
                  <button
                    onClick={updateUserImage}
                    style={{
                      margin: '15px',
                      padding: '10px 15px',
                      borderRadius: '15px',
                      backgroundColor: 'blue',
                      border: 'solid blue 1px',
                      color: 'white',
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                    }}
                  >
                    {'Change ' + imgUpdateName}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <AnimatePresence>
          {showImage.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              exit={{ opacity: 0, transition: { ease: 'easeIn' } }}
              style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: '0px',
                zIndex: '3',
                left: '0px',
                backgroundColor: 'rgba(19,19,20,1)',
              }}
            >
              <img
                src={close}
                style={{
                  position: 'fixed',
                  top: '5px',
                  right: '5px',
                  zIndex: '3',
                  cursor: 'pointer',
                }}
                height='20px'
                onClick={() => {
                  setShowImage((showImage) => {
                    return { ...showImage, show: false }
                  })
                }}
              />
              <motion.div
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut' }}
                exit={{ scale: 0.2, transition: { ease: 'easeIn' } }}
                className='profimgview'
              >
                <LazyLoadImage
                  src={showImage.src}
                  width='100%'
                  effect='blur'
                  alt='user photo'
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {editMain && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              exit={{ opacity: 0, transition: { ease: 'easeIn' } }}
              style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: '0px',
                overflowY: 'auto',
                zIndex: '3',
                left: '0px',
                color: darkMode ? 'white' : 'black',
                backgroundColor: darkMode
                  ? 'rgba(10,10,10,0.9)'
                  : 'rgba(247,247,255,0.95)',
              }}
            >
              <img
                src={darkMode ? close : cancel}
                style={{
                  position: 'fixed',
                  top: '5px',
                  left: '5px',
                  zIndex: '3',
                  cursor: 'pointer',
                }}
                height='20px'
                onClick={() => {
                  setEditMain(false)
                }}
              />
              <div
                onChange={handleMainFieldUpdate}
                style={{ fontFamily: 'MonteserratRegular' }}
              >
                <div
                  style={{
                    margin: '15px auto',
                    marginBottom: '25px',
                    fontFamily: 'MonteserratBold',
                    fontWeight: 'bold',
                  }}
                >
                  Edit Profile
                </div>
                <div style={mainLabelStyle}>
                  <div style={{ fontWeight: 'bold' }}>First Name</div>
                  <input
                    name='firstName'
                    style={mainFieldStyle}
                    placeholder='Enter First Name'
                    value={mainField.firstName}
                  />
                </div>
                <div style={mainLabelStyle}>
                  <div style={{ fontWeight: 'bold' }}>Middle Name</div>
                  <input
                    name='middleName'
                    style={mainFieldStyle}
                    placeholder='Enter Middle Name'
                    value={mainField.middleName}
                  />
                </div>
                <div style={mainLabelStyle}>
                  <div style={{ fontWeight: 'bold' }}>Last Name</div>
                  <input
                    name='lastName'
                    style={mainFieldStyle}
                    placeholder='Enter Last Name'
                    value={mainField.lastName}
                  />
                </div>
                <div style={mainLabelStyle}>
                  <div style={{ fontWeight: 'bold' }}>Level</div>
                  <select
                    name='level'
                    style={mainFieldStyle}
                    placeholder='Enter Level'
                    value={mainField.level}
                  >
                    <option value=''>Enter Level</option>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                    <option value='300'>300</option>
                    <option value='400'>400</option>
                    <option value='500'>500</option>
                    <option value='600'>600</option>
                    <option value='700'>700</option>
                    <option value='Post Graduate'>Post Graduate</option>
                  </select>
                </div>
                <div style={mainLabelStyle}>
                  <div style={{ fontWeight: 'bold' }}>Hall Of Residence</div>
                  <select
                    name='hallOfResidence'
                    style={mainFieldStyle}
                    placeholder='Enter Hall Of Residence'
                    value={mainField.hallOfResidence}
                  >
                    <option value=''>Hall of Residence Allocated</option>
                    <option value='MELLANBY'>MELLANBY</option>
                    <option value='TEDDER'>TEDDER</option>
                    <option value='KUTI'>KUTI</option>
                    <option value='SULTAN BELLO'>SULTAN BELLO</option>
                    <option value='QUEEN ELIZABETH II'>
                      QUEEN ELIZABETH II
                    </option>
                    <option value='INDEPENDENCE'>INDEPENDENCE</option>
                    <option value='IDIA'>IDIA</option>
                    <option value='OBAFEMI AWOLOWO'>OBAFEMI AWOLOWO</option>
                    <option value='ALEXANDER BROWN'>ALEXANDER BROWN</option>
                    <option value='ABDULSALAMI ABUBAKAR'>
                      ABDULSALAMI ABUBAKAR
                    </option>
                  </select>
                </div>
                {viewMainSave && (
                  <div style={{ margin: '20px auto' }}>
                    <button
                      style={{
                        padding: '10px 35px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        fontFamily: 'SourceCodeProRegular',
                        background: 'blue',
                        color: 'white',
                        border: 'solid blue 2px',
                        cursor: 'pointer',
                      }}
                      onClick={updateMainProfile}
                    >
                      {mainUpdateStatus}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className='profcover'
          style={{
            borderBottom: darkMode
              ? 'solid rgba(190,190,200) 4px'
              : 'solid rgba(210,210,210,1) 4px',
          }}
        >
          <div
            className='imgcover'
            style={{
              backgroundImage: `url(${userImgCoverUrl})`,
              backgroundColor: user.imgcover.dominantColor,
              backgroundSize: 'cover',
            }}
            onClick={() => {
              setShowImage((showImage) => {
                return { ...showImage, show: true, src: userImgCoverUrl }
              })
            }}
          ></div>
          <div style={{ position: 'relative', width: 'fit-content' }}>
            <div
              className='profimg'
              style={{
                backgroundImage: `url(${userImgUrl})`,
                backgroundSize: 'cover',
                backgroundColor: user.img.dominantColor,
                border: darkMode
                  ? 'solid rgba(190,190,200) 2px'
                  : 'solid rgba(210,210,210,1) 2px',
              }}
              onClick={() => {
                setShowImage((showImage) => {
                  return { ...showImage, show: true, src: userImgUrl }
                })
              }}
            ></div>
            <BsCameraFill
              onClick={handleProfMenuDrop}
              className='profmenu'
              style={{
                color: darkMode ? 'white' : 'black',
              }}
            />
            {showProfMenuDrop && (
              <ul className='profmenudrop' onClick={handleMenuItem}>
                <li className='menuitem' name='viewprof'>
                  View Profile Picture
                </li>
                {!isSearched && user.isEditable === 'true' && (
                  <li className='menuitem' name='changeprof'>
                    Change Profile Picture
                  </li>
                )}
                <li className='menuitem' name='viewcover'>
                  View Cover Photo
                </li>
                {!isSearched && (
                  <li className='menuitem' name='changecover'>
                    Change Cover Photo
                  </li>
                )}
              </ul>
            )}
          </div>
          <div
            style={{
              marginLeft: '15px',
              marginTop: '10px',
              display: 'block',
              position: 'relative',
            }}
          >
            {!isSearched && (
              <Link to='/dashboard/settings'>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-55px',
                    right: '15px',
                    width: 'fit-content',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    fontFamily: 'MonteserratRegular',
                  }}
                >
                  <img
                    src={settings}
                    style={{
                      cursor: 'pointer',
                    }}
                    height='20px'
                  />
                </div>
              </Link>
            )}
            {!isSearched && user.isEditable === 'true' && (
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '15px',
                  width: 'fit-content',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setEditMain(true)
                }}
              >
                <FiEdit3
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'lighter',
                    fontSize: '1rem',
                    color: darkMode ? 'white' : 'black',
                  }}
                />
              </div>
            )}
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                fontFamily: 'MonteserratBold',
              }}
            >
              <label>
                {(
                  user.lastName +
                  ' ' +
                  user.firstName +
                  ' ' +
                  user.middleName
                ).toUpperCase()}
              </label>
            </div>
            <div style={{ display: 'flex', margin: '5px auto' }}>
              <label
                style={{
                  fontFamily: 'MonteserratRegular',
                  fontSize: '1rem',
                }}
              >
                {user.userName}
              </label>
              {user.access === 'Admin' ? (
                <div style={{ display: 'flex', marginLeft: '10px' }}>
                  <label>{' . '}</label>
                  <div
                    onClick={clickAdmin ? handleAdminBoard : undefined}
                    style={{
                      marginLeft: '10px',
                      marginRight: '15px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      fontSize: '.9rem',
                      fontFamily: 'monospace',
                      cursor: clickAdmin ? 'pointer' : 'auto',
                    }}
                  >
                    <label
                      style={{
                        color: darkMode ? 'lightgreen' : 'green',
                        cursor: clickAdmin ? 'pointer' : 'auto',
                      }}
                    >
                      Admin
                    </label>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              style={{
                padding: '10px',
                fontSize: '.8rem',
                border: darkMode
                  ? 'solid rgba(190,190,200) 2px'
                  : 'solid rgba(210,210,210,1) 2px',
                width: 'fit-content',
                fontFamily: 'MonteserratRegular',
                margin: '10px 0px',
                marginRight: '15px',
                borderRadius: '10px',
              }}
            >
              {user.student.check
                ? user.student.level +
                  ' level student of the ' +
                  (user.student.department
                    .toLowerCase()
                    .split(' ')
                    .includes('department')
                    ? user.student.department
                    : 'Department of ' + user.student.department) +
                  ', ' +
                  user.student.instituteName +
                  '.'
                : user.educationQualification !== 'null'
                ? user.educationQualification
                : ''}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              textAlign: 'left',
              marginTop: '30px',
              fontSize: '.9rem',
              marginLeft: '15px',
            }}
          >
            {gotPersonal && (
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginRight: '20px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{personal.length}</div>
                <div>Posts</div>
              </div>
            )}
            {gotFollowers && (
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginRight: '20px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}> {followers.length}</div>
                <div>Followers</div>
              </div>
            )}
            {gotFollowing && (
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginRight: '20px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{following.length}</div>
                <div>Following</div>
              </div>
            )}
          </div>
          {isSearched && (
            <div
              style={{ display: 'flex', textAlign: 'left', marginTop: '30px' }}
            >
              {followStatus !== '' && (
                <div
                  style={{
                    marginLeft: '10px',
                    marginRight: '5px',
                    display: 'inline-flex',
                    padding: '10px 20px',
                    color: 'white',
                    fontSize: '.9rem',
                    borderRadius: '15px',
                    border: 'solid rgba(15,105,213) 1px',
                    background: 'rgba(15,105,213)',
                    cursor: 'pointer',
                    pointerEvents: { followPointerEvent },
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleFollowStatus()
                  }}
                >
                  <div>{followStatus}</div>
                  {followPointerEvent === 'none' && (
                    <div>
                      <BiLoaderCircle
                        style={{
                          fontSize: '1.1rem',
                          marginLeft: '7px',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              <div style={{ marginLeft: '10px' }}>
                <div
                  style={{
                    padding: '10px 20px',
                    fontSize: '.9rem',
                    color: 'rgba(15,105,213)',
                    borderRadius: '15px',
                    border: 'solid rgba(15,105,213) 1px',
                    cursor: 'pointer',
                  }}
                >
                  Message
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'left' }}>
          {isSearched &&
          (user.about === undefined || user.about === '') ? undefined : (
            <div
              className='userabout'
              style={{
                borderBottom: darkMode
                  ? 'solid rgba(190,190,200) 4px'
                  : 'solid rgba(210,210,210,1) 4px',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  fontFamily: 'MonteserratRegular',
                  display: 'flex',
                }}
              >
                <label>About </label>
                {!isSearched && !addSummary && (
                  <div
                    style={{
                      width: 'fit-content',
                      marginLeft: 'auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setAddSummary(true)
                      if (
                        user.about !== undefined &&
                        user.about !== null &&
                        user.about !== ''
                      ) {
                        setTimeout(() => {
                          aboutEditRef.current.focus()
                          aboutEditRef.current.textContent = user.about
                          setAboutField(user.about)
                          setCaretPosition(aboutEditRef, user.about.length)
                        }, 300)
                      }
                    }}
                  >
                    <FiEdit3
                      style={{
                        cursor: 'pointer',
                        fontWeight: 'lighter',
                        fontSize: '1rem',
                        color: darkMode ? 'white' : 'black',
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  margin: '15px auto',
                  padding: '10px',
                  fontFamily: 'MonteserratRegular',
                  fontSize: '.8rem',
                  border: darkMode
                    ? 'solid rgba(190,190,200) 2px'
                    : 'solid rgba(210,210,210,1) 2px',
                  borderRadius: '10px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {!addSummary &&
                  (user.about !== null &&
                  user.about !== undefined &&
                  user.about !== '' ? (
                    <label>
                      {user.about.split(' ').length <= '60' ? (
                        user.about
                      ) : (
                        <label style={{ whiteSpace: 'pre-wrap' }}>
                          {user.about
                            .split(' ')
                            .slice(0, allowedLength)
                            .join(' ') +
                            (allowedLength <= user.about.split(' ').length
                              ? ' ... '
                              : '')}
                          {
                            <label
                              onClick={() => {
                                if (
                                  allowedLength <= user.about.split(' ').length
                                ) {
                                  setAllowedLength((allowedLength) => {
                                    return allowedLength + 70
                                  })
                                } else {
                                  setAllowedLength(61)
                                }
                              }}
                              style={{
                                cursor: 'pointer',
                                color: darkMode ? 'lightgreen' : 'green',
                              }}
                            >
                              {allowedLength <= user.about.split(' ').length
                                ? 'See More'
                                : 'Collapse'}
                            </label>
                          }
                        </label>
                      )}
                    </label>
                  ) : (
                    <label
                      style={{
                        color: 'rgba(10, 105, 214)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        setAddSummary(true)
                        setTimeout(() => {
                          aboutEditRef.current.focus()
                        }, 300)
                      }}
                    >
                      {'Add a Summary about you'}
                    </label>
                  ))}
                {addSummary && (
                  <div>
                    <div
                      style={{
                        maxHeight: '300px',
                        padding: '10px',
                        margin: 'auto',
                        outline: 'none',
                        overflowY: 'auto',
                        fontSize: '.8rem',
                        whiteSpace: 'pre-space',
                      }}
                      type='text'
                      ref={aboutEditRef}
                      contentEditable='true'
                      placeholder='Add a summary about you'
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          let caretPos = getCaretPosition(aboutEditRef)
                          const value = e.currentTarget.textContent
                          let preVal = value.slice(0, caretPos)
                          let postVal = value.slice(caretPos)
                          setEnterPressed(true)
                          if (postVal.length === 0) {
                            const newValue = value + '\n\n'
                            setAboutField(newValue)
                          } else {
                            let newPreVal = preVal + '\n'
                            const newValue = newPreVal + postVal
                            setAboutField(newValue)
                          }
                        } else {
                          setEnterPressed(false)
                        }
                      }}
                      onInput={(e) => {
                        const value = e.currentTarget.textContent
                        setAboutField(value)
                      }}
                    ></div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          width: 'fit-content',
                          marginRight: 'auto',
                          color: 'red',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setAddSummary(false)
                          setAboutSaveStatus('Done')
                        }}
                      >
                        <label style={{ cursor: 'pointer' }}>Cancel</label>
                      </div>
                      <div
                        style={{
                          width: 'fit-content',
                          marginLeft: 'auto',
                          color: darkMode ? 'lightgreen' : 'green',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                        onClick={async () => {
                          try {
                            setAboutSaveStatus('Saving...')
                            const updated = await updateOneUser({
                              findBy: { userName: user.userName },
                              update: { about: aboutField.trim() },
                            })
                            if (updated) {
                              setAboutSaveStatus('Saved')
                              user.about = aboutField.trim()
                              setAboutField('')
                              setAddSummary(false)
                              setAboutSaveStatus('Done')
                            } else {
                              setAboutSaveStatus('An Error Occured')
                            }
                          } catch (TypeError) {}
                        }}
                      >
                        <label style={{ cursor: 'pointer' }}>
                          {aboutSaveStatus}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            className='userdetails'
            style={{
              borderBottom: darkMode
                ? 'solid rgba(190,190,200) 4px'
                : 'solid rgba(210,210,210,1) 4px',
            }}
          >
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'MonteserratRegular',
                display: 'flex',
              }}
            >
              Others
              {!isSearched && user.isEditable === 'true' && !editOtherInfo && (
                <div
                  style={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setShowAllDetails(true)
                    setEditOtherInfo(true)
                  }}
                >
                  <FiEdit3
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'lighter',
                      fontSize: '1rem',
                      color: darkMode ? 'white' : 'black',
                    }}
                  />
                </div>
              )}
            </label>
            <div className='profiledetails'>
              <div
                style={{
                  margin: '15px auto',
                  padding: '10px 0px',
                  fontSize: '.8rem',
                  border: darkMode
                    ? 'solid rgba(190,190,200) 2px'
                    : 'solid rgba(210,210,210,1) 2px',
                  borderRadius: '10px',
                }}
              >
                {showAllDetails ? (
                  !editOtherInfo ? (
                    <div>
                      <div
                        className='profiledetailsitem'
                        style={{
                          fontFamily: 'MonteserratRegular',
                          borderBottom: darkMode
                            ? 'solid rgba(190,190,200) 2px'
                            : 'solid rgba(210,210,210,1) 2px',
                        }}
                      >
                        <div
                          className='profiledetailsitemtitle'
                          style={{ fontFamily: 'MonteserratRegular' }}
                        >
                          <label>{'Gender'}</label>
                        </div>
                        <label>{user.gender}</label>
                      </div>
                      {!['', 'null', null, undefined].includes(
                        user.nationality
                      ) && (
                        <div
                          className='profiledetailsitem'
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <label>
                            <b>{user.nationality}</b>
                          </label>
                        </div>
                      )}
                      {!['', 'null', null, undefined].includes(
                        user.educationQualification
                      ) && (
                        <div
                          className='profiledetailsitem'
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <label>
                            {'Current Education Qualification '}
                            <b>{user.educationQualification}</b>
                          </label>
                        </div>
                      )}
                      {user.student.check && (
                        <div
                          className='profiledetailsitem'
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <label>
                            {'Student of '}
                            <b>{user.student.instituteName}</b>
                            {' in '}
                            <b>{user.student.instituteCountryName}</b>
                          </label>
                        </div>
                      )}
                      {user.student.check && (
                        <div
                          className='profiledetailsitem'
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <label>
                            {'Matric No / Student ID '}
                            <b>{user.student.matricNo}</b>
                          </label>
                        </div>
                      )}
                      {!['', 'null', null, undefined].includes(
                        user.dateOfBirth
                      ) && (
                        <div
                          className='profiledetailsitem'
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <label>
                            {'Born on '}
                            <b>{user.dateOfBirth}</b>
                          </label>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div onChange={handleOtherFieldUpdate}>
                      {allUserDetailName.map((detail, i) => {
                        return (
                          <div
                            className='profiledetailsitem'
                            style={{
                              fontFamily: 'MonteserratRegular',
                              borderBottom: darkMode
                                ? 'solid rgba(190,190,200) 2px'
                                : 'solid rgba(210,210,210,1) 2px',
                            }}
                            key={i}
                          >
                            <div
                              className='profiledetailsitemtitle'
                              style={{ fontFamily: 'MonteserratRegular' }}
                            >
                              <label>{detail}</label>
                            </div>
                            {!['Matric No'].includes(detail) ? (
                              <input
                                type={detail === 'Date Of Birth' ? 'Date' : ''}
                                style={{
                                  padding: '10px',
                                  borderRadius: '10px',
                                  color: darkMode ? 'white' : 'black',
                                  backgroundColor: darkMode ? 'black' : 'white',
                                }}
                                name={allUserDetailValue[i]}
                                value={otherField[allUserDetailValue[i]]}
                              />
                            ) : (
                              <div style={{ fontFamily: 'MonteserratRegular' }}>
                                <label>
                                  {[undefined, 'null', null, ''].includes(
                                    user[allUserDetailValue[i]]
                                  )
                                    ? user['student'][allUserDetailValue[i]]
                                    : user[allUserDetailValue[i]]}
                                </label>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                ) : (
                  <div>
                    <div
                      className='profiledetailsitem'
                      style={{
                        fontFamily: 'MonteserratRegular',
                        borderBottom: darkMode
                          ? 'solid rgba(190,190,200) 2px'
                          : 'solid rgba(210,210,210,1) 2px',
                      }}
                    >
                      <div
                        className='profiledetailsitemtitle'
                        style={{ fontFamily: 'MonteserratRegular' }}
                      >
                        <label>{'Gender'}</label>
                      </div>
                      <label>{user.gender}</label>
                    </div>
                    {!['', 'null', null, undefined].includes(
                      user.nationality
                    ) && (
                      <div
                        className='profiledetailsitem'
                        style={{
                          fontFamily: 'MonteserratRegular',
                          borderBottom: darkMode
                            ? 'solid rgba(190,190,200) 2px'
                            : 'solid rgba(210,210,210,1) 2px',
                        }}
                      >
                        <label>
                          <b>{user.nationality}</b>
                        </label>
                      </div>
                    )}
                    {!['', 'null', null, undefined].includes(
                      user.educationQualification
                    ) && (
                      <div
                        className='profiledetailsitem'
                        style={{
                          fontFamily: 'MonteserratRegular',
                          borderBottom: darkMode
                            ? 'solid rgba(190,190,200) 2px'
                            : 'solid rgba(210,210,210,1) 2px',
                        }}
                      >
                        <label>
                          {'Current Education Qualification '}
                          <b>{user.educationQualification}</b>
                        </label>
                      </div>
                    )}
                    {user.student.check && (
                      <div
                        className='profiledetailsitem'
                        style={{
                          fontFamily: 'MonteserratRegular',
                          borderBottom: darkMode
                            ? 'solid rgba(190,190,200) 2px'
                            : 'solid rgba(210,210,210,1) 2px',
                        }}
                      >
                        <label>
                          {'Student of '}
                          <b>{user.student.instituteName}</b>
                          {' in '}
                          <b>{user.student.instituteCountryName}</b>
                        </label>
                      </div>
                    )}
                  </div>
                )}
                {!editOtherInfo ? (
                  <div
                    style={{
                      cursor: 'pointer',
                      width: 'fit-content',
                      margin: 'auto',
                      marginTop: '10px',
                      fontFamily: 'MonteserratRegular',
                      fontWeight: 'bold',
                      fontSize: '.8rem',
                      color: darkMode ? 'lightgreen' : 'green',
                    }}
                    onClick={handleShowDetails}
                  >
                    <label style={{ cursor: 'pointer' }}>{showStatus}</label>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      margin: '10px',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                    }}
                  >
                    <label
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => {
                        setEditOtherInfo(false)
                      }}
                    >
                      Cancel
                    </label>
                    <label
                      style={{
                        fontFamily: 'MonteserratRegular',
                        color: darkMode ? 'lightgreen' : 'green',
                        cursor: 'pointer',
                      }}
                      onClick={updateOtherProfile}
                    >
                      {otherProfileUpdateStatus}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className='userdetails'
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderBottom: darkMode
                ? 'solid rgba(190,190,200) 4px'
                : 'solid rgba(210,210,210,1) 4px',
            }}
          >
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'monospace',
                display: 'flex',
              }}
            >
              Activities
              <div
                style={{
                  backgroundColor: 'rgba(230,230,230)',
                  borderRadius: '15px',
                  fontSize: '.8rem',
                  padding: '5px 10px',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                }}
              >
                See All
              </div>
            </label>
          </div>
          {showPayStack ? (
            <div
              style={{
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100vw',
                height: '100vh',
                zIndex: '3',
                backgroundColor: 'rgba(0,0,0,0.9)',
                justifyContent: 'center',
                overflowY: 'auto',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  margin: 'auto',
                  marginTop: '30px',
                  width: '80%',
                  backgroundColor: 'rgba(245,245,245,1)',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontFamily: 'Courier New',
                }}
              >
                <label style={{ fontWeight: 'bold' }}>Confirm Info</label>
                <div
                  style={{
                    display: 'flex',
                    margin: '20px auto',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedDues.map((due, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          margin: '5px auto',
                          padding: '5px 10px',
                          borderRadius: '10px',
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          boxShadow:
                            ' -5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1)',
                        }}
                      >
                        {dueFields[due]['name']}
                      </div>
                    )
                  })}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label>{'Amount: #' + amount / 100}</label>
                </div>
                <div
                  style={{ margin: '20px auto' }}
                  onChange={(e) => {
                    const name = e.target.getAttribute('name')
                    const value = e.target.value
                    if (name !== undefined) {
                      setDueInfo((dueInfo) => {
                        return { ...dueInfo, [name]: value }
                      })
                    }
                  }}
                >
                  {Object.keys(dueInfo).map((label, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          backgroundColor: 'white',
                          margin: '10px auto',
                          fontFamily: 'monospace',
                          textAlign: 'left',
                          justifyContent: 'left',
                          fontSize: '.9rem',
                          padding: '10px',
                          borderRadius: '10px',
                          boxShadow:
                            ' -5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1)',
                        }}
                      >
                        <label>{label.toUpperCase()}</label>
                        <div>
                          <input
                            name={label}
                            type='text'
                            style={{
                              padding: '10px',
                              margin: '10px auto',
                              width: '250px',
                              borderRadius: '10px',
                            }}
                            value={dueInfo[label]}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex' }}>
                  <button
                    style={{
                      fontFamily: 'monospace',
                      padding: '5px 10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'solid red 2px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      boxShadow:
                        '-5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1)',
                    }}
                    onClick={() => {
                      setShowPayStack(false)
                      setPaystackButtonLabel('Continue Payment')
                    }}
                  >
                    Cancel
                  </button>
                  <PaystackButton
                    className='paystackButton'
                    onClick={() => {
                      setPaystackButtonLabel('Please Wait...')
                    }}
                    {...componentProps}
                  />
                </div>
              </div>
            </div>
          ) : undefined}
          <div
            className='userdetails'
            style={{
              borderBottom: darkMode
                ? 'solid rgba(190,190,200) 4px'
                : 'solid rgba(210,210,210,1) 4px',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'monospace',
                margin: '15px auto',
                paddingBottom: '10px',
                display: 'flex',
                borderBottom: 'solid rgba(210, 210, 210, 1) 2px',
              }}
            >
              Payments
              <div
                style={{
                  backgroundColor: 'rgba(230,230,230)',
                  borderRadius: '15px',
                  fontSize: '.8rem',
                  padding: '5px 10px',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  color: 'black',
                }}
                onClick={() => {
                  if (showPayments) {
                    setShowPayments(false)
                    setPaymentLabelStatus('View')
                  } else {
                    setShowPayments(true)
                    setPaymentLabelStatus('Hide')
                  }
                }}
              >
                {paymentLabelStatus}
              </div>
            </div>
            {showPayments && (
              <div
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '10px',
                  fontWeight: 'bold',
                  fontFamily: 'Courier New',
                  borderRadius: '15px',
                }}
                onClick={handleDuesInput}
              >
                <label>Departmental Dues</label>
                {payments !== undefined ? undefined : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '10px',
                      margin: '10px',
                      fontSize: '.9rem',
                      border: 'solid rgba(200,200,200,1) 1px',
                      borderRadius: '10px',
                    }}
                  >
                    No payments made
                  </div>
                )}
                {Object.values(dueFields).map((due, i) => {
                  return (
                    due.available.includes(user.level) &&
                    (isSearched &&
                    payments === undefined ? undefined : payments !==
                        undefined &&
                      payments[currentSession]['basicDue'][
                        Object.keys(dueFields)[i]
                      ] !== undefined &&
                      payments[currentSession]['basicDue'][
                        Object.keys(dueFields)[i]
                      ]['payed'] === true ? (
                      <div
                        key={i}
                        name={Object.keys(dueFields)[i]}
                        style={{
                          display: 'flex',
                          margin: '10px',
                          display: 'flex',
                          fontSize: '.9rem',
                          cursor: 'pointer',
                        }}
                        disabled={amount > 0 ? false : true}
                      >
                        <img src={sblike} height='15px' />
                        <label
                          style={{ margin: '5px', cursor: 'pointer' }}
                          name={Object.keys(dueFields)[i]}
                        >
                          {due.name +
                            (due.compulsory.includes(user.level)
                              ? ' (Compulsory)'
                              : '')}
                        </label>
                        <label
                          style={{
                            marginLeft: 'auto',
                            fontStyle: 'italic',
                            cursor: 'pointer',
                          }}
                          name={Object.keys(dueFields)[i]}
                        >
                          {'#' + due['amount']}
                        </label>
                      </div>
                    ) : (
                      !isSearched && (
                        <div
                          key={i}
                          name={Object.keys(dueFields)[i]}
                          style={{
                            display: 'flex',
                            margin: '10px',
                            display: 'flex',
                            fontSize: '.9rem',
                            cursor: 'pointer',
                          }}
                          disabled={true}
                        >
                          <input
                            type='radio'
                            checked={
                              due.selected ||
                              due.compulsory.includes(user.level)
                            }
                          />
                          <label
                            style={{ margin: '5px', cursor: 'pointer' }}
                            name={Object.keys(dueFields)[i]}
                          >
                            {due.name +
                              (due.compulsory.includes(user.level)
                                ? ' (Compulsory)'
                                : '')}
                          </label>
                          <label
                            style={{
                              marginLeft: 'auto',
                              fontStyle: 'italic',
                              cursor: 'pointer',
                            }}
                            name={Object.keys(dueFields)[i]}
                          >
                            {'#' + due['amount']}
                          </label>
                        </div>
                      )
                    ))
                  )
                })}

                {!isSearched && (
                  <div>
                    {payedDues.length ===
                    availableDues ? undefined : selectedDues.length +
                        payedDues.length ===
                      availableDues ? undefined : (
                      <div style={{ fontSize: '.9rem', margin: '20px 10px' }}>
                        <label>Add payments by selecting from the above.</label>
                      </div>
                    )}
                    <div
                      style={{
                        textAlign: 'left',
                        margin: '20px 10px',
                        display: 'flex',
                      }}
                    >
                      {payedDues.length !== availableDues && (
                        <button
                          style={{
                            fontFamily: 'monospace',
                            padding: '5px 10px',
                            backgroundColor: 'blue',
                            color: 'white',
                            border: 'solid blue 2px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            boxShadow:
                              '-5px -5px 10px rgba(0,0,0,0.1), 5px 5px 10px rgba(0,0,0,0.1)',
                          }}
                          disabled={amount > 0 ? false : true}
                          onClick={() => {
                            setShowPayStack(true)
                          }}
                        >
                          Pay Dues
                        </button>
                      )}

                      {amount > 0 && (
                        <label
                          style={{ marginLeft: 'auto', marginTop: '10px' }}
                        >
                          {'#' + amount / 100}
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='userdetails'>
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'MonteserratRegular',
                display: 'flex',
              }}
            >
              Contacts{' '}
              {!isSearched &&
                user.isEditable === 'true' &&
                !editContactInfo && (
                  <div
                    style={{
                      width: 'fit-content',
                      marginLeft: 'auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setEditContactInfo(!editContactInfo)
                    }}
                  >
                    <FiEdit3
                      style={{
                        cursor: 'pointer',
                        fontWeight: 'lighter',
                        fontSize: '1rem',
                        color: darkMode ? 'white' : 'black',
                      }}
                    />
                  </div>
                )}
            </label>
            <div className='profiledetails'>
              <div
                style={{
                  margin: '15px auto',
                  padding: '10px 0px',
                  fontSize: '.8rem',
                  border: darkMode
                    ? 'solid rgba(190,190,200) 2px'
                    : 'solid rgba(210,210,210,1) 2px',
                  borderRadius: '10px',
                }}
              >
                <div onChange={handleContactFieldUpdate}>
                  {contactDetailsName.map((detail, i) => {
                    return (
                      (![undefined, 'null', null, ''].includes(
                        user[contactDetailsValue[i]]
                      ) ||
                        ![undefined, 'null', null, ''].includes(
                          user['student'][contactDetailsValue[i]]
                        )) && (
                        <div
                          className='profiledetailsitem'
                          key={i}
                          style={{
                            fontFamily: 'MonteserratRegular',
                            borderBottom: darkMode
                              ? 'solid rgba(190,190,200) 2px'
                              : 'solid rgba(210,210,210,1) 2px',
                          }}
                        >
                          <div
                            className='profiledetailsitemtitle'
                            style={{ fontFamily: 'MonteserratRegular' }}
                          >
                            <label>{detail}</label>
                          </div>
                          {!editContactInfo ? (
                            <label>
                              {[undefined, 'null', null, ''].includes(
                                user[contactDetailsValue[i]]
                              )
                                ? user['student'][contactDetailsValue[i]]
                                : user[contactDetailsValue[i]]}
                            </label>
                          ) : !['Other Email'].includes(detail) ? (
                            <input
                              style={{
                                padding: '10px',
                                borderRadius: '10px',
                                color: darkMode ? 'white' : 'black',
                                backgroundColor: darkMode ? 'black' : 'white',
                              }}
                              name={contactDetailsValue[i]}
                              value={contactField[contactDetailsValue[i]]}
                            />
                          ) : (
                            <label>{user[contactDetailsValue[i]]}</label>
                          )}
                        </div>
                      )
                    )
                  })}
                  {editContactInfo && (
                    <div
                      style={{
                        display: 'flex',
                        margin: '10px',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                      }}
                    >
                      <label
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          setEditContactInfo(false)
                        }}
                      >
                        Cancel
                      </label>
                      <label
                        style={{
                          color: darkMode ? 'lightgreen' : 'green',
                          cursor: 'pointer',
                        }}
                        onClick={updateContactProfile}
                      >
                        {contactProfileUpdateStatus}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
