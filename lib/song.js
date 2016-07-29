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
const ConcerningHobbits = 'CDEGEDCEGABGEFEDCDEGEDCEGAGED';
const twinkleTwinkle = 'CCGGAAGFFEEDDCGGFFEEDGGFFEEDCCGGAAGFFECDDC';

const SONG_MAPPING = {
  'Test': testSong,
  'Ode to Joy': odeToJoy,
  'The Lion Sleeps Tonight': LionSleepsTonight,
  'Concerning Hobbits': ConcerningHobbits
};

const populateSong = function(songName) {
  const allNotes = SONG_MAPPING[songName];
  const notes = allNotes.split('');
  let song = [];
  let offset = 0;
  let longNotes;
  switch(songName) {
    case 'Ode to Joy':
      longNotes = [12, 14, 27, 29];
      break;
    case 'The Lion Sleeps Tonight':
      longNotes = [14, 29];
      break;
    case 'Concerning Hobbits':
      notes.splice(10, 0, 'C6');
      longNotes = [6, 16, 23, 29];
      break;
    }
  for (let i = 0; i < notes.length; i++) {
    if (longNotes.includes(i)) {
      song.push(new Note({
        id: i + 1,
        note: notes[i],
        pos: [PIXEL_MAPPING[notes[i]], (-100*i - 50 - offset)],
        vel: [0, 3.5],
        ySize: 140
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
      }));
    }
  }

  return song;
};

module.exports = populateSong;
