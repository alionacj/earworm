import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { intervals, instruments } from "../../tools"

import ExitButton from "../Buttons/ExitButton"
import StartButton from "../Buttons/StartSessionButton"

import { Box, ToggleButtonGroup, ToggleButton, Select, MenuItem } from "@mui/material"

function Settings() {

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
            {/* interval selection */}
            <h3 className="settingText">SELECT INTERVALS</h3>
            <div className="selectIntervals">
            <ToggleButtonGroup
                spacing={5}
                className="selectIntervals"
                value={settings.intervals}
                onChange={handleIntervalChange}
                sx={{flexWrap: 'wrap', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                {intervals.map((interval) => (
                    <ToggleButton
                    sx={{
                        fontFamily: 'Retro-Gaming',
                        display: "grid",
                        width: .14,
                        textTransform: 'none'
                    }}
                        key={intervals.indexOf(interval)}
                        value={interval}
                        >
                            {interval}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            </div>

            {/* playback selection */}
            <h3 className="settingText">PRACTICE OPTIONS</h3>
                <ToggleButtonGroup
                    exclusive
                    orientation='vertical'
                    value={settings.playback}
                    onChange={handlePlaybackChange}
                    sx={{
                        width: '100%'
                    }}
                >
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'ascending'}>Ascending</ToggleButton>
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'descending'}>Descending</ToggleButton>
                    <ToggleButton sx={{fontFamily: 'Retro-Gaming'}} value={'harmonic'}>Harmonic</ToggleButton>
                </ToggleButtonGroup>

            {/* sound selection */}
            <h3 className="settingText">SELECT SOUND</h3>
            <Select
                label="select sound"
                value={settings.sound}
                onChange={handleSoundChange}
                sx={{
                    width: '100%',
                    fontFamily: 'Retro-Gaming',
                    textAlign: 'center'
                }}
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

            <Box
                sx={{
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <ExitButton />
                <StartButton settings={settings}/>
            </Box>
        </>
    )
}

export default Settings
