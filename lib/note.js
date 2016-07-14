const Sound = require('../vendor/sound');

const defaultOptions = {
  pos: [10, 10],
  vel: [0, 1],
  color: 'rgb(0,200,100)',
  size: 70
};

const KEY_MAPPINGS = {
  0: 'C5',
  1: 'D5',
  2: 'E5',
  3: 'F5',
  4: 'G5',
  5: 'A5',
  6: 'B5',
  7: 'C6'
};

const TONES = {
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
  C6: 1046.50
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

Note.prototype.play = function() {
  const keyName = KEY_MAPPINGS[this.id];
  const freq = TONES[keyName];
  const sound = new Sound(freq);
  sound.start();
  setTimeout(() => {sound.stop();}, 500);
};

module.exports = Note;
