const Note = require('./note');
const whiteKey = require('./white_key');
const blackKey = require('./black_key');
const populateSong = require('./song');

const NUM_NOTES = 8;
const HEIGHT = window.innerHeight;
const WIDTH = 1000; // window.innerWidth;
const KEY_HEIGHT = 170;

const Game = function(songName) {
  this.notes = [];
  this.whiteKeys = [];
  this.addNotes(songName);
  this.addWhiteKeys();
  this.height = HEIGHT;
  this.width = WIDTH;
  this.score = 0;
};

Game.prototype.addNotes = function(songName) {
  const that = this;
  this.notes = populateSong(songName);
  this.notes.forEach(note => {
    note.game = that;
  });
};

Game.prototype.addWhiteKeys = function() {
  for (let i = 0; i < NUM_NOTES; i++) {

    this.whiteKeys.push(new whiteKey({
        pos: [75*i+200, 325],
        xSize: 70,
        ySize: KEY_HEIGHT,
        game: this
      })
    );
  }
};

Game.prototype.displayScore = function(ctx, score) {
  ctx.fillStyle = 'white';
  ctx.fillRect(this.height + 25, this.width - 25, 50, 50);
  ctx.font="20px Georgia";
  ctx.fillText(score,10,50);
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
  this.displayScore(ctx, this.score);
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    // this.removeOldNote(note);
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
