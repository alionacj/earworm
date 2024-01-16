import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';


function NextButton({ progress, newPrompt,
                      isAnswered, setIsAnswered }) {

    const history = useHistory()

    const next = () => {
        // ends session at 10 questions
        if (progress === 100) {
            history.push('/stats')

        // re-disables next button
        // mounts new question
        } else {
            setIsAnswered(false)
            newPrompt()
        }
    }

    
    return (
        <Button
        sx={{
            fontFamily: 'Retro-Gaming',
                width: 125,
            }}
            disabled={!isAnswered}
            variant="contained"
            onClick={next}
        >
            Next
        </Button>
    )
}

export default NextButton
