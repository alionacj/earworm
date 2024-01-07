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

function* intervalsSaga() {
    yield takeLatest('NEW_INTERVAL', newInterval)
}

export default intervalsSaga