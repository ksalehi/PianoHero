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
	
	document.addEventListener('DOMContentLoaded', ()=>{
	  const canvasEl = document.getElementById('canvas');
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
	const Song = __webpack_require__(8);
	
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
	        game: this
	      })
	    );
	  }
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.width, this.height);
	  ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, this.width, this.height);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Sound = __webpack_require__(7);
	const Util = __webpack_require__(9);
	const Constants = __webpack_require__(10);
	
	const defaultOptions = {
	  vel: [0, 2],
	  color: Util.randomColor(),
	  size: 70
	};
	
	const Note = function(options) {
	  Object.assign(defaultOptions, options);
	  this.note = defaultOptions.note;
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
	  const tileTop = 325;
	  if ((tileTop < this.pos[1]) &&
	        (this.pos[1] < (this.game.height))) {
	          return true;
	    }
	    return false;
	  };
	
	Note.prototype.play = function() {
	  const freq = Constants.TONES[this.note];
	  const sound = new Sound(freq);
	  sound.start();
	  setTimeout(() => {sound.stop();}, 500);
	};
	
	module.exports = Note;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const whiteKey = function(options) {
	  this.pos = options.pos;
	  this.size = options.size;
	};
	
	whiteKey.prototype.draw = function(ctx) {
	  ctx.shadowColor = "transparent";
	  ctx.fillStyle = 'black';
	  ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size+100);
	  console.log('made rectangle...');
	  console.log(this.pos[1]);
	  console.log(this.pos[0]);
	  ctx.strokeStyle = 'black';
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
	  if (this.game.notes.length === 0) {
	    return;
	  }
	  this.bindKeyHandlers();
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this)); // start animating
	};
	
	GameView.prototype.animate = function(time) {
	  if (this.game.notes.length === 0) {
	    return;
	  }
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

	const KEYBOARD_MAPPING = {
	  "a": "C",
	  "s": "D",
	  "d": "E",
	  "f": "F",
	  "j": "G",
	  "k": "A",
	  "l": "B",
	  ";": "C6"
	};
	
	function findAndPlayNote(notes, noteName) {
	  // let targetNote;
	  notes.forEach( note => {
	    if (note.note === noteName && note.overlapsTile()) {
	      // targetNote = note;
	      note.glowing = true;
	      note.play();
	    }
	  });
	  // return targetNote;
	}
	
	const KeyUtil = {
	  noteHit(key, notes) {
	    const noteName = KEYBOARD_MAPPING[key];
	    // are there any notes with that noteName overlapping Tiles?
	
	    findAndPlayNote(notes, noteName);
	    // if (note && note.overlapsTile()) {
	    //   note.glowing = true;
	    //   note.play();
	    // }
	  },
	  allKeys() {
	    return Object.keys(KEYBOARD_MAPPING);
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
	  // fake black keys
	  // x, y, width, height
	  ctx.fillRect(30, 324, 35, 120);
	  ctx.fillRect(105, 324, 35, 120);
	  ctx.fillRect(255, 324, 35, 120);
	  ctx.fillRect(330, 324, 35, 120);
	  ctx.fillRect(480, 324, 35, 120);
	  ctx.fillRect(555, 324, 35, 120);
	  ctx.fillRect(630, 324, 35, 120);
	  ctx.fillRect(780, 324, 35, 120);
	  ctx.fillRect(855, 324, 35, 120);
	
	  //fake white keys
	  ctx.strokeStyle = 'black';
	  ctx.strokeRect(125, 325, 70, 170);
	  ctx.strokeRect(50, 325, 70, 170);
	  ctx.strokeRect(-25, 325, 70, 170);
	  ctx.strokeRect(800, 325, 70, 170);
	  ctx.strokeRect(875, 325, 70, 170);
	  ctx.strokeRect(950, 325, 70, 170);
	
	};
	
	module.exports = blackKey;


/***/ },
/* 7 */
/***/ function(module, exports) {

	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	const createOscillator = freq => {
	  const osc = ctx.createOscillator();
	  osc.type = "sine";
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	const createGainNode = () => {
	  const gainNode = ctx.createGain();
	  gainNode.gain.value = 0;
	  gainNode.connect(ctx.destination);
	  return gainNode;
	};
	
	function Sound(freq) {
	    this.oscillatorNode = createOscillator(freq);
	    this.gainNode = createGainNode();
	    this.oscillatorNode.connect(this.gainNode);
	}
	
	Sound.prototype = {
	  start() {
	    // can't explain 0.3, it is a reasonable value
	    this.gainNode.gain.value = 0.3;
	  },
	
	  stop() {
	    this.gainNode.gain.value = 0;
	  }
	};
	
	module.exports = Sound;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Note = __webpack_require__(2);
	
	const PIXEL_MAPPING = {
	  'C': 200,
	  'D': 275,
	  'E': 350,
	  'F': 425,
	  'G': 500,
	  'A': 575,
	  'B': 650,
	  'C6': 725
	};
	
	const odeToJoy = 'EEFGGFEDCCDEEEDDDEEFGGFEDCCDEDDDCCC';
	const notes = odeToJoy.split('');
	
	const populate = function() {
	  let song = [];
	  for (let i = 0; i < notes.length; i++) {
	    song.push(new Note({
	      id: i + 1,
	      note: notes[i],
	      pos: [PIXEL_MAPPING[notes[i]], (-100*i)],
	      vel: [0, 3]
	    }));
	  }
	  return song;
	};
	
	const Song = populate();
	
	module.exports = Song;


/***/ },
/* 9 */
/***/ function(module, exports) {

	const HEX_DIGITS = "0123456789ABCDEF";
	
	const Util = {
	  randomColor() {
	    let color = "#";
	    for (let i = 0; i < 6; i++) {
	      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
	    }
	    return color;
	  }
	};
	
	module.exports = Util;


/***/ },
/* 10 */
/***/ function(module, exports) {

	const Constants = {
	  // KEY_MAPPINGS: {
	  //   0: 'C5',
	  //   1: 'D5',
	  //   2: 'E5',
	  //   3: 'F5',
	  //   4: 'G5',
	  //   5: 'A5',
	  //   6: 'B5',
	  //   7: 'C6'
	  // },
	  TONES: {
	    'C': 523.25,
	    'D': 587.33,
	    'E': 659.25,
	    'F': 698.46,
	    'G': 783.99,
	    'A': 880.00,
	    'B': 987.77,
	    'C6': 1046.50
	  }
	};
	
	module.exports = Constants;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map