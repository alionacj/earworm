import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import StartSessionButton from "../Buttons/StartSessionButton"
import StatsButton from "../Buttons/StatsButton"
import LogOutButton from "../Buttons/LogOutButton"

function HomePage () {

    const history = useHistory()



    const seeInfo = () => {
        history.push('/info')
    }

    return (
        <>
            <p>Welcome!</p>
            <StartSessionButton />
            <StatsButton />
            <LogOutButton />
        </>
    )
}

export default HomePage