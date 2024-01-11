import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function StatsButton() {

    const history = useHistory()

    const viewStats = () => {
        history.push('/stats')
    }

    return (
        <Button
            variant="contained"
            onClick={viewStats}
        >
                Stats
        </Button>
    )
}

export default StatsButton
