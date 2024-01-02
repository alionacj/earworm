import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Session() {

    const history = useHistory()
    const dispatch = useDispatch()

    // settings data from reducer
    const settings = useSelector(store => store.settings)
    const intervals = settings.intervals
    const playback = settings.playback

    // gets latest settings from db
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
        console.log('settings:', settings)
    }, [])

    const handleAnswer = (interval) => {
        console.log(interval)
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
            <button>▶️</button>
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