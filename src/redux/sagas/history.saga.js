import axios from 'axios'
import {put, takeLatest } from 'redux-saga/effects'

function* fetchHistory() {
    try {
        const response = yield axios.get('/api/history')
        yield put({
            type: 'SET_HISTORY',
            payload: response.data
        })
    }
    catch(error) {
        console.error('History GET request failed:', error)
    }
}

function* historySaga() {
    yield takeLatest('FETCH_HISTORY', fetchHistory)
}

export default historySaga
