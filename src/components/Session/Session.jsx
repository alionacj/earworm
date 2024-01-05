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
    const playbackOperator = () => {
        switch (playback) {
            case 'ascending':
                return '+'
                break;
            case 'descending':
                return '-'
                break;
            // defaulting to + but should be random!!
            default: return '+'
        }
    }

    // question & answer logic
    const handleQuestion = () => {
        // randomly chooses interval from selections & provides numerical value
        let activeQuestion = selectedIntervals[getRandomInt(0, selectedIntervals.length-1)]
        let transpositionValue = transpositionValues[activeQuestion]
        
        // generates random starting and transposed second note based on current interval
        let firstNote = generateRandomNote()
        let secondNote = Tone.Frequency(firstNote).transpose(`${playbackOperator()}${transpositionValue}`).toNote()

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
            <button onClick={handleQuestion}>▶️</button>
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
        </>
    )
}

export default Session