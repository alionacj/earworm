import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSettings() {
    // try {
    //     const response = yield axios.get('/api/settings')
    //     yield put({ type: 'SET_SETTINGS', payload: response.data})
    // }
    // catch (error) {
    //     console.error('Settings GET request failed:', error)
    // }
}

function* newSettings(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/settings',
            data: action.payload
        })
    }
    catch (error) {
        console.error('Settings POST request failed:', error)
    }
}

function* settingsSaga() {
    yield takeLatest('FETCH_SETTINGS', fetchSettings)
    yield takeLatest('NEW_SETTINGS', newSettings)
}

export default settingsSaga;
