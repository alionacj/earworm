import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import LogOutButton from "../LogOutButton/LogOutButton"

function HomePage () {

    const history = useHistory()
    const dispatch = useDispatch()

    const userId = useSelector((store) => store.user.id)

    const startSession = () => {
        history.push('/options')
        dispatch({
            type: 'FETCH_SETTINGS',
            payload: userId
        })
    }
    const viewStats = () => {
        history.push('/stats')
    }
    const seeInfo = () => {
        history.push('/info')
    }

    return (
        <>
            <p>Welcome!</p>
            <button onClick={startSession}>Start Session</button>
                <br/>
            <button onClick={viewStats}> View Statistics</button>
                <br/>
            <button onClick={seeInfo}>Information</button>
                <br/><br/>
            <LogOutButton />
        </>
    )
}

export default HomePage