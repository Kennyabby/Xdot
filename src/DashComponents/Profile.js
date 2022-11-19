import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { PaystackButton } from 'react-paystack'

import imgcover from './assets/userimgcover.jpg'
import profimg from './assets/user.png'
import userimgmenu from './assets/userimgmenu.png'
import usercontrolopt from './assets/usercontrolopt.png'
import edit from './assets/edit1.png'
import settings from './assets/settings.jpg'
import home from './assets/home.png'
import notifications from './assets/notifications.png'
import close from './assets/close.png'
import sblike from './assets/sblike.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

import AdminBoard from './AdminBoard'

const Profile = ({
  server,
  chatrf,
  homerf,
  notificationsrf,
  user,
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
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showControlOpt, setShowControlOpt] = useState(false)
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [showImage, setShowImage] = useState({ show: false })
  const [payedDues, setPayedDues] = useState([])
  const aboutEditRef = useRef(null)
  const [addSummary, setAddSummary] = useState(false)
  const [editStatus, setEditStatus] = useState(
    user.isEditable === 'false' ? 'Enable Edit Access' : 'Disable Edit Access'
  )
  const [aboutField, setAboutField] = useState('')
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

  const contactDetailsName = [
    'Current Address',
    'Contact No',
    'Other Contact No',
    'Guardian Name',
    'Guardian Current Address',
    'Guardian Contact No',
    'Other Guardian Contact No',
  ]
  const contactDetailsValue = [
    'currentAddress',
    'contactNo',
    'otherContactNo',
    'guardianName',
    'guardianCurrentAddress',
    'guardianContactNo',
    'otherGuardianContactNo',
  ]
  const allUserDetailName = [
    'Matric No',
    'Gender',
    'Date Of Birth',
    'School Email',
    'Other Email',
    'Year Of Admission',
    'Mode Of Entry',
  ]
  const allUserDetailValue = [
    'matricNo',
    'gender',
    'dateOfBirth',
    'schoolEmail',
    'otherEmail',
    'yearOfAdmission',
    'modeOfEntry',
  ]
  const fewUserDetailName = [
    'Matric No',
    'Gender',
    'Other Email',
    'Mode Of Entry',
  ]
  const fewUserDetailValue = ['matricNo', 'gender', 'otherEmail', 'modeOfEntry']
  useEffect(async () => {
    if (user !== null) {
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgUrl: user.img, matricNo: user.matricNo }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
    }
  }, [user])
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
        homerf.current.childNodes[0].childNodes[0].src = home
        homerf.current.childNodes[0].childNodes[1].style.color = 'blue'
      }
    }
    if (notificationsrf !== undefined) {
      if (
        notificationsrf.current !== null &&
        notificationsrf.current !== undefined
      ) {
        notificationsrf.current.childNodes[0].childNodes[0].src = notifications
        notificationsrf.current.childNodes[0].childNodes[1].style.color =
          'black'
      }
    }
  }, [homerf])
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
        return { ...showImage, show: true, src: imgcover }
      })
    } else if (name === 'changeprof') {
    } else if (name === 'changecover') {
    }
  }
  const handleShowDetails = () => {
    if (showAllDetails) {
      setShowAllDetails(false)
      setShowStatus('View More Details')
    } else {
      setShowAllDetails(true)
      setShowStatus('View Few Details')
    }
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
  return (
    <>
      <div
        style={{
          margin: margin,
          padding: padding,
          backgroundColor: backgroundColor,
          overflowY: overflow,
          boxShadow: isSearched ? '0px 0px 5px white' : 'none',
          borderTopLeftRadius: isSearched ? '50px' : '0px',
          borderTopRightRadius: isSearched ? '50px' : '0px',
          flexWrap: 'wrap',
          height: isSearched ? '70vh' : 'auto',
          paddingBottom: '70px',
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
        <div className='profcover'>
          <div
            className='imgcover'
            style={{
              backgroundImage: `url(${imgcover})`,
              backgroundSize: 'cover',
            }}
            onClick={() => {
              setShowImage((showImage) => {
                return { ...showImage, show: true, src: imgcover }
              })
            }}
          ></div>
          <div style={{ position: 'relative', width: 'fit-content' }}>
            <div
              className='profimg'
              style={{
                backgroundImage: `url(${userImgUrl})`,
                backgroundSize: 'cover',
              }}
              onClick={() => {
                setShowImage((showImage) => {
                  return { ...showImage, show: true, src: userImgUrl }
                })
              }}
            ></div>
            <div
              onClick={handleProfMenuDrop}
              className='profmenu'
              style={{ backgroundImage: `url(${userimgmenu})` }}
            ></div>
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
              >
                <img
                  src={edit}
                  style={{
                    cursor: 'pointer',
                  }}
                  height='15px'
                />
              </div>
            )}
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
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
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  marginRight: '10px',
                }}
              >
                <label>{user.userName}</label>
              </div>
              <label>{' . '}</label>
              <label
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  fontSize: '.9rem',
                  marginLeft: '10px',
                }}
              >
                {user.hallOfResidence + ' Hall'}
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
                        color: 'green',
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
                border: 'solid rgba(210,210,210,1) 2px',
                width: 'fit-content',
                fontFamily: 'monospace',
                margin: '10px 0px',
                marginRight: '15px',
                borderRadius: '10px',
              }}
            >
              {user.level + ' level student of the department of Physics'}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          {isSearched && (
            <div style={{ textAlign: 'right' }}>
              <div
                onClick={handleUserControlOpt}
                name='usercontrolopt'
                style={{
                  display: 'inline-block',
                  width: 'fit-content',
                  margin: '10px',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  marginLeft: 'auto',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <img
                  name='usercontrolopt'
                  src={usercontrolopt}
                  alt='user control menu'
                  width='40px'
                />
                {showControlOpt && (
                  <ul className='usercontrolopts'>
                    {user.access !== 'Admin' && showAdminOpt && (
                      <li className='usercontrolitem'>
                        <label
                          style={{ cursor: 'pointer' }}
                          onClick={updateAdminStatus}
                        >
                          Set As Admin
                        </label>
                      </li>
                    )}
                    <li onClick={updateEditStatus} className='usercontrolitem'>
                      <label
                        style={{
                          cursor: 'pointer',
                          color:
                            editStatus === 'Enable Edit Access'
                              ? 'lightgreen'
                              : 'red',
                        }}
                      >
                        {editStatus}
                      </label>
                    </li>
                    {user.access !== 'Admin' && (
                      <li className='usercontrolitem'>
                        <label
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={suspendUser}
                        >
                          Suspend User
                        </label>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
          {isSearched && user.about === undefined ? undefined : (
            <div className='userabout'>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  fontFamily: 'Courier New',
                  display: 'flex',
                  borderBottom: 'solid rgba(210, 210, 210, 1) 2px',
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
                        }, 300)
                      }
                    }}
                  >
                    <img
                      src={edit}
                      style={{
                        cursor: 'pointer',
                      }}
                      height='15px'
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  margin: '15px auto',
                  padding: '10px',
                  fontFamily: 'monospace',
                  maxHeight: '300px',
                  fontSize: '.8rem',
                  border: 'solid rgba(210, 210, 210, 1) 2px',
                  borderRadius: '10px',
                }}
              >
                {!addSummary &&
                  (user.about !== null &&
                  user.about !== undefined &&
                  user.about !== '' ? (
                    <label>{user.about}</label>
                  ) : (
                    <label
                      style={{
                        color: 'blue',
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
                      }}
                      ref={aboutEditRef}
                      contentEditable='true'
                      placeholder='Add a summary about you'
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
                          color: 'green',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                        onClick={async () => {
                          try {
                            setAboutSaveStatus('Saving...')
                            const updated = await updateOneUser({
                              findBy: { matricNo: user.matricNo },
                              update: { about: aboutField },
                            })
                            if (updated) {
                              setAboutSaveStatus('Saved')
                              user.about = aboutField
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
          <div className='userdetails'>
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'Courier New',
                display: 'flex',
                borderBottom: 'solid rgba(210, 210, 210, 1) 2px',
              }}
            >
              Other Info{' '}
              {!isSearched && user.isEditable === 'true' && (
                <div
                  style={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={edit}
                    style={{
                      color: 'red',
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                    height='15px'
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
                  border: 'solid rgba(210, 210, 210, 1) 2px',
                  borderRadius: '10px',
                }}
              >
                {showAllDetails ? (
                  <div>
                    {allUserDetailName.map((detail, i) => {
                      return (
                        <div className='profiledetailsitem' key={i}>
                          <label style={{ fontWeight: 'bold' }}>{detail}</label>
                          <label style={{ marginLeft: 'auto' }}>
                            {user[allUserDetailValue[i]]}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div>
                    {fewUserDetailName.map((detail, i) => {
                      return (
                        <div className='profiledetailsitem' key={i}>
                          <label style={{ fontWeight: 'bold' }}>{detail}</label>
                          <label style={{ marginLeft: 'auto' }}>
                            {user[fewUserDetailValue[i]]}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )}
                <div
                  style={{
                    cursor: 'pointer',
                    width: 'fit-content',
                    margin: 'auto',
                    marginTop: '10px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '.8rem',
                    color: 'green',
                  }}
                  onClick={handleShowDetails}
                >
                  <label style={{ cursor: 'pointer' }}>{showStatus}</label>
                </div>
              </div>
            </div>
          </div>
          <div
            className='userdetails'
            style={{ backgroundColor: 'white', color: 'black' }}
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
          <div className='userdetails'>
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
                fontFamily: 'Courier New',
                display: 'flex',
                borderBottom: 'solid rgba(210, 210, 210, 1) 2px',
              }}
            >
              Contacts{' '}
              {!isSearched && user.isEditable === 'true' && (
                <div
                  style={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={edit}
                    style={{
                      color: 'red',
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                    height='15px'
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
                  border: 'solid rgba(210, 210, 210, 1) 2px',
                  borderRadius: '10px',
                }}
              >
                <div>
                  {contactDetailsName.map((detail, i) => {
                    return (
                      <div className='profiledetailsitem' key={i}>
                        <label style={{ fontWeight: 'bold' }}>{detail}</label>
                        <label style={{ marginLeft: 'auto' }}>
                          {user[contactDetailsValue[i]]}
                        </label>
                      </div>
                    )
                  })}
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
