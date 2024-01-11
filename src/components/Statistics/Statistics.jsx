import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Statistics() {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])

    const userHistory = useSelector(store => store.history)

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
        userHistory[0] &&
        <>
            <h3>TOTAL STATS</h3>
            <div>
                <p>SESSIONS COMPLETED: {userHistory[0].session_number}</p>
                <p>AVERAGE CORRECT: #%</p>
                <p>HIGHEST SCORING: X #%</p>
                <p>LOWEST SCORING: X #%</p>
                <p>interval dropdown</p>
                <button onClick={viewSessions}>VIEW SESSIONS</button>
            </div>
                <br/>
            <button onClick={exit}>HOME</button>
            <button onClick={start}>START</button>
        </>
    )
}

export default Statistics