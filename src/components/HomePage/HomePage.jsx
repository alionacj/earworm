import { useSelector } from "react-redux"

import StartSessionButton from "../Buttons/StartButton"
import StatsButton from "../Buttons/StatsButton"
import LogOutButton from "../Buttons/LogOutButton"

import { Box } from "@mui/material"

function HomePage () {

    const user = useSelector(store => store.user)

    return (
        user &&
        <>
            <p className="homeWelcome">Welcome {user.username}!</p>
            <Box className="homeButtonsContainer">
                <StartSessionButton />
                <StatsButton />
                <LogOutButton />
            </Box>
        </>
    )
}

export default HomePage