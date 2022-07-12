import React, { useEffect, useRef } from 'react'

const Curr = () => {
  return <div className='curr'></div>
}
const Current = ({ setRef }) => {
  const event = useRef(null)
  useEffect(() => {
    setRef(event)
  }, [])
  return (
    <>
      <div className='current' ref={event}>
        <Curr />
        <Curr />
      </div>
    </>
  )
}

export default Current
