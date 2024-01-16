import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


// routes to statistics page
function StatsButton() {

    const history = useHistory()

    const viewStats = () => {
        history.push('/stats')
    }


    return (
        <Button
            onClick={viewStats}
            variant="contained"
            sx={{
                fontFamily: 'Retro-Gaming',
                display: 'block',
                width: 225,
                m: 1,
                mx: 'auto'
            }}
        >
            Stats
        </Button>
    )
}

export default StatsButton
