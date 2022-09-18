import { React, useEffect, useState, useRef } from 'react'
import '../Events/Events.css'

import profimg from '../Events/assets/profile.png'
import close from '../Events/assets/close.png'
import like from '../Events/assets/like.png'
import love from '../Events/assets/love.png'
import care from '../Events/assets/care.png'
import haha from '../Events/assets/haha.png'
import wow from '../Events/assets/wow.png'
import sad from '../Events/assets/sad.png'
import angry from '../Events/assets/angry.png'

import ReactionList from './ReactionList'
import PostCommentReply from './PostCommentReply'

const PostComment = ({
  server,
  user,
  elem,
  updateReactions,
  setPostComment,
  setShowPost,
  postShow,
}) => {
  const [showCommentReactions, setShowCommentReactions] = useState(false)
  const [isCommentReacted, setIsCommentReacted] = useState(false)
  const [elemUser, setElemUser] = useState('')
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [commentReaction, setCommentReaction] = useState('')
  const [commentReactionList, setCommentReactionList] = useState(
    elem.comment.reaction
  )
  const [statement, setStatement] = useState(elem.comment.statement)
  const [showReactionList, setShowReactionList] = useState(false)
  const emojis = [
    { name: 'like', src: like },
    { name: 'love', src: love },
    { name: 'care', src: care },
    { name: 'haha', src: haha },
    { name: 'wow', src: wow },
    { name: 'sad', src: sad },
    { name: 'angry', src: angry },
  ]

  useEffect(() => {
    setCommentReactionList(elem.comment.reaction)
  }, [elem])
  useEffect(async () => {
    if (elem.matricNo !== undefined) {
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgUrl: elem.img, matricNo: elem.matricNo }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
    }
  }, [elem])
  useEffect(() => {
    elem.comment.reaction.forEach((rct) => {
      if (rct.matricNo === user.matricNo) {
        setIsCommentReacted(true)
      }
    })
  }, [])
  const userName = elem.userName

  useEffect(() => {
    elem.comment.reaction.forEach((rct) => {
      if (rct.matricNo === user.matricNo) {
        var commentReaction = emojis.filter((emoji) => {
          return emoji.name === rct.reaction
        })
        setCommentReaction(commentReaction[0])
      }
    })
  }, [])

  return (
    <div>
      {showCommentReactions ? (
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            zIndex: '1',
            backgroundColor: 'rgba(250,250,250,0.6)',
          }}
        >
          <img
            onClick={() => {
              setShowCommentReactions(false)
            }}
            src={close}
            alt='close reactions'
            style={{
              position: 'fixed',
              top: '3px',
              left: '3px',
              cursor: 'pointer',
            }}
            height='30px'
          />
          <div
            onClick={(e) => {
              const name = e.target.getAttribute('name')
              if (name !== undefined && name !== null) {
                updateReactions({
                  rct: 'comment',
                  statorBody: {
                    action: 'react',
                    reaction: name,
                    createdAt: elemUser,
                  },
                })
                emojis.forEach((emoji) => {
                  if (emoji.name === name) {
                    setCommentReaction(emoji)
                  }
                })
                setIsCommentReacted(true)
                setShowCommentReactions(false)
              }
            }}
            style={{
              flexWrap: 'wrap',
              margin: '10px',
              marginTop: '50px',
              zIndex: '1',
              justifyContent: 'center',
              gap: '10px',
              display: 'flex',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
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
        </div>
      ) : undefined}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundImage: `url(${userImgUrl})`,
            border: 'solid rgba(220,220,220,1) 1px',
            backgroundColor: 'white',
            backgroundSize: 'cover',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        ></div>

        <div
          style={{
            backgroundColor: 'rgba(240,240,240,1)',
            fontSize: '.9rem',
            textAlign: 'left',
            width: '70%',
            margin: '20px',
            marginTop: '3px',
            padding: '10px',
            borderRadius: '20px',
          }}
        >
          <label
            style={{
              fontWeight: 'bold',
              fontSize: '.75rem',
              fontFamily: 'verdana',
            }}
          >
            {userName.slice(0, 1).toUpperCase() + userName.slice(1)}
          </label>
          <p>
            <label>
              {statement.split(' ').map((cmt) => {
                if (cmt.includes('@')) {
                  return (
                    <label style={{ color: 'blue', fontWeight: 'bold' }}>
                      {cmt + ' '}
                    </label>
                  )
                }
                return <label>{cmt + ' '}</label>
              })}
            </label>
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: isCommentReacted ? '20px' : '30px',
          fontSize: '.8rem',
          marginLeft: '50px',
          marginBottom: '20px',
        }}
      >
        <PeriodLabel createdAt={elem.createdAt} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <label
            onClick={() => {
              setElemUser(elem.createdAt)
              if (isCommentReacted) {
                updateReactions({
                  rct: 'comment',
                  statorBody: {
                    action: 'react',
                    matricNo: elem.matricNo,
                    createdAt: elem.createdAt,
                  },
                })
                setIsCommentReacted(false)
              } else {
                setShowCommentReactions(true)
              }
            }}
            style={{ fontWeight: 'bold', cursor: 'pointer' }}
          >
            React
          </label>
          {isCommentReacted ? (
            <img
              name='react'
              style={{
                cursor: 'pointer',
                marginRight: '10px',
                borderRadius: '50%',
                boxShadow: 'black 0px 0px 7px',
              }}
              src={commentReaction.src}
              alt='reaction'
              height={'20px'}
            />
          ) : undefined}
        </div>
        <label
          onClick={() => {
            setShowPost({ show: false, post: elem })
          }}
          style={{ fontWeight: 'bold', cursor: 'pointer' }}
        >
          Reply
        </label>

        {showReactionList ? (
          <ReactionList
            list={commentReactionList}
            closeReactionList={() => {
              setShowReactionList(false)
            }}
          />
        ) : undefined}
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
          onClick={() => {
            setShowReactionList(true)
          }}
        >
          <div style={{ display: 'flex' }}>
            {emojis
              .filter((emoji) => {
                const filter = commentReactionList.filter((rct) => {
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
            {commentReactionList.length ? (
              <div style={{ fontSize: '1rem', marginLeft: '10px' }}>
                <label>{commentReactionList.length}</label>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      {postShow === null ? (
        <div
          style={{ fontSize: '0.8rem', fontWeight: 'bolder' }}
          onClick={() => {
            setShowPost({ show: false, post: elem })
          }}
        >
          {elem.comment.reply.length
            ? 'Show Previous Replies ' + elem.comment.reply.length
            : ''}
        </div>
      ) : (
        ''
      )}
      <div style={{ paddingTop: '10px' }}>
        {postShow !== null
          ? elem.comment.reply.length
            ? elem.comment.reply.map((rep) => {
                return (
                  <PostCommentReply
                    server={server}
                    user={user}
                    rep={rep}
                    postShow={postShow}
                    reply={({ value, matricNo }) => {
                      setPostComment({ value: value, matricNo: matricNo })
                    }}
                    updateReactions={(value) => {
                      updateReactions(value)
                    }}
                  />
                )
              })
            : 'Be The first to reply ' + elem.userName + '...'
          : ''}
      </div>
    </div>
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
          ? Math.round(year) + (Math.round(year) > 1 ? ' years' : ' year')
          : '') +
          (month >= 1 && year < 1
            ? Math.round(month) + (Math.round(month) > 1 ? ' months' : ' month')
            : '') +
          (week >= 1 && month < 1
            ? Math.round(week) + (Math.round(week) > 1 ? ' weeks' : ' week')
            : '') +
          (day >= 1 && week < 1
            ? Math.round(day) + (Math.round(day) > 1 ? ' days' : ' day')
            : '') +
          (hour >= 1 && day < 1
            ? Math.round(hour) + (Math.round(hour) > 1 ? ' hours' : ' hour')
            : '') +
          (minute >= 1 && hour < 1
            ? Math.round(minute) +
              (Math.round(minute) > 1 ? ' minutes' : ' minute')
            : '') +
          (second <= 59 && minute < 1
            ? Math.round(second) +
              (Math.round(second) > 1 ? ' seconds' : ' second')
            : '')}
      </label>
    </>
  )
}
export default PostComment
