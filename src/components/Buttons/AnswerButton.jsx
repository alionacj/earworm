import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

function AnswerButton({ interval, setIsAnswered, setIsCorrect, prompt }) {


    const dispatch = useDispatch()

    const handleAnswer = () => {
        setIsAnswered(true)
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
            console.log('incorrect')
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
