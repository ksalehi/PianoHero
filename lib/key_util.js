const KEYBOARD_MAPPING = {
  "a": "C",
  "s": "D",
  "d": "E",
  "f": "F",
  "j": "G",
  "k": "A",
  "l": "B",
  ";": "C6"
};

function findAndPlayNote(game, noteName, ctx) {
  let targetNote;
  game.notes.forEach( note => {
    if (note.noteName === noteName) { // if you hit the right note
      if (note.overlapsTile()) { // and the note is in the right place
        targetNote = note;
      }
    }
  });
  if (targetNote)  {
    playNote(targetNote);
    game.score += 1;
  }
}

function playNote(note) {
  note.glowing = true;
  note.play(note.duration);
  note.remove(); // eventually note.shatter or something?
}

const KeyUtil = {
  noteHit(key, game) {
    const noteName = KEYBOARD_MAPPING[key];
    findAndPlayNote(game, noteName);
  },
  allKeys() {
    return Object.keys(KEYBOARD_MAPPING);
  },
};

module.exports = KeyUtil;
