const Game = require('./game');
const GameView = require('./game_view');
const Song = require('./song');

document.addEventListener('DOMContentLoaded', ()=>{
  const canvasEl = document.getElementById('canvas');
  const game = new Game();
  const song = Song;
  canvasEl.height = game.height;
  canvasEl.width = game.width;

  const ctx = canvasEl.getContext('2d');

  new GameView(game, song, ctx).start();
});
