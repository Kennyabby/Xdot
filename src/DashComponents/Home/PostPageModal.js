import { React, useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'
import { FaGlobeAfrica, FaTimes, FaCheck } from 'react-icons/fa'
import { BsCameraFill } from 'react-icons/bs'
import { MdGroups } from 'react-icons/md'

import ContextProvider from '../../ContextProvider'

import cancel from '../Events/assets/close.png'
import wcancel from './assets/close.png'

const PostPageModal = ({ closeModal, notifyUpdate, user, server }) => {
  const history = useHistory()
  const tagRef = useRef(null)
  // const postLabel = ['public', 'cluster']
  const postLabel = ['public']
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  const { darkMode, winSize } = useContext(ContextProvider)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedClusters, setSelectedClusters] = useState([])
  const [imagesData, setImagesData] = useState([])
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [lastTouch, setLastTouch] = useState(0)
  const [count, setCount] = useState(0)
  const [categories, setCategories] = useState([
    'Science',
    'Arts',
    'Social Sciences',
    'Agricultural Science',
    'Engineering',
    'Technology',
    'Medicine',
    'Computer Science',
    'Data Science',
    'Data Analysis',
    'Data Analytics',
    'Sports',
  ])
  const label = {
    personal: { collection: 'PersonalFeed', value: 'Personal' },
    public: { collection: 'Public', value: 'Public' },
    cluster: { collection: 'Cluster', value: 'Cluster' },
  }
  const [fields, setFields] = useState({
    postComment: '',
    postTo: 'Public',
  })
  const [enterPressed, setEnterPressed] = useState(false)
  const imgRef = useRef(null)
  const postFieldRef = useRef(null)
  const [convertedFiles, setConvertedFiles] = useState([])
  useEffect(() => {}, [])
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  useEffect(() => {}, [fields])
  const handlePost = async () => {
    setShowUpdateStatus(true)
    // var collection = 'general'
    var postTo = fields.postTo
    // Object.values(label).forEach((labl) => {
    //   if (labl.value === fields.shareQuizTo) {
    //     collection = labl.collection
    //   }
    // })
    var imagesInfo = []
    var imagesName = []
    imagesData.forEach((data, i) => {
      var imgSrc = user.userName + '_' + String(Date.now() + i)
      var imageInfo = {
        image: convertedFiles[i],
        imageName: imgSrc,
        imageType: convertedFiles[i]['type'],
      }
      imagesInfo = imagesInfo.concat(imageInfo)
      imagesName = imagesName.concat({
        url: imgSrc,
        dominantColor: data.dominantColor,
        width: data.width,
        height: data.height,
      })
    })

    try {
      const createdAt = Date.now()
      if (postTo === 'Public') {
        const database = 'Public'
        const opts = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            database: database,
            collection: 'general',
            update: {
              userName: user.userName,
              postComment: fields.postComment,
              tags: selectedClusters,
              createdAt: createdAt,
              postPicture: imagesName,
            },
            imagesInfo: imagesInfo,
          }),
        }
        const resp = await fetch(server + '/createPost', opts)
        const response = await resp.json()
        const isDelivered = response.isDelivered
        if (isDelivered) {
          const database = 'User_' + user.userName
          const collection = 'personal'
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              database: database,
              collection: collection,
              update: {
                userName: user.userName,
                createdAt: createdAt,
              },
            }),
          }
          const resp = await fetch(server + '/createPost', opts)
          const response = await resp.json()
          const isDelivered = response.isDelivered
          if (isDelivered) {
            notifyUpdate('Posted to ' + postTo + ' Successfully')
            closeModal()
          }
        }
      } else if (postTo === 'Cluster') {
        const database = 'Cluster'
      }
    } catch (TypeError) {}
  }
  const fileHandler = async (e) => {
    var fileList = []
    var files = e.target.files
    var resize_width = 400
    for (var i = 0; i < files.length; i++) {
      fileList = fileList.concat(files[i])
    }
    fileList.forEach((file) => {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.name = file.name //get the image's name
      reader.size = file.size //get the image's size
      reader.onload = function (event) {
        var img = new Image() //create a image
        img.src = event.target.result //result is base64-encoded Data URI
        img.name = event.target.name //set name (optional)
        img.size = event.target.size //set size (optional)
        img.onload = function (el) {
          var elem = document.createElement('canvas')
          var scaleFactor = resize_width / el.target.width
          var ctx = elem.getContext('2d')
          elem.width = resize_width
          elem.height = el.target.height * scaleFactor

          ctx.drawImage(el.target, 0, 0, elem.width, elem.height)
          const imageData = ctx.getImageData(0, 0, elem.width, elem.height).data

          const pixelColors = []
          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i]
            const g = imageData[i + 1]
            const b = imageData[i + 2]
            const a = imageData[i + 3]
            pixelColors.push(`rgba(${r}, ${g}, ${b}, ${a})`)
          }

          const uniqueColors = new Set(pixelColors)

          const colorPalette = Array.from(uniqueColors)

          const colorCounts = {}
          let maxCount = 0
          let dominantColor = ''
          for (let i = 0; i < colorPalette.length; i++) {
            const color = colorPalette[i]
            colorCounts[color] = (colorCounts[color] || 0) + 1
            if (colorCounts[color] > maxCount) {
              maxCount = colorCounts[color]
              dominantColor = color
            }
          }
          var srcEncoded = elem.toDataURL('image/jpeg')
          // setDisplayImg(srcEncoded)
          setImagesData((imagesData) => {
            return [
              ...imagesData,
              {
                dominantColor: dominantColor,
                width: elem.width,
                height: elem.height,
              },
            ]
          })
          setConvertedFiles((convertedFiles) => {
            return [...convertedFiles, srcEncoded]
          })
        }
      }
    })
  }
  const setCaretPosition = (el, pos) => {
    const range = document.createRange()
    range.selectNodeContents(el.current)
    range.setStart(range.endContainer, 0)
    const childNodes = el.current.childNodes
    let found = false
    let offset = 0
    for (const childNode of childNodes) {
      if (offset + childNode.textContent.length >= pos) {
        range.setStart(childNode, pos - offset)
        range.setEnd(childNode, pos - offset)
        found = true
        break
      }
      offset += childNode.textContent.length
    }
    if (found) {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  const getCaretPosition = (el) => {
    let caretOffset = 0
    const doc = el.current.ownerDocument || el.current.document
    const win = doc.defaultView || doc.parentWindow
    const sel = win.getSelection()
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(el.current)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }

    return caretOffset
  }
  useEffect(() => {
    if (postFieldRef.current !== null) {
      const caretPos = getCaretPosition(postFieldRef)
      postFieldRef.current.textContent = fields.postComment
      if (enterPressed) {
        setCaretPosition(postFieldRef, caretPos + 1)
        setEnterPressed(false)
      } else {
        setCaretPosition(postFieldRef, caretPos)
      }
    }
  }, [fields.postComment])
  useEffect(() => {
    // if (tagRef.current) {
    //   console.log('yes:', scrollPosition)
    //   tagRef.current.scrollLeft -= scrollPosition
    // }
  }, [scrollPosition, tagRef])
  const onTouchStart = (e) => {
    const firstTouch = e.targetTouches[0].clientX
    setTouchStart(firstTouch)
  }
  const onTouchMove = (e) => {
    const currentTouch = e.targetTouches[0].clientX
    if (tagRef.current) {
      if (count === 0) {
        tagRef.current.scrollLeft -= currentTouch - touchStart
      } else {
        tagRef.current.scrollLeft -= currentTouch - lastTouch
      }
    }
    setCount(count + 1)
    setLastTouch(currentTouch)
    setTouchEnd(currentTouch)
  }
  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) {
    } else {
      setLastTouch(0)
      setCount(0)
    }
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
          when: 'beforeChildren',
        }}
        exit={{
          x: '100vw',
          opacity: 0,
          transition: { duration: 0.7, ease: 'easeIn' },
        }}
        className='postmodalpage'
        style={{
          borderRadius: '20px',
          backgroundColor: darkMode
            ? 'rgba(10,10,38,1)'
            : 'rgba(230,230,250,1)',
        }}
      >
        <FaTimes
          onClick={() => {
            closeModal()
          }}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: '1',
            fontSize: '1.2rem',
            color: darkMode ? 'white' : 'black',
            cursor: 'pointer',
          }}
        />

        <div
          style={{
            margin: 'auto',
            // width: 'fit-content',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 'auto',
              marginTop: '15px',
              width: 'fit-content',
              padding: '5px 10px',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: 'MonteserratRegular',
              fontWeight: 'bold',
            }}
          >
            <label style={{ margin: 'auto' }}>Create a Post</label>
          </div>

          <div
            onChange={handleInputChange}
            style={{
              display: 'block',
              margin: 'auto',
              padding: '5px',
              marginTop: '20px',
              fontWeight: 'bold',
            }}
          >
            <div
              style={{
                padding: 'auto',
                margin: 'auto',
                marginBottom: '21px',
                width: '98%',
                display: 'flex',
              }}
            >
              <div style={{ display: 'inline-flex', width: 'fit-content' }}>
                {fields.postTo === 'Public' ? (
                  <FaGlobeAfrica
                    style={{
                      fontSize: '1.5rem',
                      color: darkMode ? 'white' : 'black',
                      margin: 'auto 5px',
                    }}
                  />
                ) : (
                  <MdGroups
                    style={{
                      fontSize: '1.7rem',
                      color: darkMode ? 'white' : 'black',
                      margin: 'auto 5px',
                    }}
                  />
                )}
                <select
                  className='updateinput'
                  style={{
                    border: 'solid lightgreen 0px',
                    fontFamily: 'MonteserratRegular',
                    outline: 'none',
                    cursor: 'pointer',
                    color: darkMode ? 'white' : 'black',
                    padding: '5px 10px',
                  }}
                  name='postTo'
                  value={fields.postTo}
                >
                  {postLabel.map((labl) => {
                    return (
                      <option style={{ color: 'black' }}>
                        {label[labl].value}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div
                style={{
                  // margin: 'auto 50px',
                  marginLeft: 'auto',
                  width: 'fit-content',
                  fontFamily: 'MonteserratRegular',
                  display: 'inline-flex',
                  fontWeight: 'lighter',
                  fontSize: '.9rem',
                }}
              >
                <input
                  ref={imgRef}
                  type='file'
                  accept='image/*'
                  multiple
                  style={{ display: 'none' }}
                  onChange={fileHandler}
                />
                <BsCameraFill
                  style={{
                    fontSize: '1.5rem',
                    color: darkMode ? 'white' : 'black',
                    cursor: 'pointer',
                    margin: 'auto 10px',
                  }}
                  onClick={() => {
                    imgRef.current.click()
                  }}
                />
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <label
                style={{
                  fontFamily: 'MonteserratBold',
                  color: 'rgba(15,105,213)',
                  margin: '10px',
                }}
              >
                {'#tag: ' +
                  (selectedClusters.length > 0
                    ? '( ' + selectedClusters.length + ' )'
                    : '')}
              </label>
              <div
                ref={tagRef}
                style={{
                  display: winSize < 700 ? 'flex' : 'block',
                  width: '100%',
                  margin: 'auto',
                  overflowX: 'hidden',
                }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchMove={onTouchMove}
              >
                {categories.map((category, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        margin: '10px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '.9rem',
                        padding: '10px 15px',
                        borderRadius: '15px',
                        background: 'rgba(15,105,213)',
                        fontFamily: 'SourceCodeProRegular',
                        display: 'inline-flex',
                      }}
                      onClick={() => {
                        if (selectedClusters.includes(category)) {
                          setSelectedClusters((selectedClusters) => {
                            return selectedClusters.filter((cluster) => {
                              return cluster !== category
                            })
                          })
                        } else {
                          setSelectedClusters((selectedClusters) => {
                            return [...selectedClusters, category]
                          })
                        }
                      }}
                    >
                      <label style={{ width: 'max-content' }}>{category}</label>
                      {selectedClusters.includes(category) && (
                        <FaCheck
                          style={{
                            marginLeft: '15px',
                            marginTop: '4px',
                            color: 'lightgreen',
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div
              ref={postFieldRef}
              contentEditable='true'
              placeholder='Say Something...'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  let caretPos = getCaretPosition(postFieldRef)
                  const value = e.currentTarget.textContent
                  let preVal = value.slice(0, caretPos)
                  let postVal = value.slice(caretPos)
                  setEnterPressed(true)
                  if (postVal.length === 0) {
                    const newValue = value + '\n\n'
                    setFields((fields) => {
                      return { ...fields, postComment: newValue }
                    })
                  } else {
                    let newPreVal = preVal + '\n'
                    const newValue = newPreVal + postVal
                    setFields((fields) => {
                      return { ...fields, postComment: newValue }
                    })
                  }
                } else {
                  setEnterPressed(false)
                }
              }}
              onInput={(e) => {
                const value = e.currentTarget.textContent
                setFields((fields) => {
                  return { ...fields, postComment: value }
                })
              }}
              style={{
                textAlign: 'left',
                backgroundColor: darkMode
                  ? 'rgba(250,250,250,0.1)'
                  : 'rgba(255,255,255,0.7)',
                padding: '10px',
                color: darkMode ? 'white' : 'black',
                fontSize: '1rem',
                fontFamily: 'MonteserratRegular',
                fontWeight: 'normal',
                whiteSpace: 'pre-wrap',
                borderRadius: '10px',
                maxHeight: '300px',
                height: '200px',
                overflowY: 'auto',
                margin: '20px auto',
                outline: 'none',
                width: '90%',
              }}
            ></div>
          </div>
          {convertedFiles.length ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '10px',
                width: 'fit-content',
              }}
            >
              {convertedFiles.map((convertedFile, i) => {
                return (
                  i <= 4 && (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        width: 'fit-content',
                        cursor: 'pointer',
                        margin: '7px',
                      }}
                    >
                      <img
                        src={convertedFile}
                        height='100px'
                        style={{ cursor: 'pointer' }}
                      />
                      {i === 4 && convertedFiles.length > 5 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            zIndex: '1',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          {convertedFiles.length > 5 && (
                            <div
                              style={{
                                color: 'white',
                                marginTop: '20px',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                flexWrap: 'wrap',
                              }}
                            >
                              {'+' + String(convertedFiles.length - 5)}
                            </div>
                          )}
                        </div>
                      )}
                      {i <= 4 && (
                        <FaTimes
                          onClick={() => {
                            setConvertedFiles((convertedFiles) => {
                              return convertedFiles.filter(
                                (convertedFile, index) => {
                                  return index !== i
                                }
                              )
                            })
                          }}
                          style={{
                            position: 'absolute',
                            padding: '3px',
                            borderRadius: '50%',
                            border: 'solid black 1px',
                            color: darkMode ? 'white' : 'black',
                            background: darkMode ? 'rgba(10,10,10,1)' : 'white',
                            bottom: '-5px',
                            right: '-5px',
                            zIndex: '1',
                            borderRadius: '50%',
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </div>
                  )
                )
              })}
            </div>
          ) : undefined}
          {(fields.postComment || convertedFiles.length > 0) && (
            <div
              style={{
                width: 'fit-content',
                margin: '20px',
                marginRight: 'auto',
                marginLeft: '10px',
              }}
            >
              <button
                onClick={handlePost}
                style={{
                  marginRight: 'auto',
                  fontFamily: 'SourceCodeProRegular',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '10px 20px',
                  borderRadius: '15px',
                  backgroundColor: darkMode
                    ? 'rgba(0,0,0,0.3)'
                    : 'rgba(255,255,255,0.3)',
                  color: 'rgba(15, 105, 213)',
                  border: darkMode
                    ? 'solid rgba(15, 105, 213) 2px'
                    : 'solid rgba(15, 105, 213) 2px',
                  cursor: 'pointer',
                }}
              >
                {'Post'}
              </button>
            </div>
          )}
          <div style={{ margin: '50px' }}></div>
          {showUpdateStatus && (
            <p>
              <label
                style={{
                  color: 'rgba(15, 105 , 213)',
                  backgroundColor: 'lightblue',
                  borderRadius: '10px',
                  padding: '10px',
                  fontFamily: 'SourceCodeProRegular',
                  marginBottom: '50px',
                  fontStyle: 'italic',
                  fontSize: '.9rem',
                  border: 'solid rgba(15, 105, 213) 2px',
                }}
              >
                {'Posting. Please Wait...'}
              </label>
            </p>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default PostPageModal
