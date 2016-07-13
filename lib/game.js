const Note = require('./note');
const Tile = require('./tile');
const NUM_NOTES = 8;
const HEIGHT = 500;
const WIDTH = 1000;
const HEX_DIGITS = "0123456789ABCDEF";

const Game = function() {
  this.notes = [];
  this.tiles = [];
  this.addNotes();
  this.addTiles();
  this.height = HEIGHT;
  this.width = WIDTH;
};

const randomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }
  return color;
};

Game.prototype.addNotes = function() {
  for (let i = 0; i < NUM_NOTES; i++) {
    this.notes.push(new Note({
        pos: [125*i+25, 25*i],
        vel: [0, 2],
        color: randomColor(),
        game: this
      })
    );
  }
};

Game.prototype.addTiles = function() {
  for (let i = 0; i < NUM_NOTES; i++) {
    this.tiles.push(new Tile({ // may eventually want tile instead of note
        pos: [125*i+25, 430],
        vel: [0, 0],
        color: 'rgba(1, 1, 1, 0.5)',
        game: this
      })
    );
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
  this.notes.forEach(note => {
    note.draw(ctx);
  });
  this.tiles.forEach(tile => {
    tile.draw(ctx);
  });
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    note.move(delta);
  });
};

Game.prototype.step = function(delta) {
  this.move(delta);
  this.notes.forEach(note => {
    note.checkOverlap();
  });
};

module.exports = Game;
