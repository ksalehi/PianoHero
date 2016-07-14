const Note = require('./note');
const Tile = require('./tile');
const blackKey = require('./black_key');
const Song = require('./song');

const NUM_NOTES = 8;
const HEIGHT = 500;
const WIDTH = 1000;
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
        vel: [0, 0],
        color: 'transparent',
        game: this,
        id: i
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
  const bk = new blackKey();
  bk.draw(ctx);
};

Game.prototype.move = function(delta) {
  this.notes.forEach(note => {
    note.move(delta);
  });
};

Game.prototype.step = function(delta) {
  this.move(delta);
};

module.exports = Game;
