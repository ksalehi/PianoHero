const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", ()=>{
  const canvasEl = document.getElementById("canvas");
  const game = new Game();
  canvasEl.height = game.height;
  canvasEl.width = game.width;

  const ctx = canvasEl.getContext('2d');

  new GameView(game, ctx).start();
});
