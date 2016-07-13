// const Note = require('./note.js');
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", ()=>{
  const canvasEl = document.getElementById("canvas");
  canvasEl.height = 600;
  canvasEl.width = 1000;
  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
});
