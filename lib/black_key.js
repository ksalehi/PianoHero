const blackKey = function() {

};

blackKey.prototype.draw = function(ctx) {
  ctx.shadowColor = "transparent";
  ctx.fillStyle = 'black';
  // x, y, width, height
  ctx.fillRect(255, 324, 35, 120);
  ctx.fillRect(330, 324, 35, 120);
  ctx.fillRect(480, 324, 35, 120);
  ctx.fillRect(555, 324, 35, 120);
  ctx.fillRect(630, 324, 35, 120);

  //fake white keys
  ctx.strokeRect(830, 324, 35, 120);

};

module.exports = blackKey;
