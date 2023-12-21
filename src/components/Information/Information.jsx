import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Information() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }
    const startSession = () => {
        history.push('/options')
    }

    return (
        <>
            <h3>INFORMATION</h3>
            <p>theory goes here</p>
            <button onClick={exit}>EXIT</button>
            <button onClick={startSession}>START</button>
        </>
    )
}

export default Information