import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react"

import { ToggleButtonGroup, ToggleButton } from "@mui/material"

function SessionOptions() {

    const history = useHistory()

    const intervals = ['U', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', '8ve']

    const [ intervalSelection, setIntervalSelection ] = useState([])
    const [ playbackSelection, setPlaybackSelection ] = useState(null)

    const handleIntervalSelection = (e, newIntervalSelection) => {
        setIntervalSelection(newIntervalSelection)
    }
    const handlePlaybackSelection = (e, newPlaybackSetting) => {
        setPlaybackSelection(newPlaybackSetting)
        console.log(playbackSelection)
    }

    const exit = () => {
        history.push('/home')
    }
    const start = () => {
        history.push('/session')
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
                    onChange={handlePlaybackSelection} // this alternates between null and the same value upon multiple clicks. why???
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