import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from './user.png'

import ConnectionModal from './ConnectionModal'
import ContextProvider from '../ContextProvider'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
}
const headerVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}
const FewSchoolInfo = ({ setSchoolConfirmed }) => {
  const { darkMode, server } = useContext(ContextProvider)
  const history = useHistory()
  const schoolCoverRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [addSchoolEmail, setAddSchoolEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    'Connection was lost, could not connect to the server. Kindly check if you are still connected to the internet.'
  )
  const [validatingStatus, setValidatingStatus] = useState(
    'Validating Details. Please Hold on...'
  )
  const [showValidatingStatus, setShowValidatingStatus] = useState(false)
  const [schoolInfo, setSchoolInfo] = useState({
    matricNo: '',
    schoolEmail: '',
    otherEmail: '',
    level: '',
  })
  const [validatingCode, setValidatingCode] = useState([
    { ref: useRef(null), code: '' },
    { ref: useRef(null), code: '' },
    { ref: useRef(null), code: '' },
    { ref: useRef(null), code: '' },
  ])
  const [validateCode, setValidateCode] = useState(false)
  const validatorRef = useRef(null)
  const matricNoRef = useRef(null)
  const schoolEmailRef = useRef(null)
  const otherEmailRef = useRef(null)
  const levelRef = useRef(null)
  const [infoRefList, setInfoRefList] = useState([
    matricNoRef,
    otherEmailRef,
    levelRef,
  ])
  var matricValidated = false
  var schoolEmailValidated = false
  var schoolEmailExist = false
  const [otherEmailValidated, setOtherEmailValidated] = useState(false)
  const [otherEmailExist, setOtherEmailExist] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [codeStatus, setCodeStatus] = useState('Send Code')
  useEffect(() => {
    if (addSchoolEmail) {
      setInfoRefList((infoRefList) => {
        return [...infoRefList, schoolEmailRef]
      })
    } else {
      setInfoRefList((infoRefList) => {
        return infoRefList.filter((info) => {
          return info !== schoolEmailRef
        })
      })
    }
  }, [addSchoolEmail])
  const matchSchoolEmail = (email) => {
    if (email.split('').includes('@')) {
      let origin = email.indexOf('@')

      if (
        email.slice(origin + 1) === 'stu.ui.edu.ng' &&
        String(Number(email.slice(origin - 3, origin))) !== 'NaN' &&
        String(Number(email.slice(0, origin))) === 'NaN'
      ) {
        return true
      }
    }
    return false
  }
  const matchEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const validateInputs = () => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    setShowValidatingStatus(false)
    infoRefList.forEach(async (infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          } else {
            infoRef.current.style.borderBottom = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            if (infoRef.current.name === 'matricNo') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                if (matricValidated) {
                  infoRef.current.style.borderBottom = 'solid red 1px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'This Matric Number Has Been Registered!'
                  count--
                }
              } else {
                count--
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Enter a Valid Matric Number'
              }
            }
            if (infoRef.current.name === 'schoolEmail') {
              if (matchSchoolEmail(infoRef.current.value)) {
                if (schoolEmailValidated) {
                  if (schoolEmailExist) {
                    infoRef.current.style.borderBottom = 'solid red 1px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'red'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'This Email Has Been Registered!'
                    count--
                  } else {
                    // count++;
                    // console.log("increased to:",count);
                  }
                } else {
                  count--
                  infoRef.current.style.borderBottom = 'solid red 1px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    '* Could Not Validate Email Address'
                }
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Email Is Not Valid!'
                count--
              }
            }
            if (infoRef.current.name === 'otherEmail') {
              if (matchEmail(infoRef.current.value)) {
                if (otherEmailValidated) {
                  if (otherEmailExist) {
                    infoRef.current.style.borderBottom = 'solid red 1px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'red'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'This Email Has Been Registered!'
                    count--
                  } else {
                    // count++;
                    // console.log("increased to:",count);
                  }
                } else {
                  count--
                  infoRef.current.style.borderBottom = 'solid red 1px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    '* Could Not Validate Email Address'
                  // window.location.reload()
                }
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Email Is Not Valid!'
                count--
              }
            }
            count++
            // console.log(count)
          }
        }
      }
    })

    if (infos.length === count && emailVerified) {
      setSchoolConfirmed(true)
      return true
    } else {
      setSchoolConfirmed(false)
      return false
    }
  }
  const validateInput = async ({ all, name }) => {
    var count = 0
    var infos = infoRefList.filter((infoRef) => {
      if (infoRef.current != null) {
        return infoRef.current.required
      }
    })
    infoRefList.forEach(async (infoRef) => {
      if (infoRef.current !== null) {
        if (infoRef.current.required) {
          if (infoRef.current.value === '') {
          } else {
            if (infoRef.current.name === 'matricNo') {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                if (all) {
                  try {
                    const opts = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ matricNo: infoRef.current.value }),
                    }
                    const resp = await fetch(server + '/isMatricPresent', opts)

                    const response = await resp.json()
                    const isPresent = response.isPresent
                    if (isPresent) {
                      matricValidated = true
                      infoRef.current.style.borderBottom = 'solid red 1px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'red'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'This Matric Number Has Been Registered!'
                      count--
                    } else {
                      matricValidated = false
                      // count++;
                      // console.log("increased to:",count);
                    }
                    setShowModal(false)
                  } catch (TypeError) {
                    // console.log(TypeError)
                    setShowModal(true)
                  }
                } else {
                  if (name === 'matricNo') {
                    try {
                      const opts = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          matricNo: infoRef.current.value,
                        }),
                      }
                      const resp = await fetch(
                        server + '/isMatricPresent',
                        opts
                      )

                      const response = await resp.json()
                      const isPresent = response.isPresent
                      if (isPresent) {
                        matricValidated = true
                        infoRef.current.style.borderBottom = 'solid red 1px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'red'
                        infoRef.current.parentElement.childNodes[1].innerHTML =
                          'This Matric Number Has Been Registered!'
                        count--
                      } else {
                        matricValidated = false
                        // count++;
                        // console.log("increased to:",count);
                      }
                      setShowModal(false)
                    } catch (TypeError) {
                      // console.log(TypeError)
                      setShowModal(true)
                    }
                  }
                }
              } else {
                count--
              }
            }
            if (infoRef.current.name === 'schoolEmail') {
              // infoRef.current.parentElement.childNodes[1].style.color = 'blue'
              if (matchSchoolEmail(infoRef.current.value)) {
                if (all) {
                  try {
                    const opts = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ email: infoRef.current.value }),
                    }
                    const resp = await fetch(server + '/validateMail', opts)
                    const response = await resp.json()
                    const validated1 = response.isValid

                    if (validated1) {
                      schoolEmailValidated = true
                      infoRef.current.style.borderBottom =
                        'solid lightgreen 1px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'lightgreen'
                      infoRef.current.parentElement.childNodes[1].innerHTML = `* Email Validated!`
                      try {
                        const opts = {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            schoolEmail: infoRef.current.value,
                          }),
                        }
                        const resp = await fetch(
                          server + '/isEmailPresent',
                          opts
                        )
                        const response = await resp.json()
                        const isPresent = response.isPresent
                        if (isPresent) {
                          schoolEmailExist = true
                          infoRef.current.style.borderBottom = 'solid red 1px'
                          infoRef.current.parentElement.childNodes[1].style.display =
                            'block'
                          infoRef.current.parentElement.childNodes[1].style.color =
                            'red'
                          infoRef.current.parentElement.childNodes[1].innerHTML =
                            'This Email Has Been Registered!'
                          count--
                        } else {
                          schoolEmailExist = false
                          // count++;
                          // console.log("increased to:",count);
                        }
                      } catch (TypeError) {}
                    } else {
                      schoolEmailValidated = false
                      infoRef.current.style.borderBottom = 'solid red 1px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'red'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'Enter a Valid Email Address'
                      count--
                    }
                    setShowModal(false)
                  } catch (TypeError) {
                    // console.log(TypeError)
                    setShowModal(true)
                  }
                } else {
                  if (name === 'schoolEmail') {
                    try {
                      const opts = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: infoRef.current.value }),
                      }
                      const resp = await fetch(server + '/validateMail', opts)
                      const response = await resp.json()
                      const validated1 = response.isValid

                      if (validated1) {
                        schoolEmailValidated = true
                        infoRef.current.style.borderBottom =
                          'solid lightgreen 1px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'lightgreen'
                        infoRef.current.parentElement.childNodes[1].innerHTML = `* Email Validated!`
                        try {
                          const opts = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              schoolEmail: infoRef.current.value,
                            }),
                          }
                          const resp = await fetch(
                            server + '/isEmailPresent',
                            opts
                          )
                          const response = await resp.json()
                          const isPresent = response.isPresent
                          if (isPresent) {
                            schoolEmailExist = true
                            infoRef.current.style.borderBottom = 'solid red 1px'
                            infoRef.current.parentElement.childNodes[1].style.display =
                              'block'
                            infoRef.current.parentElement.childNodes[1].style.color =
                              'red'
                            infoRef.current.parentElement.childNodes[1].innerHTML =
                              'This Email Has Been Registered!'
                            count--
                          } else {
                            schoolEmailExist = false
                            // count++;
                            // console.log("increased to:",count);
                          }
                        } catch (TypeError) {}
                      } else {
                        schoolEmailValidated = false
                        infoRef.current.style.borderBottom = 'solid red 1px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'red'
                        infoRef.current.parentElement.childNodes[1].innerHTML =
                          'Enter a Valid Email Address'
                        count--
                      }
                      setShowModal(false)
                    } catch (TypeError) {
                      // console.log(TypeError)
                      setShowModal(true)
                    }
                  }
                }
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Enter A Valid School Email!'
                count--
              }
            }
            if (infoRef.current.name === 'otherEmail') {
              // infoRef.current.parentElement.childNodes[1].style.color = 'blue'
              if (matchEmail(infoRef.current.value)) {
                if (all) {
                  try {
                    const opts = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ email: infoRef.current.value }),
                    }
                    const resp = await fetch(server + '/validateMail', opts)
                    const response = await resp.json()
                    const validated2 = response.isValid

                    if (validated2) {
                      otherEmailValidated = true
                      infoRef.current.style.borderBottom =
                        'solid lightgreen 1px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'lightgreen'
                      infoRef.current.parentElement.childNodes[1].innerHTML = `* Email Validated!`
                      try {
                        const opts = {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            otherEmail: infoRef.current.value,
                          }),
                        }
                        const resp = await fetch(
                          server + '/isEmailPresent',
                          opts
                        )
                        const response = await resp.json()
                        const isPresent = response.isPresent
                        if (isPresent) {
                          otherEmailExist = true
                          infoRef.current.style.borderBottom = 'solid red 1px'
                          infoRef.current.parentElement.childNodes[1].style.display =
                            'block'
                          infoRef.current.parentElement.childNodes[1].style.color =
                            'red'
                          infoRef.current.parentElement.childNodes[1].innerHTML =
                            'This Email Has Been Registered!'
                          count--
                        } else {
                          otherEmailExist = false
                          // count++;
                          // console.log("increased to:",count);
                        }
                      } catch (TypeError) {}
                    } else {
                      otherEmailValidated = false
                      infoRef.current.style.borderBottom = 'solid red 1px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'red'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'Enter a Valid Email Address'
                      count--
                    }
                    setShowModal(false)
                  } catch (TypeError) {
                    // console.log(TypeError)
                    setShowModal(true)
                  }
                } else {
                  if (name === 'otherEmail') {
                    try {
                      const opts = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: infoRef.current.value }),
                      }
                      const resp = await fetch(server + '/validateMail', opts)
                      const response = await resp.json()
                      const validated2 = response.isValid

                      if (validated2) {
                        otherEmailValidated = true
                        infoRef.current.style.borderBottom =
                          'solid lightgreen 1px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'lightgreen'
                        infoRef.current.parentElement.childNodes[1].innerHTML = `* Email Validated!`
                        try {
                          const opts = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              otherEmail: infoRef.current.value,
                            }),
                          }
                          const resp = await fetch(
                            server + '/isEmailPresent',
                            opts
                          )
                          const response = await resp.json()
                          const isPresent = response.isPresent
                          if (isPresent) {
                            otherEmailExist = true
                            infoRef.current.style.borderBottom = 'solid red 1px'
                            infoRef.current.parentElement.childNodes[1].style.display =
                              'block'
                            infoRef.current.parentElement.childNodes[1].style.color =
                              'red'
                            infoRef.current.parentElement.childNodes[1].innerHTML =
                              'This Email Has Been Registered!'
                            count--
                          } else {
                            otherEmailExist = false
                            // count++;
                            // console.log("increased to:",count);
                          }
                        } catch (TypeError) {}
                      } else {
                        otherEmailValidated = false
                        infoRef.current.style.borderBottom = 'solid red 1px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'red'
                        infoRef.current.parentElement.childNodes[1].innerHTML =
                          'Enter a Valid Email Address'
                        count--
                      }
                      setShowModal(false)
                    } catch (TypeError) {
                      // console.log(TypeError)
                      setShowModal(true)
                    }
                  }
                }
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Email Is Not Valid!'
                count--
              }
            }
            count++
            if (infos.length === count) {
              setSchoolConfirmed(true)
              return true
            } else {
              setSchoolConfirmed(false)
              return false
            }
          }
        }
      }
    })
  }
  useEffect(() => {
    if (window.localStorage.getItem('matricNo') != null) {
      setSchoolInfo({
        ...schoolInfo,
        matricNo: localStorage.getItem('matricNo'),
        schoolEmail: localStorage.getItem('schoolEmail'),
        otherEmail: localStorage.getItem('otherEmail'),
        level: localStorage.getItem('level'),
      })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('matricNo', schoolInfo.matricNo)
    window.localStorage.setItem('schoolEmail', schoolInfo.schoolEmail)
    window.localStorage.setItem('otherEmail', schoolInfo.otherEmail)
    window.localStorage.setItem('level', schoolInfo.level)
  }, [schoolInfo])
  useEffect(() => {
    const first = localStorage.getItem('firstName').slice(0, 1)
    const last = localStorage.getItem('lastName')
    const matric = schoolInfo.matricNo.slice(3)
    setSchoolInfo((schoolInfo) => {
      return {
        ...schoolInfo,
        schoolEmail: (first + last + matric + '@stu.ui.edu.ng').toLowerCase(),
      }
    })
  }, [schoolInfo.matricNo])
  const getButtonEvent = async (e) => {
    if (e.target.value === 'Next') {
      if (
        matricNoRef.current !== null &&
        schoolEmailRef.current !== null &&
        otherEmailRef.current !== null
      ) {
        setShowValidatingStatus(true)
        setTimeout(() => {
          validatorRef.current.scrollIntoView()
        }, [500])
        try {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matricNo: matricNoRef.current.value }),
          }

          const resp = await fetch(server + '/isMatricPresent', opts)
          const response = await resp.json()
          const isPresent = response.isPresent
          if (isPresent) {
            matricValidated = true
          } else {
            matricValidated = false
          }
          const opts2 = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: otherEmailRef.current.value }),
          }
          const resp2 = await fetch(server + '/validateMail', opts2)
          const response2 = await resp2.json()
          const validated2 = response2.isValid

          if (validated2) {
            setOtherEmailValidated(true)
            try {
              const opts = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  otherEmail: otherEmailRef.current.value,
                }),
              }
              const resp = await fetch(server + '/isEmailPresent', opts)
              const response = await resp.json()
              const isPresent = response.isPresent
              if (isPresent) {
                setOtherEmailExist(true)
              } else {
                setOtherEmailExist(false)
              }
            } catch (TypeError) {}
          } else {
            setOtherEmailValidated(false)
          }
          const opts1 = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: schoolEmailRef.current.value }),
          }
          const resp1 = await fetch(server + '/validateMail', opts1)
          const response1 = await resp1.json()
          const validated1 = response1.isValid

          if (validated1) {
            schoolEmailValidated = true
            try {
              const opts = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  schoolEmail: schoolEmailRef.current.value,
                }),
              }
              const resp = await fetch(server + '/isEmailPresent', opts)
              const response = await resp.json()
              const isPresent = response.isPresent
              if (isPresent) {
                schoolEmailExist = true
              } else {
                schoolEmailExist = false
              }
            } catch (TypeError) {}
          } else {
            schoolEmailValidated = false
          }
          setShowModal(false)
          if (validateInputs()) {
            history.push('./signInfo')
          }
        } catch (TypeError) {
          setShowModal(true)
        }
      } else if (
        !addSchoolEmail &&
        matricNoRef.current !== null &&
        otherEmailRef.current !== null
      ) {
        setShowValidatingStatus(true)
        setTimeout(() => {
          validatorRef.current.scrollIntoView()
        }, [500])
        try {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matricNo: matricNoRef.current.value }),
          }

          const resp = await fetch(server + '/isMatricPresent', opts)
          const response = await resp.json()
          const isPresent = response.isPresent
          if (isPresent) {
            matricValidated = true
          } else {
            matricValidated = false
          }
          const opts2 = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: otherEmailRef.current.value }),
          }
          const resp2 = await fetch(server + '/validateMail', opts2)
          const response2 = await resp2.json()
          const validated2 = response2.isValid

          if (validated2) {
            setOtherEmailValidated(true)
            try {
              const opts = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  otherEmail: otherEmailRef.current.value,
                }),
              }
              const resp = await fetch(server + '/isEmailPresent', opts)
              const response = await resp.json()
              const isPresent = response.isPresent
              if (isPresent) {
                setOtherEmailExist(true)
              } else {
                setOtherEmailExist(false)
              }
            } catch (TypeError) {}
          } else {
            setOtherEmailValidated(false)
          }
          if (validateInputs()) {
            history.push('./signInfo')
          }
        } catch (TypeError) {
          setShowModal(true)
        }
      }
    }
    if (e.target.value === 'Prev') {
      setShowValidatingStatus(false)
      history.push('./basicInfo')
    }
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.borderBottom = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.borderBottom = 'solid red 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'red'
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          infoRef.current.placeholder = ''
          infoRef.current.parentElement.scrollIntoView()
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
            if (
              infoRef.current.name === 'matricNo' &&
              infoRef.current.value.length > 0
            ) {
              if (
                Number(infoRef.current.value) &&
                infoRef.current.value.length === 6
              ) {
                infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
              } else {
                infoRef.current.style.borderBottom = 'solid red 1px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Enter a Valid Matric Number'
              }
            }
          } else {
            infoRef.current.parentElement.childNodes[1].innerHTML =
              infoRef.current.title
          }
        }
      }
    })
  }
  const getInputEvent = (e) => {
    var name = e.target.getAttribute('name')
    setSchoolInfo({ ...schoolInfo, [name]: e.target.value })

    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.borderBottom = 'solid blue 1px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          infoRef.current.parentElement.childNodes[1].innerHTML =
            infoRef.current.title
          if (
            infoRef.current.name === 'matricNo' &&
            infoRef.current.value.length > 0
          ) {
            if (
              Number(infoRef.current.value) &&
              infoRef.current.value.length === 6
            ) {
              infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
            } else {
              infoRef.current.style.borderBottom = 'solid red 1px'
              infoRef.current.parentElement.childNodes[1].style.display =
                'block'
              infoRef.current.parentElement.childNodes[1].style.color = 'red'
              infoRef.current.parentElement.childNodes[1].innerHTML =
                'Enter a Valid Matric Number'
            }
          }
          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.borderBottom = 'solid red 1px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          }
          validateInput({ all: false, name: name })
        }
      }
    })
  }
  const handleCodeInput = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value

    setValidatingCode((validatingCode) => {
      validatingCode.forEach((code, i) => {
        if (i === Number(name)) {
          code.code = value
          if (i !== validatingCode.length - 1) {
            validatingCode[i + 1]['ref'].current.focus()
          } else {
            setValidateCode(true)
          }
        }
      })
      return [...validatingCode]
    })
  }
  const handleSendCode = async () => {
    setCodeStatus('Sending...')
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {
        <button
          className='nxt'
          type='submit'
          name='button'
          value='Next'
          enable={emailVerified}
        >
          {'Next >>'}
        </button>
      }
    </div>
  )

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ opacity: 0 }}
      ref={schoolCoverRef}
    >
      {showModal ? (
        <ConnectionModal
          title='Ooops... Connection Error'
          message={errorMessage}
          multiple={true}
          button1='Ok'
          button2='Reload'
          func1={() => {
            setShowModal(false)
            setShowValidatingStatus(false)
          }}
          func2={() => {
            setShowModal(false)
            setShowValidatingStatus(false)
            window.location.reload()
          }}
        />
      ) : undefined}
      <motion.div variants={headerVariants} className='infotag'>
        School Info
      </motion.div>
      {showValidatingStatus ? (
        <div
          ref={validatorRef}
          style={{
            padding: '10px',
            margin: '20px',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            borderRadius: '10px',
            backgroundColor: 'lightblue',
            border: 'solid blue 1px',
            color: 'blue',
          }}
        >
          {validatingStatus}
        </div>
      ) : undefined}
      <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
        <img className='usr' src={logo} alt='user' height='100px' />
        <p className='over' style={{ padding: '13px' }}>
          <input
            ref={matricNoRef}
            className='input'
            type='number'
            name='matricNo'
            placeholder='Enter Your Matric No'
            value={schoolInfo.matricNo}
            required
            title='Enter Your Matric No'
          />
          <p className='inputStyle'></p>
        </p>
        <p className='over' style={{ padding: '13px' }}>
          <select
            ref={levelRef}
            className='input black'
            type='text'
            name='level'
            placeholder='Choose Your Level'
            value={schoolInfo.level}
            required
            title='Choose Your Level'
          >
            <option value=''>Level</option>
            <option value='100'>100</option>
            <option value='200'>200</option>
            <option value='300'>300</option>
            <option value='400'>400</option>
          </select>
          <p className='inputStyle'></p>
        </p>
        <div style={{ display: 'flex', margin: '20px' }}>
          <label>Add School Email?</label>
          <input
            type='checkbox'
            checked={addSchoolEmail}
            onChange={() => {
              setAddSchoolEmail(!addSchoolEmail)
            }}
            style={{ marginLeft: '20px', cursor: 'pointer' }}
          />
        </div>
        {addSchoolEmail && (
          <p className='over' style={{ padding: '13px' }}>
            <input
              ref={schoolEmailRef}
              className='input'
              type='email'
              name='schoolEmail'
              placeholder='Enter Your School Email'
              value={schoolInfo.schoolEmail}
              required
              title='Enter Your School Email'
            />
            <p className='inputStyle'></p>
          </p>
        )}
        <p className='over' style={{ padding: '13px' }}>
          <input
            ref={otherEmailRef}
            className='input'
            type='email'
            name='otherEmail'
            placeholder='Enter Your Personal Email'
            value={schoolInfo.otherEmail}
            required
            title='Enter Your Personal Email'
          />
          <p className='inputStyle'></p>
        </p>
        <div style={{ margin: '5px', textAlign: 'left' }}>
          <label
            style={{
              color: darkMode ? 'lightgreen' : 'green',
              fontWeight: 'bold',
            }}
          >
            Verify Email Address
          </label>
          <div
            style={{
              display: 'flex',
              margin: '15px',
              justifyContent: 'center',
            }}
            onChange={handleCodeInput}
          >
            {validatingCode.map((code, i) => {
              return (
                <input
                  ref={code.ref}
                  type='number'
                  style={{
                    border: 'solid black 1px',
                    margin: '5px',
                    width: '30px',
                    height: '30px',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                  }}
                  editable={
                    codeStatus !== 'Sending' && codeStatus !== 'Send Code'
                  }
                  name={i}
                  value={code.code}
                />
              )
            })}
          </div>
          <div
            style={{
              margin: '25px auto',
              width: 'fit-content',
              textAlign: 'center',
              fontSize: '.9rem',
              fontWeight: 'bold',
              border: 'solid rgba(200,200,200,1)',
              padding: '6px 10px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            onClick={{ handleSendCode }}
          >
            <label style={{ cursor: 'pointer' }}>{codeStatus}</label>
          </div>
        </div>
        {prevNext}
      </div>
    </motion.div>
  )
}

export default FewSchoolInfo
