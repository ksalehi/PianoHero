const Note = require('./note');

const Game = function(notes) {
  this.notes = [];
  this.addNotes(notes);
};

const newNote = new Note({
    pos: [10, 10],
    vel: [0, 1],
    color: 'rgb(0,200,100)',
  });

Game.prototype.addNotes = function() {
  // for (let i = 0; i < notes.length; i++) {
  //   this.notes.push(new Note(notes[i]));
  // }
  this.notes.push(newNote);
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  this.notes.forEach(note => {
    note.draw(ctx);
  });
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    note.move(delta);
  });
};

Game.prototype.step = function(delta) {
  this.move(delta);
};

module.exports = Game;
