// stores intervals in the form of:
// {interval: 'm3',
//  id: 4}

const intervalReducer = (state = {}, action) => {
    if (action.type === 'SET_INTERVAL') {
        return action.data
    }
    return state
}

export default intervalReducer