// recieves settings in the form of:
// {
//   intervals: ['U', 'm3'],
//   playback: 'ascending'
// }

const settingsReducer = (state = {}, action) => {
    if (action.type === 'SET_SETTINGS') {
        return action.payload
    }
    return state // may be an issue that this is returning
                 // empty on load... will probs need to 
                 // get this from database initially
}

export default settingsReducer
