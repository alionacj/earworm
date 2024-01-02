import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Session() {

    const history = useHistory()

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
            <div>
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
            </div>
                <br/>
            <button onClick={exit}>EXIT</button>
            {/* placeholder to review - will eventually move to next question */}
            <button onClick={next}>NEXT</button>
        </>
    )
}

export default Session