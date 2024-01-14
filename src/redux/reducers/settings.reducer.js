// stores settings in the form of:
// {
//   sessionId: 32,
//   intervals: ['U', 'm3'],
//   playback: 'ascending',
//   sound: 'Synth'
// }

const settingsReducer = (state = {}, action) => {
    if (action.type === 'SET_SETTINGS') {
        return action.payload
    }
    else if (action.type === 'MODIFY_SETTINGS') {
        if (action.route === 'intervals') {
            return {...state, intervals: action.payload}
        }
        else if (action.route === 'playback') {
            return {...state, playback: action.payload}
        }
        else if (action.route === 'sound') {
            return {...state, sound: action.payload}
        }
    }
    return state
}

export default settingsReducer
