// stores intervals in the form of:
// {
//      interval: 'm3',
//      firstNote: 'C4',
//      secondNote: 'A4',
//      sessionId: 4
// }

const prompt = (state = {}, action) => {
    if (action.type === 'SET_PROMPT') {
        return action.data
    }
    else if (action.type === 'CLEAR_PROMPT') {
        return {}
    }
    return state
}

export default prompt