import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import right from './assets/right.png'
const Settings = ({ chatrf, homerf, notificationsrf }) => {
  useEffect(() => {
    if (homerf !== undefined && chatrf !== undefined) {
      homerf.current.style.borderBottom = 'solid blue 0px'
      chatrf.current.style.borderBottom = 'solid blue 0px'
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
  }, [homerf])
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        <div
          style={{
            margin: '5px',
            borderRadius: '10px',
            backgroundColor: 'rgba(220,220,220)',
            border: 'solid rgba(200,200,200) 2px',
            padding: '10px',
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
