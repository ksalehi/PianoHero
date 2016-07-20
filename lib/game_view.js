const KeyUtil = require('./key_util');
const $ = require('jquery');
const Constants = require('./constants');
const Game = require('./game');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.inProgress = false;
  this.isPlaying = {
    'C': false,
    'D': false,
    'E': false,
    'F': false,
    'G': false,
    'A': false,
    'B': false,
    'C6': false
  };
};

GameView.prototype.bindKeyHandlers = function() {
  $(document).on('keydown', event=> {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    if (noteName && !this.isPlaying[noteName]) {
      this.game.startPlaying(noteName);
      this.isPlaying[noteName] = true;
    }
  });
  $(document).on('keyup', event=> {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    if (noteName) {
      this.game.stopPlaying(noteName);
      this.isPlaying[noteName] = false;
    }
  });
  $(document).on('keydown', () => {
    if (event.keyCode === 32 && !GameView.inProgress) {
      this.start();
      // hide intro
    }
  });
};

GameView.prototype.loadGame = function() {
  this.bindKeyHandlers();
  this.timerStart = new Date(); // start timing
};

GameView.prototype.start = function() {
  $(document).unbind('click');
  this.inProgress = true;
  if (this.game.notes.length === 0) {
    return;
  }
  this.lastTime = 0;
  this.firstCall = true;
  requestAnimationFrame(this.animate.bind(this)); // start animating
};

GameView.prototype.animate = function(time) {
  if (this.game.endOfSong) {
    return;
  }
  if (this.firstCall) { // subtract off timer's time on the first call
    let d2 = new Date();
    this.lastTime = d2.getTime() - this.timerStart.getTime();
    this.firstCall = false;
  }
  let timeDelta = time - this.lastTime;
  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this)); // keep animating
};

module.exports = GameView;
