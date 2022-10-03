import { React, useState, useEffect } from 'react'
import Page from './Page/Page'
import Form from './Form/Form'

const Apply = ({ server, user }) => {
  const [isViewPage, setIsViewPage] = useState(false)
  const [isViewForm, setIsViewForm] = useState(false)
  const [view, setView] = useState('')
  useEffect(() => {
    if (window.sessionStorage.getItem('fm-z-cr-pg') !== null) {
      setIsViewForm(true)
    } else {
      setIsViewPage(true)
    }
  }, [])
  useEffect(() => {
    if (isViewPage) {
      setIsViewForm(false)
      setView(
        <Page
          server={server}
          user={user}
          viewForm={({ data }) => {
            window.sessionStorage.setItem('fm-dt', data)
            window.sessionStorage.setItem('fm-z-cr-pg', 'true')
            setIsViewForm(true)
          }}
        />
      )
    }
  }, [isViewPage])
  useEffect(() => {
    if (isViewForm) {
      setIsViewPage(false)
      setView(
        <Form
          server={server}
          user={user}
          data={window.sessionStorage.getItem('fm-dt')}
          viewPage={() => {
            window.sessionStorage.removeItem('fm-dt')
            window.sessionStorage.removeItem('fm-z-cr-pg')
            setIsViewPage(true)
          }}
        />
      )
    }
  }, [isViewForm])
  return (
    <>
      <div>{view}</div>
    </>
  )
}

export default Apply
