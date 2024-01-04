import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import * as Tone from 'tone'


function Session() {

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const transposition = {
        'U': 0,
        'm2': 1,
        'M2': 2,
        'm3': 3,
        'M3': 4,
        'P4': 5,
        'TT': 6,
        'P5': 7,
        'm6': 8,
        'M6': 9,
        'm7': 10,
        'M7': 11,
        '8ve': 12
    }

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
    const intervals = settings.intervals
    const playback = settings.playback

    // audio logic
    const synth = new Tone.Synth().toDestination()
    let firstNote = 'C4'
    let secondNote = Tone.Frequency(firstNote).transpose(transposition)

    const getRandNum = (max) => {
        return Math.floor(Math.random() * max)
    }

    // question & answer logic
    const handleQuestion = () => {
        // selects interval, sets transposition value
        let int = getRandNum(intervals.length)

        let randNote = notes[getRandNum(12)]
        let randOct = getRandNum(8)
        let startingNote = `${randNote}${randOct}`

        let secondNote = Tone.Frequency(`${startingNote}`).transpose(transposition[intervals[int]])

        // console.log('interval:', int)
        // console.log('starting note:', startingNote)
        // console.log('second note:', secondNote)

        synth.triggerAttack(startingNote)
        synth.setNote(secondNote, '+4n')
        synth.triggerRelease('+2n')
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
            {intervals &&
            intervals.map(interval =>
                <button
                    key={intervals.indexOf(interval)}
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