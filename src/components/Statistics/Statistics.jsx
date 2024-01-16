import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import ExitButton from "../Buttons/ExitButton"
import { intervals } from '../../tools'

import { Box } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

function Statistics() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])

    const userHistory = useSelector(store => store.history)

    const getTotalScore = () => {
        let correctCounter = 0
        let incorrectCounter = 0
        for (let session of userHistory) {
            if (session.intervals.length > 0) {
                for (let interval of session.intervals) {
                    correctCounter += Number(interval.correct)
                    incorrectCounter += Number(interval.incorrect)
                }
            }
        }
        return (correctCounter/(incorrectCounter+correctCounter)*100).toFixed(2)
    }

    const getTotalIntScore = (interval) => {
        let correctCounter = 0
        let totalCounter = 0
        for (let session of userHistory) {
            if (session.intervals[0]) {
            for (let sessionInt of session.intervals) {
                if (interval === sessionInt.interval) {
                    correctCounter += Number(sessionInt.correct)
                    totalCounter += Number(sessionInt.correct)
                    totalCounter += Number(sessionInt.incorrect)
                }
            }}
        }
        return (correctCounter/totalCounter*100).toFixed(2)
    }

    const getSessionScore = (session) => {
        let correct = 0
        let total = 0
        for (let interval of session.intervals) {
            if (interval) {
                correct += Number(interval.correct)
                total += Number(interval.correct)
                total += Number(interval.incorrect)
            }
        }
        return ((correct/total*100))
    }


    return (
        userHistory[0] &&
        <>
            <h3 className="statisticsHeader">STATISTICS</h3>

            <p className="statisticsHeader">TOTAL SCORE: {getTotalScore()}%</p>

            {/* all interval section */}
            <Accordion sx={{maxHeight: 375, overflow: 'auto', marginBottom: '10px'}}>
                <AccordionSummary sx={{textAlign: "center"}}>
                    Interval Performance
                </AccordionSummary>
                <AccordionDetails>
                    {intervals.map((int) => (
                        <p key={intervals.indexOf(int)}>{int}: {getTotalIntScore(int)}%</p>
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* session section */}
            <Accordion defaultExpanded sx={{maxHeight: 405, overflow: 'auto', marginBottom: '30px'}}>
                <AccordionSummary>
                    Session History
                </AccordionSummary>

                {/* individual sessions */}
                <AccordionDetails>
                    {userHistory.map((session) => (
                        <Accordion key={session.session_number}>
                            <AccordionSummary>
                                Session {session.session_number}
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>Date: {(session.session_date).replaceAll('-', '/').replace('T', ', ').slice(0, -8)}</p>
                                <p>Playback: {session.playback_type}</p>
                                <p>Sound Type: {session.sound_type}</p>
                                <p>Score: {getSessionScore(session)}%</p>

                                {/* intervals per session */}
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

                            {/* <RetryButton session={session}/> */}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>

            <ExitButton />

        </>
    )
}

export default Statistics