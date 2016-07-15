const Note = require('./note');

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

const odeToJoy = 'EEFGGFEDCCDEEDDEEFGGFEDCCDEDCC';
const notes = odeToJoy.split('');

const LionSleepsTonight = 'CDEDEFEDCDEDCEDGFEFGFEDCDEDCED';
const lionNotes = LionSleepsTonight.split('');

const populate = function() {
  let song = [];
  let offset = 0;
  for (let i = 0; i < notes.length; i++) {
    if (i === 12 || i === 14 || i === 27 || i === 29) {
      song.push(new Note({
        id: i + 1,
        note: notes[i],
        pos: [PIXEL_MAPPING[notes[i]], (-100*i - 50 - offset)],
        vel: [0, 4.5],
        duration: 1000,
        ySize: 140
      }));
      offset = offset + 100;
    } else {
      song.push(new Note({
        id: i + 1,
        note: notes[i],
        pos: [PIXEL_MAPPING[notes[i]], (-100*i - offset)],
        vel: [0, 4.5],
        xSize: 70,
        ySize: 70,
        duration: 500
      }));
    }
  }

  return song;
};

const Song = populate();

module.exports = Song;
