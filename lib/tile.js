const whiteKey = function(options) {
  this.pos = options.pos;
  this.size = options.size;
};

whiteKey.prototype.draw = function(ctx) {
  ctx.shadowColor = "transparent";
  ctx.fillStyle = 'black';
  ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size+100);
  console.log('made rectangle...');
  console.log(this.pos[1]);
  console.log(this.pos[0]);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(this.pos[0], this.pos[1], this.size, this.size+100);
};

module.exports = whiteKey;
