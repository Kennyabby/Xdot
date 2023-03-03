import { React, useState, useEffect, useContext } from 'react'

import Categories from './Categories'
import ProfileUpload from './ProfileUpload'

const InterestPage = ({ user, setShowHomeToggle }) => {
  const [view, setView] = useState('Loading...')
  const [showCategories, setShowCategories] = useState(true)
  const [showProfileUpload, setShowProfileUpload] = useState(false)

  useEffect(() => {
    if (showCategories) {
      setView(
        <Categories
          user={user}
          setShowHomeToggle={setShowHomeToggle}
          viewProfileUpload={() => {
            setShowCategories(false)
            setShowProfileUpload(true)
          }}
        />
      )
    }
  }, [showCategories])
  useEffect(() => {
    if (showProfileUpload) {
      setView(
        <ProfileUpload
          user={user}
          setShowHomeToggle={setShowHomeToggle}
          viewCategories={() => {
            setShowCategories(true)
            setShowProfileUpload(false)
          }}
        />
      )
    }
  }, [showProfileUpload])
  return (
    <>
      <div>{view}</div>
    </>
  )
}
export default InterestPage
