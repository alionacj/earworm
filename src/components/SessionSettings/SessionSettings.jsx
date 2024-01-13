import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { intervals } from "../../tools"

import ExitButton from "../Buttons/ExitButton"
import StartButton from "../Buttons/StartButton"

import { ToggleButtonGroup, ToggleButton, Container } from "@mui/material"


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
    const handleIntervalChange = (e, newIntervals) => {
        dispatch({
            type: 'MODIFY_SETTINGS',
            payload: newIntervals,
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

    
    return (
        <>
            <h3>SELECT INTERVALS</h3>
                <Container>
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
                </Container>
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
            <ExitButton />
            <StartButton settings={settings}/>
        </>
    )
}

export default SessionOptions
