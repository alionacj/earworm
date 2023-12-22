import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Statistics() {

    const history = useHistory()

    const viewSessions = () => {
        history.push('/history')
    }
    const exit = () => {
        history.push('/home')
    }
    const start = () => {
        history.push('/options')
    }

    return (
        <>
            <h3>TOTAL STATS</h3>
            <div>
                <p>SESSIONS COMPLETED: #</p>
                <p>AVERAGE CORRECT: #%</p>
                <p>HIGHEST SCORING: X #%</p>
                <p>LOWEST SCORING: X #%</p>
                <p>interval dropdown</p>
                <button onClick={viewSessions}>VIEW SESSIONS</button>
            </div>
            <button onClick={exit}>EXIT</button>
            <button onClick={start}>START</button>
        </>
    )
}

export default Statistics