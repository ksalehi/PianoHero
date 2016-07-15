const whiteKey = function(options) {
  this.pos = options.pos;
  this.xSize = options.xSize;
  this.ySize = options.ySize;
  this.game = options.game;
};

whiteKey.prototype.draw = function(ctx) {
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'white';
  ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize);
};

module.exports = whiteKey;
