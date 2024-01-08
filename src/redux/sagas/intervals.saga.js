import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects'

function* newInterval(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/intervals',
            data: action.payload
        })
        yield put({
            type: 'SET_INTERVAL',
            data: {interval: action.payload.interval,
                id: response.data.id}
        })
    }
    catch(error) {
        console.error('Interval POST failed:', error)
    }
}

function* storeAnswer(action) {
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
    yield takeLatest('STORE_ANSWER', storeAnswer)
    yield takeLatest('CLEAR_INTERVAL', clearInterval)
}

export default intervalsSaga