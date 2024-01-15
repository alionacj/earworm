import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


// routes home
function ExitButton() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }

    
    return (
        <Button
            sx={{fontFamily: 'Retro-Gaming'}}
            variant="contained"
            onClick={exit}
        >
                MENU
        </Button>
    )
}

export default ExitButton
