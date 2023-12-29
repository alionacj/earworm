import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function SessionOptions() {

    const history = useHistory()

    // tracks toggle status of buttons
    const intervalToggle = {
        U: false,
        m2: false,
        M2: false,
        m3: false,
        M3: false,
        P4: false,
        TT: false,
        P5: false,
        m6: false,
        M6: false,
        m7: false,
        M7: false,
        Oct: false
    }

    const settings = {
        intervals: [],
        playback: null
    }

    // updates interval toggle status and settings
    const setSettings = (e) => {

        let buttonType = e.target.className
        let buttonValue = e.target.value

        if ( buttonType === 'interval' ) {
            // adds or removes selected interval from settings depending on toggle
            if ( intervalToggle[buttonValue] === false ) {
                settings.intervals.push(buttonValue)
            }
            else if ( intervalToggle[buttonValue] === true ) {
                settings.intervals = settings.intervals.filter((int) => int !== buttonValue)
            }
            // toggles selected button
            intervalToggle[buttonValue] = !intervalToggle[buttonValue]
        }
        // sets playback in settings as selection
        else if ( buttonType === 'playback' ) {
            settings.playback = buttonValue
        }
        console.log(intervalToggle)
        console.log(settings)
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
                <button className="interval" value={'U'} onClick={setSettings}>U</button>
                <button className="interval" value={'m2'} onClick={setSettings}>m2</button>
                <button className="interval" value={'M2'} onClick={setSettings}>M2</button>
                <button className="interval" value={'m3'} onClick={setSettings}>m3</button>
                <button className="interval" value={'M3'} onClick={setSettings}>M3</button>
                <button className="interval" value={'P4'} onClick={setSettings}>P4</button>
                <button className="interval" value={'TT'} onClick={setSettings}>TT</button>
                <button className="interval" value={'P5'} onClick={setSettings}>P5</button>
                <button className="interval" value={'m6'} onClick={setSettings}>m6</button>
                <button className="interval" value={'M6'} onClick={setSettings}>M6</button>
                <button className="interval" value={'m7'} onClick={setSettings}>m7</button>
                <button className="interval" value={'M7'} onClick={setSettings}>M7</button>
                <button className="interval" value={'Oct'} onClick={setSettings}>8ve</button>
            <h3>PRACTICE OPTIONS</h3>
                <button className="playback" value={'harmonic'} onClick={setSettings}>Harmonic</button>
                <button className="playback" value={'ascending'} onClick={setSettings}>Ascending</button>
                <button className="playback" value={'descending'} onClick={setSettings}>Descending</button>
            <h3>SELECT SOUND</h3>
                <p>dropdown</p>
            <button onClick={exit}>EXIT</button>
            <button onClick={start}>START</button>
        </>
    )
}

export default SessionOptions