import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


function SessionHistory() {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])

    const userHistory = useSelector(store => store.history)
    console.log(userHistory)


    const back = () => {
        history.push('/review')
    }
    const exit = () => {
        history.push('/home')
    }

    return (
        userHistory[0] &&
        <>
            <h3>SESSION HISTORY</h3>
            <div style={{maxHeight: 500, overflow: 'auto'}}>
                {userHistory.map((session) => (
                    <Accordion>
                        <AccordionSummary>
                            Session {session.session_number}
                        </AccordionSummary>
                        <AccordionDetails>
                            {session.intervals.map((int) => (
                                <p>{int.interval}: {int.correct}/{Number(int.correct) + Number(int.incorrect)}</p>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
            <button onClick={back}>BACK</button>
            <button onClick={exit}>EXIT</button>
        </>
    )
}

export default SessionHistory