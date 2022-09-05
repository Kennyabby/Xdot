import { React, useState, useEffect, useRef } from 'react'
import '../Events.css'

import profimg from '../assets/profile.png'
import close from '../assets/close.png'
import back from '../assets/left.png'
import comment from '../assets/comment.png'
import like from '../assets/like.png'
import love from '../assets/love.png'
import care from '../assets/care.png'
import haha from '../assets/haha.png'
import wow from '../assets/wow.png'
import sad from '../assets/sad.png'
import angry from '../assets/angry.png'
import send from '../assets/send.png'
import react from '../assets/react.png'
import QuizPostComment from './QuizPostComment'
import QuizReactionList from './QuizReactionList'

const QuizPost = ({
  server,
  status,
  currentPostShow,
  user,
  updt,
  setHighlightedPost,
  updatePostAt,
  newPostShow,
  showQuizPage,
}) => {
  const commentInputRef = useRef(null)
  const [postUser, setPostUser] = useState({ userName: 'Napsite' })
  const [quiz, setQuiz] = useState({})
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [isReacted, setIsReacted] = useState(false)
  const [isCommented, setIsCommented] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [showReactionList, setShowReactionList] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showPost, setShowPost] = useState(true)
  const [postShow, setPostShow] = useState(null)
  const [update, setUpdate] = useState({})
  const [postReaction, setPostReaction] = useState({
    name: 'react',
    src: react,
  })
  const [postComment, setPostComment] = useState('')
  const emojis = [
    { name: 'like', src: like },
    { name: 'love', src: love },
    { name: 'care', src: care },
    { name: 'haha', src: haha },
    { name: 'wow', src: wow },
    { name: 'sad', src: sad },
    { name: 'angry', src: angry },
  ]
  useEffect(async () => {
    if (postUser.matricNo !== undefined) {
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
    }
  }, [postUser])
  useEffect(async () => {
    setUpdate(updt)
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

      setQuiz(updt.quiz)
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
    }
    if (status !== undefined) {
      setShowComments(true)
    }
  }, [updt])

  const updateReactions = async ({
    rct,
    reaction,
    comment,
    reacted,
    statorBody,
  }) => {
    await updatePostAt({ createdAt: update.createdAt, refresh: false }).then(
      async (upd) => {
        // setUpdate(upd)
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
              collection: 'NapsGrandQuiz',
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
  return (
    <>
      <div
        style={{
          fontFamily: 'monospace',
          marginBottom: '10px',
          padding: '5px',
          borderRadius: '20px',
          backgroundColor: 'rgba(220,220,220,1)',
          borderBottom: 'solid rgba(200,200,200,1) 3px',
        }}
      >
        {status !== undefined ? (
          <div className='toppostlabel'>
            <img
              onClick={() => {
                if (postShow === null) {
                  setHighlightedPost(null)
                  var pageOffset = Number(
                    window.sessionStorage.getItem('pageOffset')
                  )
                  setTimeout(() => {
                    window.scrollTo(0, pageOffset)
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
                backgroundColor: 'rgba(230,230,230,0.7)',
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
        ) : undefined}
        {postShow === null ? (
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ textAlign: 'left' }}>
                <div>
                  <img
                    src={userImgUrl}
                    height='40px'
                    width='40px'
                    style={{
                      borderRadius: '50%',
                      padding: '2px',
                      backgroundColor: 'rgba(255,255,255,1)',
                    }}
                  />
                </div>
                {postUser.lastName !== undefined ? (
                  <div>
                    <label style={{ fontWeight: 'bold' }}>
                      {postUser.userName.toUpperCase()}
                    </label>
                  </div>
                ) : undefined}
              </div>
              {
                <div style={{ marginTop: '15px', fontStyle: 'italic' }}>
                  <PeriodLabel createdAt={update.createdAt} />
                </div>
              }
            </div>
            <div>
              <div style={{ textAlign: 'left', margin: '20px' }}>
                <label>{update.quizComment}</label>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  overflowX: 'auto',
                  margin: 'auto',
                  marginLeft: '20px',
                  marginBottom: '10px',
                  padding: '20px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  boxShadow: 'black 6px 6px 7px',
                  color: 'white',
                  borderRadius: '20px',
                }}
              >
                {quiz.title !== undefined ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      justifyContent: 'center',
                      fontStyle: 'italic',
                    }}
                  >
                    <label style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                      {quiz.title.toUpperCase()}
                    </label>
                    <label style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                      {'Questions (' + String(quiz.questions.length) + ')'}
                    </label>
                    <div style={{ display: 'block' }}>
                      <label>
                        {Number(quiz.days) > 0
                          ? quiz.days + (quiz.days > 1 ? ' days ' : ' day ')
                          : ''}
                      </label>
                      <label>
                        {Number(quiz.hours) > 0
                          ? quiz.hours + (quiz.hours > 1 ? ' hours ' : ' hour ')
                          : ''}
                      </label>
                      <label>
                        {Number(quiz.minutes) > 0
                          ? quiz.minutes +
                            (quiz.minutes > 1 ? ' minutes ' : ' minute ')
                          : ''}
                      </label>
                      <label>
                        {Number(quiz.seconds) > 0
                          ? quiz.seconds +
                            (quiz.seconds > 1 ? ' seconds' : ' second')
                          : ''}
                      </label>
                    </div>
                  </div>
                ) : undefined}
                <div style={{ marginTop: '40px', textAlign: 'left' }}>
                  <label
                    onClick={() => {
                      showQuizPage(quiz)
                    }}
                    style={{
                      padding: '7px',
                      border: 'solid lightgreen 2px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Take Quiz
                  </label>
                </div>
              </div>
            </div>
            {showReactionList ? (
              <QuizReactionList
                list={update['react']}
                closeReactionList={() => {
                  setShowReactionList(false)
                }}
              />
            ) : undefined}
            <div>
              <div
                style={{
                  margin: '15px',
                  display: 'flex',
                  gap: '10px',
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
                              height='20px'
                            />
                          )
                        }
                        return ''
                      })}
                  </div>
                ) : (
                  ''
                )}
                <label style={{ fontSize: '0.8rem' }}>
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
                      (update['react'].length ? ' Reacted to this Quiz' : '')
                    : ''}
                </label>
              </div>
              <div
                onClick={handleReactions}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',
                  marginTop: '30px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '5px',
                    display: 'flex',
                    width: 'fit-content',
                    padding: '5px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    backgroundColor: 'white',
                    color: 'black',
                    boxShadow: 'black 0px 0px 7px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  name='react'
                >
                  {showReactions ? (
                    <div
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
                        flexWrap: 'wrap',
                        position: 'absolute',
                        top: '0px',
                        zIndex: '1',
                        justifyContent: 'center',
                        width: '300px',
                        gap: '10px',
                        display: 'flex',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
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
                              padding: '10px',
                              cursor: 'pointer',
                            }}
                            height='40px'
                          />
                        )
                      })}
                    </div>
                  ) : undefined}
                  <div style={{ display: 'flex' }}></div>
                  <img
                    name='react'
                    style={{
                      cursor: 'pointer',
                      marginRight: '10px',
                      borderRadius: isReacted ? '50%' : '0px',
                      boxShadow: isReacted ? 'black 0px 0px 7px' : 'none',
                    }}
                    src={isReacted ? postReaction.src : react}
                    alt='reaction'
                    height={isReacted ? '25px' : '20px'}
                  />
                  <label style={{ fontSize: '1rem', marginTop: '3px' }}>
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
                    backgroundColor: 'white',
                    boxShadow: 'black 0px 0px 7px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  name='comment'
                >
                  <div style={{ display: 'flex' }}>
                    <img
                      src={comment}
                      alt='comment'
                      name='comment'
                      style={{
                        cursor: 'pointer',
                        marginRight: '10px',
                        borderRadius: '50%',
                        boxShadow: isCommented ? 'blue 0px 0px 8px' : 'none',
                      }}
                      height='25px'
                    />
                  </div>
                  <label
                    name='comment'
                    style={{
                      fontSize: '1rem',
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
                    right: '5px',
                    display: 'flex',
                    width: 'fit-content',
                    padding: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    backgroundColor: 'white',
                    boxShadow: 'black 0px 0px 7px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  name='share'
                >
                  <label name='share' style={{ cursor: 'pointer' }}>
                    Share
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : undefined}

        {showComments ? (
          <div>
            <div
              name='commentView'
              style={{
                backgroundColor: 'white',
                paddingTop: '30px',
                paddingBottom: '100px',
              }}
            >
              {postShow === null ? (
                update['comment'] !== undefined && update['comment'].length ? (
                  update['comment'].map((elem, i) => {
                    return (
                      <QuizPostComment
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
                        postShow={newPostShow === null ? postShow : newPostShow}
                        setPostComment={({ value, matricNo }) => {
                          setPostComment(value)
                          commentInputRef.current.focus()
                        }}
                      />
                    )
                  })
                ) : (
                  'Be the first to comment'
                )
              ) : (
                <QuizPostComment
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
                  }}
                />
              )}
            </div>
            <div className='cmCover'>
              <div className='commentinput'>
                <div
                  contentEditable='true'
                  placeholder='Comment...'
                  ref={commentInputRef}
                  onInput={(e) => {
                    const value = e.currentTarget.textContent
                    setPostComment(value)
                  }}
                  style={{
                    width: '80%',
                    padding: '15px',
                    fontSize: '1rem',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    textAlign: 'left',
                    backgroundColor: 'rgba(0,0,0,0)',
                    border: 'none',
                    outline: 'none',
                    color: 'black',
                  }}
                ></div>
                {postComment ? (
                  <img
                    onClick={() => {
                      commentInputRef.current.innerText = ''
                      if (postShow === null) {
                        updateReactions({
                          rct: 'comment',
                          comment: postComment,
                        })
                        setPostComment('')
                      } else {
                        updateReactions({
                          rct: 'comment',
                          statorBody: {
                            createdAt: postShow.createdAt,
                            comment: postComment,
                            action: 'comment',
                          },
                        })
                        setPostComment('')
                      }
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
            </div>
          </div>
        ) : undefined}
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
          ? Math.round(year) +
            (Math.round(year) > 1 ? ' years' : ' year') +
            ' ago'
          : '') +
          (month >= 1 && year < 1
            ? Math.round(month) +
              (Math.round(month) > 1 ? ' months' : ' month') +
              ' ago'
            : '') +
          (week >= 1 && month < 1
            ? Math.round(week) +
              (Math.round(week) > 1 ? ' weeks' : ' week') +
              ' ago'
            : '') +
          (day >= 1 && week < 1
            ? Math.round(day) +
              (Math.round(day) > 1 ? ' days' : ' day') +
              ' ago'
            : '') +
          (hour >= 1 && day < 1
            ? Math.round(hour) +
              (Math.round(hour) > 1 ? ' hours' : ' hour') +
              ' ago'
            : '') +
          (minute >= 1 && hour < 1
            ? Math.round(minute) +
              (Math.round(minute) > 1 ? ' minutes' : ' minute') +
              ' ago'
            : '') +
          (second <= 59 && minute < 1
            ? Math.round(second) +
              (Math.round(second) > 1 ? ' seconds' : ' second') +
              ' ago'
            : '')}
      </label>
    </>
  )
}
export default QuizPost
