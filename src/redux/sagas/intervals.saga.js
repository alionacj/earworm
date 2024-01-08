import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

function* newInterval(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/intervals',
            data: action.payload
        })
        yield put({
            type: 'SET_INTERVAL',
            data: action.payload.interval
        })
    }
    catch(error) {
        console.error('Interval POST failed:', error)
    }
}

function* clearInterval(action) {
    try {
        yield put({
            type: 'SET_INTERVAL',
            data: ''
        })
    }
    catch(error) {
        console.error('Interval clear failed:', error)
    }
}

function* intervalsSaga() {
    yield takeLatest('NEW_INTERVAL', newInterval)
    yield takeLatest('CLEAR_INTERVAL', clearInterval)
}

export default intervalsSaga