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
    
    // const userHistory = useSelector(store => store.history)
    // const latestSession = userHistory[0]
    // const sessionNumber = latestSession.session_number

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
        <>
            <h3>REVIEW</h3>
            <div>
                <p>SESSION  COMPLETED</p>
                <p>SCORE: X/10</p>
                <button onClick={viewHistory}>VIEW HISTORY</button>
            </div>
                <br></br>
            <button onClick={exit}>EXIT</button>
            <button onClick={retry}>RETRY</button>
        </>
    )
}

export default SessionReview