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

function findAndPlayNote(notes, noteName) {
  notes.forEach( note => {
    if (note.note === noteName && note.overlapsTile()) {
      note.glowing = true;
      note.play(note.duration);
    }
  });
}

const KeyUtil = {
  noteHit(key, notes) {
    const noteName = KEYBOARD_MAPPING[key];
    findAndPlayNote(notes, noteName);
  },
  allKeys() {
    return Object.keys(KEYBOARD_MAPPING);
  },
};

module.exports = KeyUtil;
