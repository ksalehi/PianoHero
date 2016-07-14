const defaultOptions = {
  pos: [10, 10],
  vel: [0, 0],
  color: 'rgba(1, 1, 1, 1)',
  size: 70
};

const whiteKey = function(options) {
  Object.assign(defaultOptions, options);
  this.pos = defaultOptions.pos;
  this.vel = defaultOptions.vel;
  this.color = defaultOptions.color;
  this.size = defaultOptions.size;
  this.id = defaultOptions.id;
};

whiteKey.prototype.draw = function(ctx) {
  ctx.shadowColor = "transparent";
  ctx.fillStyle = this.color;
  ctx.strokeRect(this.pos[0], this.pos[1], this.size, this.size+100);
};

module.exports = whiteKey;
