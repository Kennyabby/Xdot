import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
  getLabelRefs,
  logOut,
  setView,
}) => {
  const history = useHistory()
  const profileLabel = useRef(null)
  const notificationsLabel = useRef(null)
  const eventsLabel = useRef(null)
  const tasksLabel = useRef(null)
  const settingsLabel = useRef(null)
  const [showEventDrop, setShowEventDrop] = useState(false)
  const [showTaskDrop, setShowTaskDrop] = useState(false)
  const [eventsToggleStatus, setEventsToggleStatus] = useState(downarrow)
  const [tasksToggleStatus, setTasksToggleStatus] = useState(downarrow)

  const cgpacalcRef = useRef(null)
  const todolistRef = useRef(null)
  const quizappRef = useRef(null)

  const grandquizRef = useRef(null)
  const dailypuzzleRef = useRef(null)
  const studytableRef = useRef(null)
  const e_votingRef = useRef(null)

  const tasksLabelRefs = [cgpacalcRef, todolistRef, quizappRef]
  const eventsLabelRefs = [grandquizRef, dailypuzzleRef, studytableRef, e_votingRef]

  const labelRefs = [
    profileLabel,
    notificationsLabel,
    eventsLabel,
    tasksLabel,
    settingsLabel,
  ]
  useEffect(() => {
    getLabelRefs(labelRefs)
    getTasksLabelRefs(tasksLabelRefs)
    getEventsLabelRefs(eventsLabelRefs)
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
    }
  }

  return (
    <>
      <div className='userbar'>
        <ul className='usersidebar'>
          <label className='userlefttop'>NAPSITE</label>
          <Link style={{ textDecoration: 'none' }} to='/dashboard/profile'>
            <li name='profile' className='userleft'>
              <label className='userleftitem' name='profile' ref={profileLabel}>
                <img
                  className='sideicons'
                  name='profile'
                  src={profile}
                  height='20px'
                />{' '}
                Profile
              </label>
            </li>
          </Link>
          <Link
            style={{ textDecoration: 'none' }}
            to='/dashboard/notifications'
          >
            <li name='notifications' className='userleft'>
              <label
                className='userleftitem'
                // style={{ marginLeft: '25px' }}
                name='notifications'
                ref={notificationsLabel}
              >
                <img
                  className='sideicons'
                  name='events'
                  src={notifications}
                  height='20px'
                />{' '}
                Updates
              </label>
            </li>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/dashboard/events'>
            <li name='events' className='userleft'>
              <label className='userleftitem' name='events' ref={eventsLabel}>
                <img
                  className='sideicons'
                  name='events'
                  src={events}
                  height='20px'
                />{' '}
                <img
                  src={eventsToggleStatus}
                  alt='events donwdrop toggle'
                  onClick={handleDrop}
                  name='eventdrop'
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    border: 'solid rgba(0,0,0,0) 2px',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0)',
                    outline: 'none',
                  }}
                  height='7px'
                />
                Events{' '}
              </label>
            </li>
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
              <Link
                style={{ color: 'white', textDecoration: 'none' }}
                to='/dashboard/events/e-voting'
              >
                <li ref={e_votingRef} className='dropitem'>
                  {' '}
                  {'>'} E-Voting{' '}
                </li>
              </Link>
            </ul>
          )}
          <Link style={{ textDecoration: 'none' }} to='/dashboard/tasks'>
            <li name='tasks' className='userleft'>
              <label className='userleftitem' name='tasks' ref={tasksLabel}>
                <img
                  className='sideicons'
                  name='tasks'
                  src={tasks}
                  height='20px'
                />{' '}
                <img
                  src={tasksToggleStatus}
                  alt='tasks downdrop toggle'
                  onClick={handleDrop}
                  name='taskdrop'
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    border: 'solid rgba(0,0,0,0) 2px',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0)',
                    outline: 'none',
                  }}
                  height='7px'
                />
                Tasks
              </label>
            </li>
          </Link>
          {showTaskDrop && (
            <ul className='drop'>
              <Link
                style={{ color: 'white', textDecoration: 'none' }}
                to='/dashboard/tasks/cgpa'
              >
                <li ref={cgpacalcRef} className='dropitem'>
                  {' '}
                  {'>'} CGPA CALC
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
          <Link style={{ textDecoration: 'none' }} to='/dashboard/settings'>
            <li name='settings' className='userleft'>
              <label
                className='userleftitem'
                name='settings'
                ref={settingsLabel}
              >
                <img
                  className='sideicons'
                  name='settings'
                  src={settings}
                  height='20px'
                />{' '}
                Settings
              </label>
            </li>
          </Link>
          <li>
            <label onClick={logout} className='userleftbottom'>
              Log out
            </label>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideNavigator
