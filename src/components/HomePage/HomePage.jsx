import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import LogOutButton from "../LogOutButton/LogOutButton"

function HomePage () {

    const history = useHistory()

    const startSession = () => {
        history.push('/options')
    }
    const viewStats = () => {
        history.push('/stats')
    }
    const info = () => {
        history.push('/info')
    }

    return (
        <>
            <p>Welcome!</p>
            <button onClick={startSession}>Start Session</button>
            <button onClick={viewStats}> View Statistics</button>
            <button onClick={info}>Info</button>
            <LogOutButton />
        </>
    )
}

export default HomePage