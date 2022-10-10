import { React, useState, useEffect, useRef } from 'react'

import Profile from './Profile'
import NapsiteSearch from './NapsiteSearch'

import close from './assets/close.png'

const AdminBoard = ({ closeAdminBoard, currentUser, server }) => {
  const searchNapsiteRef = useRef(null)
  const othersRef = useRef(null)
  const [view, setView] = useState('')
  const [viewBack, setViewBack] = useState(false)
  const viewProfile = (user) => {
    setView(
      <Profile
        server={server}
        user={user}
        padding={'0px'}
        backgroundColor={'rgba(0,0,0,0.8)'}
        clickAdmin={false}
        overflow={'auto'}
        isSearched={true}
      />
    )
    setViewBack(true)
  }

  const goBack = () => {
    setViewBack(false)
    setView(
      <NapsiteSearch
        server={server}
        viewProfile={viewProfile}
        currentUser={currentUser}
        viewCurrentUserProfile={() => {
          closeAdminBoard()
        }}
      />
    )
  }
  useEffect(() => {
    searchNapsiteRef.current.style.borderBottom = 'solid lightgreen 2px'
    setView(
      <NapsiteSearch
        server={server}
        viewProfile={viewProfile}
        currentUser={currentUser}
        viewCurrentUserProfile={() => {
          closeAdminBoard()
        }}
      />
    )
  }, [])
  const handleAdminBarItem = (e) => {
    const name = e.target.getAttribute('name')
    searchNapsiteRef.current.style.borderBottom = 'solid lightgreen 0px'
    othersRef.current.style.borderBottom = 'solid lightgreen 0px'
    if (name === 'searchNapsites') {
      searchNapsiteRef.current.style.borderBottom = 'solid lightgreen 2px'
      setView(<NapsiteSearch viewProfile={viewProfile} />)
    } else if (name === 'others') {
      othersRef.current.style.borderBottom = 'solid lightgreen 2px'
      setViewBack(false)
      setView('')
    }
  }
  return (
    <>
      <div className='adminboard'>
        <img
          onClick={() => {
            closeAdminBoard()
          }}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
            zIndex: '1',
          }}
          src={close}
          alt='close'
          height='20px'
        />
        <div style={{ position: 'absolute', top: '10px', width: '100%' }}>
          <ul className='admintopbar' onClick={handleAdminBarItem}>
            <li
              ref={searchNapsiteRef}
              name='searchNapsites'
              className='adminbaritem'
            >
              Search Napsites
            </li>
            <li ref={othersRef} name='others' className='adminbaritem'>
              Others
            </li>
          </ul>
        </div>

        <div
          style={{ marginTop: '100px', flexWrap: 'wrap', overflowY: 'auto' }}
        >
          {viewBack && (
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '.9rem',
                fontWeight: 'bold',
                padding: '5px',
                borderRadius: '5px',
                color: 'lightgreen',
                margin: '10px',
              }}
            >
              <label
                style={{
                  cursor: 'pointer',
                }}
                onClick={goBack}
              >
                {'<< Back'}
              </label>
            </div>
          )}
          {view}
        </div>
      </div>
    </>
  )
}

export default AdminBoard
