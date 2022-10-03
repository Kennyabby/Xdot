import { React, useState, useEffect } from 'react'
import '../Settings.css'

import edit from '../assets/edit.png'
const Admin = ({ server }) => {
  const [toggleSession, setToggleSession] = useState(true)
  const [toggleEvoting, setToggleEvoting] = useState(true)

  const [sessionLabel, setSessionLabel] = useState('>><<')
  const [eVotingLabel, setEvotingLabel] = useState('>><<')

  const [currentSession, setCurrentSession] = useState('')
  const [gradingScale, setGradingScale] = useState('')
  const [votingDate, setVotingDate] = useState('')
  const [formSaleStart, setFormSaleStart] = useState('')
  const [formSaleEnd, setFormSaleEnd] = useState('')
  const [votingHours, setVotingHours] = useState('')

  const [isEditCurrentSession, setIsEditCurrentSession] = useState(false)
  const [isEditGradingScale, setIsEditGradingScale] = useState(false)
  const [isEditVotingDate, setIsEditVotingDate] = useState(false)
  const [isEditFormSaleStart, setIsEditFormSaleStart] = useState(false)
  const [isEditFormSaleEnd, setIsEditFormSaleEnd] = useState(false)
  const [isEditVotingHours, setIsEditVotingHours] = useState(false)

  const [currentSessionEdit, setCurrentSessionEdit] = useState('')
  const [gradingScaleEdit, setGradingScaleEdit] = useState('')
  const [votingDateEdit, setVotingDateEdit] = useState('')
  const [formSaleStartEdit, setFormSaleStartEdit] = useState('')
  const [formSaleEndEdit, setFormSaleEndEdit] = useState('')
  const [votingHoursEdit, setVotingHoursEdit] = useState('')

  const [settings, setSettings] = useState([])

  const getSettings = async () => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionSettings: 1, eVotingSettings: 1 }),
      }
      const resp = await fetch(server + '/getNapsSettings', opts)
      const response = await resp.json()
      const settings = response.settings
      return settings
    } catch (TypeError) {}
  }
  const loadSettings = async () => {
    try {
      const settings = await getSettings()
      setSettings(settings)
      const currentSession = settings[0].sessionSettings.currentSession
      const gradingScale = settings[0].sessionSettings.gradingScale
      const votingDate = settings[1].eVotingSettings.votingDate
      const formSaleStart = settings[1].eVotingSettings.formSaleStart
      const formSaleEnd = settings[1].eVotingSettings.formSaleEnd
      const votingHours = settings[1].eVotingSettings.votingHours
      setCurrentSession(currentSession)
      setCurrentSessionEdit(currentSession)
      setGradingScale(gradingScale)
      setGradingScaleEdit(gradingScale)
      setVotingDate(votingDate)
      setVotingDateEdit(votingDate)
      setFormSaleStart(formSaleStart)
      setFormSaleStartEdit(formSaleStart)
      setFormSaleEnd(formSaleEnd)
      setFormSaleEndEdit(formSaleEnd)
      setVotingHours(votingHours)
      setVotingHoursEdit(votingHours)
    } catch (error) {}
  }
  useEffect(() => {
    loadSettings()
  }, [])
  const handleSessionToggle = () => {
    if (toggleSession) {
      setToggleSession(false)
      setSessionLabel('<< >>')
    } else {
      setToggleSession(true)
      setSessionLabel('>><<')
    }
  }

  const handleEvotingToggle = () => {
    if (toggleEvoting) {
      setToggleEvoting(false)
      setEvotingLabel('<< >>')
    } else {
      setToggleEvoting(true)
      setEvotingLabel('>><<')
    }
  }

  const updateSettings = async ({ finder, update }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop: [finder, update],
        }),
      }
      const resp = await fetch(server + '/updateNapsSettings', opts)
      const response = await resp.json()
      const updated = response.updated
      if (updated) {
        loadSettings()
      }
    } catch (TypeError) {}
  }

  return (
    <>
      <div style={{ marginBottom: '70px' }}>
        <div className='stgTop'>
          <h2 style={{ margin: '0px' }}>Admin</h2>
        </div>
        <div style={{ marginTop: '100px', display: 'block', gap: '30px' }}>
          <div className='cov'>
            <h2 className='covheading'>Session</h2>
            {toggleSession ? (
              <div>
                <div className='st'>
                  <div
                    style={{
                      textAlign: 'left',
                      width: '80%',
                    }}
                  >
                    <label>Current Session</label>
                    {!isEditCurrentSession ? (
                      <label style={{ float: 'right' }}>{currentSession}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={currentSessionEdit}
                        placeholder='Current Session'
                        type='text'
                        onChange={(e) => {
                          setCurrentSessionEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditCurrentSession ? (
                      <img
                        src={edit}
                        style={{ cursor: 'pointer' }}
                        height='20px'
                        onClick={() => {
                          setIsEditCurrentSession(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[0].sessionSettings.currentSession =
                              currentSessionEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  sessionSettings:
                                    oldSettings[0].sessionSettings,
                                },
                                update: {
                                  sessionSettings: settings[0].sessionSettings,
                                },
                              })
                              setIsEditCurrentSession(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditCurrentSession(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className='st'>
                  <div style={{ textAlign: 'left', width: '80%' }}>
                    <label>Grading Scale</label>
                    {!isEditGradingScale ? (
                      <label style={{ float: 'right' }}>{gradingScale}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={gradingScaleEdit}
                        placeholder='Grading Scale'
                        type='number'
                        onChange={(e) => {
                          setGradingScaleEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditGradingScale ? (
                      <img
                        style={{ cursor: 'pointer' }}
                        src={edit}
                        height='20px'
                        onClick={() => {
                          setIsEditGradingScale(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[0].sessionSettings.gradingScale =
                              gradingScaleEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  sessionSettings:
                                    oldSettings[0].sessionSettings,
                                },
                                update: {
                                  sessionSettings: settings[0].sessionSettings,
                                },
                              })
                              setIsEditGradingScale(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditGradingScale(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : undefined}
            <div onClick={handleSessionToggle} className='cont'>
              {sessionLabel}
            </div>
          </div>
          <div className='cov'>
            <h2 className='covheading'>E-Voting</h2>
            {toggleEvoting ? (
              <div>
                <div className='st'>
                  <div style={{ textAlign: 'left', width: '80%' }}>
                    <label>Form Sale Start Date</label>
                    {!isEditFormSaleStart ? (
                      <label style={{ float: 'right' }}>{formSaleStart}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={formSaleStartEdit}
                        placeholder='Form Sale Start Date'
                        type='Date'
                        onChange={(e) => {
                          setFormSaleStartEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditFormSaleStart ? (
                      <img
                        src={edit}
                        style={{ cursor: 'pointer' }}
                        height='20px'
                        onClick={() => {
                          setIsEditFormSaleStart(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[1].eVotingSettings.formSaleStart =
                              formSaleStartEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  eVotingSettings:
                                    oldSettings[1].eVotingSettings,
                                },
                                update: {
                                  eVotingSettings: settings[1].eVotingSettings,
                                },
                              })
                              setIsEditFormSaleStart(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditFormSaleStart(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className='st'>
                  <div style={{ textAlign: 'left', width: '80%' }}>
                    <label>Form Sale End Date</label>
                    {!isEditFormSaleEnd ? (
                      <label style={{ float: 'right' }}>{formSaleEnd}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={formSaleEndEdit}
                        placeholder='Form Sale End Date'
                        type='Date'
                        onChange={(e) => {
                          setFormSaleEndEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditFormSaleEnd ? (
                      <img
                        src={edit}
                        style={{ cursor: 'pointer' }}
                        height='20px'
                        onClick={() => {
                          setIsEditFormSaleEnd(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[1].eVotingSettings.formSaleEnd =
                              formSaleEndEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  eVotingSettings:
                                    oldSettings[1].eVotingSettings,
                                },
                                update: {
                                  eVotingSettings: settings[1].eVotingSettings,
                                },
                              })
                              setIsEditFormSaleEnd(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditFormSaleEnd(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className='st'>
                  <div style={{ textAlign: 'left', width: '80%' }}>
                    <label>Voting Date</label>
                    {!isEditVotingDate ? (
                      <label style={{ float: 'right' }}>{votingDate}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={votingDateEdit}
                        placeholder='Current Session'
                        type='Date'
                        onChange={(e) => {
                          setVotingDateEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditVotingDate ? (
                      <img
                        src={edit}
                        style={{ cursor: 'pointer' }}
                        height='20px'
                        onClick={() => {
                          setIsEditVotingDate(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[1].eVotingSettings.votingDate =
                              votingDateEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  eVotingSettings:
                                    oldSettings[1].eVotingSettings,
                                },
                                update: {
                                  eVotingSettings: settings[1].eVotingSettings,
                                },
                              })
                              setIsEditVotingDate(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditVotingDate(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className='st'>
                  <div style={{ textAlign: 'left', width: '80%' }}>
                    <label>Voting Hours</label>
                    {!isEditVotingHours ? (
                      <label style={{ float: 'right' }}>{votingHours}</label>
                    ) : (
                      <input
                        className='stInput'
                        value={votingHoursEdit}
                        placeholder='Voting Hours'
                        type='number'
                        onChange={(e) => {
                          setVotingHoursEdit(e.target.value)
                        }}
                      />
                    )}
                  </div>
                  <div style={{ width: '20%' }}>
                    {!isEditVotingHours ? (
                      <img
                        src={edit}
                        style={{ cursor: 'pointer' }}
                        height='20px'
                        onClick={() => {
                          setIsEditVotingHours(true)
                        }}
                      />
                    ) : (
                      <div className='stSC'>
                        <label
                          className='stSave'
                          onClick={async () => {
                            settings[1].eVotingSettings.votingHours =
                              votingHoursEdit
                            await getSettings().then((oldSettings) => {
                              updateSettings({
                                finder: {
                                  eVotingSettings:
                                    oldSettings[1].eVotingSettings,
                                },
                                update: {
                                  eVotingSettings: settings[1].eVotingSettings,
                                },
                              })
                              setIsEditVotingHours(false)
                            })
                          }}
                        >
                          Save
                        </label>
                        <label
                          className='stCancel'
                          onClick={() => {
                            setIsEditVotingHours(false)
                          }}
                        >
                          Cancel
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : undefined}
            <div onClick={handleEvotingToggle} className='cont'>
              {eVotingLabel}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
