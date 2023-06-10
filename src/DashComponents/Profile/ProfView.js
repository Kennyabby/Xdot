import { React, useState, useEffect, useRef } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

import Profile from './Profile'
import NapsiteSearch from './NapsiteSearch'

const ProfView = ({
  user,
  server,
  chatrf,
  homerf,
  notificationsrf,
  showHomeToggle,
}) => {
  const { id } = useParams()
  const history = useHistory()
  const [userResult, setUserResult] = useState({})
  const [view, setView] = useState('')

  const fetchUserAPI = async ({ data, req }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      const resp = await fetch(server + '/' + req, opts)
      const response = await resp.json()
      const user = response.user

      setUserResult(user)
    } catch (TypeError) {}
  }
  useEffect(() => {
    fetchUserAPI({
      data: { userName: id },
      req: 'getUserDetails',
    })
  }, [id])
  useEffect(() => {
    if (userResult.userName !== null && userResult.userName !== undefined) {
      if (userResult.userName === user.userName) {
        history.push('/dashboard/profile')
      } else {
        setView(
          <Profile
            server={server}
            chatrf={chatrf}
            homerf={homerf}
            notificationsrf={notificationsrf}
            accountUser={user}
            user={userResult}
            padding={'0px'}
            margin={'0px'}
            clickAdmin={false}
            isSearched={true}
            showHomeToggle={(show) => {
              showHomeToggle(show)
            }}
          />
        )
      }
    }
  }, [userResult])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default ProfView
