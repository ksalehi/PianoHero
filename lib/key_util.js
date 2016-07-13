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
  checkNote(key, notes) {
    const noteId = KEYS.indexOf(key);
    const note = findNote(notes, noteId);
    if (note && note.overlapsTile()) {
      return true;
    } else {
      return false;
    }
  },
  allKeys() {
    return KEYS;
  }
};


module.exports = KeyUtil;
