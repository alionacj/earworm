// stores intervals in the form of:
// {
//      interval: 'm3',
//      firstNote: 'C4',
//      secondNote: 'A4',
//      sessionId: 4
// }

const intervalReducer = (state = {}, action) => {
    if (action.type === 'SET_INTERVAL') {
        return action.data
    }
    return state
}

export default intervalReducer