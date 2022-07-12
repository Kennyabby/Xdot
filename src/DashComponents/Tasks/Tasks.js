import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Tasks = ({ homerf, chatrf, notificationsrf }) => {
  useEffect(() => {
    if (homerf !== undefined && chatrf !== undefined) {
      homerf.current.style.borderBottom = 'solid blue 0px'
      chatrf.current.style.borderBottom = 'solid blue 0px'
    }
    if (notificationsrf.current !== null) {
      notificationsrf.current.style.borderBottom = 'solid blue 0px'
    }
  }, [homerf])
  const [view, setView] = useState('Tasks')
  const { id } = useParams()
  useEffect(() => {}, [id])

  return (
    <>
      <div style={{ color: 'black' }}>{view}</div>
    </>
  )
}

export default Tasks
