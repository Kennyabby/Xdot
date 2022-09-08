import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

  const cgpacalcRef = useRef(null)
  const todolistRef = useRef(null)
  const quizappRef = useRef(null)

  const grandquizRef = useRef(null)
  const dailypuzzleRef = useRef(null)
  const studytableRef = useRef(null)

  const applyRef = useRef(null)
  const voteRef = useRef(null)

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
    getTasksLabelRefs(tasksLabelRefs)
    getEventsLabelRefs(eventsLabelRefs)
    getEvotingLabelRefs(eVotingLabelRefs)
  }, [])

  const logout = () => {
    logOut()
  }

  const handleDrop = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'eventdrop') {
      if (showEventDrop) {
        setEventsToggleStatus(downarrow)
        setShowEventDrop(false)
      } else {
        setEventsToggleStatus(uparrow)
        setShowEventDrop(true)
      }
    } else if (name === 'taskdrop') {
      if (showTaskDrop) {
        setTasksToggleStatus(downarrow)
        setShowTaskDrop(false)
      } else {
        setTasksToggleStatus(uparrow)
        setShowTaskDrop(true)
      }
    } else if (name === 'e-votingdrop') {
      if (showEvotingDrop) {
        setEVotingToggleStatus(downarrow)
        setShowEvotingDrop(false)
      } else {
        setEVotingToggleStatus(uparrow)
        setShowEvotingDrop(true)
      }
    }
  }

  return (
    <>
      <motion.div
        className='userbar'
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '-100vw', transition: { duration: 0.7, ease: 'easeIn' } }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
          opacity: { duration: 0.7 },
        }}
      >
        <ul className='usersidebar'>
          <label className='userlefttop'>NAPSITE</label>
          <li name='profile' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/profile'>
              <div className='userleftitem' name='profile' ref={profileLabel}>
                <img
                  className='sideicons'
                  name='profile'
                  src={profile}
                  height='20px'
                />{' '}
                <span style={{ marginLeft: '15px' }}>Profile</span>
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
                />{' '}
                <span style={{ marginLeft: '15px' }}>Updates</span>
              </div>
            </Link>
          </li>
          <li name='events' className='userleft'>
            <Link style={{ textDecoration: 'none' }} to='/dashboard/events'>
              <div className='userleftitem' name='events' ref={eventsLabel}>
                <img
                  className='sideicons'
                  name='events'
                  src={events}
                  height='20px'
                />{' '}
                <span style={{ marginLeft: '15px' }}>Events </span>
                <img
                  src={eventsToggleStatus}
                  alt='events donwdrop toggle'
                  onClick={handleDrop}
                  name='eventdrop'
                  className='taskdrop'
                  height='7px'
                />
              </div>
            </Link>
            {showEventDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/grandquiz'
                >
                  <li ref={grandquizRef} className='dropitem'>
                    {' '}
                    {'>'} Grand Quiz{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/dailypuzzles'
                >
                  <li ref={dailypuzzleRef} className='dropitem'>
                    {' '}
                    {'>'} Daily Puzzles{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/events/studytable'
                >
                  <li ref={studytableRef} className='dropitem'>
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
                />{' '}
                <span style={{ marginLeft: '15px' }}>Tasks</span>
                <img
                  src={tasksToggleStatus}
                  alt='tasks downdrop toggle'
                  onClick={handleDrop}
                  name='taskdrop'
                  className='taskdrop'
                  height='7px'
                />
              </div>
            </Link>
            {showTaskDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/cgpa'
                >
                  <li ref={cgpacalcRef} className='dropitem'>
                    {' '}
                    {'>'} CGPA CALC{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/todolist'
                >
                  <li ref={todolistRef} className='dropitem'>
                    {' '}
                    {'>'} To Do List{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/tasks/quizapp'
                >
                  <li ref={quizappRef} className='dropitem'>
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
                />{' '}
                <span style={{ marginLeft: '10px' }}>Evoting</span>
                <img
                  src={eVotingToggleStatus}
                  alt='e-voting donwdrop toggle'
                  onClick={handleDrop}
                  name='e-votingdrop'
                  className='taskdrop'
                  height='7px'
                />
              </div>
            </Link>
            {showEvotingDrop && (
              <ul className='drop'>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/apply'
                >
                  <li ref={applyRef} className='dropitem'>
                    {' '}
                    {'>'} Apply{' '}
                  </li>
                </Link>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to='/dashboard/e-voting/vote'
                >
                  <li ref={voteRef} className='dropitem'>
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
                />{' '}
                <span style={{ marginLeft: '15px' }}>Settings</span>
              </div>
            </Link>
          </li>
          <li>
            <label onClick={logout} className='userleftbottom'>
              {'Log out'}
              <label style={{ fontFamily: 'monospace', fontSize: '1.3rem' }}>
                {' ->]'}
              </label>
            </label>
          </li>
        </ul>
      </motion.div>
    </>
  )
}

export default SideNavigator
