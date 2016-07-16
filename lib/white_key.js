const whiteKey = function(options) {
  this.pos = options.pos;
  this.xSize = options.xSize;
  this.ySize = options.ySize;
  this.game = options.game;
  this.pressed = false;
  this.noteName = options.noteName;
  this.color = options.color;
};

whiteKey.prototype.draw = function(ctx) {
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'white';
  if (this.pressed) {
    ctx.fillStyle = this.color;
  }
  ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize);
};



module.exports = whiteKey;
