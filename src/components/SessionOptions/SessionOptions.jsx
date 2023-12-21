import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function SessionOptions() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }
    const start = () => {
        history.push('/session')
    }

    return (
        <>
            <h3>SELECT INTERVALS</h3>
                <button>U</button>
                <button>m2</button>
                <button>M2</button>
                <button>m3</button>
                <button>M3</button>
                <button>P4</button>
                <button>TT</button>
                <button>P5</button>
                <button>m6</button>
                <button>M6</button>
                <button>m7</button>
                <button>M7</button>
                <button>8ve</button>
            <h3>PRACTICE OPTIONS</h3>
                <button>Harmonic</button>
                <button>Melodic</button>
                <button>Ascending</button>
                <button>Descending</button>
            <h3>SELECT SOUND</h3>
                <p>dropdown</p>
            <button onClick={exit}>EXIT</button>
            <button onClick={start}>START</button>
        </>
    )
}

export default SessionOptions