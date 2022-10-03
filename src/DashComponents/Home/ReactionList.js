import { React, useState, useEffect } from 'react'
import '../Events/Events.css'

import close from '../Events/assets/close.png'
import profimg from '../Events/assets/profile.png'
import like from '../Events/assets/like.png'
import love from '../Events/assets/love.png'
import care from '../Events/assets/care.png'
import haha from '../Events/assets/haha.png'
import wow from '../Events/assets/wow.png'
import sad from '../Events/assets/sad.png'
import angry from '../Events/assets/angry.png'

const QuizReactionList = ({ list, closeReactionList }) => {
  const emojis = [
    { name: 'like', src: like },
    { name: 'love', src: love },
    { name: 'care', src: care },
    { name: 'haha', src: haha },
    { name: 'wow', src: wow },
    { name: 'sad', src: sad },
    { name: 'angry', src: angry },
  ]
  const [reactionEmoji, setReactionEmoji] = useState({})

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(250,250,250,1)',
          overflowY: 'auto',
          zIndex: '3',
        }}
      >
        <img
          onClick={() => {
            closeReactionList()
          }}
          src={close}
          alt='close Reaction List'
          style={{
            position: 'fixed',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
          }}
          height='20px'
        />
        <div style={{ margin: '10px' }}>
          {list.map((reaction, i) => {
            return (
              <div
                style={{ display: 'flex', gap: '10px', margin: '20px' }}
                key={i}
              >
                <img
                  src={profimg}
                  alt='profile image'
                  style={{ borderRadius: '50%', cursor: 'pointer' }}
                  height='50px'
                />

                <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {reaction.userName}
                </label>
                {emojis.map((emoji) => {
                  if (reaction.reaction === emoji.name) {
                    return (
                      <img src={emoji.src} alt='raction emoji' height='20px' />
                    )
                  }
                })}
                <label
                  style={{
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    marginTop: '20px',
                  }}
                >
                  <PeriodLabel createdAt={reaction.createdAt} />{' '}
                </label>
              </div>
            )
          })}
        </div>
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
export default QuizReactionList
