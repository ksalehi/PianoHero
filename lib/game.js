const Note = require('./note');
const whiteKey = require('./white_key');
const drawFakeKeys = require('./fake_keys');
const populateSong = require('./song');
const Constants = require('./constants');
const Sound = require('../vendor/sound');
const $ = require('jquery');

const Game = function(songName) {
  this.notes = [];
  this.playedNotes = [];
  this.whiteKeys = [];
  this.addNotes(songName);
  this.addWhiteKeys();
  this.height = Constants.HEIGHT;
  this.width = Constants.WIDTH;
  this.score = 0;
  this.endOfSong = false;
  this.sounds = {};
};

Game.prototype.addNotes = function(songName) {
  const that = this;
  this.notes = populateSong(songName);
  this.numNotes = this.notes.length;
  this.notes.forEach(note => {
    note.game = that;
  });
};

Game.prototype.addWhiteKeys = function() {
  const gameObj = this;
  for (let i = 0; i < Constants.NUM_NOTES; i++) {
    this.whiteKeys.push(new whiteKey({
        pos: [75*i+200, Constants.HEIGHT*(1/2)],
        xSize: 70,
        ySize: Constants.KEY_HEIGHT,
        noteName: Constants.OCTAVE[i],
        game: gameObj,
        color: Constants.COLOR_MAPPING[Constants.OCTAVE[i]]
      })
    );
  }
};

Game.prototype.displayScore = function(ctx) {
  ctx.fillStyle = '#00FF3C';
  ctx.font='50px Orbitron';
  ctx.fillText(this.score, this.width - 125, 50);
};

Game.prototype.startPlaying = function(noteName) {
  const freq = Constants.TONES[noteName];
  const sound = new Sound(freq);
  if (!this.sounds[noteName]) {
    this.sounds[noteName] = sound;
  }
  if ($('#mute-button.off').length !== 0) {
    sound.start();
  }
  this.lightUpKey(noteName);
  this.lightUpNote(noteName);
};

Game.prototype.lightUpNote = function(noteName) {
  this.notes.forEach( note => {
    if (note.noteName === noteName) { // if you hit the right note
      if (note.overlapsTile()) { // and the note is in the right place
        this.score += 1;
        note.glowing = true;
        note.disable();
        note.changeColor();
      }
    }
  });
};

Game.prototype.lightUpKey = function(noteName) {
  this.whiteKeys.forEach( key => {
    if (key.noteName === noteName) {
      key.pressed = true;
    }
  });
};

Game.prototype.stopPlaying = function(noteName) {
  if (this.sounds[noteName]) {
    this.sounds[noteName].stop();
    delete this.sounds[noteName];
    this.whiteKeys.forEach( key => {
      if (key.noteName === noteName) {
        key.pressed = false;
      }
    });
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
  this.playedNotes.forEach(note => {
    note.draw(ctx);
  });
  drawFakeKeys(ctx);
  this.displayScore(ctx, this.score);
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    note.move(delta);
  });
  this.playedNotes.forEach(note => {
    note.move(delta);
  });
};

Game.prototype.removeOldNotes = function() {
  this.notes.forEach( note => {
    if (note.pos[1] > this.height) {
      this.notes.splice(this.notes.indexOf(note), 1);
    }
  });

  if (this.notes.length === 0 ) {
    this.endOfSong = true;
  }
};
Game.prototype.step = function(delta) {
  this.move(delta);
  this.removeOldNotes();
};

module.exports = Game;
