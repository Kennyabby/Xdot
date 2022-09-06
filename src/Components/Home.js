import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import About from './About'
import Current from './Current'
import Events from './Events'
import Signup from './Signup'
const Home = ({ bars, showNavbar, winSize, showNavOpt }) => {
  const [eventDimension, setEventDimension] = useState(null)
  const [aboutDimension, setAboutDimension] = useState(null)
  const [currentDimension, setCurrentDimension] = useState(null)
  const [isShowSignup, setIsShowSignup] = useState(false)
  const { id } = useParams()
  const refHome = useRef(null)
  const history = useHistory()
  const refAbout = (ref) => {
    const dimension = ref.current.getBoundingClientRect()
    setAboutDimension(dimension)
  }
  useEffect(() => {
    if (id === undefined) {
      if (winSize <= 700) {
        showNavbar(false)
        showNavOpt(true)
      } else {
        showNavbar(true)
        showNavOpt(false)
      }
    } else {
      if (id !== 'signup') {
        if (winSize <= 700) {
          showNavbar(false)
          showNavOpt(true)
        } else {
          showNavbar(true)
          showNavOpt(false)
        }
      }
    }
  })
  useEffect(() => {
    setIsShowSignup(false)
    if (eventDimension != null) {
      bars.map((bar) => {
        if (bar.current !== null) {
          bar.current.style.color = 'rgb(187, 183, 183)'
          if (bar.current.getAttribute('name') === id) {
            bar.current.style.color = 'white'
          }
          if (id === undefined && bar.current.getAttribute('name') === 'home') {
            bar.current.style.color = 'white'
          }
        }
      })
    }

    window.scrollTo(0, 0)
    if (id === 'events' && eventDimension != null) {
      window.scrollTo(eventDimension.x, eventDimension.y - 30)
    } else if (id === 'current' && currentDimension != null) {
      window.scrollTo(currentDimension.x, currentDimension.y - 30)
    } else if (id === 'about' && aboutDimension != null) {
      window.scrollTo(aboutDimension.x, aboutDimension.y - 30)
    }
    if (id === 'signup') {
      showNavbar(false)
      setIsShowSignup(true)
    }
  })

  return (
    <>
      <div className='home' ref={refHome}>
        <div className='info'>
          <h2>Notice</h2>
          <p>
            This page is strictly for members of the National Association of
            Physics Students University of Ibadan Division <b>(NAPS UI)</b>, as
            only members can access its priviledges. The Registration process
            requires that all members provide their University of Ibadan student{' '}
            <b>MATRIC NUMBER</b>. Click the button below to proceed.
          </p>
        </div>
        <div
          style={{
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Link style={{ margin: 'atuo' }} to='/signup'>
            <button className='signup'>Sign Up</button>
          </Link>
        </div>
      </div>
      <Events
        setRef={(ref) => {
          setEventDimension(ref.current.getBoundingClientRect())
        }}
      />
      <Current
        setRef={(ref) => {
          setCurrentDimension(ref.current.getBoundingClientRect())
        }}
      />
      <About setRef={refAbout} />
      {isShowSignup ? (
        <Signup
          setShowSignup={() => {
            setIsShowSignup(false)
          }}
        />
      ) : undefined}
    </>
  )
}

export default Home
