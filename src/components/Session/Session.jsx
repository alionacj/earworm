import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Tone from 'tone'

import ExitButton from "../Buttons/ExitButton"
import NextButton from "../Buttons/NextButton"
import AnswerButton from "../Buttons/AnswerButton"

import { Button, LinearProgress } from "@mui/material"

function Session() {

    // hooks
    const dispatch = useDispatch()
    
    // reducers
    const settings = useSelector(store => store.settings)
    const prompt = useSelector(store => store.prompt)

    // local state
    const [progress, setProgress] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState('')

    // generates interval, notes, and stores in db
    const newPrompt = () => {
        dispatch({
            type: 'NEW_PROMPT',
            payload: settings
        })
        setIsCorrect('')
    }

    // handles sound generation according to playback
    const playInterval = () => {

        let instrument
        let poly

        // selects sound to be used based on setting
        switch (settings.sound) {
            case 'Synth':
                instrument = new Tone.Synth().toDestination()
                poly = new Tone.PolySynth(Tone.Synth).toDestination()
                break;
            case 'AMSynth':
                instrument = new Tone.AMSynth().toDestination()
                poly = new Tone.PolySynth(Tone.AMSynth).toDestination()
                break;
            case 'DuoSynth':
                instrument = new Tone.DuoSynth().toDestination()
                poly = new Tone.PolySynth(Tone.DuoSynth).toDestination()
                break;
            case 'FMSynth':
                instrument = new Tone.FMSynth().toDestination()
                poly = new Tone.PolySynth(Tone.FMSynth).toDestination()
                break;
            case 'MonoSynth':
                instrument = new Tone.MonoSynth().toDestination()
                poly = new Tone.PolySynth(Tone.MonoSynth).toDestination()
                break;
        }

        if (settings.playback === 'harmonic') {
            poly.triggerAttackRelease([prompt.firstNote, prompt.secondNote], '4n')
        } else {
            instrument.triggerAttack(`${prompt.firstNote}`)
            instrument.setNote(`${prompt.secondNote}`, '+4n')
            instrument.triggerRelease('+2n')
        }
    }


    return (
        settings &&
        <>
            <br/><br/>
            <LinearProgress
                variant="determinate"
                value={progress}
                max={100}
            />
            <br/><br/>
            <Button variant="contained" onClick={playInterval} >▶️</Button>
            <h3>SELECT ANSWER</h3>
                {settings.intervals.map(interval => (
                    <AnswerButton
                    sx={{fontFamily: 'Retro-Gaming'}}
                        key={settings.intervals.indexOf(interval)}
                        setIsAnswered={setIsAnswered}
                        setIsCorrect={setIsCorrect}
                        setProgress={setProgress}
                        isAnswered={isAnswered}
                        progress={progress}
                        interval={interval}
                        prompt={prompt}
                    ></AnswerButton>))}
                    <br></br>
                    {isCorrect}
            <br/><br/>
            <ExitButton />
            <NextButton
                progress={progress}
                isAnswered={isAnswered}
                setIsAnswered={setIsAnswered}
                newPrompt={newPrompt}
            />
        </>
    )
}

export default Session
