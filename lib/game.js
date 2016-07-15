const Note = require('./note');
const Tile = require('./tile');
const blackKey = require('./black_key');
const Song = require('./song');

const NUM_NOTES = 8;
const HEIGHT = window.innerHeight;
const WIDTH = 1000; // window.innerWidth;
const TILE_HEIGHT = 70;

const Game = function() {
  this.notes = [];
  this.tiles = [];
  this.addNotes();
  this.addTiles();
  this.height = HEIGHT;
  this.width = WIDTH;
  this.tileHeight = TILE_HEIGHT;
};

Game.prototype.addNotes = function() {
  const that = this;
  this.notes = Song;
  this.notes.forEach(note => {
    note.game = that;
  });
};

Game.prototype.addTiles = function() {
  for (let i = 0; i < NUM_NOTES; i++) {

    this.tiles.push(new Tile({
        pos: [75*i+200, 325],
        size: TILE_HEIGHT,
        game: this
      })
    );
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.width, this.height);
  this.tiles.forEach(tile => {
    tile.draw(ctx);
  });
  this.notes.forEach(note => {
    note.draw(ctx);
  });
  const bk = new blackKey();
  bk.draw(ctx);
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    this.removeOldNote(note);
    note.move(delta);
  });
};

Game.prototype.removeOldNote = function(note) {
  if (note.pos[1] > this.height) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
};

Game.prototype.step = function(delta) {
  this.move(delta);
};

module.exports = Game;
