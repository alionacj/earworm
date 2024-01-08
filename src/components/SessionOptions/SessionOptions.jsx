import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"

function SessionOptions() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()

    const intervals = ['U', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', '8ve']

    // on launch
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
    }, [])
    
    // settings reducer
    const settings = useSelector(store => store.settings)
    
    // input data stored here, prepopulates with latest selections
    const [ intervalSelection, setIntervalSelection ] = useState(settings.intervals)
    const [ playbackSelection, setPlaybackSelection ] = useState(settings.playback)
    
    // handles input changes
    const handleIntervalSelection = (e, newIntervalSelection) => {
        setIntervalSelection(newIntervalSelection)
    }
    const handlePlaybackSelection = (e, newPlaybackSetting) => {
        setPlaybackSelection(newPlaybackSetting)
    }

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
            dispatch({
                type: 'CLEAR_INTERVAL'
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
        <>
            <h3>SELECT INTERVALS</h3>
                <ToggleButtonGroup
                    value={intervalSelection}
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
                    value={playbackSelection}
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
