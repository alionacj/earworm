import * as Tone from 'tone'

export let instrument = new Tone.Synth().toDestination()
export let poly = new Tone.PolySynth().toDestination()
