const blackKey = function() {

};

blackKey.prototype.draw = function(ctx) {
  ctx.shadowColor = "transparent";
  ctx.fillStyle = 'black';
  // fake black keys
  // x, y, width, height
  ctx.fillRect(30, 324, 35, 120);
  ctx.fillRect(105, 324, 35, 120);
  ctx.fillRect(255, 324, 35, 120);
  ctx.fillRect(330, 324, 35, 120);
  ctx.fillRect(480, 324, 35, 120);
  ctx.fillRect(555, 324, 35, 120);
  ctx.fillRect(630, 324, 35, 120);
  ctx.fillRect(780, 324, 35, 120);
  ctx.fillRect(855, 324, 35, 120);

  //fake white keys
  ctx.strokeStyle = 'black';
  ctx.strokeRect(125, 325, 70, 170);
  ctx.strokeRect(50, 325, 70, 170);
  ctx.strokeRect(-25, 325, 70, 170);
  ctx.strokeRect(800, 325, 70, 170);
  ctx.strokeRect(875, 325, 70, 170);
  ctx.strokeRect(950, 325, 70, 170);

};

module.exports = blackKey;
