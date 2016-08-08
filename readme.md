#[PianoHero](https://ksalehi.github.io/PianoHero)

## Description

PianoHero is an interactive browser game modeled after Guitar Hero. It guides players through playing a melody on a virtual piano by hitting corresponding keys on their keyboard. Players are scored on how accurately they hit the notes, but can also set aside the guided songs to play any tune they like.

![landing_page]

![piano_hero]

## Implementation

PianoHero is written in JavaScript with jQuery and HTML5 Canvas.

### jQuery

```javascript
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
```

### HTML5 Canvas

```javascript
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
```

[landing_page]: ./lib/css/landing_page.png
[piano_hero]: ./lib/css/piano_hero.png
