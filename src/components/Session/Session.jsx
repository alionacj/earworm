import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { transpositionValues, getRandomInt, generateRandomNote } from "./sessionTools"
import { instrument, poly } from './instrument'
import * as Tone from 'tone'

function Session() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()

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
    }, [])

    // global variables used in playback
    let firstNote
    let secondNote

    // randomly selects interval and notes
    const newQuestion = () => {

        // randomly chooses interval from selections & provides numerical value
        let currentInterval = intervalsSelected[getRandomInt(0, intervalsSelected.length-1)]
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
        firstNote = generateRandomNote()
        secondNote = Tone.Frequency(firstNote).transpose(`${playbackOperator()}${transpositionValue}`).toNote()

        // sends data to server
        dispatch({
            type: 'NEW_INTERVAL',
            payload: { interval: currentInterval,
                sessionId: sessionId }
        })
    }

    // causes instrument to play according to playback
    const playInterval = () => {
        // handles sound generation
        if (playbackType === 'harmonic') {
            poly.triggerAttackRelease([firstNote, secondNote], '4n')
        } else {
            instrument.triggerAttack(firstNote)
            instrument.setNote(secondNote, '+4n')
            instrument.triggerRelease('+2n')
        }
    }

    const handleAnswer = (interval) => {

    }

    // navigation
    const exit = () => {
        history.push('/home')
    }
    const next = () => {
    }

    // loads first interval upon reducer retrieval
    if(intervalsSelected) {
        newQuestion()
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
            <button onClick={newQuestion}>NEXT</button>
            <button onClick={exit}>EXIT</button>
        </>
    )}

export default Session
