// stores intervals in the form of:
// 'm3'

const intervalReducer = (state = '', action) => {
    if (action.type === 'SET_INTERVAL') {
        return action.data
    }
    return state
}

export default intervalReducer