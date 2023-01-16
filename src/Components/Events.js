import React, { useEffect, useRef, useContext } from 'react'

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
            fontFamily: 'monospace',
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
          fontFamily: 'Courier New',
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
            fontFamily: 'Courier New',
            padding: '20px',
            paddingBottom: '20px',
          }}
        >
          Check Out Offers Available To You
        </div>
        <div
          className='events'
          style={{
            backgroundColor: darkMode ? 'rgba(10,10,10,1)' : 'whitesmoke',
            color: darkMode ? 'white' : 'black',
          }}
        >
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
    </>
  )
}

export default Events
