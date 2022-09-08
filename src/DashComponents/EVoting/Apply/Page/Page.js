import { React, useState, useEffect, useRef } from 'react'
import ExecDetails from './ExecDetails'

import '../../EVoting.css'
const Page = ({ server, viewForm, user }) => {
  const [currentSession, setCurrentSession] = useState('Current Session...')
  const [applicationDetails, setApplicationDetails] = useState({})
  const sessionLabelRef = useRef(null)

  useEffect(async () => {
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
      const currentSession = settings[0].sessionSettings.currentSession
      setCurrentSession(currentSession)
      const formSaleStart = settings[1].eVotingSettings.formSaleStart
      const formSaleEnd = settings[1].eVotingSettings.formSaleEnd
    } catch (error) {}
  }, [])
  useEffect(() => {
    sessionLabelRef.current.scrollIntoView()
  }, [sessionLabelRef])
  useEffect(() => {
    const applications = user.votingApplication
    if (applications !== undefined) {
      applications.forEach((application) => {
        if (application.currentSession === currentSession) {
          setApplicationDetails(application)
        }
      })
    }
  }, [currentSession])
  const excos = [
    {
      title: 'President',
      brief: 'First member and the head of the association',
      details: [
        'Shall be the first member and the head of the association.',
        'Shall be the head of the executive council.',
        "Shall be the one to exercise control, harmonize and coordinate all aspects of the association's activities according to the constitution.",
        'Shall be cause to be summoned and preside over all executive council and general meeting of the association unless his probity is under consideration.',
        "Shall jointly with the financial secretary and the staff adviser be the signatories to the association's bank account(s).",
        'Shall exercise all such powers and carry out all other duties which are reasonably incidental to his office and also those allocated to his office by other articles of the constitution.',
      ],
    },
    {
      title: 'Vice President',
      brief:
        'Assistant and advisor to the president in the performance of his duties',
      details: [
        'Shall assist and advice the president in the performance of his duties.',
        "Shall deputize for the president in the latter's absence.",
        'Shall oversee all other  committee of the association.',
        "Shall coordiante activites marking the association's week and fresher's welcome.",
        'Shall become the acting president in the event of suspension, resignation, removal or death of the president.',
        'Shall carry out such other duties that may be delegated to him by the executive council or by the provision of the constitution.',
      ],
    },
    {
      title: 'General Secretary',
      brief: 'Responsible for all the secretarial duties of the association',
      details: [
        'Shall be responsible for all the secretarial duties of the association.',
        "Shall convene all executive and congress meetings of the association at the request of the stakeholders committee, the president, or two-third of the asocieation's membership.",
        'Shall keep attendance books, minutes and records of executive and cogress meetings.',
        'Shall take care of all correspondence on behalf of the association in consultation with at least two-third of the members of the executive council.',
        'Shall perform all such other duties as directed by the executive council or by the provisions of the constitution.',
      ],
    },
    {
      title: 'Assistant General Secretary',
      brief:
        'Assistant and Advisor to the general secretary in the performance of his duties',
      details: [
        'Shall assist and advice the general secretary in the performance of his duties.',
        "Shall deputize for the general secretary in the latter's absence.",
        'Shall carry out such other functions as delegated to him by the executive council or by the provisions of the constitution.',
      ],
    },
    {
      title: 'Public Relation Officer',
      brief: "Responsible for the publicity of the association's activities",
      details: [
        "Shall be responsible for the publicity of the association's activites.",
        "shall be responsible fot the public enlightenment of the association's members concerning symposia and other related information or program.",
        "Shall together with the social director, keep inventory of the association's property in the secretariat before resuming and leaving the office.",
        "Shall work in conjunction with the press in the publication of the  association's magazine headed by the Editor in Chief.",
        'shall be thelink between the Executive and the press organization.',
        'Shall perform any other duties as delegated to him by the executive council or by the provisions of the constitution.',
      ],
    },
    {
      title: 'Financial Secretary',
      brief:
        "Responsible for recieving and accounting for all the association's money derived from any source",
      details: [
        "Shall recieve and account for all the association's money derived from any source.",
        "Shall deposit all monies recieved into the association's bank account.",
        "Shall jointly with the president and the staff advisers be the signatories to the association's bank account.",
        'Shall keep an imprest account that shall be determined by the council.',
        "Shall as a matter of compulsion, keep statutory books of account and present this to the association's congress meeting and council on demand.",
        "Shall at the end of his tenure present the association's statement of account to the incoming executive council and staff advisers.",
        'Shall perform such other functions as delegated to him by the provisions of the constitution.',
        'Shall present the details of the financial report to the stakeholders committee on demand by the committee or Congress within 72 hours.',
        'Shall properly document all financial transaction of the association.',
      ],
    },
    {
      title: 'Social Director',
      brief:
        'Responsible for the promotion and organization of social and recreational activities of the association',
      details: [
        'Shall be responsible for the promotion and organization of social and recreational activities of the association.',
        'Shall be the chairman of the social committee.',
        "Shall together with the public Relations Officer maintain a proper inventory of all the association's property in the Secretariat.",
        'Shall perform any other duties as directed by the executive council or by provisions of the constitution.',
      ],
    },
    {
      title: 'Sport Director',
      brief: 'Coordinator of all sporting activities of the association',
      details: [
        'Shall coordinate all sporting activities of the association.',
        'Shall be in charge of all sporting equipment.',
        'Shall be the chairman of the sport commitee.',
        "Shall after the first meetings of the sports committee and in full consultation with the University's sport council present in the association with a programme of sporting activites for the session.",
        'Shall perform any other duties as directed by the executive council or by the provision of the constitution.',
      ],
    },
    {
      title: 'Academic Coordinator',
      brief: 'Chairman of the academic committee of the association',
      details: [
        'Shall be the chairman of the Academic committee of the association.',
        'Shall organize and coordinate tutorials and academic seminars for all NAPSITES as when necessary.',
        'Shall be in charge of all academic materials and make them available to all members of the association.',
        'Shall perform any other duties as directed by the executive council or by provisions of the constitution.',
      ],
    },
  ]
  const guidelines = [
    'All aspirants must be bonafide NAPSITES in accordance with the provisions of the constitution.',
    'The contenstants for Presidency must have a CGPA of not less than a 2.50 on scale of 4.00 CGPA while others must have not less than 2.00 on a scale of 4.00 CGPA.',
    'Screening and Press night must be mandatory for all aspirants and failure to attend leads to disqualification.',
    'All aspirants charged and found guilty of any SDC offence shall be disqualified.',
    'An aspirant must not be a final year student as at when purchasing the form and such aspirant must have paid his/her NAPS due for the session.',
  ]
  const eligibilites = [
    'Only financial members of the association (those that have paid their NAPS dues) shall be eligible to vote and be voted for into the offices.',
    'Members shall be eligible to contest for offices.',
    'Candidates vying for offices shall be sponsored by two bonafied members of the association.',
    'Candidates for any elective office shall file in an application to the electoral committee not later than a week to the Election Day.',
    'There shall be a manifesto night before Election Day.',
    'The candidate shall be pronounced or declared elect by scoring a simple majority vote.',
    'Candidate vying for the post of president must be in 300 Level.',
    'Candidate vying for the post of financial secretary must not be in 300 Level.',
    'All other posts are open to all levels.',
    "Any member of the association who has been found guilty of gross misconduct as stipulated in the student's information handbook shall not be eligible to contest in the election.",
  ]
  const electWithdraws = [
    'Any candidate may withdraw from elections before the Election Day simply by writing to the returning officer.',
    'Any candidate who fails to be present for the manifesto night shall be assumed to have withdrawn from the elections.',
    'A candidate may stand out in favour of his/her choice of fellow candidate.',
  ]
  const byElections = [
    'A by-election shall be conducted in case there is a tie and/or when there is a genuine election petition as shall be accepted by the electoral committee via the returning officer.',
    'A by-election shall take place (if any) before the handling over ceremony.',
    'In the case of withdrawal of any member of the council during his/her tenure due to unforeseen circumstances, a by-election will be conducted by an ad-hoc committee set up by the council within two(2) weeks.',
  ]

  return (
    <>
      <div>
        <p
          ref={sessionLabelRef}
          style={{
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            padding: '10px',
          }}
        >
          {'Session: ' + currentSession}
        </p>
        {applicationDetails.isCompleted !== undefined &&
        !applicationDetails.isCompleted ? (
          <div
            style={{
              boxShadow: '0px 0px 7px rgba(100,100,100,1)',
              borderRadius: '10px',
              fontFamily: 'monospace',
              border: 'solid blue 1px',
              fontSize: '1rem',
              margin: '30px',
              marginTop: '40px',
              padding: '15px',
            }}
          >
            <p>
              {'Your Application For The Office Of ' +
                applicationDetails.post +
                ' Is Currently Pending.'}
            </p>
            <button
              onClick={() => {
                viewForm({ data: applicationDetails.post })
              }}
              className='ebtn'
              style={{ backgroundColor: 'blue', color: 'white' }}
            >
              {'Continue >>'}
            </button>
          </div>
        ) : undefined}
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '20px',
            padding: '10px',
            boxShadow: '0px 0px 8px rgba(49,49,50,1)',
            border: 'solid rgba(210,210,210) 2px',
            borderRadius: '10px',
            fontFamily: 'monospace',
          }}
        >
          <h2>GUIDELINES</h2>
          {guidelines.map((guide, id) => {
            return (
              <p style={{ fontSize: '.9rem' }} key={id}>
                {guide}
              </p>
            )
          })}
        </div>
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '20px',
            padding: '10px',
            boxShadow: '0px 0px 8px rgba(49,49,50,1)',
            border: 'solid rgba(210,210,210) 2px',
            borderRadius: '10px',
            fontFamily: 'monospace',
          }}
        >
          <h2>ELIGIBILITY TO BE VOTED FOR</h2>
          {eligibilites.map((statement, id) => {
            return (
              <p style={{ fontSize: '.9rem' }} key={id}>
                {statement}
              </p>
            )
          })}
        </div>
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '20px',
            padding: '10px',
            boxShadow: '0px 0px 8px rgba(49,49,50,1)',
            border: 'solid rgba(210,210,210) 2px',
            borderRadius: '10px',
            fontFamily: 'monospace',
          }}
        >
          <h2>WITHDRAWAL FROM ELECTIONS</h2>
          {electWithdraws.map((statement, id) => {
            return (
              <p style={{ fontSize: '.9rem' }} key={id}>
                {statement}
              </p>
            )
          })}
        </div>
        <div
          style={{
            textAlign: 'left',
            margin: '10px',
            marginTop: '20px',
            padding: '10px',
            boxShadow: '0px 0px 8px rgba(49,49,50,1)',
            border: 'solid rgba(210,210,210) 2px',
            borderRadius: '10px',
            fontFamily: 'monospace',
          }}
        >
          <h2>ELECTION PETITIONS/BY-ELECTIONS</h2>
          {byElections.map((statement, id) => {
            return (
              <p style={{ fontSize: '.9rem' }} key={id}>
                {statement}
              </p>
            )
          })}
        </div>
        <div
          style={{
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            margin: '50px',
            marginTop: '80px',
            textAlign: 'center',
          }}
        >
          <label>
            All offices of the association shall be held for an equivalent to
            one academic session.
          </label>
        </div>
        <div style={{ paddingBottom: '70px' }}>
          {excos.map((exco, id) => {
            return (
              <ExecDetails
                key={id}
                exco={exco}
                viewForm={({ data }) => {
                  viewForm({ data: data })
                }}
                server={server}
                user={user}
                currentSession={currentSession}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Page
