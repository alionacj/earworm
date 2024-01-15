import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';


function AnswerButton({ prompt, interval, setIsCorrect,
                        isAnswered, setIsAnswered,
                        progress, setProgress }) {

    const dispatch = useDispatch()

    const handleAnswer = () => {

        // marks interval correct if correct
            // incorrect by default
        if (interval === prompt.interval) {
            if (isAnswered === false) {
                dispatch({
                    type: 'MARK_CORRECT',
                    payload: {
                        intervalId: prompt.id
                    }
                })
            }
            setIsCorrect('Correct!')
        }
        else {
            setIsCorrect('Incorrect!')
        }

        // isAnswered handles next button usability
            // sets to true so user can move to next question
            // progress bar increases
        setIsAnswered(true)
        if (isAnswered === false) {
            setProgress(progress+10)
        }
    }


    return (
        <Button
            sx={{fontFamily: 'Retro-Gaming'}}
            className='appButton'
            variant="outlined"
            onClick={handleAnswer}
        >
            {interval}
        </Button>
    )
}

export default AnswerButton
