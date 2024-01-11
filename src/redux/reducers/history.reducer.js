const historyReducer = (state = [], action) => {
    if (action.type === 'SET_HISTORY') {
        return action.payload
    }
    return state
}

export default historyReducer
 