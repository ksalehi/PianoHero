const $ = require('jquery');
const Constants = require('./constants');
const Game = require('./game');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.inProgress = false;
  this.endTutorial = false;
  this.isPlaying = {
    'C': false,
    'D': false,
    'E': false,
    'F': false,
    'G': false,
    'A': false,
    'B': false,
    'C6': false
  };
};

GameView.prototype.loadGame = function() {
  $('.song-button').on('click', event => {
    this.game.songName = event.target.innerHTML;
    event.preventDefault();
    $('.welcome').addClass('hidden');
    this.endTutorial = true;
    this.game.addNotes();
    this.game.playing = true;
    this.startGame();
  });
  this.bindKeyHandlers();
  this.timerStart = new Date(); // start timing
  this.startTutorial();
};

GameView.prototype.startTutorial = function() {
  this.lastTime = 0;
  this.firstCall = true;
  this.myReq = requestAnimationFrame(this.animate.bind(this, false)); // start animating
  if (this.endTutorial) {
    return;
  }
};

GameView.prototype.startGame = function() {
  this.inProgress = true;
  this.bindKeyHandlers();
  if (this.game.notes.length === 0) {
    return;
  }
  this.lastTime = 0;
  this.firstCall = true;
  this.myReq = requestAnimationFrame(this.animate.bind(this, true)); // start animating
};

GameView.prototype.bindKeyHandlers = function() {
  $(document).on('keydown', event => {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    if (noteName && !this.isPlaying[noteName]) {
      this.game.startPlaying(noteName);
      this.isPlaying[noteName] = true;
    }
  });
  $(document).on('keyup', event => {
    const noteName = Constants.KEYBOARD_MAPPING[event.keyCode];
    if (noteName) {
      this.game.stopPlaying(noteName);
      this.isPlaying[noteName] = false;
    }
  });
  $('#mute-button').on('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.toggleMute();
  });
};

GameView.prototype.toggleMute = function() {
  let muteButton = $('#mute-button');
  if (muteButton.hasClass('on')) {
    muteButton.removeClass('on');
    muteButton.addClass('off');
  } else {
    muteButton.removeClass('off');
    muteButton.addClass('on');
  }
};

GameView.prototype.endGame = function() {
  let message;
  let fraction = `${this.game.score} / ${this.game.numNotes}`;
  if (this.game.score < (this.game.numNotes/2)) {
    message = `Looks like you're gonna need some practice. You hit ${fraction} notes.`;
  } else if (this.game.score < (3*(this.game.numNotes)/4)) {
    message = `Not bad! You hit ${fraction} notes.`;
  } else if (this.game.score < (this.game.numNotes)){
    message = `Nicely done! You hit ${fraction} notes. Keep up the good work!`;
  } else {
    message = `PERFECT SCORE! Congratulations!`;
  }
  $('.won-message').text(message);
  $('.won').removeClass('hidden');
  $('.song-button').on('click', event => {
      cancelAnimationFrame(this.myReq);
      event.preventDefault(this.myReq);
      $('.won').addClass('hidden');
      this.game = new Game();
      this.game.songName = event.target.innerHTML;
      this.game.addNotes();
      this.game.playing = true;
      this.startGame();
    }
  );
};

GameView.prototype.animate = function(time, playing) {
  if (this.firstCall) { // subtract off timer's time on the first call
    let d2 = new Date();
    this.lastTime = d2.getTime() - this.timerStart.getTime();
    this.firstCall = false;
  }
  let timeDelta = time - this.lastTime;
  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  if (playing && this.game.endOfSong) {
    this.endGame();
  }
  this.myReq = requestAnimationFrame(this.animate.bind(this, playing)); // keep animating
};

module.exports = GameView;
