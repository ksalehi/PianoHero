const KeyUtil = require('./key_util');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.bindKeyHandlers = function() {
  //  The keymaster library will expose a global method key
  // which takes a key and a callback that will be triggered
  // when the key is pressed
  KeyUtil.allKeys().forEach(k => {
    key(k, KeyUtil.noteHit.bind(this, k, this.game.notes));
  });
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this)); // start animating
};

GameView.prototype.animate = function(time) {
  this.game.draw(this.ctx);

  let timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
