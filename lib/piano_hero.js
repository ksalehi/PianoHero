const Game = require('./game');
const GameView = require('./game_view');
const sweetAlert = require('sweetAlert');
const $ = require('jquery');
const Constants = require('./constants');

$(document).ready( () => {
  const canvasEl = $('#canvas')[0];
  const game = new Game('Ode to Joy');
  canvasEl.height = Constants.HEIGHT;
  canvasEl.width = Constants.WIDTH;
  const ctx = canvasEl.getContext('2d');

  new GameView(game, ctx).loadGame();
});
