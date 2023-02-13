import React, { useEffect, useState, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const Acts = ({ title, content, clickVar, id }) => {
  const { darkMode } = useContext(ContextProvider)
  return (
    <div
      key={id}
      className='acts'
      style={{
        backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : 'black',
        boxShadow: darkMode
          ? '-7px -7px 15px rgba(0, 0, 0, 0.1), 7px 7px 15px rgba(0, 0, 0, 0.1)'
          : '-7px -7px 15px rgba(255, 255, 255, 0.1), 7px 7px 15px rgba(255, 255, 255, 0.1)',
      }}
    >
      <div>
        <h2
          style={{
            margin: '10px',
            fontWeight: 'bold',
            fontFamily: 'Calibri',
            borderBottom: 'solid rgba(49,49,50,1) 2px',
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          margin: '10px',
          marginTop: '30px',
          fontFamily: 'Calibri',
          border: 'solid rgba(49,49,50,1) 2px',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        {content}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '0px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <button
          style={{
            padding: '13px 18px',
            border: 'solid blue 2px',
            fontFamily: 'monospace',
            borderRadius: '25px',
            fontSize: '.9rem',
            backgroundColor: 'blue',
            color: 'white',
            outline: 'none',
            margin: 'auto',
            cursor: 'pointer',
          }}
        >
          {clickVar}
        </button>
      </div>
    </div>
  )
}
const Events = ({ eventRef }) => {
  const { darkMode } = useContext(ContextProvider)
  const eventsRef = useRef(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [lastTouch, setLastTouch] = useState(0)
  const minSwipeDistance = 100
  // const handleWheel = (event) => {
  //   event.preentDefault()
  //   console.log('delta value:', event.deltaX)
  //   setScrollLeft((scrollLeft) => {
  //     return scrollLeft + event.deltaX
  //   })
  // }

  useEffect(() => {
    eventsRef.current.scrollLeft = scrollLeft
  }, [scrollLeft])
  const eventsList = [
    {
      title: 'CGPA CALCULATOR',
      content: 'Monitor, Calculate and Store Your CGPA Here.',
      clickVar: 'Check It Out!',
      path: '',
    },
    {
      title: 'QUIZ APPLICATION',
      content: 'Create, Take, and Post Quiz Here.',
      clickVar: 'Check It Out!',
      path: '',
    },
    {
      title: 'TO DO LIST',
      content: 'Store, Order, and Strategize Your Tasks, Goals, and Aim Here.',
      clickVar: 'List That Aim Here!',
      path: '',
    },
    // {
    //   title: 'PAY DUES',
    //   content: 'Pay Your Departmental Dues Here!',
    //   clickVar: 'Pay For It Here!',
    //   path: '',
    // },
  ]
  const onTouchStart = (e) => {
    setTouchEnd(null)
    const firstTouch = e.targetTouches[0].clientX
    setTouchStart(firstTouch)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientX
    var distance = currentTouch - touchStart
    setScrollLeft((scrollLeft) => {
      console.log('last touch:', lastTouch, 'scroll left:', scrollLeft)
      if (scrollLeft < 0) {
        return 0
      } else if (scrollLeft > lastTouch) {
        return lastTouch + 290
      } else if (scrollLeft < lastTouch) {
        return lastTouch - 290
      } else if (scrollLeft > 580) {
        return 580
      }
      return scrollLeft - distance
    })
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      console.log('scroll left at last touch is:', scrollLeft)
      setLastTouch(scrollLeft)
      const isRightSwipe = distance < -minSwipeDistance
      if (isRightSwipe && touchStart < 50) {
      }
    }
  }
  return (
    <>
      <div
        ref={eventRef}
        style={{
          color: darkMode ? 'white' : 'black',
          padding: '50px auto',
          backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
          display: 'block',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'Calibri',
            padding: '20px',
            paddingBottom: '20px',
          }}
        >
          Check Out Offers Available To You
        </div>
        <div
          ref={eventsRef}
          className='events'
          style={{
            backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
            color: darkMode ? 'white' : 'black',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          <div className='scroll-events'>
            {eventsList.map((event, id) => {
              return (
                <div key={id}>
                  <Acts
                    id={id}
                    title={event.title}
                    content={event.content}
                    clickVar={event.clickVar}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Events
