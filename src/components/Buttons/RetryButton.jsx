import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function RetryButton() {

    const history = useHistory()

    const retry = () => {

    }

    return (
        <Button
            variant="contained"
            onClick={retry}
        >
                Retry
        </Button>
    )
}

export default RetryButton
