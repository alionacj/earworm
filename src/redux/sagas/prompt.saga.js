import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'
import * as Tone from 'tone'
import { transpositionValues, getRandomInt, generateRandomNote } from "../../tools"

function* newPrompt(action) {

    // parsing action
    const intervals = action.payload.intervals
    const operator = action.operator
    const sessionId = action.payload.sessionId

    // randomly chooses interval from selections & provides transposition number
    let currentInterval = intervals[getRandomInt(0, intervals.length-1)]
    let transpositionValue = transpositionValues[currentInterval]

    // generates random starting and transposed second note based on current interval
    let firstNote = generateRandomNote()
    let secondNote = Tone.Frequency(`${firstNote}`).transpose(`${operator}${transpositionValue}`).toNote()

    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/intervals',
            data: {
                interval: currentInterval,
                sessionId: sessionId,
            }
        })
        yield put({
            type: 'SET_PROMPT',
            data: {
                interval: currentInterval,
                firstNote: firstNote,
                secondNote: secondNote,
                id: response.data.id}
        })
    }
    catch(error) {
        console.error('Interval POST failed:', error)
    }
    
}

function* markCorrect(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/intervals',
            data: action.payload
        })
    }
    catch(error) {
        console.error('Interval answer storage failed:', error)
    }
}

function* intervalsSaga() {
    yield takeLatest('NEW_PROMPT', newPrompt)
    yield takeLatest('MARK_CORRECT', markCorrect)
}

export default intervalsSaga