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
};

Note.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.pos[0], this.pos[1], this.size, this.size); //fillRect(x, y, width, height)
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

Note.prototype.tilesOverlap = function() {
  const tileCenter = this.game.height - (this.size/2);
  if (((tileCenter - 10) < this.pos[1]) &&
        (this.pos[1] < (tileCenter + 10))) {
          return true;
    }
  };

  

module.exports = Note;
