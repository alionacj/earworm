import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function SessionHistory() {

    const history = useHistory()

    const back = () => {
        history.push('/review')
    }
    const exit = () => {
        history.push('/home')
    }

    return (
        <>
            <h3>SESSION HISTORY</h3>
            <div>
                <p>sessions go here</p>
            </div>
            <button onClick={back}>BACK</button>
            <button onClick={exit}>EXIT</button>
        </>
    )
}

export default SessionHistory