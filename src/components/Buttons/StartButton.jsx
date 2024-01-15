import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


function StartButton() {

    const history = useHistory()

    const startSession = () => {
        history.push('/options')
    }

    return (
        <Button
            variant="contained"
            onClick={startSession}
            sx={{fontFamily: 'Retro-Gaming'}}
        >
                Start
        </Button>
    )
}

export default StartButton
