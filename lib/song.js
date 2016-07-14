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

const odeToJoy = 'EEFGGFEDCCDEEEDDDEEFGGFEDCCDEDDDCCC';
const notes = odeToJoy.split('');

const populate = function() {
  let song = [];
  for (let i = 0; i < notes.length; i++) {
    song.push(new Note({
      id: i + 1,
      note: notes[i],
      pos: [PIXEL_MAPPING[notes[i]], (-100*i)],
      vel: [0, 3]
    }));
  }
  return song;
};

const Song = populate();

module.exports = Song;
