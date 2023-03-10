import React, { useEffect, useState, useRef, useContext } from 'react'

import ContextProvider from '../ContextProvider'

const Acts = ({ title, content, clickVar, id }) => {
  const { darkMode } = useContext(ContextProvider)
  return (
    <div
      key={id}
      className='acts'
      style={{
        backgroundColor: darkMode ? 'rgba(250,250,250,0.1)' : 'white',
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
            fontFamily: 'SourceCodeProLight',
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
          fontFamily: 'SourceCodeProLight',
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
  const [count, setCount] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [lastTouch, setLastTouch] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('Right')
  const minSwipeDistance = 80
  // const handleWheel = (event) => {
  //   event.preentDefault()
  //   console.log('delta value:', event.deltaX)
  //   setScrollLeft((scrollLeft) => {
  //     return scrollLeft + event.deltaX
  //   })
  // }

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
  useEffect(() => {
    if (eventsRef.current) {
      const maxScrollLength = 290 * (eventsList.length - 1)
      if (scrollLeft > maxScrollLength) {
        setScrollLeft(maxScrollLength)
      } else if (scrollLeft < 0) {
        setScrollLeft(0)
      } else {
        if (scrollDirection === 'Left') {
          scrollToRight(scrollLeft, 10)
        } else {
          scrollToLeft(scrollLeft, 10)
        }
        // eventsRef.current.scrollLeft = scrollLeft
      }
    }
  }, [scrollLeft])
  const onTouchStart = (e) => {
    setTouchEnd(null)
    const firstTouch = e.targetTouches[0].clientX
    setTouchStart(firstTouch)
  }
  const onTouchMove = (e) => {
    if (count === 0) {
      var currentTouch = 0
    } else {
      var currentTouch = e.targetTouches[0].clientX
    }
    var distance = currentTouch - touchStart
    if (eventsRef.current) {
      eventsRef.current.scrollLeft -= currentTouch - lastTouch
    }
    setCount(count + 1)
    setLastTouch(e.targetTouches[0].clientX)
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      setLastTouch(0)
      setCount(0)
      var currentPos = eventsRef.current.scrollLeft
      var newCurrentPos = 290 * Math.round(currentPos / 290)
      if (distance < 0) {
        if (distance < -minSwipeDistance) {
          setScrollDirection('Right')
          setScrollLeft(scrollLeft - 290)
        } else {
          scrollToRight(newCurrentPos, 10)
          // eventsRef.current.scrollLeft = newCurrentPos
        }
      } else {
        if (distance > minSwipeDistance) {
          setScrollDirection('Left')
          setScrollLeft(scrollLeft + 290)
        } else {
          scrollToLeft(newCurrentPos, 10)
          // eventsRef.current.scrollLeft = newCurrentPos
        }
      }
    }
  }
  const scrollToRight = (target, interval) => {
    const intervalId = setInterval(() => {
      if (
        eventsRef.current.scrollLeft >= target ||
        eventsRef.current.scrollLeft >= 558
      ) {
        clearInterval(intervalId)
      } else {
        eventsRef.current.scrollLeft += 10
      }
    }, interval)
  }
  const scrollToLeft = (target, interval) => {
    const intervalId = setInterval(() => {
      if (eventsRef.current.scrollLeft <= target) {
        clearInterval(intervalId)
      } else {
        eventsRef.current.scrollLeft -= 10
      }
    }, interval)
  }
  return (
    <>
      <div
        ref={eventRef}
        style={{
          color: darkMode ? 'white' : 'black',
          padding: '50px auto',
          backgroundColor: darkMode ? 'rgba(5,5,25,1)' : 'rgba(240,240,255)',
          display: 'block',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'MonteserratBold',
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
            backgroundColor: darkMode ? 'rgba(5,5,25,1)' : 'rgba(240,240,255)',
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
