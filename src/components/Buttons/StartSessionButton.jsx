import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function StartSessionButton() {

    const history = useHistory()

    const startSession = () => {
        history.push('/options')
    }

    return (
        <Button
            variant="contained"
            onClick={startSession}
        >
                Start
        </Button>
    )
}

export default StartSessionButton
