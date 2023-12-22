import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function SessionReview() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }
    const retry = () => {
        history.push('/session')
    }
    const pastSessions = () => {
        history.push('/history')
    }

    return (
        <>
            <h3>REVIEW</h3>
            <div>
                <p>SESSION X COMPLETED</p>
                <p>AVERAGE CORRECT: X%</p>
                <p>HIGHEST SCORING: X X%</p>
                <p>LOWEST SCORING: X X%</p>
                <p>interval scores dropdown</p>
                <button onClick={pastSessions}>VIEW SESSIONS</button>
            </div>
                <br></br><br></br>
            <button onClick={exit}>EXIT</button>
            <button onClick={retry}>RETRY</button>
        </>
    )
}

export default SessionReview