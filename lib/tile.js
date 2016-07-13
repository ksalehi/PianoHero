const defaultOptions = {
  pos: [10, 10],
  vel: [0, 0],
  color: 'rgb(1, 1, 1, 0.5)',
  size: 70
};

const Tile = function(options) {
  Object.assign(defaultOptions, options);
  this.pos = defaultOptions.pos;
  this.vel = defaultOptions.vel;
  this.color = defaultOptions.color;
  this.size = defaultOptions.size;
};

Tile.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size);
};

module.exports = Tile;
