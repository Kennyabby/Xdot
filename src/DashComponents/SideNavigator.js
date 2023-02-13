import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [eventsToggleStatus, setEventsToggleStatus] = useState(downarrow)
  const [tasksToggleStatus, setTasksToggleStatus] = useState(downarrow)
  const [eVotingToggleStatus, setEVotingToggleStatus] = useState(downarrow)
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

  const { darkMode } = useContext(ContextProvider)

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
        setEventsToggleStatus(downarrow)
        getEventsLabelRefs([])
        setShowEventDrop(false)
      } else {
        setEventsToggleStatus(uparrow)
        getEventsLabelRefs(eventsLabelRefs)
        setShowEventDrop(true)
      }
    } else if (name === 'taskdrop') {
      if (showTaskDrop) {
        setTasksToggleStatus(downarrow)
        getTasksLabelRefs([])
        setShowTaskDrop(false)
      } else {
        setTasksToggleStatus(uparrow)
        getTasksLabelRefs(tasksLabelRefs)
        setShowTaskDrop(true)
      }
    } else if (name === 'e-votingdrop') {
      if (showEvotingDrop) {
        setEVotingToggleStatus(downarrow)
        getEvotingLabelRefs([])
        setShowEvotingDrop(false)
      } else {
        setEVotingToggleStatus(uparrow)
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
              ? 'rgba(5,5,30,0.9)'
              : 'rgba(255,255,255,0.9)',
          }}
        >
          <Link to='/dashboard' className='userlefttop'>
            <label style={{ cursor: 'pointer' }}>{'< SECTIONS />'}</label>
          </Link>
          <li name='profile' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/profile'>
              <div className='userleftitem' name='profile' ref={profileLabel}>
                <img
                  className='sideicons'
                  name='profile'
                  src={profile}
                  height='20px'
                  width='20px'
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
              >
                <img
                  className='sideicons'
                  name='events'
                  src={notifications}
                  height='20px'
                  width='20px'
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
              <div className='userleftitem' name='events' ref={eventsLabel}>
                <img
                  className='sideicons'
                  name='events'
                  src={events}
                  height='20px'
                  width='20px'
                />{' '}
                <span style={{ marginLeft: '25px' }}>Events </span>
              </div>
            </Link>
            <img
              src={eventsToggleStatus}
              alt='events donwdrop toggle'
              onClick={handleDrop}
              name='eventdrop'
              className='taskdrop'
              height='7px'
            />
            {showEventDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/grandquiz'
                >
                  <li ref={grandquizRef} className='dropitem' name='grandquiz'>
                    {'> Grand Quiz'}
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
                  >
                    {' '}
                    {'>'} Daily Puzzles{' '}
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
                  >
                    {' '}
                    {'>'} Study Table{' '}
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='tasks' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/tasks'>
              <div className='userleftitem' name='tasks' ref={tasksLabel}>
                <img
                  className='sideicons'
                  name='tasks'
                  src={tasks}
                  height='20px'
                  width='20px'
                />{' '}
                <span style={{ marginLeft: '25px' }}>Tasks</span>
              </div>
            </Link>
            <img
              src={tasksToggleStatus}
              alt='tasks downdrop toggle'
              onClick={handleDrop}
              name='taskdrop'
              className='taskdrop'
              height='7px'
            />
            {showTaskDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/cgpa'
                >
                  <li ref={cgpacalcRef} className='dropitem' name='cgpa'>
                    {' '}
                    {'>'} CGPA CALC{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/todolist'
                >
                  <li ref={todolistRef} className='dropitem' name='todolist'>
                    {' '}
                    {'>'} To Do List{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/quizapp'
                >
                  <li ref={quizappRef} className='dropitem' name='quizapp'>
                    {' '}
                    {'>'} Quiz App{' '}
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='e-voting' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/e-voting'>
              <div className='userleftitem' name='e-voting' ref={eVotingLabel}>
                <img
                  className='sideicons'
                  name='e-voting'
                  src={events}
                  height='20px'
                  width='20px'
                />{' '}
                <span style={{ marginLeft: '25px' }}>Evoting</span>
              </div>
            </Link>
            <img
              alt='e-voting donwdrop toggle'
              onClick={handleDrop}
              src={eVotingToggleStatus}
              name='e-votingdrop'
              className='taskdrop'
              height='7px'
            />
            {showEvotingDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/apply'
                >
                  <li ref={applyRef} className='dropitem' name='apply'>
                    {' '}
                    {'>'} Apply{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/vote'
                >
                  <li ref={voteRef} className='dropitem' name='vote'>
                    {' '}
                    {'>'} Vote{' '}
                  </li>
                </Link>
              </ul>
            )}
          </li>
          <li name='settings' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/settings'>
              <div className='userleftitem' name='settings' ref={settingsLabel}>
                <img
                  className='sideicons'
                  name='settings'
                  src={settings}
                  height='20px'
                  width='20px'
                />{' '}
                <span style={{ marginLeft: '25px' }}>Settings</span>
              </div>
            </Link>
          </li>
          <div
            className='userleftitem'
            style={{
              display: 'block',
              fontSize: '.8rem',
              width: 'fit-content',
              marginLeft: '10px',
              marginTop: '50px',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: 'black',
              border: 'solid rgba(49,49,50,1) 2px',
              boxShadow: '0px 0px 7px black',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            <label style={{ cursor: 'pointer' }}>
              <label
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  marginRight: '20px',
                  cursor: 'pointer',
                  color: 'orange',
                }}
              >
                {' [->'}
              </label>
              {logoutStatus}
            </label>
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
