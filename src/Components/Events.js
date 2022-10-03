import React, { useEffect, useRef } from 'react'

const Acts = () => {
  return <div className='acts'></div>
}
const Events = ({ setRef }) => {
  const event = useRef(null)
  useEffect(() => {
    setRef(event)
  }, [])
  return (
    <>
      <div className='events' ref={event}>
        <Acts />
        <Acts />
        <Acts />
        <Acts />
        <Acts />
        <Acts />
      </div>
    </>
  )
}

export default Events
