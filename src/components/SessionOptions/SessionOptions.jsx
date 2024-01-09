import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { intervals } from "../../tools"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"

function SessionOptions() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()

    // settings reducer
    const settings = useSelector(store => store.settings)

    // input data stored here
    const [ intervalSelection, setIntervalSelection ] = useState([])
    const [ playbackSelection, setPlaybackSelection ] = useState('')

    // handles input changes
    const handleIntervalSelection = (e, newIntervalSelection) => {
        setIntervalSelection(newIntervalSelection)
    }
    const handlePlaybackSelection = (e, newPlaybackSetting) => {
        setPlaybackSelection(newPlaybackSetting)
    }
    
    // on launch
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
        setIntervalSelection(settings.intervalsSelected)
        setPlaybackSelection(settings.playbackType)
    }, [])

    // updates reducer and db with new settings
    // directs to active session
    const start = () => {
        if (intervalSelection.length > 1 && playbackSelection !== null) {
            dispatch({
                type: 'NEW_SETTINGS',
                payload: {
                    intervals: intervalSelection,
                    playback: playbackSelection
                }
            })
            history.push('/session')
        } else {
            alert('Please select at least two intervals to practice and a how you would like to hear them.')
        }
    }
    
    // directs home
    const exit = () => {
        history.push('/home')
    }

    
    return (
        settings.intervalsSelected &&
        <>
            <h3>SELECT INTERVALS</h3>
                <ToggleButtonGroup
                    value={intervalSelection || settings.intervalsSelected}
                    onChange={handleIntervalSelection}
                    >
                        {intervals.map((interval) => (
                        <ToggleButton
                            key={intervals.indexOf(interval)}
                            value={interval}
                            >
                                {interval}
                            </ToggleButton>))}
                </ToggleButtonGroup>
            <h3>PRACTICE OPTIONS</h3>
                <ToggleButtonGroup
                    exclusive
                    value={playbackSelection || settings.playbackType}
                    onChange={handlePlaybackSelection}
                >
                    <ToggleButton value={'ascending'}>Ascending</ToggleButton>
                    <ToggleButton value={'descending'}>Descending</ToggleButton>
                    <ToggleButton value={'harmonic'}>Harmonic</ToggleButton>
                </ToggleButtonGroup>
            <h3>SELECT SOUND</h3>
                <p>dropdown</p>
            <button onClick={exit}>EXIT</button>
            <button onClick={start}>START</button>
        </>
    )
}

export default SessionOptions
