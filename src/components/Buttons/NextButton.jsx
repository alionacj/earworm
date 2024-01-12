import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';

function NextButton({ progress, isAnswered, setIsAnswered, newPrompt }) {

    const history = useHistory()

    const next = () => {
        if (progress === 100) {
            history.push('/stats')
        } else {
            setIsAnswered(false)
            newPrompt()
        }
    }

    return (
        <Button
            disabled={!isAnswered}
            variant="contained"
            onClick={next}
        >
                Next
        </Button>
    )
}

export default NextButton
