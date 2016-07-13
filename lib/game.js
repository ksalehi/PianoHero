const Note = require('./note');

const Game = function() {
  this.notes = [];
  this.addNotes();
};

Game.prototype.addNotes = function(notes) {
  // for (let i = 0; i < notes.length; i++) {
  //   this.notes.push(new Note(notes[i]));
  // }
  this.notes = notes;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  this.notes.forEach(note => {
    note.draw(ctx);
  });
};

Game.prototype.step = function() {
  this.notes.forEach(note => {
    note.move();
  });
};

module.exports = Game;
