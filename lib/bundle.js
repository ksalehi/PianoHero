/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", ()=>{
	  const canvasEl = document.getElementById("canvas");
	  const game = new Game();
	  canvasEl.height = game.height;
	  canvasEl.width = game.width;
	
	  const ctx = canvasEl.getContext('2d');
	
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Note = __webpack_require__(2);
	const Tile = __webpack_require__(3);
	const blackKey = __webpack_require__(6);
	
	const NUM_NOTES = 8;
	const HEIGHT = 500;
	const WIDTH = 1000;
	const HEX_DIGITS = "0123456789ABCDEF";
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
	        pos: [75*i+200, 25*i],
	        vel: [0, 2],
	        color: randomColor(),
	        game: this,
	        id: i
	      })
	    );
	  }
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const defaultOptions = {
	  pos: [10, 10],
	  vel: [0, 1],
	  color: 'rgb(0,200,100)',
	  size: 70
	};
	
	const Note = function(options) {
	  Object.assign(defaultOptions, options);
	  this.pos = defaultOptions.pos;
	  this.vel = defaultOptions.vel;
	  this.color = defaultOptions.color;
	  this.game = defaultOptions.game;
	  this.size = defaultOptions.size;
	  this.id = defaultOptions.id;
	  this.glowing = false;
	};
	
	Note.prototype.draw = function(ctx) {
	  ctx.shadowColor = "transparent";
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size); //fillRect(x, y, width, height)
	  if (this.glowing) {
	    ctx.save();
	    ctx.shadowBlur = 50;
	    ctx.shadowColor = "blue";
	    ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size);
	  }
	};
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	Note.prototype.move = function (timeDelta) {
	  //timeDelta - milliseconds since last move
	  //if computer is busy, timeDelta will be larger
	  //and note should move farther in that frame
	  //vel is how far note should move in 1/60th of a second
	  let velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	      offsetX = this.vel[0] * velocityScale,
	      offsetY = this.vel[1] * velocityScale;
	
	  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	};
	
	Note.prototype.overlapsTile = function() {
	  const tileTop = this.game.height - this.size;
	  if (((tileTop - 25) < this.pos[1]) &&
	        (this.pos[1] < (tileTop))) {
	          return true;
	    }
	    return false;
	  };
	
	module.exports = Note;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const defaultOptions = {
	  pos: [10, 10],
	  vel: [0, 0],
	  color: 'rgba(1, 1, 1, 1)',
	  size: 70
	};
	
	const whiteKey = function(options) {
	  Object.assign(defaultOptions, options);
	  this.pos = defaultOptions.pos;
	  this.vel = defaultOptions.vel;
	  this.color = defaultOptions.color;
	  this.size = defaultOptions.size;
	  this.id = defaultOptions.id;
	};
	
	whiteKey.prototype.draw = function(ctx) {
	  ctx.shadowColor = "transparent";
	  ctx.fillStyle = this.color;
	  ctx.strokeRect(this.pos[0], this.pos[1], this.size, this.size+100);
	};
	
	module.exports = whiteKey;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const KeyUtil = __webpack_require__(5);
	
	const GameView = function(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	};
	
	GameView.prototype.bindKeyHandlers = function() {
	  //  The keymaster library will expose a global method key
	  // which takes a key and a callback that will be triggered
	  // when the key is pressed
	  KeyUtil.allKeys().forEach(k => {
	    key(k, KeyUtil.noteHit.bind(this, k, this.game.notes));
	  });
	};
	
	GameView.prototype.start = function() {
	  this.bindKeyHandlers();
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this)); // start animating
	};
	
	GameView.prototype.animate = function(time) {
	  this.game.draw(this.ctx);
	
	  let timeDelta = time - this.lastTime;
	
	  this.game.step(timeDelta);
	  this.game.draw(this.ctx);
	  this.lastTime = time;
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const KEYS = [
	  "a",
	  "s",
	  "d",
	  "f",
	  "j",
	  "k",
	  "l",
	  ";"
	];
	
	function findNote(notes, noteId) {
	  let test;
	  notes.forEach( note => {
	    if (note.id === noteId) {
	      test = note;
	    }
	  });
	  return test;
	}
	
	const KeyUtil = {
	  noteHit(key, notes) {
	    const noteId = KEYS.indexOf(key);
	    const note = findNote(notes, noteId);
	    if (note && note.overlapsTile()) {
	      note.glowing = true;
	    }
	  },
	  allKeys() {
	    return KEYS;
	  }
	};
	
	
	module.exports = KeyUtil;


/***/ },
/* 6 */
/***/ function(module, exports) {

	const blackKey = function() {
	
	};
	
	blackKey.prototype.draw = function(ctx) {
	  ctx.shadowColor = "transparent";
	  ctx.fillStyle = 'black';
	  // x, y, width, height
	  ctx.fillRect(255, 324, 35, 120);
	  ctx.fillRect(330, 324, 35, 120);
	  ctx.fillRect(480, 324, 35, 120);
	  ctx.fillRect(555, 324, 35, 120);
	  ctx.fillRect(630, 324, 35, 120);
	
	  //fake white keys
	  ctx.strokeRect(830, 324, 35, 120);
	
	};
	
	module.exports = blackKey;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map