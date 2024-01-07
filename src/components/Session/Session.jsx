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

    // gets latest settings from db
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
    }, [])

    // settings data from reducer
    const settings = useSelector(store => store.settings)
    const selectedIntervals = settings.intervals
    const playback = settings.playback
    const sessionId = settings.session_id
    const playbackOperator = () => {
        switch (playback) {
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

   let firstNote
   let secondNote

    // randomly selects interval and notes
    const newQuestion = () => {

        // randomly chooses interval from selections & provides numerical value
        let activeQuestion = selectedIntervals[getRandomInt(0, selectedIntervals.length-1)]
        let transpositionValue = transpositionValues[activeQuestion]

        // generates random starting and transposed second note based on current interval
        firstNote = generateRandomNote()
        secondNote = Tone.Frequency(firstNote).transpose(`${playbackOperator()}${transpositionValue}`).toNote()

        // sends data to server
        dispatch({
            type: 'NEW_INTERVAL',
            payload: { interval: activeQuestion,
                sessionId: sessionId }
        })
    }

    // causes instrument to play 
    const playInterval = () => {
        // handles sound generation
        if (playback === 'harmonic') {
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
        history.push('/review')
    }


    return (
        <>
            <p>progress bar</p>
            {/* play switches to stop while playing */}
            <button onClick={playInterval}>▶️</button>
            <h3>SELECT ANSWER</h3>
            {selectedIntervals &&
            selectedIntervals.map(interval =>
                <button
                    key={selectedIntervals.indexOf(interval)}
                    onClick={() => handleAnswer(interval)}
                >
                    {interval}
                </button>)}
            <br/><br/>
            <button onClick={exit}>EXIT</button>
            {/* placeholder to review - will eventually move to next question */}
            <button onClick={next}>NEXT</button>
            <button onClick={newQuestion}> STORE INTERVAL LOL</button>
        </>
    )
}

export default Session