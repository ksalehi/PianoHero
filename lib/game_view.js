const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.animate = function() {
  this.game.draw(this.ctx);
};

module.exports = GameView;
