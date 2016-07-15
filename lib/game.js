const Note = require('./note');
const whiteKey = require('./white_key');
const blackKey = require('./black_key');
const populateSong = require('./song');
const Constants = require('./constants');

const Game = function(songName) {
  this.notes = [];
  this.whiteKeys = [];
  this.addNotes(songName);
  this.addWhiteKeys();
  this.height = Constants.HEIGHT;
  this.width = Constants.WIDTH;
  this.score = 0;
  this.oldScore = 0;
};

Game.prototype.addNotes = function(songName) {
  const that = this;
  this.notes = populateSong(songName);
  this.notes.forEach(note => {
    note.game = that;
  });
};

Game.prototype.addWhiteKeys = function() {
  const that = this;
  for (let i = 0; i < Constants.NUM_NOTES; i++) {
    this.whiteKeys.push(new whiteKey({
        pos: [75*i+200, Constants.HEIGHT*(1/2)],
        xSize: 70,
        ySize: Constants.KEY_HEIGHT,
        game: that
      })
    );
  }
};

Game.prototype.displayScore = function(ctx) {
  if (this.oldScore > this.score) {
    ctx.fillStyle = 'red';
  } else {
    ctx.fillStyle = 'green';
  }
  ctx.font="50px Orbitron";
  ctx.fillText(this.score, this.width - 125, 50);
  this.oldScore = this.score;
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
