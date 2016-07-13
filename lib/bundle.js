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
	const GameView = __webpack_require__(3);
	
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
	const NUM_NOTES = 15;
	const HEIGHT = 500;
	const WIDTH = 1000;
	
	const Game = function(notes) {
	  this.notes = [];
	  this.tiles = [];
	  this.addNotes();
	  this.height = HEIGHT;
	  this.width = WIDTH;
	};
	
	const HEX_DIGITS = "0123456789ABCDEF";
	
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
	        pos: [100*i+10, 25*i],
	        vel: [0, 2],
	        color: randomColor(),
	        game: this
	      })
	    );
	  }
	};
	
	Game.prototype.addTiles = function() {
	  
	};
	
	
	Game.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  ctx.moveTo(0,0);
	  ctx.lineTo(300,150);
	  ctx.stroke();
	  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const defaultOptions = {
	  pos: [10, 10],
	  vel: [0, 1],
	  color: 'rgb(0,200,100)'
	};
	
	const Note = function(options) {
	  Object.assign(defaultOptions, options);
	  this.pos = defaultOptions.pos;
	  this.vel = defaultOptions.vel;
	  this.color = defaultOptions.color;
	  this.game = defaultOptions.game;
	};
	
	Note.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.pos[0], this.pos[1], 50, 50); //fillRect(x, y, width, height)
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
	
	Note.prototype.checkCollision = function() {
	  if (this.pos[1] === this.game.height) {
	    // stuff
	  }
	};
	
	module.exports = Note;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const GameView = function(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	};
	
	GameView.prototype.start = function() {
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map