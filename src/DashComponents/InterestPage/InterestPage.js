import { React, useState, useEffect, useContext } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useHistory, Link } from 'react-router-dom'
import ContextProvider from '../../ContextProvider'

const InterestPage = ({ user }) => {
  const history = useHistory()
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
  useEffect(() => {
    if (
      user.interestCategories !== null &&
      user.interestCategories !== undefined
    ) {
      setIsEditting(true)
      setSelectedClusters((selectedClusters) => {
        return [...selectedClusters, ...user.interestCategories]
      })
    }
  }, [user])
  const addInterests = async () => {
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
            },
          ],
        }),
      }
      const resp = await fetch(server + '/updateOneUser', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        history.push('./')
        window.location.reload()
      }
    } catch (TypeError) {}
  }
  return (
    <>
      <div style={{ padding: '10px', paddingBottom: '60px' }}>
        <h1 style={{ fontFamily: 'MonteserratBold', marginTop: '30px' }}>
          {!isEditting
            ? 'Welcome ' + user.firstName + ". Let's Get You Started"
            : 'Edit Your Interests'}
        </h1>
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '50px',
            fontFamily: 'MonteserratRegular',
          }}
        >
          {!isEditting && (
            <div
              style={{
                margin: '10px',
                marginLeft: 'auto',
                width: 'fit-content',
              }}
            >
              <label
                style={{
                  cursor: 'pointer',
                  padding: '8px 15px',
                  borderRadius: '10px',
                  color: 'rgba(10, 105, 214)',
                  fontFamily: 'SourceCodeProBold',
                  boxShadow: darkMode
                    ? '0px 0px 10px white'
                    : '0px 0px 10px black',
                }}
                onClick={() => {
                  history.push('./')
                }}
              >
                Skip
              </label>
            </div>
          )}
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
              {isEditting ? 'Save' : 'Continue'}
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default InterestPage
