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
    const gradient = ctx.createLinearGradient(this.pos[0], this.pos[1], this.pos[0] + this.xSize, this.pos[1]);
    gradient.addColorStop(0,"rgba(140, 140, 140, 1)");
    gradient.addColorStop(0.3,"white");
    gradient.addColorStop(0.7,"white");
    gradient.addColorStop(1,"rgba(140, 140, 140, 1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(this.pos[0] + 3, this.pos[1], this.xSize - 6, this.ySize - 10);
  } else {
    ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize);
  }
};



module.exports = whiteKey;
