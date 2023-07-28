import React, { useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUserCircle, FaAngleLeft, FaCheckSquare } from 'react-icons/fa'

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
const FewSchoolInfo = ({
  setSchoolConfirmed,
  schoolConfirmed,
  verifiedMail,
  setVerifiedMail,
}) => {
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
    educationQualification: '',
    student: false,
    instituteCountryName: '',
    instituteCountry: '',
    instituteName: '',
    institute: '',
    department: '',
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
  const educationQualificationRef = useRef(null)
  const instituteNameRef = useRef(null)
  const instituteCountryNameRef = useRef(null)
  const departmentRef = useRef(null)
  const matricNoRef = useRef(null)
  const schoolEmailRef = useRef(null)
  const otherEmailRef = useRef(null)
  const levelRef = useRef(null)
  const [infoRefList, setInfoRefList] = useState([
    educationQualificationRef,
    instituteNameRef,
    instituteCountryNameRef,
    departmentRef,
    matricNoRef,
    otherEmailRef,
    schoolEmailRef,
    levelRef,
  ])
  var matricValidated = false
  const [confirmStudentStatus, setConfirmStudentStatus] = useState(false)
  const [schoolEmailExist, setSchoolEmailExist] = useState(false)
  const [otherEmailExist, setOtherEmailExist] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [countDownId, setCountDownId] = useState(null)
  const [spanLeft, setSpanLeft] = useState(null)
  const [verificationCode, setVerificationCode] = useState(0)
  const [inCorrectCode, setInCorrectCode] = useState(false)
  const [codeStatus, setCodeStatus] = useState('Send Code')
  const [countries, setCountries] = useState([])
  const [institutes, setInstitutes] = useState([])
  const [departments, setDepartments] = useState([])
  const nigeria_universities = [
    'University of Uyo',
    'University of Uyo',
    "Umaru Musa Yar'Adua University",
    'Usmanu Danfodiyo University Sokoto',
    'Enugu State University of Science and Technology',
    'Ekiti State University',
    'Bayero University Kano',
    'Bowen University',
    'Benson Idahosa University',
    'Benue State University',
    'Bingham University',
    'Caritas University',
    'Baze University Abuja',
    'Bells University of Technology',
    'Caleb University',
    'Gombe State University',
    'Godfrey Okoye University',
    'Ibrahim Babangida University',
    'Federal University of Technology, Yola',
    'Igbinedion University',
    'Imo State University',
    'Federal University of Technology, Akure',
    'Federal University of Technology, Owerri',
    'Federal University of Petroleum Resources',
    'Fountain University',
    'Federal University of Technology, Minna',
    'Covenant University',
    'Crescent University',
    'Crawford University',
    'Ebonyi State University',
    'Cross River University of Science and Technology',
    'African University of Science and Technology',
    'ABTI American University of Nigeria',
    'Babcock University',
    'Abubakar Tafawa Balewa University',
    'Ahmadu Bello University',
    'Abia State University',
    'Afe Babalola University',
    'Ajayi Crowther University',
    'The Achievers University',
    'Ambrose Alli University',
    'Adekunle Ajasin University',
    'Adamawa State University',
    'Akwa Ibom State University of Technology',
    'Adeleke University',
    'Anambra State University of Science and Technology',
    'Al-hikmah University',
    'Western Delta University',
    'Wellspring University',
    'Rivers State University of Science and Technology',
    'Wesley University of Science and Technology',
    'Veritas University',
    'Nnamdi Azikiwe University',
    'Osun State University',
    'Niger Delta University',
    'Landmark University',
    'National Open University of Nigeria',
    'Michael Okpara University of Agriculture',
    'Madonna University',
    'Joseph Ayo Babalola University',
    'Lagos State University',
    'Lead City University of Ibadan',
    'Ladoke Akintola University of Technology',
    'Kwara State University',
    'Kwararafa University',
    "Umaru Musa Yar'Adua University",
    'Tai Solarin University of Education',
    'Usmanu Danfodiyo University Sokoto',
    'Tansian University',
    'Taraba State University',
    'Renaissance University',
    'Pan-African University',
    'Sokoto State University',
    'Paul University',
    'Salem University',
    'Redeemers University',
    'Oduduwa University',
    'Obafemi Awolowo University Ile-Ife',
    'Nigerian Turkish Nile University',
    'Obong University',
    'Ondo State University of Science and Technology',
    'Novena University',
    'Nasarawa State University Keffi',
    'Olabisi Onabanjo University',
    'Kano State University of Technology Wudil',
    'Kogi State University',
    'Kaduna State University',
    'Kebbi State University of Science and Technology',
    'Katsina University',
    'Federal University of Petroleum Resources',
    'Federal University of Technology, Akure',
    'Fountain University',
    'Bowen University',
    'Caleb University',
    'Benue State University',
    'Benson Idahosa University',
    'Bayero University Kano',
    'Caritas University',
    'Covenant University',
    'Gombe State University',
    'Igbinedion University',
    'Godfrey Okoye University',
    'Ibrahim Babangida University',
    'Imo State University',
    'Federal University of Technology, Yola',
    'Federal University of Technology, Owerri',
    'Federal University of Technology, Minna',
    'Ekiti State University',
    'Cross River University of Science and Technology',
    'Crescent University',
    'Enugu State University of Science and Technology',
    'Crawford University',
    'Ebonyi State University',
    'Ahmadu Bello University',
    'The Achievers University',
    'Adeleke University',
    'Akwa Ibom State University of Technology',
    'Afe Babalola University',
    'Adamawa State University',
    'Ajayi Crowther University',
    'Abia State University',
    'Ambrose Alli University',
    'Adekunle Ajasin University',
    'Al-hikmah University',
    'ABTI American University of Nigeria',
    'Anambra State University of Science and Technology',
    'Abubakar Tafawa Balewa University',
    'Bingham University',
    'Bells University of Technology',
    'Babcock University',
    'Baze University Abuja',
    'African University of Science and Technology',
    'Novena University',
    'Nigerian Turkish Nile University',
    'Nasarawa State University Keffi',
    'Obafemi Awolowo University Ile-Ife',
    'Olabisi Onabanjo University',
    'Oduduwa University',
    'Obong University',
    'Kaduna State University',
    'Katsina University',
    'Kogi State University',
    'Kebbi State University of Science and Technology',
    'Kano State University of Technology Wudil',
    'Joseph Ayo Babalola University',
    'Landmark University',
    'National Open University of Nigeria',
    'Niger Delta University',
    'Madonna University',
    'Michael Okpara University of Agriculture',
    'Osun State University',
    'Nnamdi Azikiwe University',
    "Umaru Musa Yar'Adua University",
    'Tansian University',
    'Taraba State University',
    'Usmanu Danfodiyo University Sokoto',
    'Tai Solarin University of Education',
    'Sokoto State University',
    'Paul University',
    'Redeemers University',
    'Pan-African University',
    'Ondo State University of Science and Technology',
    'Salem University',
    'Renaissance University',
    'Ladoke Akintola University of Technology',
    'Kwara State University',
    'Lead City University of Ibadan',
    'Kwararafa University',
    'Lagos State University',
    'Rivers State University of Science and Technology',
    'Wesley University of Science and Technology',
    'Western Delta University',
    'Wellspring University',
    'Veritas University',
    'University of Jos',
    'University of Benin',
    'University of Mkar',
    'University of Maiduguri',
    'University of Portharcourt',
    'University of Abuja',
    'University of Agriculture Makurdi',
    'University of Agriculture Abeokuta',
    'University of Ibadan',
    'University of Ilorin',
    'University of Nigeria',
    'University of Lagos',
    'University of Calabar',
    'University of Uyo',
    'Bauchi State University, Gadau',
    'Bauchi State University, Gadau',
    'Akanu Ibiam Federal Polytechnic, Unwana',
    'Akanu Ibiam Federal Polytechnic, Unwana',
  ]
  const department_list = [
    'Agriculture',
    'Department of Agricultural Economics and Extension',
    'Department of Agronomy',
    'Department of Animal Science',
    'Department of Soil Science',
    'Department of Agricultural Engineering',
    'Department of Forest Resources Management',
    'Arts',
    'Department of English Language',
    'Department of History',
    'Department of Linguistics',
    'Department of Literature in English',
    'Department of Philosophy',
    'Department of Religion and African Culture',
    'Department of Theatre Arts',
    'Education',
    'Department of Adult Education',
    'Department of Educational Management',
    'Department of Educational Psychology',
    'Department of Guidance and Counselling',
    'Department of Library and Information Science',
    'Department of Science Education',
    'Department of Vocational Education',
    'Law',
    'Department of Private and Property Law',
    'Department of Public Law',
    'Department of Jurisprudence and International Law',
    'Medicine and Surgery',
    'Department of Anaesthesia',
    'Department of Chemical Pathology',
    'Department of Haematology and Blood Transfusion',
    'Department of Medical Microbiology and Parasitology',
    'Department of Medicine',
    'Department of Morbid Anatomy and Histopathology',
    'Department of Paediatrics and Child Health',
    'Department of Psychiatry',
    'Department of Radiology',
    'Department of Surgery',
    'Pharmacy',
    'Department of Clinical Pharmacy',
    'Department of Pharmaceutical Chemistry',
    'Department of Pharmacology and Therapeutics',
    'Department of Pharmaceutics and Industrial Pharmacy',
    'Science',
    'Department of Biological Sciences',
    'Department of Chemistry',
    'Department of Computer Science',
    'Department of Geology',
    'Department of Mathematics',
    'Department of Physics',
    'Department of Plant Biology and Biotechnology',
    'Faculty of Social Sciences',
    'Department of Economics',
    'Department of Geography',
    'Department of Political Science',
    'Department of Psychology',
    'Department of Sociology',
    'Department of Social Works',
    'Technology',
    'Department of Agricultural and Environmental Engineering',
    'Department of Food Science and Technology',
    'Department of Mechanical Engineering',
    'Department of Industrial and Production Engineering',
    'Department of Electrical and Electronics Engineering',
    'Department of Mechatronics Engineering',
    'Department of Civil Engineering',
    'Department of Textile Engineering',
  ]

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setCountries(data)
      })
      .catch((error) => {
        console.log('Error getting countries:', error)
      })
  }, [])
  const getCollegesInCountry = async (search, country) => {
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?name=${search}&country=${country}`
      )
      const data = await response.json()
      if (search && country) {
        return data
      } else {
        return []
      }
    } catch (TypeError) {
      if (search && country === 'Nigeria') {
        return nigeria_universities.filter((university) => {
          return university.toLowerCase().includes(search.toLowerCase())
        })
      } else {
        return []
      }
    }
  }
  const getDepartments = (search) => {
    if (search) {
      return department_list.filter((university) => {
        return university.toLowerCase().includes(search.toLowerCase())
      })
    } else {
      return []
    }
  }
  useEffect(() => {
    const filteredDepartment = departments.filter((department) => {
      return department.toLowerCase().trim()
    })
    if (
      !filteredDepartment.includes(schoolInfo.department.toLowerCase().trim())
    ) {
      const depts = getDepartments(schoolInfo.department)
      setDepartments(depts)
    } else {
      setDepartments([])
    }
  }, [schoolInfo.department])
  useEffect(async () => {
    if (!institutes.includes(schoolInfo.instituteName)) {
      const colleges = await getCollegesInCountry(
        schoolInfo.instituteName,
        schoolInfo.instituteCountryName
      )
      setInstitutes(colleges)
      // setInstitutes(() => {
      //   var list = []
      //   colleges.forEach((college, i) => {
      //     if (i !== college.length - 1) {
      //       list += ['"' + college.name + '",']
      //     } else {
      //       list += ['"' + college.name + '"']
      //     }
      //   })
      //   console.log(list)
      //   return [...list]
      // })
    } else {
      setInstitutes([])
    }
  }, [schoolInfo.instituteName, schoolInfo.instituteCountryName])
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
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.display = 'block'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          } else {
            infoRef.current.style.border = 'solid black 1px'
            infoRef.current.parentElement.childNodes[1].style.display = 'none'
            infoRef.current.parentElement.childNodes[1].style.color = 'blue'
            if (infoRef.current.name === 'matricNo') {
              if (matricValidated) {
                infoRef.current.style.border = 'solid red 2px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'This Matric Number Has Been Registered!'
                count--
              }
            }
            if (infoRef.current.name === 'schoolEmail') {
              if (matchEmail(infoRef.current.value)) {
              } else {
                infoRef.current.style.border = 'solid red 2px'
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
                if (otherEmailExist) {
                  infoRef.current.style.border = 'solid red 2px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'red'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'This Email Has Been Registered!'
                  count--
                } else {
                  infoRef.current.style.border = 'solid darkorange 2px'
                  infoRef.current.parentElement.childNodes[1].style.display =
                    'block'
                  infoRef.current.parentElement.childNodes[1].style.color =
                    'darkorange'
                  infoRef.current.parentElement.childNodes[1].innerHTML =
                    'Email Accepted!'
                }
              } else {
                infoRef.current.style.border = 'solid red 2px'
                infoRef.current.parentElement.childNodes[1].style.display =
                  'block'
                infoRef.current.parentElement.childNodes[1].style.color = 'red'
                infoRef.current.parentElement.childNodes[1].innerHTML =
                  'Email Is Not Valid!'
                count--
              }
            }
            count++
          }
        }
      }
    })

    if (infos.length === count) {
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
                    infoRef.current.style.border = 'solid red 2px'
                    infoRef.current.parentElement.childNodes[1].style.display =
                      'block'
                    infoRef.current.parentElement.childNodes[1].style.color =
                      'red'
                    infoRef.current.parentElement.childNodes[1].innerHTML =
                      'This Matric Number Has Been Registered!'
                    count--
                  } else {
                    matricValidated = false
                  }
                  setShowModal(false)
                } catch (TypeError) {
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
                    const resp = await fetch(server + '/isMatricPresent', opts)

                    const response = await resp.json()
                    const isPresent = response.isPresent
                    if (isPresent) {
                      matricValidated = true
                      infoRef.current.style.border = 'solid red 2px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'red'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'This Matric Number Has Been Registered!'
                      count--
                    } else {
                      matricValidated = false
                    }
                    setShowModal(false)
                  } catch (TypeError) {
                    setShowModal(true)
                  }
                }
              }
            }
            if (infoRef.current.name === 'schoolEmail') {
              if (matchEmail(infoRef.current.value)) {
              } else {
                infoRef.current.style.border = 'solid red 2px'
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
                if (all) {
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
                    const resp = await fetch(server + '/isEmailPresent', opts)
                    const response = await resp.json()
                    const isPresent = response.isPresent
                    if (isPresent) {
                      setOtherEmailExist(true)
                      infoRef.current.style.border = 'solid red 2px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'red'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'This Email Has Been Registered!'
                      count--
                    } else {
                      setOtherEmailExist(false)
                      infoRef.current.style.border = 'solid darkorange 2px'
                      infoRef.current.parentElement.childNodes[1].style.display =
                        'block'
                      infoRef.current.parentElement.childNodes[1].style.color =
                        'darkorange'
                      infoRef.current.parentElement.childNodes[1].innerHTML =
                        'Email Accepted!'
                    }
                    setShowModal(false)
                  } catch (TypeError) {
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
                        body: JSON.stringify({
                          otherEmail: infoRef.current.value,
                        }),
                      }
                      const resp = await fetch(server + '/isEmailPresent', opts)
                      const response = await resp.json()
                      const isPresent = response.isPresent
                      if (isPresent) {
                        setOtherEmailExist(true)
                        infoRef.current.style.border = 'solid red 2px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'red'
                        infoRef.current.parentElement.childNodes[1].innerHTML =
                          'This Email Has Been Registered!'
                        count--
                      } else {
                        setOtherEmailExist(false)
                        infoRef.current.style.border = 'solid darkorange 2px'
                        infoRef.current.parentElement.childNodes[1].style.display =
                          'block'
                        infoRef.current.parentElement.childNodes[1].style.color =
                          'darkorange'
                        infoRef.current.parentElement.childNodes[1].innerHTML =
                          'Email Accepted!'
                      }
                      setShowModal(false)
                    } catch (TypeError) {
                      setShowModal(true)
                    }
                  }
                }
              } else {
                infoRef.current.style.border = 'solid red 2px'
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
    if (schoolInfo.otherEmail && verifiedMail === schoolInfo.otherEmail) {
      setEmailVerified(true)
    } else {
      setEmailVerified(false)
    }
    validateInput({ all: false, name: 'otherEmail' })
  }, [schoolInfo.otherEmail])
  useEffect(() => {
    if (
      window.localStorage.getItem('student') !== null ||
      window.localStorage.getItem('otherEmail') !== null ||
      window.localStorage.getItem('educationQualification') !== null
    ) {
      setSchoolInfo({
        ...schoolInfo,
        educationQualification: localStorage.getItem('educationQualification'),
        student: localStorage.getItem('student') === String(true),
        instituteCountryName: localStorage.getItem('instituteContryName'),
        instituteCountry: localStorage.getItem('instituteCountry'),
        instituteName:
          localStorage.getItem('instituteName') !== null
            ? localStorage.getItem('instituteName')
            : '',
        institute: localStorage.getItem('institute'),
        department:
          localStorage.getItem('department') !== null
            ? localStorage.getItem('department')
            : '',
        matricNo: localStorage.getItem('matricNo'),
        schoolEmail: localStorage.getItem('schoolEmail'),
        otherEmail: localStorage.getItem('otherEmail'),
        level: localStorage.getItem('level'),
      })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      'educationQualification',
      schoolInfo.educationQualification
    )
    window.localStorage.setItem('student', schoolInfo.student)
    window.localStorage.setItem(
      'instituteContryName',
      schoolInfo.instituteCountryName
    )
    window.localStorage.setItem('instituteCountry', schoolInfo.instituteCountry)
    window.localStorage.setItem('institute', schoolInfo.institute)
    window.localStorage.setItem('instituteName', schoolInfo.instituteName)
    window.localStorage.setItem('department', schoolInfo.department)
    window.localStorage.setItem('matricNo', schoolInfo.matricNo)
    window.localStorage.setItem('schoolEmail', schoolInfo.schoolEmail)
    window.localStorage.setItem('otherEmail', schoolInfo.otherEmail)
    window.localStorage.setItem('level', schoolInfo.level)
  }, [schoolInfo])
  const getButtonEvent = async (e) => {
    if (e.target.value === 'Next') {
      if (
        matricNoRef.current !== null &&
        schoolEmailRef.current !== null &&
        otherEmailRef.current !== null
      ) {
        setShowValidatingStatus(true)
        setTimeout(() => {
          validatorRef.current.scrollIntoView({ behavior: 'smooth' })
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

          setShowModal(false)
          if (validateInputs()) {
            history.push('./signupInfo')
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
          setShowModal(false)
          if (validateInputs()) {
            history.push('./signupInfo')
          }
        } catch (TypeError) {
          setShowModal(true)
        }
      } else {
        setShowValidatingStatus(true)
        setTimeout(() => {
          validatorRef.current.scrollIntoView({ behavior: 'smooth' })
        }, [500])
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
          setShowModal(false)
          if (validateInputs()) {
            history.push('./signupInfo')
          }
        } catch (TypeError) {
          setShowModal(false)
        }
      }
    }
    if (
      e.target.value === 'Prev' ||
      e.target.getAttribute('value') === 'Prev'
    ) {
      setShowValidatingStatus(false)
      history.push('./basicInfo')
    }
  }
  const handleFocus = (e) => {
    var name = e.target.getAttribute('name')
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        infoRef.current.style.border = 'solid black 1px'
        infoRef.current.parentElement.childNodes[1].style.display = 'none'
        infoRef.current.placeholder = infoRef.current.title
        if (infoRef.current.value === '' && infoRef.current.required) {
          infoRef.current.style.border = 'solid red 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'red'
        }
        if (infoRef.current.name === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.display = 'block'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          infoRef.current.placeholder = ''
          if (infoRef.current.required) {
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
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
    const value = e.target.value
    setSchoolInfo((schoolInfo) => {
      return { ...schoolInfo, [name]: value }
    })
    if (name === 'instituteCountryName') {
      countries.forEach((country, i) => {
        if (country.name !== undefined) {
          if (value === country.name) {
            setSchoolInfo((schoolInfo) => {
              return { ...schoolInfo, instituteCountry: country }
            })
          }
        }
      })
    }
    if (name === 'instituteName') {
      institutes.forEach((institute, i) => {
        if (institute.name !== undefined) {
          if (value === institute.name) {
            setSchoolInfo((schoolInfo) => {
              return { ...schoolInfo, institute: institute }
            })
          }
        }
      })
    }
    infoRefList.forEach((infoRef) => {
      if (infoRef.current != null) {
        if (infoRef.current.name === name) {
          infoRef.current.style.border = 'solid blue 2px'
          infoRef.current.parentElement.childNodes[1].style.color = 'blue'
          infoRef.current.parentElement.childNodes[1].innerHTML =
            infoRef.current.title

          if (infoRef.current.value === '' && infoRef.current.required) {
            infoRef.current.style.border = 'solid red 2px'
            infoRef.current.parentElement.childNodes[1].style.color = 'red'
            infoRef.current.parentElement.childNodes[1].innerHTML = `* ${infoRef.current.title}`
          }
          validateInput({ all: false, name: name })
        }
      }
    })
  }
  useEffect(() => {
    var codes = ''
    validatingCode.forEach((code, i) => {
      codes += code.code
    })
    if (validateCode && codes.length === 4) {
      if (verificationCode === codes) {
        setEmailVerified(true)
        setVerifiedMail(schoolInfo.otherEmail)
      } else {
        setInCorrectCode(true)
      }
    }
  }, [validateCode, validatingCode])
  const handleCodeInput = (e) => {
    setInCorrectCode(false)
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setValidatingCode((validatingCode) => {
      validatingCode.forEach((code, i) => {
        if (i === Number(name)) {
          code.code = value.slice(value.length - 1)
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
  const handleBackSpace = (e) => {
    const key = e.keyCode
    const name = e.target.getAttribute('name')
    const value = e.target.value

    if (key == 8 || key == 46) {
      if (!value.length) {
        setValidatingCode((validatingCode) => {
          validatingCode.forEach((code, i) => {
            if (i === Number(name) && i !== 0) {
              validatingCode[i - 1].code = ''
              validatingCode[i - 1]['ref'].current.focus()
            }
          })
          return [...validatingCode]
        })
      }
    }
  }
  const shuffleList = (array) => {
    var currentIndex = array.length,
      randomIndex,
      temporaryValue
    while (0 !== currentIndex) {
      var randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
  const countDown = (time) => {
    setSpanLeft(time)
    const countDownId = setInterval(() => {
      setSpanLeft((spanLeft) => {
        if (spanLeft != 0) {
          return spanLeft - 1
        }
        return time
      })
    }, 1000)
    setCountDownId(countDownId)
  }
  useEffect(() => {
    if (spanLeft === 0) {
      clearInterval(countDownId)
    }
  }, [spanLeft])
  useEffect(() => {
    if (schoolInfo.otherEmail && verifiedMail === schoolInfo.otherEmail) {
      setEmailVerified(true)
    } else {
      setEmailVerified(false)
    }
  }, [schoolConfirmed])
  const generateCode = () => {
    let number = '0123456789987654321001234567899876543210'
    var list = number.split('')
    var shuffledList = shuffleList(list)
    const code = shuffledList.slice(6, 10).join('')
    setVerificationCode(code)
    return code
  }
  const handleSendCode = async () => {
    setCodeStatus('Sending...')
    const message =
      "<h2>Verify your email address by copying the verification code below.</h2><p style='font-family:monospace; font-size: 1rem;'>Hello!,</p><p style='font-family:monospace; font-size: 1rem;'>You are getting this email to confirm that you want to create an account with <b>Pace Up</b>.</p><p>Your Verification code is: <b>" +
      generateCode() +
      "</b></p><h2>Not You?</h2><p style='font-family:monospace; font-size: 1rem;'>If this was not you, kindly <a href='https://xdot.vercel.app/help'>click here</a>. </p><p style='margin-top: 50px; font-family:monospace;'>Regards. <b>The XDot Team</b> in partnership with <b>Zerox</b>.</p><p style='margin-top: 150px; font-family:monospace'>If you do no want to get future notifications through this email, kindly <a href='https://xdot.vercel.app/help'>stop it here</a>.</p>"
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: [schoolInfo.otherEmail],
        type: 'html',
        subject: 'Email Verification Code',
        message: message,
      }),
    }
    const resp = await fetch(server + '/mailUser', opts)
    const response = await resp.json()
    const mailDelivered = response.mailDelivered
    if (mailDelivered) {
      setCodeStatus('Send Code')
      countDown(60)
      setCodeSent(true)
    } else {
      setCodeSent(false)
      handleSendCode()
    }
  }
  const prevNext = (
    <div className='np' onClick={getButtonEvent}>
      {<FaAngleLeft className='prv' value='Prev' />}
      {emailVerified && (
        <button
          className='nxt'
          type='submit'
          name='button'
          value='Next'
          enable={emailVerified}
        >
          {'Next'}
        </button>
      )}
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
      {confirmStudentStatus ? (
        <ConnectionModal
          title='Please Confirm!'
          message={
            'The details entered for your Institute will be deleted. Be sure to confirm before proceeding.'
          }
          multiple={true}
          button1='Cancel'
          button2='Continue'
          func1={() => {
            setConfirmStudentStatus(false)
            setSchoolInfo((schoolInfo) => {
              return { ...schoolInfo, student: true }
            })
          }}
          func2={() => {
            setConfirmStudentStatus(false)
            setSchoolInfo((schoolInfo) => {
              return {
                ...schoolInfo,
                student: false,
                instituteCountryName: '',
                instituteCountry: '',
                instituteName: '',
                institute: '',
                department: '',
                matricNo: '',
                schoolEmail: '',
                level: '',
              }
            })
          }}
        />
      ) : undefined}
      <motion.div
        variants={headerVariants}
        className='infotag'
        ref={validatorRef}
      >
        Education Info
      </motion.div>
      {showValidatingStatus ? (
        <div
          style={{
            padding: '10px',
            margin: '20px',
            fontFamily: 'MonteserratBold',
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
        <FaUserCircle
          className='usr'
          style={{
            fontSize: '5rem',
            color: 'rgba(20,20,100,0.3)',
          }}
        />
        <div
          style={{
            width: 'fit-content',
            borderRadius: '20px',
            padding: '7px',
            margin: '15px auto',
            boxShadow:
              '-5px -5px 10px rgba(0, 0, 0, 0.1), 5px 5px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p className='over' style={{ padding: '13px' }}>
            <select
              ref={educationQualificationRef}
              className='input black'
              type='text'
              name='educationQualification'
              placeholder='Highest Qualification'
              value={schoolInfo.educationQualification}
              title='Highest Qualification'
            >
              <option value=''>
                {'Select Your Highest Educational Qualification'}
              </option>
              <option value='High School Diploma'>
                {'High School Diploma'}
              </option>
              <option value="Bachelor's Degree">{"Bachelor's Degree"}</option>
              <option value="Master's Degree">{"Master's Degree"}</option>
              <option value='Doctorate (PhD)'>{'Doctorate (PhD)'}</option>
              <option value='Associate Degree'>{'Associate Degree'}</option>
              <option value='Certificate Programs'>
                {'Certificate Programs'}
              </option>
              <option value='Diploma'>{'Diploma'}</option>
              <option value='GED (General Educational Development)'>
                {'GED (General Educational Development)'}
              </option>
              <option value='Vocational or Trade School Qualifications'>
                {'Vocational or Trade School Qualifications'}
              </option>
              <option value='Professional Certifications'>
                {'Professional Certifications'}
              </option>
            </select>
            <p className='inputStyle'></p>
          </p>
          <div style={{ margin: '20px auto' }}>
            <label
              style={{
                fontSize: '1rem',
                fontFamily: 'MonteserratLight',
                fontStyle: 'italic',
              }}
            >
              Are you currently a student of an Institution (University)?
            </label>
            <div
              style={{ display: 'flex', width: '100%', margin: '15px auto' }}
            >
              <div
                className='yesno'
                style={{
                  backgroundColor: schoolInfo.student ? 'blue' : 'whitesmoke',
                  color: schoolInfo.student ? 'white' : 'black',
                  border: 'solid blue 2px',
                }}
                onClick={() => {
                  setSchoolInfo((schoolInfo) => {
                    return { ...schoolInfo, student: true }
                  })
                }}
              >
                Yes
              </div>
              <div
                className='yesno'
                style={{
                  backgroundColor: schoolInfo.student ? 'whitesmoke' : 'blue',
                  color: schoolInfo.student ? 'black' : 'white',
                  border: 'solid blue 2px',
                }}
                onClick={() => {
                  setConfirmStudentStatus(true)
                }}
              >
                No
              </div>
            </div>

            {schoolInfo.student && (
              <div>
                <div
                  style={{
                    textAlign: 'left',
                    margin: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  <label>Institute Info</label>
                </div>
                <p className='over' style={{ padding: '13px' }}>
                  <select
                    ref={instituteCountryNameRef}
                    className='input'
                    name='instituteCountryName'
                    required={schoolInfo.student}
                    value={schoolInfo.instituteCountryName}
                    placeholder='Country'
                    title='Country'
                  >
                    <option index='' value=''>
                      {'Select Institute Region'}
                    </option>
                    <option index='' value='Others'>
                      Others
                    </option>
                    {countries.length
                      ? countries.sort().map((country, i) => {
                          if (country.name !== undefined) {
                            return (
                              <option num={i} value={country.name} key={i}>
                                {country.name}
                              </option>
                            )
                          }
                        })
                      : undefined}
                  </select>
                  <p className='inputStyle'></p>
                </p>
                <div>
                  <div className='over' style={{ padding: '13px' }}>
                    <input
                      ref={instituteNameRef}
                      className='input'
                      type='text'
                      name='instituteName'
                      placeholder='Enter Institute Name'
                      value={schoolInfo.instituteName}
                      required={schoolInfo.student}
                      title='Enter Institute Name'
                    />
                    <p className='inputStyle'></p>
                  </div>
                  {schoolInfo.instituteName &&
                    institutes.length > 0 &&
                    !institutes
                      .filter((institute) => {
                        if (institute.name !== undefined) {
                          return institute.name.toLowerCase().trim()
                        } else {
                          return institute.toLowerCase().trim()
                        }
                      })
                      .includes(
                        schoolInfo.instituteName.toLowerCase().trim()
                      ) && (
                      <div
                        style={{
                          textAlign: 'left',
                          backgroundColor: 'white',
                          listStyle: 'none',
                          padding: '10px',
                        }}
                      >
                        {institutes.map((institute, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                cursor: 'pointer',
                                padding: '50px auto',
                                margin: '10px auto',
                              }}
                              value={
                                institute.name !== undefined
                                  ? institute.name
                                  : institute
                              }
                              onClick={() => {
                                setSchoolInfo((schoolInfo) => {
                                  return {
                                    ...schoolInfo,
                                    instituteName:
                                      institute.name !== undefined
                                        ? institute.name
                                        : institute,
                                  }
                                })
                                setInstitutes([])
                              }}
                            >
                              {institute.name !== undefined
                                ? institute.name
                                : institute}
                            </div>
                          )
                        })}
                      </div>
                    )}
                </div>
                <div>
                  <div className='over' style={{ padding: '13px' }}>
                    <input
                      ref={departmentRef}
                      className='input'
                      type='text'
                      name='department'
                      placeholder='Enter Your Department'
                      value={schoolInfo.department}
                      required={schoolInfo.student}
                      title='Enter Your Department'
                    />
                    <p className='inputStyle'></p>
                  </div>
                  {schoolInfo.department && departments.length > 0 && (
                    <div
                      style={{
                        textAlign: 'left',
                        backgroundColor: 'white',
                        listStyle: 'none',
                        padding: '10px',
                      }}
                    >
                      {departments.map((dept, i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              cursor: 'pointer',
                              padding: '50px auto',
                              margin: '10px auto',
                            }}
                            value={dept}
                            onClick={() => {
                              setSchoolInfo((schoolInfo) => {
                                return {
                                  ...schoolInfo,
                                  department: dept,
                                }
                              })
                              setDepartments([])
                            }}
                          >
                            {dept}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                <p className='over' style={{ padding: '13px' }}>
                  <input
                    ref={matricNoRef}
                    className='input'
                    type='text'
                    name='matricNo'
                    placeholder='Enter Matric/Student Id'
                    value={schoolInfo.matricNo}
                    title='Enter Matric/Student Id'
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
                    required={schoolInfo.student}
                    title='Choose Your Level'
                  >
                    <option value=''>Choose Your Level</option>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                    <option value='300'>300</option>
                    <option value='400'>400</option>
                    <option value='500'>500</option>
                    <option value='600'>600</option>
                    <option value='700'>700</option>
                    <option value='Post Graduate'>Post Gradaute</option>
                  </select>
                  <p className='inputStyle'></p>
                </p>
                <div
                  style={{
                    margin: '10px',
                    fontSize: '.9rem',
                    fontWeight: 'bold',
                    display: 'flex',
                  }}
                >
                  <div
                    style={{ width: 'fit-content', marginRight: '20px' }}
                    onClick={() => {
                      setAddSchoolEmail(!addSchoolEmail)
                      if (!addSchoolEmail) {
                        setSchoolInfo((schoolInfo) => {
                          return { ...schoolInfo, schoolEmail: '' }
                        })
                      }
                    }}
                  >
                    {addSchoolEmail ? (
                      <FaCheckSquare
                        style={{
                          cursor: 'pointer',
                          color: 'green',
                        }}
                      />
                    ) : (
                      <input
                        type='checkbox'
                        checked={false}
                        style={{
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                      />
                    )}
                  </div>

                  <label>Add School Email?</label>
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
                      required={addSchoolEmail && schoolInfo.student}
                      title='Enter Your School Email'
                    />
                    <p className='inputStyle'></p>
                  </p>
                )}
              </div>
            )}
          </div>
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
          {!otherEmailExist && matchEmail(schoolInfo.otherEmail) && (
            <div
              style={{ margin: '5px', textAlign: 'center', fontSize: '.8rem' }}
            >
              <label
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                }}
              >
                {'Verify Email (' + schoolInfo.otherEmail + ')'}
              </label>
              {emailVerified ? (
                <p
                  style={{
                    textAlign: 'center',
                    color: 'green',
                    fontWeight: 'bold',
                  }}
                >
                  Email Verified
                </p>
              ) : (
                <div>
                  {codeSent && (
                    <div
                      style={{
                        display: 'flex',
                        margin: '15px',
                        justifyContent: 'center',
                      }}
                      onChange={handleCodeInput}
                      onKeyDown={handleBackSpace}
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
                              codeStatus !== 'Sending' &&
                              codeStatus !== 'Send Code'
                            }
                            name={i}
                            value={code.code}
                          />
                        )
                      })}
                    </div>
                  )}
                  {!codeSent ? (
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
                      onClick={handleSendCode}
                    >
                      <label style={{ cursor: 'pointer' }}>{codeStatus}</label>
                    </div>
                  ) : (
                    <div>
                      {inCorrectCode ? (
                        <div style={{ color: 'red' }}>Incorrect Code </div>
                      ) : (
                        ''
                      )}
                      <label>Resend Code </label>
                      <label>
                        {spanLeft ? (
                          'in : ' + String(spanLeft) + 's'
                        ) : (
                          <label
                            style={{
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              color: 'green',
                            }}
                            onClick={handleSendCode}
                          >
                            Resend
                          </label>
                        )}
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {prevNext}
      </div>
    </motion.div>
  )
}

export default FewSchoolInfo
