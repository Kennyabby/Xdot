import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import right from './assets/right.png'
import home from './assets/home.png'
import notifications from './assets/notifications.png'
import blhome from './assets/blhome.png'
import blbell from './assets/blbell.png'

const Settings = ({ chatrf, homerf, notificationsrf, showHomeToggle }) => {
  const { id } = useParams()
  useEffect(() => {
    showHomeToggle(true)
    if (homerf !== undefined && chatrf !== undefined) {
      if (homerf.current !== null && chatrf.current !== null) {
        homerf.current.childNodes[0].childNodes[0].src = home
        homerf.current.childNodes[0].childNodes[1].style.color =
          id === 'settings' ? 'black' : 'blue'
      }
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.childNodes[0].childNodes[0].src = notifications
      notificationsrf.current.childNodes[0].childNodes[1].style.color = 'black'
    }
  }, [homerf, id])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        <div
          style={{
            margin: '5px',
            borderRadius: '10px',
            backgroundColor: 'rgba(220,220,220)',
            boxShadow: '0px 0px 8px black',
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
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
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
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
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
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
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
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
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
              border: 'solid rgba(210,210,210) 2px',
              padding: '10px',
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
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
