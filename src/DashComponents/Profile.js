import { React, useState, useEffect } from 'react'

import imgcover from './assets/userimgcover.jpg'
import profimg from './assets/user.png'
import userimgmenu from './assets/userimgmenu.png'
import usercontrolopt from './assets/usercontrolopt.png'
import edit from './assets/edit1.png'

import AdminBoard from './AdminBoard'

const Profile = ({
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
}) => {
  const [showProfMenuDrop, setShowProfMenuDrop] = useState(false)
  const [showAllDetails, setShowAllDetails] = useState(false)
  const [showStatus, setShowStatus] = useState('Show All Details')
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [showControlOpt, setShowControlOpt] = useState(false)
  const [editStatus, setEditStatus] = useState(
    user.isEditable === 'false' ? 'Enable Edit Access' : 'Disable Edit Access'
  )
  const [showAdminOpt, setShowAdminOpt] = useState(true)
  const userDetailName = [
    'Level',
    'Matric No',
    'Hall Of Residence',
    'School Email',
    'Other Email',
    'Gender',
    'Date Of Birth',
    'Year Of Admission',
    'Mode Of Entry',
    'Current Address',
    'Contact No',
    'Other Contact No',
    'Guardian Name',
    'Guardian Contact No',
    'Other Guardian Contact No',
    'Guardian Current Address',
  ]
  const userDetailValue = [
    'level',
    'matricNo',
    'hallOfResidence',
    'schoolEmail',
    'otherEmail',
    'gender',
    'dateOfBirth',
    'yearOfAdmission',
    'modeOfEntry',
    'currentAddress',
    'contactNo',
    'otherContactNo',
    'guardianName',
    'guardianContactNo',
    'otherGuardianContactNo',
    'guardianCurrentAddress',
  ]
  useEffect(() => {
    if (homerf !== undefined && chatrf !== undefined) {
      homerf.current.style.borderBottom = 'solid blue 0px'
      chatrf.current.style.borderBottom = 'solid blue 0px'
    }
    if (notificationsrf !== undefined) {
      if (notificationsrf.current !== null) {
        notificationsrf.current.style.borderBottom = 'solid blue 0px'
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

      const resp = await fetch('https://napsuiserver.herokuapp.com/updateOneUser', opts)
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
      const resp = await fetch('https://napsuiserver.herokuapp.com/updateOneUser', opts)
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
          height: '75vh',
        }}
      >
        {showAdminBoard && (
          <AdminBoard
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
            style={{ backgroundImage: `url(${profimg})` }}
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
          <div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {(
                user.lastName +
                ' ' +
                user.firstName +
                ' ' +
                user.middleName
              ).toUpperCase()}
            </p>
            <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
              {user.userName}
            </p>
            {user.access === 'Admin' ? (
              <div>
                <label
                  onClick={clickAdmin ? handleAdminBoard : undefined}
                  style={{
                    border: 'solid black 1px',
                    padding: '5px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    color: 'green',
                    cursor: clickAdmin ? 'pointer' : 'auto',
                  }}
                >
                  Admin
                </label>
              </div>
            ) : (
              ''
            )}
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
          <div className='userabout'>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
                fontFamily: 'monospace',
              }}
            >
              About{' '}
              {!isSearched && user.isEditable === 'true' && (
                <img
                  src={edit}
                  style={{ color: 'red', fontSize: '1rem', cursor: 'pointer' }}
                  height='15px'
                />
              )}
            </p>
            <div style={{ padding: '10px' }}>About me...</div>
          </div>
          <div className='userDetails'>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
                fontFamily: 'monospace',
              }}
            >
              Information{' '}
              {!isSearched && user.isEditable === 'true' && (
                <img
                  src={edit}
                  style={{ color: 'red', fontSize: '1rem', cursor: 'pointer' }}
                  height='15px'
                />
              )}
            </p>
            <div className='profiledetails'>
              {userDetailValue
                .filter((prop) => {
                  return user[prop] !== undefined && user[prop].length
                })
                .map((prop, i) => {
                  if (showAllDetails) {
                    return (
                      <div
                        className='profiledetailsitem'
                        style={{
                          color: 'black',
                          backgroundColor:
                            i % 2 ? 'white' : 'rgba(230,230,230,1)',
                          fontFamily: 'monospace',
                        }}
                        key={i}
                      >
                        <label
                          style={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginRight: '50px',
                          }}
                        >
                          {userDetailName[i]}
                        </label>
                        <label
                          style={{
                            fontWeight: 'lighter',
                            fontSize: '.9rem',
                            fontStyle: 'italic',
                            marginRight: '50px',
                          }}
                        >
                          {user[prop]}
                        </label>
                      </div>
                    )
                  } else {
                    if (i < 6) {
                      return (
                        <div
                          className='profiledetailsitem'
                          style={{
                            color: 'black',
                            backgroundColor:
                              i % 2 ? 'white' : 'rgba(230,230,230,1)',
                            fontFamily: 'monospace',
                          }}
                          key={i}
                        >
                          <label
                            style={{
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              marginRight: '50px',
                            }}
                          >
                            {userDetailName[i]}
                          </label>
                          <label
                            style={{
                              fontWeight: 'lighter',
                              fontSize: '.9rem',
                              fontStyle: 'italic',
                              marginRight: '50px',
                            }}
                          >
                            {user[prop]}
                          </label>
                        </div>
                      )
                    }
                  }
                  return undefined
                })}
              <label
                style={{
                  cursor: 'pointer',
                  marginTop: '10px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: 'green',
                }}
                onClick={handleShowDetails}
              >
                {showStatus}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
