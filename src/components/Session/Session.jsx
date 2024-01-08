import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { transpositionValues, getRandomInt, generateRandomNote } from "./sessionTools"
import { instrument, poly } from './instrument'
import * as Tone from 'tone'

function Session() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()

    // local state
    let [firstNote, setFirstNote] = useState('')
    let [secondNote, setSecondNote] = useState('')
    
    // reducer data
    const settings = useSelector(store => store.settings)
    const latestInterval = useSelector(store => store.interval)
    // variables derived from reducer data
    const intervalsSelected = settings.intervalsSelected
    const playbackType = settings.playbackType
    const sessionId = settings.session_id
    
    // gets latest settings from db
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
        newQuestion()
    }, [])

    // generates interval, notes, and stores in db
    const newQuestion = () => {

        // randomly chooses interval from selections & provides transposition number
        let currentInterval = intervalsSelected && intervalsSelected[getRandomInt(0, intervalsSelected && intervalsSelected.length-1)]
        let transpositionValue = transpositionValues[currentInterval]

        // selects + or - depending on playback
        const playbackOperator = () => {
            switch (playbackType) {
                case 'ascending':
                    return '+'
                case 'descending':
                    return '-'
                default:
                    let options = ['+', '-']
                    let result = options[getRandomInt(0,1)]
                return result
            }
        }

        // generates random starting and transposed second note based on current interval
        intervalsSelected && setFirstNote(generateRandomNote())
        intervalsSelected && setSecondNote(Tone.Frequency(firstNote).transpose(`${playbackOperator()}${transpositionValue}`).toNote())

        // sends data to server
        dispatch({
            type: 'NEW_INTERVAL',
            payload: { interval: currentInterval,
                sessionId: sessionId }
        })
    }

    // handles sound generation according to playback
    const playInterval = () => {
        if (playbackType === 'harmonic') {
            poly.triggerAttackRelease([firstNote, secondNote], '4n')
        } else {
            instrument.triggerAttack(`${firstNote}`)
            instrument.setNote(`${secondNote}`, '+4n')
            instrument.triggerRelease('+2n')
        }
    }

    const handleAnswer = (interval) => {
        if (interval === latestInterval.interval) {
            console.log('correct')
            dispatch({
                type: 'STORE_ANSWER',
                payload: {
                    is_correct: true,
                    id: latestInterval.id
                }
            })
        }
        else {
            console.log('incorrect')
            dispatch({
                type: 'STORE_ANSWER',
                payload: {
                    is_correct: false,
                    id: latestInterval.id
                }
            })
        }
    }

    // navigation
    const exit = () => {
        history.push('/home')
    }
    const next = () => {
    }

    // loads first interval upon reducer retrieval
    if(intervalsSelected) {

    }

    return (
        <>
            <p>progress bar</p>
            <button onClick={playInterval}>▶️</button>
            <h3>SELECT ANSWER</h3>
            {intervalsSelected &&
            intervalsSelected.map(interval =>
                <button
                    key={intervalsSelected.indexOf(interval)}
                    onClick={() => handleAnswer(interval)}
                >
                    {interval}
                </button>)}
            <br/><br/>
            <button onClick={exit}>EXIT</button>
            <button onClick={newQuestion}>NEXT</button>
        </>
    )}

export default Session
