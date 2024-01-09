import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { playbackOperator } from "../../tools"
import { instrument, poly } from './instrument'

function Session() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()
    
    // reducers
    const settings = useSelector(store => store.settings)
    const prompt = useSelector(store => store.prompt)

    // generates interval, notes, and stores in db
    const newPrompt = () => {
        let operator = playbackOperator(settings.playback)
        dispatch({
            type: 'NEW_PROMPT',
            payload: settings,
            operator: operator
        })
    }

    // mounts first question
    useEffect(() => {
        newPrompt()
    }, [])

    // handles sound generation according to playback
    const playInterval = () => {
        if (settings.playback === 'harmonic') {
            poly.triggerAttackRelease([prompt.firstNote, prompt.secondNote], '4n')
        } else {
            instrument.triggerAttack(`${prompt.firstNote}`)
            instrument.setNote(`${prompt.secondNote}`, '+4n')
            instrument.triggerRelease('+2n')
        }
    }

    const handleAnswer = (interval) => {
        if (interval === prompt.interval) {
            console.log('correct')
            // dispatch({
            //     type: 'STORE_ANSWER',
            //     payload: {
            //         is_correct: true,
            //         id: intervalReducer.id
            //     }
            // })
        }
        else {
            console.log('incorrect')
            // dispatch({
            //     type: 'STORE_ANSWER',
            //     payload: {
            //         is_correct: false,
            //         id: intervalReducer.id
            //     }
            // })
        }
    }

    // navigation
    const exit = () => {
        history.push('/home')
    }
    const next = () => {
    }

    return (
        <>
            <p>progress bar</p>
            <button onClick={playInterval}>▶️</button>
            <h3>SELECT ANSWER</h3>
                {settings.intervals.map(interval =>
                    <button
                        key={settings.intervals.indexOf(interval)}
                        onClick={() => handleAnswer(interval)}
                    >
                        {interval}
                    </button>)}
            <br/><br/>
            <button onClick={exit}>EXIT</button>
            <button onClick={newPrompt}>NEXT</button>
        </>
    )}

export default Session
