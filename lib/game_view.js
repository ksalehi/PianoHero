const KeyUtil = require('./key_util');
const $ = require('jquery');
const Constants = require('./constants');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
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
};

GameView.prototype.start = function() {
  if (this.game.notes.length === 0) {
    return;
  }
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this)); // start animating
};

GameView.prototype.animate = function(time) {
  if (this.game.endOfSong) {
    return;
  }
  this.game.draw(this.ctx);

  let timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
