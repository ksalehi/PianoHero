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
	  const game = new Game('The Lion Sleeps Tonight');
	  canvasEl.height = game.height;
	  canvasEl.width = game.width;
	
	  const ctx = canvasEl.getContext('2d');
	
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Note = __webpack_require__(2);
	const whiteKey = __webpack_require__(11);
	const drawFakeKeys = __webpack_require__(12);
	const populateSong = __webpack_require__(8);
	const Constants = __webpack_require__(10);
	
	const Game = function(songName) {
	  this.notes = [];
	  this.playedNotes = [];
	  this.whiteKeys = [];
	  this.addNotes(songName);
	  this.addWhiteKeys();
	  this.height = Constants.HEIGHT;
	  this.width = Constants.WIDTH;
	  this.score = 0;
	  this.endOfSong = false;
	};
	
	Game.prototype.addNotes = function(songName) {
	  const that = this;
	  this.notes = populateSong(songName);
	  this.numNotes = this.notes.length;
	  this.notes.forEach(note => {
	    note.game = that;
	  });
	};
	
	Game.prototype.addWhiteKeys = function() {
	  const that = this;
	  for (let i = 0; i < Constants.NUM_NOTES; i++) {
	    this.whiteKeys.push(new whiteKey({
	        pos: [75*i+200, Constants.HEIGHT*(1/2)],
	        xSize: 70,
	        ySize: Constants.KEY_HEIGHT,
	        game: that
	      })
	    );
	  }
	};
	
	Game.prototype.displayScore = function(ctx) {
	  ctx.fillStyle = '#00FF3C';
	  ctx.font='50px Orbitron';
	  ctx.fillText(this.score, this.width - 125, 50);
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.width, this.height);
	  this.whiteKeys.forEach(key => {
	    key.draw(ctx);
	  });
	  this.notes.forEach(note => {
	    note.draw(ctx);
	  });
	  this.playedNotes.forEach(note => {
	    note.draw(ctx);
	  });
	  drawFakeKeys(ctx);
	  this.displayScore(ctx, this.score);
	};
	
	Game.prototype.move = function(delta) {
	  this.notes.forEach(note => {
	    note.move(delta);
	  });
	  this.playedNotes.forEach(note => {
	    note.move(delta);
	  });
	};
	
	Game.prototype.removeOldNote = function(note) {
	  if (note.pos[1] > this.height) {
	    this.playedNotes.splice(this.playedNotes.indexOf(note), 1);
	  }
	  if (this.playedNotes.length === this.numNotes) {
	    this.endOfSong = true;
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
	  vel: [0, 3.5],
	  color: Util.randomColor(),
	  xSize: 70,
	  ySize: 70
	};
	
	const Note = function(options) {
	  Object.assign(defaultOptions, options);
	  this.noteName = defaultOptions.note;
	  this.pos = defaultOptions.pos;
	  this.vel = defaultOptions.vel;
	  this.color = defaultOptions.color;
	  this.game = defaultOptions.game;
	  this.xSize = defaultOptions.xSize;
	  this.ySize = defaultOptions.ySize;
	  this.id = defaultOptions.id;
	  this.glowing = false;
	  this.duration = defaultOptions.duration;
	};
	
	Note.prototype.draw = function(ctx) {
	  ctx.shadowColor = "transparent";
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize); //fillRect(x, y, width, height)
	  if (this.glowing) {
	    ctx.shadowBlur = 50;
	    ctx.shadowColor = "blue";
	    ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize);
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
	
	Note.prototype.changeColor = function() {
	  this.color = '#00FF3C';
	};
	
	Note.prototype.disable = function() {
	  this.game.playedNotes.push(this);
	  this.game.notes.splice(this.game.notes.indexOf(this), 1);
	};
	
	Note.prototype.overlapsTile = function() {
	  const noteCenter = this.pos[1] + (((this.pos[1] + this.ySize) - this.pos[1])/2);
	  const keyTop = this.game.whiteKeys[0].pos[1];
	  if ((keyTop < noteCenter) &&
	        (noteCenter < (keyTop + Constants.KEY_HEIGHT))) {
	          return true;
	    }
	    return false;
	  };
	
	Note.prototype.play = function(timeout) {
	  const freq = Constants.TONES[this.noteName];
	  const sound = new Sound(freq);
	  sound.start();
	  setTimeout(() => {sound.stop();}, timeout);
	};
	
	module.exports = Note;


/***/ },
/* 3 */,
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
	    key(k, KeyUtil.noteHit.bind(this, k, this.game));
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
	  if (this.game.endOfSong) {
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
	
	function findAndPlayNote(game, noteName, ctx) {
	  let targetNote;
	  game.notes.forEach( note => {
	    if (note.noteName === noteName) { // if you hit the right note
	      if (note.overlapsTile()) { // and the note is in the right place
	        targetNote = note;
	      }
	    }
	  });
	  if (targetNote)  {
	    playNote(targetNote);
	    game.score += 1;
	  }
	}
	
	function playNote(note) {
	  note.glowing = true;
	  note.play(note.duration);
	  note.disable();
	  note.changeColor(); // eventually note.shatter or something?
	}
	
	const KeyUtil = {
	  noteHit(key, game) {
	    const noteName = KEYBOARD_MAPPING[key];
	    findAndPlayNote(game, noteName);
	  },
	  allKeys() {
	    return Object.keys(KEYBOARD_MAPPING);
	  },
	};
	
	module.exports = KeyUtil;


/***/ },
/* 6 */,
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
	
	const odeToJoy = 'EEFGGFEDCCDEEDDEEFGGFEDCCDEDCC';
	const LionSleepsTonight = 'CDEDEFEDCDEDCEDGFEFGFEDCDEDCED';
	
	const SONG_MAPPING = {
	  'Ode to Joy': odeToJoy,
	  'The Lion Sleeps Tonight': LionSleepsTonight
	};
	
	const populateSong = function(songName) {
	  const allNotes = SONG_MAPPING[songName];
	  const notes = allNotes.split('');
	  let song = [];
	  let offset = 0;
	  for (let i = 0; i < notes.length; i++) {
	    if (i === 12 || i === 14 || i === 27 || i === 29) {
	      song.push(new Note({
	        id: i + 1,
	        note: notes[i],
	        pos: [PIXEL_MAPPING[notes[i]], (-100*i - 50 - offset)],
	        vel: [0, 3.5],
	        duration: 1000,
	        ySize: 140
	      }));
	      offset = offset + 100;
	    } else {
	      song.push(new Note({
	        id: i + 1,
	        note: notes[i],
	        pos: [PIXEL_MAPPING[notes[i]], (-100*i - offset)],
	        vel: [0, 3.5],
	        xSize: 70,
	        ySize: 70,
	        duration: 500
	      }));
	    }
	  }
	
	  return song;
	};
	
	module.exports = populateSong;


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
	  NUM_NOTES: 8,
	  HEIGHT: window.innerHeight,
	  WIDTH: 1000,
	  KEY_HEIGHT: 170,
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


/***/ },
/* 11 */
/***/ function(module, exports) {

	const whiteKey = function(options) {
	  this.pos = options.pos;
	  this.xSize = options.xSize;
	  this.ySize = options.ySize;
	  this.game = options.game;
	};
	
	whiteKey.prototype.draw = function(ctx) {
	  ctx.shadowColor = 'transparent';
	  ctx.fillStyle = 'white';
	  ctx.fillRect(this.pos[0], this.pos[1], this.xSize, this.ySize);
	};
	
	module.exports = whiteKey;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const Constants = __webpack_require__(10);
	
	const drawFakeKeys = function(ctx) {
	  ctx.shadowColor = "transparent";
	
	  //fake white keys
	  ctx.fillStyle = 'white';
	  ctx.fillRect(125, Constants.HEIGHT*(1/2), 70, 170);
	  ctx.fillRect(50, Constants.HEIGHT*(1/2), 70, 170);
	  ctx.fillRect(-25, Constants.HEIGHT*(1/2), 70, 170);
	  ctx.fillRect(800, Constants.HEIGHT*(1/2), 70, 170);
	  ctx.fillRect(875, Constants.HEIGHT*(1/2), 70, 170);
	  ctx.fillRect(950, Constants.HEIGHT*(1/2), 70, 170);
	
	  // fake black keys
	  // x, y, WIDTH, HEIGHT
	  ctx.fillStyle = 'black';
	  ctx.fillRect(30, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(105, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(255, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(330, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(480, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(555, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(630, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(780, Constants.HEIGHT*(1/2) - 1, 35, 120);
	  ctx.fillRect(855, Constants.HEIGHT*(1/2) - 1, 35, 120);
	
	};
	
	module.exports = drawFakeKeys;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map