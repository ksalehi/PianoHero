const Sound = require('../vendor/sound');
const Util = require('./util');
const Constants = require('./constants');

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
