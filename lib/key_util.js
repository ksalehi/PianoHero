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
  // let targetNote;
  notes.forEach( note => {
    if (note.note === noteName && note.overlapsTile()) {
      // targetNote = note;
      note.glowing = true;
      note.play();
    }
  });
  // return targetNote;
}

const KeyUtil = {
  noteHit(key, notes) {
    const noteName = KEYBOARD_MAPPING[key];
    // are there any notes with that noteName overlapping Tiles?

    findAndPlayNote(notes, noteName);
    // if (note && note.overlapsTile()) {
    //   note.glowing = true;
    //   note.play();
    // }
  },
  allKeys() {
    return Object.keys(KEYBOARD_MAPPING);
  }
};


module.exports = KeyUtil;
