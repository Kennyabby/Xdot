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

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
} from 'react-router-dom'
import ContextProvider from './ContextProvider'

const App = () => {
  const SERVER = 'https://encarto-server.vercel.app'
  // const SERVER = 'http://localhost:3001'
  // const { id } = useParams()
  const history = useHistory()
  const [intervalId, setIntervalId] = useState(null)
  const [bars, setBars] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [openAIKey, setOpenAIKey] = useState('')
  const [size, setSize] = useState(window.innerWidth)
  const getTopBar = (bars) => {
    setBars(bars)
  }
  const [showNavbar, setShowNavbar] = useState(false)
  const [showNavOpt, setShowNavOpt] = useState(false)
  const [userId, setUserId] = useState(null)
  const [isShow, setIsShow] = useState(true)
  const checkSize = () => {
    setSize(window.innerWidth)
  }
  const fetchUserAPI = async ({ data, req }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      const resp = await fetch(SERVER + '/' + req, opts)
      const response = await resp.json()
      if (response.user === null) {
        window.localStorage.removeItem('sess-recg-id')
        window.localStorage.removeItem('idt-curr-usr')
        window.localStorage.removeItem('user-id')
        window.location.reload()
      }
    } catch (TypeError) {}
  }
  useEffect(async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const resp = await fetch(SERVER + '/getOpenAI', opts)
      const response = await resp.json()
      setOpenAIKey(response.key)
    } catch (TypeError) {}
  }, [])
  useEffect(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
    var intId = null
    intId = setInterval(() => {
      clearInterval(intervalId)
      const uid = window.localStorage.getItem('user-id')
      if (uid !== null) {
        fetchUserAPI({ data: { sessionId: uid }, req: 'getUserDetails' })
      }
    }, 5000)
    setIntervalId(intId)
  }, [])
  useEffect(() => {
    const mode = window.localStorage.getItem('preference-mode')
    if (mode !== null) {
      if (mode === 'dark') {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }
  }, [])
  useEffect(() => {
    if (darkMode) {
      window.localStorage.setItem('preference-mode', 'dark')
    } else {
      window.localStorage.setItem('preference-mode', 'light')
    }
  }, [darkMode])
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [size])

  return (
    <ContextProvider.Provider
      value={{
        darkMode,
        setDarkMode,
        server: SERVER,
        winSize: size,
        openAIKey,
      }}
    >
      <Router>
        {showNavbar && <Navbar getTopBar={getTopBar} />}
        {showNavOpt && (
          <NavOptbar
            getTopBar={getTopBar}
            isShow={isShow}
            setBackShow={(show) => {
              setIsShow(show)
            }}
            setShowNavOpt={(show) => {
              setShowNavOpt(() => {
                return show
              })
            }}
          />
        )}
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
              setIsShow={(show) => {
                setIsShow(show)
              }}
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
          <Route path={'/dashboard/settings/:id'}>
            <Napsboard
              rootView='settings'
              server={SERVER}
              userId={userId}
              winSize={size}
            />
          </Route>
          <Route path={'/dashboard/e-voting/:id'}>
            <Napsboard
              rootView='e-voting'
              server={SERVER}
              userId={userId}
              winSize={size}
            />
          </Route>
          <Route path={'/dashboard/tasks/:id'}>
            <Napsboard
              rootView='tasks'
              server={SERVER}
              userId={userId}
              winSize={size}
            />
          </Route>
          <Route path={'/dashboard/events/:id'}>
            <Napsboard
              rootView='events'
              server={SERVER}
              userId={userId}
              winSize={size}
            />
          </Route>
          <Route
            path={'/dashboard/:' + 'id'}
            children={
              <Napsboard server={SERVER} userId={userId} winSize={size} />
            }
          ></Route>
          <Route path={'/dashboard'}>
            <Napsboard server={SERVER} userId={userId} winSize={size} />
          </Route>
          <Route
            path='/signup/:id'
            children={
              <Signup
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
              />
            }
          ></Route>
          <Route path='/signup'>
            <Signup
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
                showNavOpt={(show) => {
                  setShowNavOpt(() => {
                    return show
                  })
                }}
                bars={bars}
                setIsShow={(show) => {
                  setIsShow(show)
                }}
              />
            }
          ></Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </ContextProvider.Provider>
  )
}

export default App
