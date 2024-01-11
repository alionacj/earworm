import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function NextButton({ progress, newPrompt }) {

    const history = useHistory()

    const next = () => {
        if (progress === 100) {
            history.push('/stats')
        } else {
            newPrompt()
        }
    }

    return (
        <Button
            variant="contained"
            onClick={next}
        >
                Next
        </Button>
    )
}

export default NextButton
