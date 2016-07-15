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
  let wrongNotes = 0;
  let rightNotes = 0;

  game.notes.forEach( note => {
    if (note.note === noteName) { // if you hit the right note
      if (note.overlapsTile()) { // and the note is in the right place
        note.glowing = true;
        note.play(note.duration);
        note.remove(); // eventually note.shatter or something?
        rightNotes += 1;
      } else {
        wrongNotes += 1;
      }
    }
    game.score = rightNotes - wrongNotes;
  });
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
