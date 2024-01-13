import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import StartSessionButton from "../Buttons/StartButton"
import StatsButton from "../Buttons/StatsButton"
import LogOutButton from "../Buttons/LogOutButton"

import { Box } from "@mui/material"

function HomePage () {

    const history = useHistory()
    const user = useSelector(store => store.user)

    return (
        user &&
        <>
            <p id="welcomeText">Welcome {user.username}!</p>
            <div id="homepageButtons">
                <StartSessionButton />
                    <br/><br/>
                <StatsButton />
                    <br/><br/>
                <LogOutButton />
            </div>
        </>
    )
}

export default HomePage