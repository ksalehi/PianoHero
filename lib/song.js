const Note = require('./note');
const Constants = require('./constants');

const PIXEL_MAPPING = {
  'C': 200,
  'D': 275,
  'E': 350,
  'F': 425,
  'G': 500,
  'A': 575,
  'B': 650,
  'C6': 725
};

const testSong = 'c';
const odeToJoy = 'EEFGGFEDCCDEEDDEEFGGFEDCCDEDCC';
const LionSleepsTonight = 'CDEDEFEDCDEDCEDGFEFGFEDCDEDCED';

const SONG_MAPPING = {
  'Test': testSong,
  'Ode to Joy': odeToJoy,
  'The Lion Sleeps Tonight': LionSleepsTonight
};

const populateSong = function(songName) {
  const allNotes = SONG_MAPPING[songName];
  const notes = allNotes.split('');
  let song = [];
  let offset = 0;
  for (let i = 0; i < notes.length; i++) {
    if (i === 12 || i === 14 || i === 27 || i === 29) {
      song.push(new Note({
        id: i + 1,
        note: notes[i],
        pos: [PIXEL_MAPPING[notes[i]], (-100*i - 50 - offset)],
        vel: [0, 3.5],
        duration: 1000,
        ySize: 140
        // color: Constants.COLOR_MAPPING[notes[i]]
      }));
      offset = offset + 100;
    } else {
      song.push(new Note({
        id: i + 1,
        note: notes[i],
        pos: [PIXEL_MAPPING[notes[i]], (-100*i - offset)],
        vel: [0, 3.5],
        xSize: 70,
        ySize: 70,
        duration: 500
        // color: Constants.COLOR_MAPPING[notes[i]]
      }));
    }
  }

  return song;
};

module.exports = populateSong;
