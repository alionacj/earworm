import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

function AnswerButton({ interval, isAnswered, setIsAnswered, setIsCorrect, setProgress, progress, prompt }) {


    const dispatch = useDispatch()

    const handleAnswer = () => {
        setIsAnswered(true)
        if (isAnswered === false) {
            setProgress(progress+10)
        }
        if (interval === prompt.interval) {
            dispatch({
                type: 'MARK_CORRECT',
                payload: {
                    intervalId: prompt.id
                }
            })
            setIsCorrect('Correct!')
        }
        else {
            setIsCorrect('Incorrect!')
        }
    }


    return (
        <Button
            variant="outlined"
            onClick={handleAnswer}
        >
            {interval}
        </Button>
    )
}

export default AnswerButton
