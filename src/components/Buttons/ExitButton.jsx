import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function ExitButton() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }

    return (
        <Button
            variant="contained"
            onClick={exit}
        >
                MENU
        </Button>
    )
}

export default ExitButton
