import { React, useEffect, useState, useRef } from 'react'
import '../Events.css'

import profimg from '../assets/profile.png'
import close from '../assets/close.png'
import like from '../assets/like.png'
import love from '../assets/love.png'
import care from '../assets/care.png'
import haha from '../assets/haha.png'
import wow from '../assets/wow.png'
import sad from '../assets/sad.png'
import angry from '../assets/angry.png'

import QuizReactionList from './QuizReactionList'

const QuizPostCommentReply = ({
  server,
  user,
  rep,
  updateReactions,
  reply,
  postShow,
}) => {
  const [showCommentReactions, setShowCommentReactions] = useState(false)
  const [isCommentReacted, setIsCommentReacted] = useState(false)
  const [elemUser, setElemUser] = useState('')
  const [userImgUrl, setUserImgUrl] = useState(profimg)
  const [commentReaction, setCommentReaction] = useState('')
  const [showReactionList, setShowReactionList] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
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
    rep.commentReply.reaction.forEach((rct) => {
      if (rct.matricNo === user.matricNo) {
        setIsCommentReacted(true)
      }
    })
  }, [])
  const userName = rep.userName
  const statement = rep.commentReply.statement
  const commentReactionList = rep.commentReply.reaction
  useEffect(async () => {
    if (rep.matricNo !== undefined && !imgLoaded) {
      const opts1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgUrl: rep.img, matricNo: rep.matricNo }),
      }
      const resp1 = await fetch(server + '/getImgUrl', opts1)
      const response1 = await resp1.json()
      const url = response1.url
      setUserImgUrl(url)
      setImgLoaded(true)
    }
  }, [rep])
  useEffect(() => {
    rep.commentReply.reaction.forEach((rct) => {
      if (rct.matricNo === user.matricNo) {
        var commentReaction = emojis.filter((emoji) => {
          return emoji.name === rct.reaction
        })
        setCommentReaction(commentReaction[0])
      }
    })
  }, [])

  return (
    <div style={{ marginLeft: '30px' }}>
      {showCommentReactions ? (
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            zIndex: '2',
            backgroundColor: 'rgba(250,250,250,0.9)',
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
              right: '3px',
              cursor: 'pointer',
            }}
            height='25px'
          />
          <div
            onClick={(e) => {
              const name = e.target.getAttribute('name')
              if (name !== undefined && name !== null) {
                updateReactions({
                  rct: 'comment',
                  statorBody: {
                    action: 'comment',
                    createdAt: postShow.createdAt,
                    statorReplyBody: {
                      action: 'react',
                      reaction: name,
                      createdAt: elemUser.createdAt,
                    },
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
              margin: 'auto',
              marginTop: '60px',
              width: 'fit-content',
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
            position: 'relative',
            backgroundColor: 'rgba(235,235,235,.9)',
            fontSize: '.9rem',
            textAlign: 'left',
            width: '70%',
            margin: '20px',
            marginTop: '10px',
            padding: '10px',
            borderRadius: '20px',
            borderTopLeftRadius: '0px',
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
            <label style={{ fontSize: '.8rem' }}>
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
          <div
            style={{
              width: 'fit-content',
              position: 'absolute',
              bottom: '5px',
              right: '13px',
              fontWeight: 'bold',
              fontSize: '.7rem',
            }}
          >
            <PeriodLabel createdAt={rep.createdAt} />
          </div>
          <div
            style={{
              position: 'absolute',
              width: 'fit-content',
              left: '5px',
              bottom: '-10px',
            }}
          >
            {isCommentReacted ? (
              <img
                name='react'
                style={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(235,235,235,0.9)',
                  border: 'solid rgba(235,235,235,0.9) 3px',
                }}
                src={commentReaction.src}
                alt='reaction'
                height={'18px'}
              />
            ) : undefined}
          </div>
          {commentReactionList.length ? (
            <div
              style={{
                width: 'fit-content',
                padding: '3px 10px',
                borderRadius: '10px',
                position: 'absolute',
                right: '-7px',
                color: 'black',
                top: '-5px',
                backgroundColor: 'rgba(235,235,235,0.9)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
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
                          height='15px'
                        />
                      )
                    }
                    return ''
                  })}
                <div
                  style={{
                    fontSize: '.7rem',
                    marginLeft: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  <label>{commentReactionList.length}</label>
                </div>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: '.8rem',
          marginLeft: '70px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <label
            onClick={() => {
              setElemUser(rep)
              if (isCommentReacted) {
                updateReactions({
                  rct: 'comment',
                  statorBody: {
                    action: 'comment',
                    createdAt: postShow.createdAt,
                    statorReplyBody: {
                      action: 'react',
                      createdAt: rep.createdAt,
                    },
                  },
                })
                setIsCommentReacted(false)
              } else {
                setShowCommentReactions(true)
              }
            }}
            style={{ fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isCommentReacted ? 'Ignore' : 'React'}
          </label>
        </div>
        <label
          onClick={() => {
            if (rep.matricNo !== user.matricNo) {
              reply({ value: rep.userName + ' ', matricNo: rep.matricNo })
            }
          }}
          style={{
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '50px',
          }}
        >
          Reply
        </label>

        {showReactionList ? (
          <QuizReactionList
            list={commentReactionList}
            closeReactionList={() => {
              setShowReactionList(false)
            }}
          />
        ) : undefined}
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
export default QuizPostCommentReply
