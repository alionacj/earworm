import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { intervals, instruments } from "../../tools"

import ExitButton from "../Buttons/ExitButton"
import StartButton from "../Buttons/StartSessionButton"

import { ToggleButtonGroup, ToggleButton, Container, Select, MenuItem } from "@mui/material"


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
    const handleSoundChange = (e, newSound) => {
        dispatch({
            type: 'MODIFY_SETTINGS',
            payload: newSound.props.value,
            route: 'sound'
        })
    }

    
    return (
        settings &&
        <>
            <h3>SELECT INTERVALS</h3>
            <Container>
                <ToggleButtonGroup
                
                    value={settings.intervals}
                    onChange={handleIntervalChange}
                    >
                        {intervals.map((interval) => (
                        <ToggleButton
                        sx={{fontFamily: 'Retro-Gaming'}}
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
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'ascending'}>Ascending</ToggleButton>
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'descending'}>Descending</ToggleButton>
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'harmonic'}>Harmonic</ToggleButton>
                </ToggleButtonGroup>

            <h3>SELECT SOUND</h3>
            <Select sx={{fontFamily: 'Retro-Gaming'}}
                label="select sound"
                value={settings.sound}
                onChange={handleSoundChange}
            >
                {instruments.map((sound) => (
                    <MenuItem
                    sx={{fontFamily: 'Retro-Gaming'}}
                        key={instruments.indexOf(sound)}
                        value={sound}
                    >
                        {sound}
                    </MenuItem>
                ))}
            </Select>
            <br/><br/>
            <ExitButton />
            <StartButton settings={settings}/>
        </>
    )
}

export default SessionOptions
