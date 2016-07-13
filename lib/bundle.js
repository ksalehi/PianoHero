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

	const Note = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", ()=>{
	  const canvasEl = document.getElementById("canvas");
	  canvasEl.height = window.innerHeight;
	  canvasEl.width = window.innerWidth;
	  const note = new Note({
	    pos: [10, 10],
	    color: 'rgb(0,200,100)'
	  });
	  const ctx = canvasEl.getContext('2d');
	  note.draw(ctx);
	  note.move();
	  console.log(note.pos);
	  note.draw(ctx);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	const Note = function(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	Note.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.pos[0], this.pos[1], 50, 50); //fillRect(x, y, width, height)
	};
	
	// Note.prototype.move = function() {
	//   // console.log(this.pos);
	//   this.pos[1] = this.pos[1] + 10;
	// };
	
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
	
	module.exports = Note;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map