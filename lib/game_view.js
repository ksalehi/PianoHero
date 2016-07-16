const KeyUtil = require('./key_util');
const $ = require('jquery');
const Constants = require('./constants');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.bindKeyHandlers = function() {
  $(document).on('keydown', event=> {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    this.game.findAndPlayNote(noteName);
  });
  $(document).on('keyup', event=> {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    this.game.stopPlaying(noteName);
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
