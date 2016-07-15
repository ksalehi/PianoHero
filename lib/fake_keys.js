const Constants = require('./constants');

const drawFakeKeys = function(ctx) {
  ctx.shadowColor = "transparent";

  //fake white keys
  ctx.fillStyle = 'white';
  ctx.fillRect(125, Constants.HEIGHT*(1/2), 70, 170);
  ctx.fillRect(50, Constants.HEIGHT*(1/2), 70, 170);
  ctx.fillRect(-25, Constants.HEIGHT*(1/2), 70, 170);
  ctx.fillRect(800, Constants.HEIGHT*(1/2), 70, 170);
  ctx.fillRect(875, Constants.HEIGHT*(1/2), 70, 170);
  ctx.fillRect(950, Constants.HEIGHT*(1/2), 70, 170);

  // fake black keys
  // x, y, WIDTH, HEIGHT
  ctx.fillStyle = 'black';
  ctx.fillRect(30, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(105, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(255, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(330, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(480, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(555, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(630, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(780, Constants.HEIGHT*(1/2) - 1, 35, 120);
  ctx.fillRect(855, Constants.HEIGHT*(1/2) - 1, 35, 120);

};

module.exports = drawFakeKeys;
