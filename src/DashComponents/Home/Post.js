import { React, useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useParams, useHistory } from 'react-router-dom'
import '../Events/Events.css'

import profimg from '../Events/assets/profile.png'
import close from '../Events/assets/close.png'
import cls from '../assets/close.png'
import back from '../Events/assets/left.png'
import opt from './assets/b3dots.png'
import wopt from './assets/w3dots.png'
import comment from '../Events/assets/comment.png'
import wcomment from './assets/wcomment.png'
import blcomment from '../Events/assets/blcomment.png'
import lbcomment from './assets/lbcomment.png'
import sbllike from '../Events/assets/sbllike.png'
import share from '../Events/assets/share.png'
import like from '../Events/assets/like.png'
import wreact from './assets/wnlike.png'
import love from '../Events/assets/love.png'
import care from '../Events/assets/care.png'
import haha from '../Events/assets/haha.png'
import wow from '../Events/assets/wow.png'
import sad from '../Events/assets/sad.png'
import angry from '../Events/assets/angry.png'
import send from '../Events/assets/send.png'
import react from '../Events/assets/react.png'
import PostComment from './PostComment'
import ReactionList from './ReactionList'

import ContextProvider from '../../ContextProvider'

const Post = ({
  server,
  status,
  currentPostShow,
  postRef,
  user,
  updt,
  setHighlightedPost,
  updatePostAt,
  newPostShow,
  showHomeToggle,
  setScrollCompleted,
  viewRef,
}) => {
  const { id } = useParams()
  const history = useHistory()
  const commentInputRef = useRef(null)
  const reactActionRef = useRef(null)
  const reactionsRef = useRef(null)
  const [postUser, setPostUser] = useState({ userName: 'Creator' })
  const [leftOffset, setLeftOffset] = useState('')
  const [topOffset, setTopOffset] = useState('')
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [postPictures, setPostPictures] = useState([])
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isReacted, setIsReacted] = useState(false)
  const [isCommented, setIsCommented] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [showReactionList, setShowReactionList] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showPost, setShowPost] = useState(true)
  const [showImage, setShowImage] = useState({ show: false })
  const [postShow, setPostShow] = useState(null)
  const [update, setUpdate] = useState({})
  const [postReaction, setPostReaction] = useState({
    name: 'react',
    src: react,
  })
  const [postComment, setPostComment] = useState('')
  const [enterPressed, setEnterPressed] = useState(false)
  const [allowedLength, setAllowedLength] = useState(61)
  const { darkMode } = useContext(ContextProvider)
  const emojis = [
    { name: 'like', src: like },
    { name: 'love', src: love },
    { name: 'care', src: care },
    { name: 'haha', src: haha },
    { name: 'wow', src: wow },
    { name: 'sad', src: sad },
    { name: 'angry', src: angry },
  ]
  // useEffect(() => {
  //   return history.listen(() => {
  //     if (history.action === 'POP') {
  //       console.log('back pressed')
  //       history.go(1)
  //     }
  //   })
  // }, [history])
  useEffect(() => {
    if (window.innerWidth <= 700) {
      setLeftOffset(String(-((window.innerWidth - 300) / 2 + 100)) + 'px')
    } else {
      setLeftOffset(String(-((window.innerWidth - 300) / 2 - 100)) + 'px')
    }
    setTopOffset(
      String(reactActionRef.current.getBoundingClientRect().top - 140) + 'px'
    )
  }, [])

  const watchScroll = () => {
    setTopOffset(
      String(reactActionRef.current.getBoundingClientRect().top - 140) + 'px'
    )
  }
  useEffect(() => {
    window.addEventListener('scroll', watchScroll)
    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [topOffset])
  useEffect(() => {
    viewRef.current.addEventListener('scroll', watchScroll)
    return () => {
      viewRef.current.removeEventListener('scroll', watchScroll)
    }
  }, [topOffset])
  useEffect(async () => {
    if (postUser.matricNo !== undefined && !imgLoaded) {
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imgUrl: postUser.img,
          matricNo: postUser.matricNo,
        }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
      setImgLoaded(true)
      if (updt.postPicture !== undefined && updt.postPicture.length) {
        if (!postPictures.length) {
          setPostPictures([])
          updt.postPicture.forEach(async (picture) => {
            const opts2 = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imgUrl: picture,
                matricNo: postUser.matricNo,
                imagePath: 'postImages',
              }),
            }
            const resp2 = await fetch(server + '/getImgUrl', opts2)
            const response2 = await resp2.json()
            const url1 = response2.url
            setPostPictures((postPictures) => {
              return [...postPictures, url1]
            })
          })
        }
      }
    }
  }, [postUser])
  useEffect(async () => {
    setUpdate(updt)
    if (!imgLoaded) {
      setUserImgUrl(profimg)
      setPostPictures([])
    }
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricNo: updt.matricNo }),
      }
      const resp = await fetch(server + '/getUserDetails', opts)
      const response = await resp.json()
      const user = response.user
      setPostUser(user)
    } catch (TypeError) {}
  }, [updt])
  useEffect(() => {
    if (updt['react'] !== undefined) {
      var bd = {}
      var ind
      updt['react'].forEach((bdy, index) => {
        if (bdy.matricNo === user.matricNo) {
          bd = bdy
          ind = index
        }
      })
      if (updt['react'].includes(bd)) {
        setIsReacted(true)
        emojis.forEach((emoji, i) => {
          if (emoji.name === updt['react'][ind].reaction) {
            setPostReaction(emoji)
          }
        })
      } else {
        setIsReacted(false)
        setPostReaction({
          name: 'react',
          src: react,
        })
      }
    } else {
      setIsReacted(false)
      setPostReaction({
        name: 'react',
        src: react,
      })
    }
    if (updt['comment'] !== undefined) {
      updt['comment'].forEach((bdy) => {
        if (bdy.matricNo === user.matricNo) {
          setIsCommented(true)
        }
      })
    } else {
      setIsCommented(false)
    }
    if (status !== undefined) {
      setShowComments(true)
    }
  }, [updt])
  useEffect(() => {
    if (status !== undefined) {
      showHomeToggle(false)
    } else {
      showHomeToggle(true)
    }
  }, [status])
  const updateReactions = async ({
    rct,
    reaction,
    comment,
    reacted,
    statorBody,
  }) => {
    await updatePostAt({ createdAt: update.createdAt, refresh: false }).then(
      async (upd) => {
        var rctBody
        if (upd[rct] !== undefined) {
          rctBody = await upd[rct]
        } else {
          rctBody = []
        }
        if (rct === 'react') {
          if (reacted) {
            rctBody = rctBody.filter((bdy) => {
              if (bdy.matricNo !== user.matricNo) {
                return bdy
              }
            })
          } else {
            const body = {
              matricNo: user.matricNo,
              userName: user.userName,
              img: user.img,
              createdAt: Date.now(),
              reaction: reaction,
            }
            rctBody = rctBody.concat(body)
          }
        } else if (rct === 'comment') {
          if (statorBody !== undefined) {
            rctBody.forEach((bdy) => {
              if (bdy.createdAt === statorBody.createdAt) {
                if (statorBody.action === 'react') {
                  var reacted = false
                  bdy.comment.reaction.forEach((bdycm) => {
                    if (bdycm.matricNo === user.matricNo) {
                      reacted = true

                      bdy.comment.reaction = bdy.comment.reaction.filter(
                        (bd) => {
                          return bd.matricNo !== user.matricNo
                        }
                      )
                    }
                  })
                  if (reacted === false) {
                    const body = {
                      matricNo: user.matricNo,
                      userName: user.userName,
                      img: user.img,
                      createdAt: Date.now(),
                      reaction: statorBody.reaction,
                    }
                    bdy.comment.reaction = bdy.comment.reaction.concat(body)
                  }
                } else if (statorBody.action === 'comment') {
                  if (statorBody.statorReplyBody !== undefined) {
                    bdy.comment.reply.forEach((rpl) => {
                      if (
                        rpl.createdAt === statorBody.statorReplyBody.createdAt
                      ) {
                        if (statorBody.statorReplyBody.action === 'react') {
                          var reacted = false
                          rpl.commentReply.reaction.forEach((rl) => {
                            if (rl.matricNo === user.matricNo) {
                              reacted = true
                              rpl.commentReply.reaction =
                                rpl.commentReply.reaction.filter((bd) => {
                                  return bd.matricNo !== user.matricNo
                                })
                            }
                          })
                          if (reacted === false) {
                            const body = {
                              matricNo: user.matricNo,
                              userName: user.userName,
                              img: user.img,
                              createdAt: Date.now(),
                              reaction: statorBody.statorReplyBody.reaction,
                            }
                            rpl.commentReply.reaction =
                              rpl.commentReply.reaction.concat(body)
                          }
                        }
                      }
                    })
                  } else {
                    const body = {
                      matricNo: user.matricNo,
                      userName: user.userName,
                      img: user.img,
                      createdAt: Date.now(),
                      commentReply: {
                        statement: statorBody.comment,
                        reaction: [],
                      },
                    }
                    bdy.comment.reply = bdy.comment.reply.concat(body)
                  }
                }
              }
            })
          } else {
            const body = {
              matricNo: user.matricNo,
              userName: user.userName,
              img: user.img,
              createdAt: Date.now(),
              comment: { statement: comment, reaction: [], reply: [] },
            }
            rctBody = rctBody.concat(body)
          }
        } else if (rct === 'share') {
          const body = {
            matricNo: user.matricNo,
            userName: user.userName,
            img: user.img,
            createdAt: Date.now(),
          }
          rctBody = rctBody.concat(body)
        }
        try {
          const opts = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              collection: 'NapsPublic',
              prop: [
                { createdAt: update.createdAt },
                {
                  [rct]: rctBody,
                },
              ],
            }),
          }
          const resp = await fetch(server + '/updateOneDoc', opts)
          const response = await resp.json()
          const updated = response.updated
          if (updated) {
            if (rct === 'react') {
              if (reacted === false) {
                setIsReacted(true)
              } else {
                setIsReacted(false)
              }
            } else if (rct === 'comment') {
              if (statorBody === undefined) {
                if (!isCommented) {
                  setIsCommented(true)
                }
              }
            }
            updatePostAt({
              createdAt: update.createdAt,
              refresh: true,
              rct: rct,
            })
          }
        } catch (TypeError) {}
      }
    )
  }
  const handleReactions = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'react') {
      if (isReacted) {
        updateReactions({ rct: 'react', reacted: true })
      } else {
        setShowReactions(true)
      }
    }
  }

  const setCaretPosition = (el, pos) => {
    const range = document.createRange()
    // console.log(el.current)
    const childNodes = el.current.childNodes
    // console.log(childNodes)
    // console.log('comment: ', childNode.innerHTML)
    let found = false
    let offset = 0
    for (const childNode of childNodes) {
      range.selectNodeContents(childNode)
      const childLength = childNode.textContent.length
      if (offset + childLength >= pos) {
        if (childNode.innerHTML !== undefined) {
          for (const child of childNode.childNodes) {
            range.selectNodeContents(child)
            range.setStart(range.endContainer, pos - offset)
            range.setEnd(range.endContainer, pos - offset)
          }
        } else {
          range.setStart(range.endContainer, pos - offset)
          range.setEnd(range.endContainer, pos - offset)
        }
        found = true
        break
      }
      offset += childLength
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
    if (commentInputRef.current !== null) {
      const caretPos = getCaretPosition(commentInputRef)
      commentInputRef.current.innerHTML = postComment
      if (enterPressed) {
        setCaretPosition(commentInputRef, caretPos + 1)
        setEnterPressed(false)
      } else {
        setCaretPosition(commentInputRef, caretPos)
      }
    }
  }, [postComment])
  const inspectPost = async (value) => {
    const valueList = value.split(' ')
    var validatedValue = value
    valueList.forEach((val, index) => {
      if (val.slice(0, 1) === '@' && val.length > 1) {
        valueList[index] =
          `<label style=color:${darkMode ? 'darkorange' : 'orange'}>` +
          val +
          '</label>'
      }
    })
    validatedValue = valueList.join(' ')
    return validatedValue
  }
  const filterComment = (comment) => {
    var filteredComment = comment
    const commentList = comment.split(' ')
    commentList.forEach((word, i) => {
      if (
        i !== commentList.length - 1 &&
        word === '<label' &&
        commentList[i + 1].slice(0, 5) === 'style' &&
        commentList[i + 1].slice(commentList[i + 1].length - 1) === '>'
      ) {
        let checkWord = word + ' ' + commentList[i + 1]
        const div = document.createElement('div')
        div.innerHTML = checkWord
        const firstNode = div.childNodes[0]
        if (
          firstNode.innerHTML !== undefined &&
          firstNode.innerHTML.slice(0, 1) === '@'
        ) {
          commentList[i] = ''.trim()
          commentList[i + 1] = firstNode.innerHTML.trim()
        }
      }
    })
    filteredComment = commentList
      .filter((word) => {
        return word !== ''
      })
      .join(' ')
    return filteredComment
  }
  return (
    <>
      <div
        style={{
          fontFamily: 'monospace',
          margin: 'auto',
          marginBottom: '10px',
          padding: '0px',
          paddingTop: status === undefined ? '0px' : '60px',
          backgroundColor: darkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
          borderBottom: darkMode
            ? 'solid black 0px'
            : status === undefined
            ? 'solid rgba(200,200,200,1) 0px'
            : 'solid rgba(200,200,200,1) 0px',
        }}
      >
        <AnimatePresence>
          {showImage.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              exit={{ opacity: 0, transition: { ease: 'easeIn' } }}
              style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: '0px',
                zIndex: '3',
                left: '0px',
                backgroundColor: 'rgba(19,19,20,1)',
              }}
            >
              <img
                src={cls}
                style={{
                  position: 'fixed',
                  top: '5px',
                  left: '5px',
                  zIndex: '3',
                  cursor: 'pointer',
                }}
                height='20px'
                onClick={() => {
                  setShowImage((showImage) => {
                    return { ...showImage, show: false }
                  })
                }}
              />
              <motion.div
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                transition={{ ease: 'easeOut' }}
                exit={{ scale: 0.2, transition: { ease: 'easeIn' } }}
                className='profimgview'
              >
                <LazyLoadImage
                  src={showImage.src}
                  width='100%'
                  effect='blur'
                  alt='user photo'
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {status !== undefined ? (
          <div>
            <div
              className='toppostlabel'
              style={{
                backgroundColor: darkMode
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.9)',
                color: darkMode ? 'white' : 'black',
              }}
            >
              <img
                onClick={() => {
                  if (postShow === null) {
                    setHighlightedPost(null)
                    showHomeToggle(true)
                    var pageOffset = Number(
                      window.sessionStorage.getItem('pageOffset')
                    )
                    setScrollCompleted(false)
                    setTimeout(() => {
                      if (window.innerWidth <= 700) {
                        window.scrollTo(0, pageOffset)
                      } else {
                        viewRef.current.scrollTop = pageOffset
                      }
                      setScrollCompleted(true)
                    }, 300)
                  } else {
                    setPostShow(null)
                    currentPostShow(null)
                  }
                }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                src={back}
                height='15px'
              />
              <div>
                {postShow === null
                  ? postUser.userName + "'s Post"
                  : 'Reply ' + postShow.userName}{' '}
              </div>
            </div>
          </div>
        ) : undefined}
        {postShow === null ? (
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: 'fit-content',
                position: 'absolute',
                right: '10px',
                top: '20px',
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              <img src={darkMode ? wopt : opt} height='15px' />
            </div>
            <div
              style={{
                display: 'flex',
                height: 'fit-content',
                width: 'fit-content',
              }}
            >
              <div
                style={{
                  margin: '10px',
                  marginLeft: '8px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  display: 'block',
                }}
              >
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setShowImage((showImage) => {
                      return { ...showImage, show: true, src: userImgUrl }
                    })
                  }}
                >
                  <LazyLoadImage
                    src={userImgUrl}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: '50%',
                      border: 'solid rgba(220,220,220,1) 1px',
                      backgroundSize: 'cover',
                      backgroundColor: darkMode
                        ? 'rgba(255,255,255,0.2)'
                        : 'white',
                      margin: '5px auto',
                    }}
                    PlaceholderSrc={profimg}
                    effect='blur'
                    alt='user photo'
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: '20px',
                  marginLeft: '5px',
                  fontStyle: 'italic',
                  fontSize: '.7rem',
                  textAlign: 'left',
                }}
              >
                {postUser.lastName !== undefined ? (
                  <div>
                    <label
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'verdana',
                        fontSize: '.73rem',
                      }}
                    >
                      {postUser.userName}
                    </label>
                  </div>
                ) : undefined}
                <PeriodLabel createdAt={update.createdAt} />
              </div>
            </div>
            <div
              style={{
                backgroundColor: darkMode
                  ? 'rgba(10,10,10,0)'
                  : 'rgba(247,247,255,0)',
                padding: '0px',
                width: '92%',
                marginLeft: 'auto',
                paddingBottom: '15px',
                borderLeft: darkMode
                  ? 'solid rgba(250,250,250,1) 2px'
                  : 'solid rgba(10,10,10,1) 2px',
              }}
            >
              {postPictures.length ? (
                <div
                  style={{
                    display: 'flex',
                    margin: '0px',
                    padding: '0px',
                  }}
                >
                  {postPictures.map((postPicture, i) => {
                    return (
                      i <= 4 && (
                        <div
                          key={i}
                          style={{
                            position: 'relative',
                            cursor: 'pointer',
                            margin: '0px',
                            width: '100%',
                          }}
                          onClick={() => {
                            setShowImage((showImage) => {
                              return {
                                ...showImage,
                                show: true,
                                src: postPicture,
                              }
                            })
                          }}
                        >
                          <LazyLoadImage
                            src={postPicture}
                            width='100%'
                            effect='blur'
                            style={{ cursor: 'pointer' }}
                          />
                          {i === 4 && postPictures.length > 5 && (
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
                              {postPictures.length > 5 && (
                                <div
                                  style={{
                                    color: 'white',
                                    marginTop: '20px',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {'+' + String(postPictures.length - 5)}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )
                  })}
                </div>
              ) : (
                <div style={{ paddingBottom: '15px' }}></div>
              )}
              <div
                style={{
                  textAlign: 'left',
                  padding: '15px',
                  margin: '15px',
                  fontFamily: 'calibri',
                  borderRadius: '15px',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: darkMode ? '' : '',
                  boxShadow: darkMode
                    ? '-4px -4px 10px rgba(2,2,2,0.1), 4px 4px 10px rgba(2,2,2,0.1)'
                    : '-4px -4px 10px rgba(100,100,100,0.1), 4px 4px 10px rgba(100,100,100,0.1)',
                }}
              >
                {update.postComment !== undefined &&
                  (update.postComment.split(' ').length <= 60 ? (
                    <label>
                      {update.postComment.split(' ').map((cmt) => {
                        if (cmt.slice(0, 1) === '@' && cmt.length > 1) {
                          return (
                            <label
                              style={{
                                color: darkMode ? 'darkorange' : 'orange',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                              }}
                            >
                              {cmt.slice(1) + ' '}
                            </label>
                          )
                        }
                        return <label>{cmt + ' '}</label>
                      })}
                    </label>
                  ) : (
                    <label style={{ whiteSpace: 'pre-wrap' }}>
                      {(
                        update.postComment
                          .split(' ')
                          .slice(0, allowedLength)
                          .join(' ') +
                        (allowedLength <= update.postComment.split(' ').length
                          ? ' ... '
                          : '')
                      )
                        .split(' ')
                        .map((cmt) => {
                          if (cmt.slice(0, 1) === '@' && cmt.length > 1) {
                            return (
                              <label
                                style={{
                                  color: darkMode ? 'darkorange' : 'orange',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                              >
                                {cmt.slice(1) + ' '}
                              </label>
                            )
                          }
                          return <label>{cmt + ' '}</label>
                        })}

                      {
                        <label
                          onClick={() => {
                            if (
                              allowedLength <=
                              update.postComment.split(' ').length
                            ) {
                              setAllowedLength((allowedLength) => {
                                return allowedLength + 70
                              })
                            } else {
                              setAllowedLength(61)
                            }
                          }}
                          style={{
                            cursor: 'pointer',
                            color: darkMode ? 'orange' : 'darkorange',
                          }}
                        >
                          {allowedLength <= update.postComment.split(' ').length
                            ? 'See More'
                            : ''}
                        </label>
                      }
                    </label>
                  ))}
              </div>
            </div>
            {showReactionList ? (
              <ReactionList
                list={update['react']}
                closeReactionList={() => {
                  setShowReactionList(false)
                }}
              />
            ) : undefined}
            <div>
              <div
                style={{
                  width: '90%',
                  margin: '5px',
                  marginLeft: 'auto',
                  display: 'flex',
                }}
              >
                {update['react'] !== undefined ? (
                  <div
                    style={{ display: 'flex', cursor: 'pointer' }}
                    onClick={() => {
                      setShowReactionList(true)
                    }}
                  >
                    {emojis
                      .filter((emoji) => {
                        const filter = update['react'].filter((rct) => {
                          return rct.reaction === emoji.name
                        })
                        if (filter.length) {
                          return filter[0].reaction === emoji.name
                        }
                      })
                      .map((emoji, i) => {
                        if (i <= 2) {
                          return (
                            <img
                              key={i}
                              src={emoji.src}
                              alt='reactions'
                              height='15px'
                            />
                          )
                        }
                        return ''
                      })}
                  </div>
                ) : (
                  ''
                )}
                <label style={{ fontSize: '0.8rem', marginLeft: '10px' }}>
                  {update['react'] !== undefined
                    ? (isReacted ? 'You ' : '') +
                      (update['react'].length
                        ? isReacted
                          ? update['react'].length - 1 > 0
                            ? ' and ' + String(update['react'].length - 1)
                            : ''
                          : String(update['react'].length) +
                            (update['react'].length - 1 > 0
                              ? ' Napsites'
                              : ' Napsite')
                        : '') +
                      (update['react'].length - 1 > 0 && isReacted
                        ? ' Other(s)'
                        : '') +
                      (update['react'].length ? ' Reacted to this Post' : '')
                    : ''}
                </label>
              </div>
              <div
                onClick={handleReactions}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '5px',
                  paddingBottom: '10px',
                  borderBottom:
                    status === undefined ? '' : 'solid rgba(210,210,210,1) 2px',
                  marginTop: '15px',
                  width: '92%',
                  marginLeft: 'auto',
                }}
              >
                <div
                  ref={reactActionRef}
                  style={{
                    position: 'absolute',
                    left: '0px',
                    display: 'flex',
                    width: 'fit-content',
                    padding: '5px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    backgroundColor: darkMode
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(235,235,235,1)',
                    color: darkMode ? 'white' : 'black',
                    borderRadius: '15px',
                    cursor: 'pointer',
                  }}
                  name='react'
                >
                  <AnimatePresence>
                    {showReactions && (
                      <div
                        style={{
                          position: 'fixed',
                          left: '0px',
                          top: '0px',
                          zIndex: '3',
                          width: '100vw',
                          height: '100%',
                        }}
                        onClick={() => {
                          setShowReactions(false)
                        }}
                        onTouchStart={() => {
                          setTimeout(() => {
                            setShowReactions(false)
                          }, 500)
                        }}
                      >
                        <motion.div
                          ref={reactionsRef}
                          initial={{
                            scale: 0,
                            opacity: 0,
                            y: topOffset,
                            x: leftOffset,
                          }}
                          animate={{ scale: 1, y: 0, x: 0, opacity: 1 }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          exit={{
                            scale: 0,
                            opacity: 0,
                            y: topOffset,
                            x: leftOffset,
                            transition: { duration: 0.3 },
                          }}
                          onClick={(e) => {
                            const name = e.target.getAttribute('name')
                            if (name !== undefined && name !== null) {
                              setShowReactions(false)
                              emojis.forEach((emoji, i) => {
                                if (emoji.name === name) {
                                  setPostReaction(emoji)
                                }
                              })
                              updateReactions({
                                rct: 'react',
                                reaction: name,
                                reacted: false,
                              })
                            }
                          }}
                          style={{
                            position: 'relative',
                            flexWrap: 'wrap',
                            zIndex: '3',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '300px',
                            margin: '100px auto',
                            display: 'flex',
                            padding: '10px',
                            borderRadius: '10px',
                            backgroundColor: darkMode
                              ? 'rgba(255,255,255,0.2)'
                              : 'rgba(0,0,0,0.7)',
                          }}
                        >
                          <div>
                            <img
                              onClick={() => {
                                setShowReactions(false)
                              }}
                              src={close}
                              alt='close reactions'
                              style={{
                                position: 'absolute',
                                top: '7px',
                                left: '7px',
                                zIndex: '3',
                              }}
                              height='15px'
                            />
                          </div>
                          {emojis.map((rct, i) => {
                            return (
                              <img
                                key={i}
                                name={rct.name}
                                src={rct.src}
                                alt='reaction'
                                style={{
                                  zIndex: '3',
                                  padding: '10px',
                                  cursor: 'pointer',
                                }}
                                height='40px'
                              />
                            )
                          })}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                  <div style={{ display: 'flex' }}></div>
                  <img
                    name='react'
                    style={{
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                    src={
                      isReacted
                        ? postReaction.name === 'like'
                          ? sbllike
                          : postReaction.src
                        : darkMode
                        ? wreact
                        : react
                    }
                    alt='reaction'
                    height={isReacted ? '20px' : '20px'}
                  />
                  <label style={{ fontSize: '.8rem', marginTop: '3px' }}>
                    {' ' +
                      (update['react'] !== undefined && update['react'].length
                        ? update['react'].length
                        : '')}
                  </label>
                </div>
                <div
                  onClick={() => {
                    if (commentInputRef.current !== null) {
                      commentInputRef.current.focus()
                    }
                    if (showComments) {
                    } else {
                      setHighlightedPost(update)
                      updatePostAt({
                        createdAt: update.createdAt,
                        refresh: true,
                      })
                    }
                  }}
                  style={{
                    display: 'flex',
                    width: 'fit-content',
                    padding: '5px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    backgroundColor: darkMode
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(235,235,235,1)',
                    color: darkMode ? 'white' : 'black',
                    borderRadius: '15px',
                    cursor: 'pointer',
                  }}
                  name='comment'
                >
                  <div style={{ display: 'flex' }}>
                    <img
                      src={
                        isCommented
                          ? darkMode
                            ? lbcomment
                            : blcomment
                          : darkMode
                          ? wcomment
                          : comment
                      }
                      alt='comment'
                      name='comment'
                      style={{
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                      height='20px'
                    />
                  </div>
                  <label
                    name='comment'
                    style={{
                      fontSize: '.8rem',
                      marginTop: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    {update['comment'] !== undefined && update['comment'].length
                      ? update['comment'].length
                      : ''}
                  </label>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '0px',
                    display: 'flex',
                    width: 'fit-content',
                    padding: '5px 20px',
                    backgroundColor: darkMode
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(235,235,235,1)',
                    color: darkMode ? 'white' : 'black',
                    borderRadius: '15px',
                    cursor: 'pointer',
                  }}
                  name='share'
                >
                  <img
                    name='share'
                    style={{
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                    src={share}
                    alt='reaction'
                    height={'20px'}
                  />
                  <label style={{ fontSize: '.8rem', marginTop: '3px' }}>
                    {' ' +
                      (update['share'] !== undefined && update['share'].length
                        ? update['share'].length
                        : '')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : undefined}
        <AnimatePresence>
          {showComments && (
            <motion.div>
              <div
                name='commentView'
                style={{
                  backgroundColor: darkMode
                    ? 'rgba(10,10,18,1)'
                    : 'rgba(245,245,255,1)',
                  paddingTop: '30px',
                  paddingBottom: '100px',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {postShow === null ? (
                  update['comment'] !== undefined &&
                  update['comment'].length ? (
                    update['comment'].map((elem, i) => {
                      return (
                        <PostComment
                          server={server}
                          key={i}
                          elem={elem}
                          user={user}
                          updateReactions={(value) => {
                            updateReactions(value)
                          }}
                          setShowPost={(req) => {
                            setShowPost(req.show)
                            setPostShow(req.post)
                            currentPostShow(req.post)
                          }}
                          postShow={
                            newPostShow === null ? postShow : newPostShow
                          }
                          setPostComment={({ value, matricNo }) => {
                            setPostComment(value)
                            commentInputRef.current.focus()
                            setTimeout(() => {
                              setCaretPosition(commentInputRef, value.length)
                            }, 100)
                          }}
                        />
                      )
                    })
                  ) : (
                    'Be the first to comment'
                  )
                ) : (
                  <PostComment
                    server={server}
                    elem={newPostShow === null ? postShow : newPostShow}
                    user={user}
                    postShow={newPostShow === null ? postShow : newPostShow}
                    updateReactions={(value) => {
                      updateReactions(value)
                    }}
                    setShowPost={(req) => {
                      setShowPost(req.show)
                      setPostShow(req.post)
                      currentPostShow(req.post)
                    }}
                    showPost={showPost}
                    setPostComment={({ value, matricNo }) => {
                      setPostComment(value)
                      commentInputRef.current.focus()
                      setTimeout(() => {
                        setCaretPosition(commentInputRef, value.length)
                      }, 100)
                    }}
                  />
                )}
              </div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.7,
                    ease: 'easeIn',
                  },
                }}
                className='cmCover'
              >
                <div
                  className='commentinput'
                  style={{
                    backgroundColor: darkMode
                      ? 'rgba(50,50,50,1)'
                      : 'rgba(245, 245, 245, 1)',
                    border: 'solid rgba(180, 180, 180, 1) 3px',
                    color: darkMode ? 'white' : 'black',
                  }}
                >
                  <div
                    contentEditable='true'
                    placeholder='Comment...'
                    ref={commentInputRef}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        let caretPos = getCaretPosition(commentInputRef)
                        const value = e.currentTarget.textContent
                        let preVal = value.slice(0, caretPos)
                        let postVal = value.slice(caretPos)
                        setEnterPressed(true)
                        if (postVal.length === 0) {
                          const newValue = value + '\n\n'
                          setPostComment(newValue)
                        } else {
                          let newPreVal = preVal + '\n'
                          const newValue = newPreVal + postVal
                          setPostComment(newValue)
                        }
                      } else {
                        setEnterPressed(false)
                      }
                    }}
                    onInput={async (e) => {
                      const value = e.currentTarget.textContent
                      await inspectPost(value).then((validatedValue) => {
                        setPostComment(validatedValue)
                      })
                    }}
                    style={{
                      width: '80%',
                      padding: '15px',
                      fontSize: '.8rem',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      textAlign: 'left',
                      wordSpacing: '3px',
                      fontFamily: 'calibri',
                      backgroundColor: 'rgba(0,0,0,0)',
                      border: 'none',
                      outline: 'none',
                      whiteSpace: 'pre-wrap',
                      caretColor: darkMode ? 'lightgreen' : 'green',
                      color: darkMode ? 'white' : 'black',
                    }}
                  ></div>
                  {postComment ? (
                    <img
                      onClick={() => {
                        commentInputRef.current.innerText = ''
                        if (postShow === null) {
                          filterComment(postComment)
                          updateReactions({
                            rct: 'comment',
                            comment: filterComment(postComment),
                          })
                          setPostComment('')
                        } else {
                          filterComment(postComment)
                          updateReactions({
                            rct: 'comment',
                            statorBody: {
                              createdAt: postShow.createdAt,
                              comment: filterComment(postComment),
                              action: 'comment',
                            },
                          })
                          setPostComment('')
                        }
                        setTimeout(() => {
                          postRef.current.scrollTo(0, Number.MAX_SAFE_INTEGER)
                        }, 500)
                      }}
                      src={send}
                      style={{
                        padding: '0px',
                        float: 'right',
                        marginTop: 'auto',
                        marginLeft: 'auto',
                        marginRight: '10px',
                        marginBottom: '5px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      height='25px'
                    />
                  ) : undefined}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

const PeriodLabel = ({ createdAt }) => {
  const newTime = Date.now() - createdAt
  const year = newTime / (1000 * 3600 * 24 * 7 * 4 * 12)
  const month = newTime / (1000 * 3600 * 24 * 7 * 4)
  const week = newTime / (1000 * 3600 * 24 * 7)
  const day = newTime / (1000 * 3600 * 24)
  const hour = newTime / (1000 * 3600)
  const minute = newTime / (1000 * 60)
  const second = newTime / 1000
  return (
    <>
      <label style={{ fontStyle: 'italic' }}>
        {(year >= 1
          ? Math.round(year) + (Math.round(year) > 1 ? ' yrs' : ' yr')
          : '') +
          (month >= 1 && year < 1
            ? Math.round(month) + (Math.round(month) > 1 ? ' mths' : ' mth')
            : '') +
          (week >= 1 && month < 1
            ? Math.round(week) + (Math.round(week) > 1 ? ' wks' : ' wk')
            : '') +
          (day >= 1 && week < 1
            ? Math.round(day) + (Math.round(day) > 1 ? ' dys' : ' dy')
            : '') +
          (hour >= 1 && day < 1
            ? Math.round(hour) + (Math.round(hour) > 1 ? ' hrs' : ' hr')
            : '') +
          (minute >= 1 && hour < 1
            ? Math.round(minute) + (Math.round(minute) > 1 ? ' mins' : ' min')
            : '') +
          (second <= 59 && minute < 1
            ? Math.round(second) + (Math.round(second) > 1 ? ' secs' : ' sec')
            : '')}
      </label>
    </>
  )
}
export default Post
