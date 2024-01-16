import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


function StartSessionButton({ settings }) {

    // hooks
    const dispatch = useDispatch()
    const history = useHistory()

    // updates reducer and db with new settings
    // directs to active session (in saga)
    const start = () => {
        if (settings.intervals.length > 1 && settings.playback !== null) {
            dispatch({
                type: 'NEW_SETTINGS',
                payload: settings,
                history: history
            })
        } else {
            alert('Please select at least two intervals to practice and a how you would like to hear them.')
        }
    }

    
    return (
        <Button
            onClick={start}
            variant="contained"
            sx={{
                fontFamily: 'Retro-Gaming',
                width: 125,
                ml: '3px',
                mr: '3px'
            }}
        >
            Start
        </Button>
    )
}

export default StartSessionButton
