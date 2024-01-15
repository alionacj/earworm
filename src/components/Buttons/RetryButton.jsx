import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


function RetryButton({ session }) {
    
    const dispatch = useDispatch()

    const retrySession = (session) => {
        dispatch({
            type: 'RETRY_SETTINGS',
            payload: session.session_number
        })
    }

    
    return (
        <Button
        sx={{fontFamily: 'Retro-Gaming'}}
            variant="contained"
            onClick={() => retrySession(session)}
        >
                Retry
        </Button>
    )
}

export default RetryButton
