import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdNotificationsActive, MdTaskAlt } from 'react-icons/md'
import { RiSettings2Line, RiMessage3Fill } from 'react-icons/ri'
import { SiEventstore } from 'react-icons/si'
import {
  FaTimes,
  FaSearch,
  FaBars,
  FaChevronUp,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaUser,
  FaAngleRight,
} from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { GiVote } from 'react-icons/gi'

import ContextProvider from '../ContextProvider'

import tasks from './assets/tasks.png'
import events from './assets/events.png'
import notifications from './assets/notifications.png'
import settings from './assets/settings.jpg'
import profile from './assets/profile.png'
import downarrow from './assets/downarrow.png'
import uparrow from './assets/uparrow.png'

const SideNavigator = ({
  user,
  getTasksLabelRefs,
  getEventsLabelRefs,
  getEvotingLabelRefs,
  getLabelRefs,
  logOut,
  logoutStatus,
  setShow,
  setView,
}) => {
  const history = useHistory()
  const profileLabel = useRef(null)
  const notificationsLabel = useRef(null)
  const eventsLabel = useRef(null)
  const tasksLabel = useRef(null)
  const eVotingLabel = useRef(null)
  const settingsLabel = useRef(null)
  const [showEventDrop, setShowEventDrop] = useState(false)
  const [showTaskDrop, setShowTaskDrop] = useState(false)
  const [showEvotingDrop, setShowEvotingDrop] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const [showBorder, setShowBorder] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50
  const cgpacalcRef = useRef(null)
  const todolistRef = useRef(null)
  const quizappRef = useRef(null)

  const grandquizRef = useRef(null)
  const dailypuzzleRef = useRef(null)
  const studytableRef = useRef(null)

  const applyRef = useRef(null)
  const voteRef = useRef(null)

  const { darkMode, setDarkMode } = useContext(ContextProvider)

  const tasksLabelRefs = [cgpacalcRef, todolistRef, quizappRef]
  const eventsLabelRefs = [grandquizRef, dailypuzzleRef, studytableRef]
  const eVotingLabelRefs = [applyRef, voteRef]

  const labelRefs = [
    profileLabel,
    notificationsLabel,
    eventsLabel,
    tasksLabel,
    eVotingLabel,
    settingsLabel,
  ]
  useEffect(() => {
    getLabelRefs(labelRefs)
  }, [])

  const logout = () => {
    logOut()
  }

  const handleDrop = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'eventdrop') {
      if (showEventDrop) {
        getEventsLabelRefs([])
        setShowEventDrop(false)
      } else {
        getEventsLabelRefs(eventsLabelRefs)
        setShowEventDrop(true)
      }
    } else if (name === 'taskdrop') {
      if (showTaskDrop) {
        getTasksLabelRefs([])
        setShowTaskDrop(false)
      } else {
        getTasksLabelRefs(tasksLabelRefs)
        setShowTaskDrop(true)
      }
    } else if (name === 'e-votingdrop') {
      if (showEvotingDrop) {
        getEvotingLabelRefs([])
        setShowEvotingDrop(false)
      } else {
        getEvotingLabelRefs(eVotingLabelRefs)
        setShowEvotingDrop(true)
      }
    }
  }
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientX
    var distance = currentTouch - touchStart
    if (distance <= 0) {
      setXOffset(distance)
    }
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      if (isLeftSwipe) {
        setShow(false)
        setTimeout(() => {
          setXOffset(0)
        }, 500)
      } else {
        setXOffset(0)
      }
    }
  }
  const itemStyle = {
    color: darkMode ? 'rgba(190,190,200)' : 'rgba(16,16,16)',
    fontFamily: 'MonteserratRegular',
  }
  const dropItemStyle = {
    color: darkMode ? 'rgba(190,190,200)' : 'rgba(16,16,16)',
    fontFamily: 'MonteserratRegular',
  }
  return (
    <>
      <motion.div
        className='userbar'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeIn' },
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          backgroundColor: darkMode
            ? 'rgba(5,5,30,0.8)'
            : 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.ul
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
            opacity: { duration: 0.4 },
          }}
          exit={{ x: '-100vw', transition: { duration: 0.5, ease: 'easeIn' } }}
          className='usersidebar'
          style={{
            left: String(xOffset) + 'px',
            backgroundColor: darkMode
              ? 'rgba(5,5,30,0.8)'
              : 'rgba(255,255,255,0.9)',
          }}
        >
          <Link to='/dashboard' className='userlefttop'>
            <label style={{ cursor: 'pointer' }}>{'< SECTIONS />'}</label>
          </Link>
          <li name='profile' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/profile'>
              <div
                className='userleftitem'
                name='profile'
                ref={profileLabel}
                style={{ ...itemStyle }}
              >
                <FaUser
                  className='sideicons'
                  name='profile'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Profile</span>
              </div>
            </Link>
          </li>
          <li name='notifications' className='userleft'>
            <Link
              style={{ textDecoration: 'none' }}
              to='/dashboard/notifications'
            >
              <div
                className='userleftitem'
                name='notifications'
                ref={notificationsLabel}
                style={{ ...itemStyle }}
              >
                <MdNotificationsActive
                  className='sideicons'
                  name='events'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Updates</span>
              </div>
            </Link>
          </li>
          <li name='events' className='userleft'>
            <Link
              name='events'
              style={{ textDecoration: 'none' }}
              to='/dashboard/events'
            >
              <div
                className='userleftitem'
                name='events'
                ref={eventsLabel}
                style={{ ...itemStyle }}
              >
                <SiEventstore
                  className='sideicons'
                  name='events'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Events Apps </span>
              </div>
            </Link>
            {!showEventDrop ? (
              <FaChevronDown
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='events donwdrop toggle'
                onClick={handleDrop}
                name='eventdrop'
                className='taskdrop'
              />
            ) : (
              <FaChevronUp
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='events donwdrop toggle'
                onClick={handleDrop}
                name='eventdrop'
                className='taskdrop'
              />
            )}
            {showEventDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/grandquiz'
                >
                  <li
                    ref={grandquizRef}
                    className='dropitem'
                    name='grandquiz'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> {'  Grand Quiz'}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/dailypuzzles'
                >
                  <li
                    ref={dailypuzzleRef}
                    className='dropitem'
                    name='dailypuzzles'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> {'  Daily Puzzles'}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/studytable'
                >
                  <li
                    ref={studytableRef}
                    className='dropitem'
                    name='studytable'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> Study Table
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='tasks' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/tasks'>
              <div
                className='userleftitem'
                name='tasks'
                ref={tasksLabel}
                style={{ ...itemStyle }}
              >
                <MdTaskAlt
                  className='sideicons'
                  name='tasks'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Tasks Apps</span>
              </div>
            </Link>
            {!showTaskDrop ? (
              <FaChevronDown
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='tasks donwdrop toggle'
                onClick={handleDrop}
                name='taskdrop'
                className='taskdrop'
              />
            ) : (
              <FaChevronUp
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='tasks donwdrop toggle'
                onClick={handleDrop}
                name='taskdrop'
                className='taskdrop'
              />
            )}
            {showTaskDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/cgpa'
                >
                  <li
                    ref={cgpacalcRef}
                    className='dropitem'
                    name='cgpa'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> CGPA CALC
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/todolist'
                >
                  <li
                    ref={todolistRef}
                    className='dropitem'
                    name='todolist'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> To Do List
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/quizapp'
                >
                  <li
                    ref={quizappRef}
                    className='dropitem'
                    name='quizapp'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> Quiz App
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='e-voting' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/e-voting'>
              <div
                className='userleftitem'
                name='e-voting'
                ref={eVotingLabel}
                style={{ ...itemStyle }}
              >
                <GiVote
                  className='sideicons'
                  name='e-voting'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Evoting App</span>
              </div>
            </Link>
            {!showEvotingDrop ? (
              <FaChevronDown
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='e-voting donwdrop toggle'
                onClick={handleDrop}
                name='e-votingdrop'
                className='taskdrop'
              />
            ) : (
              <FaChevronUp
                style={{ color: darkMode ? 'white' : 'black' }}
                alt='e-voting donwdrop toggle'
                onClick={handleDrop}
                name='e-votingdrop'
                className='taskdrop'
              />
            )}
            {showEvotingDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/apply'
                >
                  <li
                    ref={applyRef}
                    className='dropitem'
                    name='apply'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> Apply
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/vote'
                >
                  <li
                    ref={voteRef}
                    className='dropitem'
                    name='vote'
                    style={{ ...dropItemStyle }}
                  >
                    <FaAngleRight /> Vote
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='settings' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/settings'>
              <div
                className='userleftitem'
                name='settings'
                ref={settingsLabel}
                style={{ ...itemStyle }}
              >
                <RiSettings2Line
                  className='sideicons'
                  name='settings'
                  style={{
                    fontSize: '1.5rem',
                  }}
                />{' '}
                <span style={{ marginLeft: '25px' }}>Settings</span>
              </div>
            </Link>
          </li>
          <li name='mode'>
            <div
              className='userleftitem'
              name='settings'
              style={{
                color: darkMode ? 'white' : 'black',
                fontFamily: 'MonteserratBold',
              }}
              onClick={() => {
                setDarkMode(!darkMode)
              }}
            >
              {darkMode ? (
                <FaSun style={{ fontSize: '1.5rem' }} />
              ) : (
                <FaMoon style={{ fontSize: '1.5rem' }} />
              )}{' '}
              <span style={{ marginLeft: '25px', fontWeight: 'bold' }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </li>
          <div
            className='userleftitem'
            style={{
              display: 'inline-flex',
              fontSize: '.9rem',
              fontFamily: 'MonteserratBold',
              width: 'fit-content',
              marginLeft: '10px',
              marginTop: '50px',
              marginBottom: '20px',
              padding: '10px',
              color: darkMode ? 'white' : 'black',
              border: 'solid rgba(10, 105, 214) 2px',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            <FiLogOut
              style={{
                fontSize: '1.2rem',
                marginRight: '20px',
                cursor: 'pointer',
              }}
            />
            <label style={{ cursor: 'pointer' }}>{logoutStatus}</label>
          </div>
        </motion.ul>
        <div
          className={'closenav'}
          onClick={() => {
            setShow(false)
          }}
        ></div>
      </motion.div>
    </>
  )
}

export default SideNavigator
