import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function SessionReview() {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])
    
    const userHistory = useSelector(store => store.history)
    const latestSession = userHistory[0]
    const score = userHistory.length > 1 && 
        latestSession.intervals.reduce((sum, int) => {
        return sum + Number(int.correct)
    }, 0)

    const exit = () => {
        history.push('/home')
    }
    const retry = () => {
        history.push('/session')
    }
    const viewHistory = () => {
        history.push('/history')
    }

    return (
        latestSession &&
        <>
            <h3>REVIEW</h3>
            <div>
                <p>SESSION {latestSession.session_number} COMPLETED</p>
                <p>SCORE: {score}/10</p>
                {latestSession.intervals.map((int) => (
                    <p>{int.interval}: {int.correct}/{int.incorrect}</p>
                ))}
                <button onClick={viewHistory}>ALL SESSIONS</button>
            </div>
                <br></br>
            <button onClick={exit}>EXIT</button>
            <button onClick={retry}>RETRY</button>
        </>
    )
}

export default SessionReview