// array of all note names
// NO FLATS ONLY SHARPS
export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const intervals = ['U', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', '8ve']

// numerical value for each interval
// can be used directly by tone.js
export const transpositionValues = {
    'U': 0,
    'm2': 1,
    'M2': 2,
    'm3': 3,
    'M3': 4,
    'P4': 5,
    'TT': 6,
    'P5': 7,
    'm6': 8,
    'M6': 9,
    'm7': 10,
    'M7': 11,
    '8ve': 12
}

export const instruments = [
    'Synth',
    'AMSynth',
    'DuoSynth',
    'FMSynth',
    'MonoSynth'
]

// generates random integer between given numbers
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNote() {
    let randomNote = notes[getRandomInt(0, 11)]
    let randomOctave = getRandomInt(3, 5)
    return `${randomNote}${randomOctave}`
}

// selects + or - depending on playback
export const playbackOperator = (playback) => {
    switch (playback) {
        case 'ascending':
            return '+'
        case 'descending':
            return '-'
        default:
            let options = ['+', '-']
            let result = options[getRandomInt(0,1)]
        return result
    }
}
