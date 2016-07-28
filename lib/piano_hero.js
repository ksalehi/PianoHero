const Game = require('./game');
const GameView = require('./game_view');
const $ = require('jquery');
const Constants = require('./constants');
const drawFakeKeys = require('./fake_keys');

$(document).ready( () => {
  const canvasEl = $('#canvas')[0];
  const game = new Game('Ode to Joy');
  canvasEl.height = Constants.HEIGHT;
  canvasEl.width = Constants.WIDTH;
  const ctx = canvasEl.getContext('2d');
  ctx.font='50px Orbitron';
  game.whiteKeys.forEach(whiteKey => {
    whiteKey.draw(ctx);
  });
  drawFakeKeys(ctx);
  // game.displayScore(ctx);

  new GameView(game, ctx).loadGame();
});
