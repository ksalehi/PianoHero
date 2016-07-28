const Constants = require('./constants');

const drawFakeKeys = function(ctx) {
  ctx.shadowColor = "transparent";

  //fake white keys
  ctx.fillStyle = 'white';
  [125, 50, -25, 800, 875, 950].forEach(pos => {
    ctx.fillRect(pos, Constants.HEIGHT*(1/2), 70, 170); // x, y, WIDTH, HEIGHT
  });

  // fake black keys
  ctx.fillStyle = 'black';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = -5;
  ctx.shadowColor = 'rgba(80, 80, 80, 1)';
  [30, 105, 255, 330, 480, 555, 630, 780, 855].forEach( pos => {
    ctx.fillRect(pos, Constants.HEIGHT*(1/2) - 1, 35, 120);  // x, y, WIDTH, HEIGHT
  });
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = 'white';
  ctx.font='50px Orbitron';
  ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].forEach((char, idx) => {
    ctx.fillText(char, 75*idx+230, Constants.HEIGHT*(1/2)+220);
  });
};

module.exports = drawFakeKeys;
