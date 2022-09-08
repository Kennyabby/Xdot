import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from './user.png'

import ConnectionModal from './ConnectionModal'

const containerVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
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
const SchoolInfo = ({
  getCoverList,
  getCoverPos,
  setSchoolConfirmed,
  server,
}) => {
  const history = useHistory()
  const schoolCoverRef = useRef(null)
  const [pos, setPos] = useState(0)
  const [showModal, setShowModal] = useState(false)
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
    hallOfResidence: '',
    yearOfAdmission: '',
    modeOfEntry: '',
  })
  const validatorRef = useRef(null)
  const matricNoRef = useRef(null)
  const schoolEmailRef = useRef(null)
  const otherEmailRef = useRef(null)
  const levelRef = useRef(null)
  const hallOfResidenceRef = useRef(null)
  const yearOfAdmissionRef = useRef(null)
  const modeOfEntryRef = useRef(null)
  const schoolLabelRef = useRef(null)
  const infoRefList = [
    matricNoRef,
    schoolEmailRef,
    otherEmailRef,
    levelRef,
    hallOfResidenceRef,
    yearOfAdmissionRef,
    modeOfEntryRef,
  ]
  var matricValidated = false
  var schoolEmailValidated = false
  var schoolEmailExist = false
  var otherEmailValidated = false
  var otherEmailExist = false
  useEffect(() => {
    getCoverList(schoolList)
  }, [])
  useEffect(() => {
    schoolLabelRef.current.scrollIntoView()
  }, [pos])
  useEffect(() => {
    getCoverPos(pos)
  }, [pos])

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
  useEffect(() => {
    // console.log('match: ' + matchSchoolEmail(''))
  }, [])
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

    // console.log('length: ', infos.length)
    if (infos.length === count) {
      // console.log('yes')
      setSchoolConfirmed(true)
      return true
    } else {
      setSchoolConfirmed(false)
      // console.log('no')
      // window.location.reload()
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
    //  console.log(infos.length);
    //  console.log(count);
  }
  useEffect(() => {
    if (window.localStorage.getItem('matricNo') != null) {
      setSchoolInfo({
        ...schoolInfo,
        matricNo: localStorage.getItem('matricNo'),
        schoolEmail: localStorage.getItem('schoolEmail'),
        otherEmail: localStorage.getItem('otherEmail'),
        level: localStorage.getItem('level'),
        hallOfResidence: localStorage.getItem('hallOfResidence'),
        yearOfAdmission: localStorage.getItem('yearOfAdmission'),
        modeOfEntry: localStorage.getItem('modeOfEntry'),
      })
    }
  }, [])
  useEffect(() => {
    if (pos === 0) {
      setTimeout(() => {
        validateInput({ all: true })
      }, 500)
    }
  }, [pos])

  useEffect(() => {
    window.localStorage.setItem('matricNo', schoolInfo.matricNo)
    window.localStorage.setItem('schoolEmail', schoolInfo.schoolEmail)
    window.localStorage.setItem('otherEmail', schoolInfo.otherEmail)
    window.localStorage.setItem('level', schoolInfo.level)
    window.localStorage.setItem('hallOfResidence', schoolInfo.hallOfResidence)
    window.localStorage.setItem('yearOfAdmission', schoolInfo.yearOfAdmission)
    window.localStorage.setItem('modeOfEntry', schoolInfo.modeOfEntry)
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
            otherEmailValidated = true
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
                otherEmailExist = true
              } else {
                otherEmailExist = false
                // count++;
                // console.log("increased to:",count);
              }
            } catch (TypeError) {}
          } else {
            otherEmailValidated = false
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
                // count++;
                // console.log("increased to:",count);
              }
            } catch (TypeError) {}
          } else {
            schoolEmailValidated = false
          }
          setShowModal(false)
          if (validateInputs()) {
            if (pos === 2) {
              history.push('./contactInfo')
              setPos(0)
            } else {
              setPos((pos) => {
                return pos + 1
              })
            }
          }
        } catch (TypeError) {
          // console.log(TypeError)
          setShowModal(true)
        }
      } else {
        if (validateInputs()) {
          if (pos === 2) {
            history.push('./contactInfo')
            setPos(0)
          } else {
            setPos((pos) => {
              return pos + 1
            })
          }
        }
      }
    }
    if (e.target.value === 'Prev') {
      setShowValidatingStatus(false)
      if (pos === 0) {
        history.push('./basicInfo')
        setPos(0)
      } else {
        setPos((pos) => {
          return pos - 1
        })
      }
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
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {
        <button className='nxt' type='submit' name='button' value='Prev'>
          {'<< Prev'}
        </button>
      }
      {
        <button className='nxt' type='submit' name='button' value='Next'>
          {'Next >>'}
        </button>
      }
    </div>
  )
  const schoolList = [
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
      {prevNext}
    </div>,
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
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
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={hallOfResidenceRef}
          className='input black'
          type='text'
          name='hallOfResidence'
          placeholder='Choose Your Hall of Residence'
          value={schoolInfo.hallOfResidence}
          required
          title='Choose Your Hall of Residence'
        >
          <option value=''>Hall of Residence Allocated</option>
          <option value='MELLANBY'>MELLANBY</option>
          <option value='TEDDER'>TEDDER</option>
          <option value='KUTI'>KUTI</option>
          <option value='SULTAN BELLO'>SULTAN BELLO</option>
          <option value='QUEEN ELIZABETH II'>QUEEN ELIZABETH II</option>
          <option value='INDEPENDENCE'>INDEPENDENCE</option>
          <option value='IDIA'>IDIA</option>
          <option value='OBAFEMI AWOLOWO'>OBAFEMI AWOLOWO</option>
          <option value='ALEXANDER BROWN'>ALEXANDER BROWN</option>
          <option value='ABDULSALAMI ABUBAKAR'>ABDULSALAMI ABUBAKAR</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
    <div className='container' onChange={getInputEvent} onFocus={handleFocus}>
      <img className='usr' src={logo} alt='user' height='100px' />
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={modeOfEntryRef}
          className='input black'
          type='text'
          name='modeOfEntry'
          placeholder='Choose Your Admission Mode of Entry'
          value={schoolInfo.modeOfEntry}
          required
          title='Choose Your Admission Mode of Entry'
        >
          <option value=''>Admission Mode Of Entry</option>
          <option value='Direct Entry (D.E.)'>Direct Entry (D.E.)</option>
          <option value='UTME'>UTME</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      <p className='over' style={{ padding: '13px' }}>
        <select
          ref={yearOfAdmissionRef}
          className='input black'
          type='text'
          name='yearOfAdmission'
          placeholder='Choose Your Year of Admission'
          value={schoolInfo.yearOfAdmission}
          required
          title='Choose Your Year of Admission'
        >
          <option value=''>Session Admitted</option>
          <option value='2016/2017'>2016/2017</option>
          <option value='2017/2018'>2017/2018</option>
          <option value='2018/2019'>2018/2019</option>
          <option value='2020/2021'>2020/2021</option>
          <option value='2021/2022'>2021/2022</option>
        </select>
        <p className='inputStyle'></p>
      </p>
      {prevNext}
    </div>,
  ]
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit={{ x: -1000 }}
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
      <motion.div
        variants={headerVariants}
        className='infotag'
        ref={schoolLabelRef}
      >
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
      {schoolList[pos]}
    </motion.div>
  )
}

export default SchoolInfo
