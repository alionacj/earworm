// stored in the form of:
// [
//     {
//         sessionNumber: 23,
//         playbackType: 'ascending',
//         sound_type: null,
//         intervals: {
//             M3: {correct: 1, incorrect: 4},
//             m7: {correct: 5, incorrect: 0}
//         }
//     }
//     {
//       ...
//     }
// ]

const history = (state = {}, action) => {
    if (action.type === 'SET_HISTORY') {
        return action.data
    }
    return state
}

export default history
 