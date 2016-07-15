const Note = require('./note');
const whiteKey = require('./white_key');
const blackKey = require('./black_key');
const Song = require('./song');

const NUM_NOTES = 8;
const HEIGHT = window.innerHeight;
const WIDTH = 1000; // window.innerWidth;
const KEY_HEIGHT = 70;

const Game = function() {
  this.notes = [];
  this.whiteKeys = [];
  this.addNotes();
  this.addWhiteKeys();
  this.height = HEIGHT;
  this.width = WIDTH;
  this.keyHeight = KEY_HEIGHT;
};

Game.prototype.addNotes = function() {
  const that = this;
  this.notes = Song;
  this.notes.forEach(note => {
    note.game = that;
  });
};

Game.prototype.addWhiteKeys = function() {
  for (let i = 0; i < NUM_NOTES; i++) {

    this.whiteKeys.push(new whiteKey({
        pos: [75*i+200, 325],
        size: KEY_HEIGHT,
        game: this
      })
    );
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
  this.whiteKeys.forEach(key => {
    key.draw(ctx);
  });
  this.notes.forEach(note => {
    note.draw(ctx);
  });
  const bk = new blackKey();
  bk.draw(ctx);
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    this.removeOldNote(note);
    note.move(delta);
  });
};

Game.prototype.removeOldNote = function(note) {
  if (note.pos[1] > this.height) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
};

Game.prototype.step = function(delta) {
  this.move(delta);
};

module.exports = Game;
