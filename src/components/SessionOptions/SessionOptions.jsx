import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { intervals } from "../../tools"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"

function SessionOptions() {

    // hooks
    const history = useHistory()
    const dispatch = useDispatch()

    // loads latest settings on launch
    useEffect(() => {
        dispatch({
            type: 'FETCH_SETTINGS'
        })
    }, [])

    // settings reducer
    const settings = useSelector(store => store.settings)

    // handles input changes
    const handleIntervalChange = (e, newInterval) => {
        dispatch({
            type: 'MODIFY_SETTINGS',
            payload: newInterval,
            route: 'intervals'
        })
    }
    const handlePlaybackChange = (e, newPlayback) => {
        dispatch({
            type: 'MODIFY_SETTINGS',
            payload: newPlayback,
            route: 'playback'
        })
    }

    // updates reducer and db with new settings
    // directs to active session (in saga)
    const start = () => {
        if (settings.intervals.length > 1 && settings.playback !== null) {
            dispatch({
                type: 'NEW_SETTINGS',
                payload: settings,
                history: history
            })
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
                    value={settings.intervals}
                    onChange={handleIntervalChange}
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
                    value={settings.playback}
                    onChange={handlePlaybackChange}
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
