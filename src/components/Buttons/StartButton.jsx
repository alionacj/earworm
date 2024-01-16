import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


function StartButton() {

    const history = useHistory()

    const startSession = () => {
        history.push('/settings')
    }

    return (
        <Button
            variant="contained"
            onClick={startSession}
            sx={{
                fontFamily: 'Retro-Gaming',
                display: 'block',
                width: 225,
                m: 1,
                mx: 'auto'
            }}
        >
            Start
        </Button>
    )
}

export default StartButton
