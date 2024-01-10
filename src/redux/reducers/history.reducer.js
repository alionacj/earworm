const history = (state = {}, action) => {
    if (action.type === 'SET_HISTORY') {
        return action.data
    }
    return state
}

export default history
 