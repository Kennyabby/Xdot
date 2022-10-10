import { React, useState, useEffect } from 'react'

import remove from './assets/cancel.png'
import napsimg from './assets/profile.png'

const NapsiteSearch = ({
  server,
  viewProfile,
  currentUser,
  viewCurrentUserProfile,
}) => {
  const [showSearchFilter, setShowSearchFilter] = useState(false)
  const [searchType, setSearchType] = useState('Name')
  const [search, setSearch] = useState('')
  const [filterList, setFilterList] = useState([])
  const [filter, setFilter] = useState({ gender: 'gender', level: 'level' })
  const [napsiteViewStatus, setNapsiteViewStatus] = useState('View All')
  const [users, setUsers] = useState([])
  const [viewAllNapsites, setViewAllNapsites] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(async () => {
    setIsLoading(true)
    if (
      (filter.gender === 'gender' && filter.level === 'level') ||
      (filter.gender === '' && filter.level === '')
    ) {
      setFilterList([])
    } else {
      setFilterList([
        filter.gender === 'gender' ? '' : filter.gender,
        filter.level === 'level' ? '' : filter.level,
      ])
    }

    var newFilter = {}
    if (viewAllNapsites) {
      if (filter.gender.length) {
        newFilter.gender = filter.gender
      }
      if (filter.level.length) {
        newFilter.level = filter.level
      }
    } else {
      if (filter.gender === 'gender' && filter.level === 'level') {
        newFilter.gender = 'gender'
        newFilter.level = 'level'
      } else {
        if (filter.gender.length && filter.gender != 'gender') {
          newFilter.gender = filter.gender
        }
        if (filter.level.length && filter.level != 'level') {
          newFilter.level = filter.level
        }
      }
    }
    if (!isSearchFocused) {
      try {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFilter),
        }
        const resp = await fetch(server + '/getUsersDetails', opts)
        const response = await resp.json()
        const users = response.users
        setUsers(users)
        setIsLoading(false)
      } catch (TypeError) {}
    }
  }, [filter])

  const handleSearchFilter = () => {
    if (showSearchFilter) {
      setShowSearchFilter(false)
    } else {
      setShowSearchFilter(true)
    }
  }
  const updateFilter = (e) => {
    setIsSearchFocused(false)
    const name = e.target.getAttribute('name')
    const value = e.target.getAttribute('value')
    if (['gender', 'level'].includes(name)) {
      setFilter((filter) => {
        return { ...filter, [name]: value }
      })
    }
  }
  const handleViewAllNapsite = () => {
    setIsSearchFocused(false)
    if (viewAllNapsites) {
      setViewAllNapsites(false)
      setFilter({ gender: 'gender', level: 'level' })
      setNapsiteViewStatus('View All')
    } else {
      setViewAllNapsites(true)
      setFilter({ gender: '', level: '' })
      setNapsiteViewStatus('Restrict View')
    }
  }
  const handleNapsiteSearch = (e) => {
    const srch = e.target.value
    setSearch(srch)
  }
  useEffect(async () => {
    if (search) {
      setIsSearchFocused(true)
      if (napsiteViewStatus === 'View All') {
        setFilter({ gender: 'gender', level: 'level' })
      } else {
        setFilter({ gender: '', level: '' })
      }
      setIsLoading(true)
      try {
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
        const resp = await fetch(server + '/getUsersDetails', opts)
        const response = await resp.json()
        const users = response.users
        const usrs = users.filter((user) => {
          if (searchType === 'Name') {
            return (
              user.lastName +
              ' ' +
              user.firstName +
              ' ' +
              user.middleName
            )
              .toLowerCase()
              .includes(search.toLowerCase())
          } else if (searchType === 'Matric No') {
            return user.matricNo.toLowerCase().includes(search.toLowerCase())
          } else if (searchType === 'Username') {
            return user.userName.toLowerCase().includes(search.toLowerCase())
          }
        })
        setUsers(usrs)
        setIsLoading(false)
      } catch (TypeError) {}
    } else {
      setIsSearchFocused(false)
      if (napsiteViewStatus === 'View All') {
        setFilter({ gender: 'gender', level: 'level' })
      } else {
        setFilter({ gender: '', level: '' })
      }
    }
  }, [search])

  return (
    <>
      <div style={{ display: 'block' }}>
        {showSearchFilter && (
          <div
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: '0px',
              left: '0px',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onTouchEnd={() => {
              setShowSearchFilter(false)
            }}
            onClick={() => {
              setShowSearchFilter(false)
            }}
          ></div>
        )}
        <div style={{ display: 'inline-flex', fontFamily: 'monospace' }}>
          <label
            onClick={handleSearchFilter}
            style={{
              position: 'relative',
              border: 'solid white 2px',
              height: 'fit-content',
              padding: '5px 10px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Add Search Filter{' >'}
            {showSearchFilter && (
              <div className='searchfilter' onClick={updateFilter}>
                {filter.gender != 'gender' &&
                filter.gender.length ? undefined : (
                  <div
                    style={{
                      margin: '0px 20px',
                      padding: '10px',
                      border: 'solid rgba(200,200,200,1) 2px',
                      borderRadius: '10px',
                    }}
                  >
                    <div className='filtertitle'>
                      <label>Gender</label>
                    </div>
                    <div
                      className='searchfilteritem'
                      name='gender'
                      value='Male'
                    >
                      Male
                    </div>
                    <div
                      className='searchfilteritem'
                      name='gender'
                      value='Female'
                    >
                      Female
                    </div>
                  </div>
                )}
                {filter.level != 'level' && filter.level.length ? undefined : (
                  <div
                    style={{
                      margin: '0px 20px',
                      padding: '10px',
                      border: 'solid rgba(200,200,200,1) 2px',
                      borderRadius: '10px',
                    }}
                  >
                    <div className='filtertitle'>
                      <label>Level</label>
                    </div>
                    <div className='searchfilteritem' name='level' value='100'>
                      100
                    </div>
                    <div className='searchfilteritem' name='level' value='200'>
                      200
                    </div>
                    <div className='searchfilteritem' name='level' value='300'>
                      300
                    </div>
                    <div className='searchfilteritem' name='level' value='400'>
                      400
                    </div>
                  </div>
                )}
                {filter.gender != 'gender' &&
                filter.gender.length &&
                filter.level != 'level' &&
                filter.level.length ? (
                  <li className='searchfilteritem' style={{ cursor: 'auto' }}>
                    No filters left!
                  </li>
                ) : undefined}
              </div>
            )}
          </label>
          {(filter.gender != 'gender' && filter.gender.length) ||
          (filter.level != 'level' && filter.level.length) ? (
            <div style={{ display: 'inline-flex' }}>
              {filterList.map((ftr, i) => {
                if (ftr.length) {
                  return (
                    <div className='ftr' key={i}>
                      {ftr}
                      <img
                        onClick={() => {
                          if (filter.gender === ftr) {
                            if (viewAllNapsites) {
                              setFilter((filter) => {
                                return { ...filter, gender: '' }
                              })
                            } else {
                              setFilter((filter) => {
                                return { ...filter, gender: 'gender' }
                              })
                            }
                          } else if (filter.level === ftr) {
                            if (viewAllNapsites) {
                              setFilter((filter) => {
                                return { ...filter, level: '' }
                              })
                            } else {
                              setFilter((filter) => {
                                return { ...filter, level: 'level' }
                              })
                            }
                          }
                        }}
                        className='removeftr'
                        height='17px'
                        title='Remove Filter'
                        src={remove}
                        alt='remove'
                      />
                    </div>
                  )
                }
              })}
            </div>
          ) : undefined}
        </div>
        <div className='napsitesearchcover'>
          <select
            onChange={(e) => {
              setSearchType(e.target.value)
            }}
            className='searchby'
          >
            <option className='searchbyitem' value='Name'>
              Name
            </option>
            <option className='searchbyitem' value='Matric No'>
              Matric No
            </option>
            <option className='searchbyitem' value='Username'>
              Username
            </option>
          </select>
          <input
            defaultValue={search}
            onChange={handleNapsiteSearch}
            className='napsitesearchinput'
            placeholder={`Search By ${searchType}`}
          />
          <label
            onClick={handleViewAllNapsite}
            style={{
              fontFamily: 'monospace',
              cursor: 'pointer',
              padding: '5px',
            }}
          >
            {napsiteViewStatus}
          </label>
        </div>
        {users.length || search.length || filterList.length ? (
          <div
            style={{
              margin: '10px',
              paddingBottom: '10px',
              borderBottom: 'solid rgba(200,200,200,1) 2px',
            }}
          >
            <label style={{ color: 'lightgreen', fontFamily: 'monospace' }}>
              {isLoading
                ? 'Loading...'
                : users.length +
                  (users.length > 1 ? ' Results' : ' Result') +
                  ' Found ' +
                  (isSearchFocused
                    ? 'For ' + searchType + ' "' + search + '".'
                    : '') +
                  (filterList.length
                    ? 'For Filter With' +
                      (filter.gender !== '' && filter.gender !== 'gender'
                        ? ' Gender "' +
                          filter.gender +
                          '"' +
                          ' and ' +
                          (filter.level !== '' && filter.level !== 'level'
                            ? ' Level "' + filter.level + '".'
                            : '"No Level Picked".')
                        : ' "No Gender Picked"' +
                          ' and ' +
                          (filter.level !== '' && filter.level !== 'level'
                            ? ' Level "' + filter.level + '".'
                            : '"No Level Picked".'))
                    : '')}
            </label>
          </div>
        ) : undefined}
        <div className='napsiteviewarea'>
          {users.map((user, i) => {
            return (
              <NapsiteView
                server={server}
                key={i}
                id={i}
                user={user}
                currentUser={currentUser}
                viewCurrentUserProfile={() => {
                  return viewCurrentUserProfile()
                }}
                viewProfile={(usr) => {
                  return viewProfile(usr)
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

const NapsiteView = ({
  server,
  id,
  user,
  currentUser,
  viewProfile,
  viewCurrentUserProfile,
}) => {
  const [userImgUrl, setUserImgUrl] = useState(napsimg)
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
  return (
    <div
      key={id}
      onClick={() => {
        if (currentUser.matricNo === user.matricNo) {
          viewCurrentUserProfile()
        } else {
          viewProfile(user)
        }
      }}
      className='napsiteview'
    >
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '25px',
          borderRadius: '50%',
          backgroundImage: `url(${userImgUrl})`,
          backgroundSize: 'cover',
          boxShadow: '0px 0px 5px black',
          height: '80px',
          width: '80px',
        }}
      ></div>
      <label
        style={{
          position: 'absolute',
          right: '10px',
          top: '20px',
          fontWeight: 'bold',
        }}
      >
        {user.lastName + ' ' + user.firstName + ' ' + user.middleName}
      </label>
      <label style={{ position: 'absolute', bottom: '20px', right: '10px' }}>
        {user.userName.toUpperCase() +
          (user.access === 'Admin' ? ' (Admin)' : '')}
      </label>
    </div>
  )
}
export default NapsiteSearch
