import { React, useState, useEffect, useRef } from 'react'
import '../../EVoting.css'

import FirstChild from './FirstChild'
import SecondChild from './SecondChild'
import ThirdChild from './ThirdChild'

const Form = ({ server, viewPage, user, data }) => {
  const firstNav = useRef(null)
  const secondNav = useRef(null)
  const thirdNav = useRef(null)
  const [isShowFirst, setIsShowFirst] = useState(true)
  const [isShowSecond, setIsShowSecond] = useState(false)
  const [isShowThird, setIsShowThird] = useState(false)
  const [size, setSize] = useState(window.innerWidth)
  const [buttonStatus, setButtonStatus] = useState('Next >>')
  const backRef = useRef(null)
  const navRef = useRef(null)
  const firstChildRef = useRef(null)
  const secondChildRef = useRef(null)
  const thirdChildRef = useRef(null)
  const navList = [firstNav, secondNav, thirdNav]
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [firstXOffset, setFirstXOffset] = useState(0)
  const [secondXOffset, setSecondXOffset] = useState(size)
  const [thirdXOffset, setThirdXOffset] = useState(2 * size)
  const [firstOffset, setFirstOffset] = useState(0)
  const [secondOffset, setSecondOffset] = useState(size)
  const [thirdOffset, setThirdOffset] = useState(2 * size)
  const [firstTop, setFirstTop] = useState(0)
  const [secondTop, setSecondTop] = useState(0)
  const [thirdTop, setThirdTop] = useState(0)
  const [fTop, setFTop] = useState(0)
  const [sTop, setSTop] = useState(0)
  const [tTop, setTTop] = useState(0)
  const [firstPosition, setFirstPosition] = useState('absolute')
  const [secondPosition, setSecondPosition] = useState('fixed')
  const [thirdPosition, setThirdPosition] = useState('fixed')
  const minSwipeDistance = 40
  const [fields, setFields] = useState({})
  const highlightNav = (currentNav) => {
    navList.forEach((nav) => {
      if (nav === currentNav) {
        nav.current.style.backgroundColor = 'green'
      } else {
        nav.current.style.backgroundColor = 'lightgreen'
      }
    })
  }
  useEffect(() => {
    // console.log(fields)
  }, [fields])
  const checkPageYOffset = () => {
    const pageYOffset = window.pageYOffset
    if (pageYOffset > 310) {
      backRef.current.style.display = 'none'
      navRef.current.style.position = 'fixed'
      navRef.current.style.zIndex = '1'
      navRef.current.style.top = '0px'
    } else {
      backRef.current.style.display = 'block'
      navRef.current.style.position = 'relative'
      navRef.current.style.zIndex = '0'
    }
    // const firstRef = firstChildRef.current.getBoundingClientRect()
    // const secondRef = secondChildRef.current.getBoundingClientRect()
    // const thirdRef = thirdChildRef.current.getBoundingClientRect()
    // if (isShowFirst) {
    //   setFTop(firstRef.top)
    // }
    // if (isShowSecond) {
    //   setSTop(secondRef.top)
    // }
    // if (isShowThird) {
    //   setTTop(thirdRef.top)
    // }
  }
  const checkSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('scroll', checkPageYOffset)
    return () => {
      window.removeEventListener('scroll', checkPageYOffset)
    }
  }, [])
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [size])
  useEffect(() => {
    if (isShowFirst) {
      setButtonStatus('Next >>')
      highlightNav(firstNav)
      setFirstXOffset(0)
      setSecondXOffset(size)
      setThirdXOffset(2 * size)
      setFirstOffset(0)
      setSecondOffset(size)
      setThirdOffset(2 * size)
      setFirstPosition('absolute')
      setSecondPosition('fixed')
      setThirdPosition('fixed')
      setFirstTop(0)
      setIsShowSecond(false)
      setIsShowThird(false)
    }
  }, [isShowFirst])
  useEffect(() => {
    if (isShowSecond) {
      setButtonStatus('Finish >>')
      highlightNav(secondNav)
      setFirstXOffset(-size)
      setSecondXOffset(0)
      setThirdXOffset(size)
      setFirstOffset(-size)
      setSecondOffset(0)
      setThirdOffset(size)
      setFirstPosition('fixed')
      setSecondPosition('absolute')
      setThirdPosition('fixed')
      setSecondTop(0)
      setIsShowFirst(false)
      setIsShowThird(false)
    }
  }, [isShowSecond])
  useEffect(() => {
    if (isShowThird) {
      setButtonStatus('Submit >>')
      highlightNav(thirdNav)
      setFirstXOffset(-2 * size)
      setSecondXOffset(-size)
      setThirdXOffset(0)
      setFirstOffset(-2 * size)
      setSecondOffset(-size)
      setThirdOffset(0)
      setFirstPosition('fixed')
      setSecondPosition('fixed')
      setThirdPosition('absolute')
      setThirdTop(0)
      setIsShowSecond(false)
      setIsShowFirst(false)
    }
  }, [isShowThird])
  const handleButtonEvent = () => {
    if (isShowFirst) {
      setIsShowSecond(true)
    }
    if (isShowSecond) {
      setIsShowThird(true)
    }
    if (isShowThird) {
    }
  }
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => {
    var currentTouch = e.targetTouches[0].clientX
    var distance = currentTouch - touchStart
    const firstRef = firstChildRef.current.getBoundingClientRect()
    const secondRef = secondChildRef.current.getBoundingClientRect()
    const thirdRef = thirdChildRef.current.getBoundingClientRect()
    if (isShowFirst) {
      setFTop(firstRef.top)
    }
    if (isShowSecond) {
      setSTop(secondRef.top)
    }
    if (isShowThird) {
      setTTop(thirdRef.top)
    }
    if (isShowFirst) {
      setSecondPosition('fixed')
      setThirdPosition('fixed')
      setFirstPosition('absolute')
      setSecondTop(fTop)
      setThirdTop(fTop)
    }
    if (isShowSecond) {
      setFirstPosition('fixed')
      setThirdPosition('fixed')
      setSecondPosition('absolute')
      setFirstTop(sTop)
      setThirdTop(sTop)
    }
    if (isShowThird) {
      setFirstPosition('fixed')
      setSecondPosition('fixed')
      setThirdPosition('absolute')
      setFirstTop(tTop)
      setSecondTop(tTop)
    }

    if (isShowFirst && distance > 0) {
    } else {
      setFirstXOffset(firstOffset + distance)
    }
    setSecondXOffset(secondOffset + distance)
    if (isShowThird && distance < 0) {
    } else {
      setThirdXOffset(thirdOffset + distance)
    }
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return
    } else {
      const distance = touchStart - touchEnd
      if (Math.abs(distance) > minSwipeDistance) {
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
          if (isShowFirst) {
            setIsShowSecond(true)
          }
          if (isShowSecond) {
            setIsShowThird(true)
          }
          if (isShowThird) {
          }
        } else if (isRightSwipe) {
          if (isShowFirst) {
          }
          if (isShowSecond) {
            setIsShowFirst(true)
          }
          if (isShowThird) {
            setIsShowSecond(true)
          }
        }
      } else {
        if (isShowFirst) {
          setFirstXOffset(0)
          setSecondXOffset(size)
          setThirdXOffset(2 * size)
          setFirstOffset(0)
          setSecondOffset(size)
          setThirdOffset(2 * size)
          setFirstPosition('absolute')
          setSecondPosition('fixed')
          setThirdPosition('fixed')
          setFirstTop(0)
        }
        if (isShowSecond) {
          setFirstXOffset(-size)
          setSecondXOffset(0)
          setThirdXOffset(size)
          setFirstOffset(-size)
          setSecondOffset(0)
          setThirdOffset(size)
          setFirstPosition('fixed')
          setSecondPosition('absolute')
          setThirdPosition('fixed')
          setSecondTop(0)
        }
        if (isShowThird) {
          setFirstXOffset(2 * -size)
          setSecondXOffset(-size)
          setThirdXOffset(0)
          setFirstOffset(2 * -size)
          setSecondOffset(-size)
          setThirdOffset(0)
          setFirstPosition('fixed')
          setSecondPosition('fixed')
          setThirdPosition('absolute')
          setThirdTop(0)
        }
      }
    }
  }
  return (
    <>
      <div style={{}}>
        <div
          ref={backRef}
          className='bpd'
          style={{ backgroundColor: 'white' }}
          onClick={() => {
            viewPage()
          }}
        >
          {'<< View Office Duties'}
        </div>
        <div>
          <div
            style={{
              paddingTop: '70px',

              backgroundColor: 'white',
            }}
          >
            <div
              style={{
                padding: '10px 15px',
                margin: 'auto',
                marginTop: '20px',
                fontFamily: 'fantasy',
                width: 'fit-content',
                fontSize: '1.3rem',
                borderRadius: '10px',
                boxShadow: '0px 0px 9px',
                letterSpacing: '.2rem',
              }}
            >
              <label>{data}</label>
            </div>
            <div
              style={{
                borderRadius: '50%',
                height: '100px',
                width: '100px',
                margin: 'auto',
                marginTop: '30px',
                boxShadow: '0px 0px 7px black',
              }}
            ></div>
            <button
              style={{
                width: 'fit-content',
                margin: '10px auto',
                padding: '5px 10px',
                border: 'solid green 1px',
                borderRadius: '10px',
                fontSize: '.8rem',
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              Upload Passport
            </button>
            <div
              ref={navRef}
              style={{
                width: '100%',
                height: '2px',
                margin: '40px auto',
                position: 'relative',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                ref={firstNav}
                className='formnav'
                style={{
                  left: '50px',
                }}
                onClick={() => {
                  setIsShowFirst(true)
                }}
              >
                1
              </div>
              <div
                ref={secondNav}
                className='formnav'
                style={{
                  left: '45%',
                }}
                onClick={() => {
                  setIsShowSecond(true)
                }}
              >
                2
              </div>
              <div
                ref={thirdNav}
                className='formnav'
                style={{
                  right: '50px',
                }}
                onClick={() => {
                  setIsShowThird(true)
                }}
              >
                3
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <FirstChild
                firstChildRef={firstChildRef}
                setFields={(fields1) => {
                  setFields(() => {
                    return { ...fields, ...fields1 }
                  })
                }}
                size={size}
                fields={fields}
                buttonStatus={buttonStatus}
                left={firstXOffset}
                top={firstTop}
                position={firstPosition}
                handleButtonEvent={() => {
                  handleButtonEvent()
                }}
              />
              <SecondChild
                secondChildRef={secondChildRef}
                setFields={(fields2) => {
                  setFields(() => {
                    return { ...fields, ...fields2 }
                  })
                }}
                size={size}
                fields={fields}
                buttonStatus={buttonStatus}
                left={secondXOffset}
                top={secondTop}
                position={secondPosition}
                handleButtonEvent={() => {
                  handleButtonEvent()
                }}
              />
              <ThirdChild
                thirdChildRef={thirdChildRef}
                setFields={(fields3) => {
                  setFields(() => {
                    return { ...fields, ...fields3 }
                  })
                }}
                size={size}
                fields={fields}
                buttonStatus={buttonStatus}
                left={thirdXOffset}
                top={thirdTop}
                position={thirdPosition}
                handleButtonEvent={() => {
                  handleButtonEvent()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form
