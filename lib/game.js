const Note = require('./note');
const NUM_NOTES = 15;

const Game = function(notes) {
  this.notes = [];
  this.addNotes();
};

const HEX_DIGITS = "0123456789ABCDEF";

const randomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }
  return color;
};

Game.prototype.addNotes = function() {
  for (let i = 0; i < NUM_NOTES; i++) {
    this.notes.push(new Note({
        pos: [100*i+10, 25*i],
        vel: [0, 2],
        color: randomColor()
      })
    );
  }
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
