const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
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
