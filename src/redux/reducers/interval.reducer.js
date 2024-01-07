const intervalReducer = (state = '', action) => {
    if (action.type === 'SET_INTERVAL') {
        return action.data
    }
    return state
}

export default intervalReducer