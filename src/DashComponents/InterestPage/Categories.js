import { React, useState, useEffect, useContext } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useHistory, Link } from 'react-router-dom'
import ContextProvider from '../../ContextProvider'
import ConfirmationModal from '../ConfirmationModal'

const Categories = ({ user, setShowHomeToggle, viewProfileUpload }) => {
  const history = useHistory()
  const [showMessage, setShowMessage] = useState(false)
  const { server, darkMode } = useContext(ContextProvider)
  const [categories, setCategories] = useState([
    { category: 'Science', url: '' },
    { category: 'Arts', url: '' },
    { category: 'Social Sciences', url: '' },
    { category: 'Agricultural Science', url: '' },
    { category: 'Engineering', url: '' },
    { category: 'Technology', url: '' },
    { category: 'Medicine', url: '' },
    { category: 'Computer Science', url: '' },
    { category: 'Data Science', url: '' },
    { category: 'Data Analysis', url: '' },
    { category: 'Data Analytics', url: '' },
    { category: 'Sports', url: '' },
  ])
  const [selectedClusters, setSelectedClusters] = useState([])
  const [isEditting, setIsEditting] = useState(false)
  const [skipStats, setSkipStats] = useState('Skip')
  const [contStats, setContStats] = useState('Continue')
  useEffect(() => {
    if (
      user.interestCategories !== null &&
      user.interestCategories !== undefined &&
      user.skippedProfileUpload !== undefined
    ) {
      setShowHomeToggle(true)
      setIsEditting(true)
      setSelectedClusters((selectedClusters) => {
        return [...selectedClusters, ...user.interestCategories]
      })
    } else {
      if (user.skippedInterest !== undefined) {
        if (user.skippedProfileUpload === undefined) {
          viewProfileUpload(true)
        } else {
          setShowHomeToggle(true)
          setIsEditting(true)
        }
      }
      setShowHomeToggle(false)
    }
  }, [user])
  const addInterests = async () => {
    setContStats('....')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { userName: user.userName },
            {
              interestCategories: selectedClusters,
              skippedInterest: false,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        if (isEditting) {
          history.push('./')
        } else {
          viewProfileUpload()
        }
        setShowMessage(false)
      } else {
        setContStats('Continue')
        setShowMessage(true)
      }
    } catch (TypeError) {
      setContStats('Continue')
      setShowMessage(true)
    }
  }
  const handleSkipped = async () => {
    setSkipStats('....')
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [
            { userName: user.userName },
            {
              skippedInterest: true,
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        // history.push('./')
        viewProfileUpload()
        setShowMessage(false)
      } else {
        setShowMessage(true)
        setSkipStats('Skip')
      }
    } catch (TypeError) {
      setShowMessage(true)
      setSkipStats('Skip')
    }
  }
  return (
    <>
      <div style={{ padding: '10px', paddingBottom: '70px' }}>
        {showMessage && (
          <ConfirmationModal
            message='Could not connect to server. Check that you are still connected to the internet.'
            title='You Are Offline!!!'
            button1='Ok'
            button2='Reload'
            func1={() => {
              setShowMessage(false)
            }}
            func2={() => {
              window.location.reload()
            }}
          />
        )}
        <h1 style={{ fontFamily: 'MonteserratBold', marginTop: '30px' }}>
          {!isEditting
            ? 'Welcome ' + user.firstName.trim() + ". Let's Get You Started."
            : 'Edit Your Interests.'}
        </h1>
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '50px',
            fontFamily: 'MonteserratRegular',
          }}
        >
          <h4>
            Pick From The Categories Below. Your Feeds Will Be Filtered
            Accordingly.
          </h4>
          <h5 style={{ marginTop: '30px' }}>
            <center>Choose three or more.</center>
          </h5>
        </div>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
          {categories.map((cat, i) => {
            return (
              <div
                key={i}
                style={{
                  width: 'fit-content',
                  margin: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  background: 'rgba(15,105,213)',
                  fontFamily: 'SourceCodeProRegular',
                  display: 'inline-flex',
                }}
                onClick={() => {
                  if (selectedClusters.includes(cat.category)) {
                    setSelectedClusters((selectedClusters) => {
                      return selectedClusters.filter((cluster) => {
                        return cluster !== cat.category
                      })
                    })
                  } else {
                    setSelectedClusters((selectedClusters) => {
                      return [...selectedClusters, cat.category]
                    })
                  }
                }}
              >
                {cat.category}
                {selectedClusters.includes(cat.category) && (
                  <FaCheck
                    style={{
                      marginLeft: '15px',
                      marginTop: '4px',
                      color: 'lightgreen',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
        {selectedClusters.length >= 3 && (
          <div
            style={{
              width: 'fit-content',
              margin: '10px',
              marginRight: 'auto',
              marginTop: '70px',
            }}
          >
            <label
              style={{
                fontFamily: 'SourceCodeProBold',
                padding: '8px 20px',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.3rem',
                color: 'rgba(10, 105, 214)',
                boxShadow: darkMode
                  ? '0px 0px 10px white'
                  : '0px 0px 10px black',
                // background: 'white',
              }}
              onClick={addInterests}
            >
              {isEditting ? 'Save' : contStats}
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default Categories
