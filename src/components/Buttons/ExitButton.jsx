import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Box, Button } from '@mui/material';


// routes home
function ExitButton() {

    const history = useHistory()

    const exit = () => {
        history.push('/home')
    }

    
    return (
        <>
        <Box 
        sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center'
        }}
    >
        <Button
            sx={{
                fontFamily: 'Retro-Gaming',
                width: 125,
                ml: '3px',
                mr: '3px'
            }}
            variant="contained"
            onClick={exit}
        >
                MENU
        </Button>
    </Box>
    </>
    )
}

export default ExitButton
