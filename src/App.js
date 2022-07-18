import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './Components/Home'
import Error from './Components/Error'
import Navbar from './Components/Navbar'
import NavOptbar from './Components/NavOptbar'
import Signup from './Components/Signup'
import Signin from './Signin/Signin'
import Help from './Components/Help'
import Napsboard from './DashComponents/Napsboard'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  const SERVER = 'https://napsuiserver.herokuapp.com'
  const [bars, setBars] = useState([])
  const [size, setSize] = useState(window.innerWidth)
  const getTopBar = (bars) => {
    setBars(bars)
  }
  const [showNavbar, setShowNavbar] = useState(false)
  const [showNavOpt, setShowNavOpt] = useState(false)
  const [userId, setUserId] = useState(null)
  const checkSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [size])

  return (
    <Router>
      {showNavbar && <Navbar getTopBar={getTopBar} />}
      {showNavOpt && <NavOptbar getTopBar={getTopBar} />}
      <Switch>
        <Route exact path='/'>
          <Home
            winSize={size}
            showNavbar={(show) => {
              setShowNavbar(() => {
                return show
              })
            }}
            showNavOpt={(show) => {
              setShowNavOpt(() => {
                return show
              })
            }}
            bars={bars}
          />
        </Route>
        <Route path='/signin'>
          <Signin
            server={SERVER}
            showNavbar={(show) => {
              setShowNavbar(() => {
                return show
              })
            }}
            showNavOpt={(show) => {
              setShowNavOpt(() => {
                return show
              })
            }}
            sendId={(id) => {
              setUserId(id)
            }}
          />
        </Route>
        <Route path='/help'>
          <Help
            winSize={size}
            showNavbar={(show) => {
              setShowNavbar(() => {
                return show
              })
            }}
            showNavOpt={(show) => {
              setShowNavOpt(() => {
                return show
              })
            }}
          />
        </Route>
        <Route path={'/dashboard/tasks/:id'}>
          <Napsboard rootView='tasks' server={SERVER} userId={userId} winSize={size} />
        </Route>
        <Route path={'/dashboard/events/:id'}>
          <Napsboard rootView='events' server={SERVER} userId={userId} winSize={size} />
        </Route>
        <Route
          path={'/dashboard/:' + 'id'}
          children={<Napsboard server={SERVER} userId={userId} winSize={size} />}
        ></Route>
        <Route path={'/dashboard'}>
          <Napsboard server={SERVER} userId={userId} winSize={size} />
        </Route>
        <Route path='/signup/:id' children={<Signup server={SERVER}/>}>
          <Signup
            server={SERVER}
            showNavbar={(show) => {
              setShowNavbar(() => {
                return show
              })
            }}
          />
        </Route>
        <Route
          path='/:id'
          children={
            <Home
              winSize={size}
              showNavbar={(show) => {
                setShowNavbar(() => {
                  return show
                })
              }}
              bars={bars}
            />
          }
        ></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
