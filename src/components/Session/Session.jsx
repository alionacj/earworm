import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { playbackOperator } from "../../tools"
import { instrument, poly } from './instrument'

import './Session.css'

function Session() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()
    
    // reducers
    const settings = useSelector(store => store.settings)
    const prompt = useSelector(store => store.prompt)

    // local state
    const [progress, setProgress] = useState(0)

    // generates interval, notes, and stores in db
    const newPrompt = () => {
        let operator = playbackOperator(settings.playback)
        dispatch({
            type: 'NEW_PROMPT',
            payload: settings,
            operator: operator
        })
        setProgress(progress+1)
    }

    // mounts first question
    useEffect(() => {
        let operator = playbackOperator(settings.playback)
        dispatch({
            type: 'NEW_PROMPT',
            payload: settings,
            operator: operator
        })
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
            dispatch({
                type: 'STORE_ANSWER',
                payload: {
                    is_correct: true,
                    id: prompt.id
                }
            })
        }
        else {
            console.log('incorrect')
            dispatch({
                type: 'STORE_ANSWER',
                payload: {
                    is_correct: false,
                    id: prompt.id
                }
            })
        }
    }

    // navigation
    const next = () => {
        if (progress === 10) {
            history.push('/review')
        } else {
            newPrompt()
        }
    }
    const exit = () => {
        history.push('/home')
    }

    return (
        <>
            <progress value={progress} max={10}/>
            <br/><br/>
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
            <button onClick={next}>NEXT</button>
        </>
    )
}

export default Session
