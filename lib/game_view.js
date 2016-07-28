const KeyUtil = require('./key_util');
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
  $(document).on('keydown', event => {
    if (event.keyCode === 32 && !GameView.inProgress) {
      event.preventDefault();
      $(document).off('keydown');
      this.endTutorial = true;
      this.game.playing = true;
      this.startGame();
      $('.welcome').addClass('hidden');
    }
  });
  this.bindKeyHandlers();
  this.timerStart = new Date(); // start timing
  this.startTutorial();
};

GameView.prototype.startTutorial = function() {
  this.lastTime = 0;
  this.firstCall = true;
  requestAnimationFrame(this.animate.bind(this, false)); // start animating
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
  requestAnimationFrame(this.animate.bind(this, true)); // start animating
};

GameView.prototype.restart = function() {
  this.bindKeyHandlers();
  this.game = new Game('Ode to Joy');
  this.inProgress = true;
  if (this.game.notes.length === 0) {
    return;
  }
  this.lastTime = 0;
  this.firstCall = true;
  requestAnimationFrame(this.animate.bind(this, true)); // start animating
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
  if (this.game.score < (this.game.numNotes/2)) {
    message = `Looks like you're gonna need some practice. You hit ${this.game.score} / ${this.game.numNotes} notes.`;
  } else if (this.game.score < (3*(this.game.numNotes)/4)) {
    message = `Not bad! You hit ${this.game.score} / ${this.game.numNotes} notes.`;
  } else if (this.game.score < (this.game.numNotes)){
    message = `Nicely done! You hit ${this.game.score} / ${this.game.numNotes} notes. Keep up the good work!`;
  } else {
    message = `PERFECT SCORE! Congratulations!`;
  }
  $('.won-message').text(message);
  $('.won').removeClass('hidden');
  $(document).on('keydown', event => {
    if (event.keyCode === 32 && !GameView.inProgress) {
      event.preventDefault();
      this.restart();
      $('.won').addClass('hidden');
    }
  });
};

GameView.prototype.animate = function(time, playing) {
  if (this.firstCall) { // subtract off timer's time on the first call
    let d2 = new Date();
    this.lastTime = d2.getTime() - this.timerStart.getTime();
    this.firstCall = false;
  }
  let timeDelta = time - this.lastTime;
  // if (playing) {
    this.game.step(timeDelta);
  // }
  this.game.draw(this.ctx);
  this.lastTime = time;

  if (playing && this.game.endOfSong) {
    this.endGame();
  }
  requestAnimationFrame(this.animate.bind(this)); // keep animating
};

module.exports = GameView;
