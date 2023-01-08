import { React, useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import ContextProvider from '../../ContextProvider'

import right from './assets/right.png'
import home from './assets/home.png'
import whome from './assets/whome.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Settings = ({ chatrf, homerf, notificationsrf, showHomeToggle }) => {
  const { id } = useParams()
  const { darkMode } = useContext(ContextProvider)
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].src = darkMode ? whome : home
        homerf.current.childNodes[0].childNodes[1].style.color =
          id === 'settings' ? (darkMode ? 'white' : 'black') : 'blue'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color = darkMode
        ? 'white'
        : 'black'
    }
  }, [homerf, id])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        <div
          style={{
            margin: '5px',
            borderRadius: '10px',
            backgroundColor: darkMode ? 'black' : 'rgba(220,220,220)',
            boxShadow: darkMode ? '0px 0px 8px white' : '0px 0px 8px black',
            // border: 'solid rgba(200,200,200) 2px',
            padding: '15px',
          }}
        >
          <h1>Settings</h1>
        </div>
        <div style={{ marginTop: '50px' }}>
          <div
            style={{
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: darkMode ? 'black' : 'white',
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: darkMode ? 'white' : 'black',
              }}
              to='/dashboard/settings/preferences'
            >
              <div
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                }}
              >
                <h2>Preferences</h2>
                <img
                  src={right}
                  alt='go'
                  height='20px'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                  }}
                />
              </div>
            </Link>
          </div>
          <div
            style={{
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: darkMode ? 'black' : 'white',
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: darkMode ? 'white' : 'black',
              }}
              to='/dashboard/settings/messaging'
            >
              <div
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                }}
              >
                <h2>Messaging</h2>
                <img
                  src={right}
                  alt='go'
                  height='20px'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                  }}
                />
              </div>
            </Link>
          </div>
          <div
            style={{
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: darkMode ? 'black' : 'white',
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: darkMode ? 'white' : 'black',
              }}
              to='/dashboard/settings/notifier'
            >
              <div
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                }}
              >
                <h2>Notifications</h2>
                <img
                  src={right}
                  alt='go'
                  height='20px'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                  }}
                />
              </div>
            </Link>
          </div>
          <div
            style={{
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: darkMode ? 'black' : 'white',
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: darkMode ? 'white' : 'black',
              }}
              to='/dashboard/settings/admin'
            >
              <div
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                }}
              >
                <h2>Admin</h2>
                <img
                  src={right}
                  alt='go'
                  height='20px'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                  }}
                />
              </div>
            </Link>
          </div>
          <div
            style={{
              margin: '5px',
              borderRadius: '10px',
              backgroundColor: darkMode ? 'black' : 'white',
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: darkMode ? 'white' : 'black',
              }}
              to='/dashboard/settings/privacy'
            >
              <div
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  display: 'flex',
                }}
              >
                <h2>Data Privacy</h2>
                <img
                  src={right}
                  alt='go'
                  height='20px'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
