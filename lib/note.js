const Sound = require('../vendor/sound');
const Util = require('./util');
const Constants = require('./constants');

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
  this.color = '#1F8FFF';
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
    ctx.shadowColor = '#792BFF'; //'white'; // '#00FF3C';
    ctx.fillRect(this.pos[0] - 3, this.pos[1] - 3, this.xSize + 6, this.ySize + 6);
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
  this.color = '#2B3DFF';
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
