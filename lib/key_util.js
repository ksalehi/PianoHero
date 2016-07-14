const KEYS = [
  "a",
  "s",
  "d",
  "f",
  "j",
  "k",
  "l",
  ";"
];

function findNote(notes, noteId) {
  let test;
  notes.forEach( note => {
    if (note.id === noteId) {
      test = note;
    }
  });
  return test;
}

const KeyUtil = {
  noteHit(key, notes) {
    const noteId = KEYS.indexOf(key);
    const note = findNote(notes, noteId);
    if (note && note.overlapsTile()) {
      note.glowing = true;
    }
  },
  allKeys() {
    return KEYS;
  }
};


module.exports = KeyUtil;
