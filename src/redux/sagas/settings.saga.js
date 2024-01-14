import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { playbackOperator } from '../../tools';

function* fetchSettings() {
    try {
        const response = yield axios.get(`/api/settings/`)
        const reducerData = {
            sessionId: response.data.session_id,
            intervals: response.data.intervals_selected.split(','),
            playback: response.data.playback_type,
            sound: response.data.sound_type
        }
        yield put({ type: 'SET_SETTINGS', payload: reducerData })
    }
    catch (error) {
        console.error('Settings GET request failed:', error)
    }
}

function* newSettings(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/settings',
            data: action.payload
        })
        action.payload.sessionId ++
        yield put ({
            type: 'NEW_PROMPT',
            payload: action.payload
        })
        yield action.history.push('/session')
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
