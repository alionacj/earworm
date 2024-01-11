import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import ExitButton from "../Buttons/ExitButton"
import StartSessionButton from "../Buttons/StartSessionButton"
import { intervals } from '../../tools'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import RetryButton from "../Buttons/RetryButton"

function Statistics() {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])

    const userHistory = useSelector(store => store.history)
    const settings = useSelector(store => store.settings)
    console.log(userHistory)

    const calculateScore = (session) => {
        const score = session.intervals.reduce((sum, int) => (
            sum + Number(int.correct)
        ), 0)
        return score
    }

    const totalscore = () => {
        counter = 0
        for (let session of userHistory) {
            calculateScore(session)
        }
    }

    return (
        userHistory[0] &&
        <>
            <h3>STATISTICS</h3>
            <p>TOTAL SCORE: {totalscore}%</p>
            <Accordion>
                <AccordionSummary>
                    Interval Performance
                </AccordionSummary>
                <AccordionDetails>
                    {intervals.map((int) => (
                        <p key={intervals.indexOf(int)}>{int}: </p>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded style={{maxHeight: 375, overflow: 'auto'}}>
                <AccordionSummary>
                    Session History
                </AccordionSummary>
                <AccordionDetails>
                        {userHistory.map((session) => (
                            <Accordion key={session.session_number}>
                                <AccordionSummary>
                                    Session {session.session_number}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>Date: {session.session_date}</p>
                                    <p>Playback: {session.playback_type}</p>
                                    <p>Sound Type: {session.sound_type}</p>
                                    <p>Score: {calculateScore(session)}/10</p>
                                    <Accordion>
                                        <AccordionSummary>
                                            Intervals
                                        </AccordionSummary>
                                        {session.intervals.map((int) => (
                                            <AccordionDetails key={`${session.session_number}.${session.intervals.indexOf(int)}`}>
                                            <p>{int.interval}: {int.correct}/{Number(int.correct) + Number(int.incorrect)}</p>
                                            </AccordionDetails>
                                        ))}
                                    </Accordion>
                                    <RetryButton />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </AccordionDetails>
            </Accordion>
                <br/>
            <ExitButton />
            <StartSessionButton />
        </>
    )
}

export default Statistics