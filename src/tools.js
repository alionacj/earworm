// array of all note names
// NO FLATS ONLY SHARPS
export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

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

// generates random integer between given numbers
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNote() {
    let randomNote = notes[getRandomInt(0, 11)]
    let randomOctave = getRandomInt(3, 6)
    return `${randomNote}${randomOctave}`
}