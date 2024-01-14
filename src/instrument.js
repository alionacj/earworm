import { useSelector } from 'react-redux'
import * as Tone from 'tone'


// const settings = useSelector(store => store.settings)

// switch (settings) {
//     case value:
        
//         break;

//     default:
//         break;
// }

export let instrument = new Tone.Synth().toDestination()
export let poly = new Tone.PolySynth(Tone.Synth).toDestination()

// switch (settings.sound) {
//     case 'Synth':
//         instrument = new Tone.Synth().toDestination()
//         poly = new Tone.PolySynth(Tone.Synth).toDestination()
//         break;
//     case 'AMOscillator':
//         instrument = new Tone.AMOscillator().toDestination()
//         poly = new Tone.PolySynth(Tone.AMOscillator).toDestination()
//         break;
//     case 'DuoSynth':
//         instrument = new Tone.DuoSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.DuoSynth).toDestination()
//         break;
//     case 'FMSynth':
//         instrument = new Tone.FMSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.FMSynth).toDestination()
//         break;
//     case 'MembraneSynth':
//         instrument = new Tone.MembraneSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.MembraneSynth).toDestination()
//         break;
//     case 'MetalSynth':
//         instrument = new Tone.MetalSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.MetalSynth).toDestination()
//         break;
//     case 'MonoSynth':
//         instrument = new Tone.MonoSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.MonoSynth).toDestination()
//         break;
//     case 'PluckSynth':
//         instrument = new Tone.PluckSynth().toDestination()
//         poly = new Tone.PolySynth(Tone.PluckSynth).toDestination()
//         break;
//     default:
//         break;
// }

export const instruments = [
    'Synth',
    'AMSynth',
    'DuoSynth',
    'FMSynth',
    'MembraneSynth',
    'MetalSynth',
    'MonoSynth',
    'NoiseSynth',
    'PluckSynth'
]