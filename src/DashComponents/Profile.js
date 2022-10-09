import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import imgcover from './assets/userimgcover.jpg'
import profimg from './assets/user.png'
import userimgmenu from './assets/userimgmenu.png'
import usercontrolopt from './assets/usercontrolopt.png'
import edit from './assets/edit1.png'
import settings from './assets/settings.jpg'
import home from './assets/home.png'
import notifications from './assets/notifications.png'
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
  const [showStatus, setShowStatus] = useState('Show All Details')
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showControlOpt, setShowControlOpt] = useState(false)
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [editStatus, setEditStatus] = useState(
    user.isEditable === 'false' ? 'Enable Edit Access' : 'Disable Edit Access'
  )
  const [showAdminOpt, setShowAdminOpt] = useState(true)
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
  const handleMenuItem = () => {}
  const handleShowDetails = () => {
    if (showAllDetails) {
      setShowAllDetails(false)
      setShowStatus('Show All Details')
    } else {
      setShowAllDetails(true)
      setShowStatus('Show Fewer Details')
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
  return (
    <>
      <div
        style={{
          margin: margin,
          padding: padding,
          backgroundColor: backgroundColor,
          overflowY: overflow,
          flexWrap: 'wrap',
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
            onClick={() => {
              setShowProfMenuDrop(false)
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
        <div className='profcover'>
          <div
            className='imgcover'
            style={{ backgroundImage: `url(${imgcover})` }}
          ></div>
          <div
            className='profimg'
            style={{ backgroundImage: `url(${userImgUrl})` }}
          >
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
                  View Cover Picture
                </li>
                {!isSearched && user.isEditable === 'true' && (
                  <li className='menuitem' name='changecover'>
                    Change Cover Picture
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
                  fontSize: '.8rem',
                  border: 'solid rgba(210, 210, 210, 1) 2px',
                  borderRadius: '10px',
                }}
              >
                {user.about !== null && user.about !== undefined ? (
                  <label>{user.about}</label>
                ) : (
                  <label
                    style={{
                      color: 'blue',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Add a Summary about you'}
                  </label>
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
