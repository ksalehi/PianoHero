#[PianoHero](https://ksalehi.github.io/PianoHero)

## Description

PianoHero is an interactive browser game modeled after Guitar Hero. It guides players through playing a melody on a virtual piano by hitting corresponding keys on their keyboard. Players are scored on how accurately they hit the notes, but can also set aside the guided songs to play any tune they like.

![landing_page]

![piano_hero]

## Implementation

PianoHero is written in JavaScript with jQuery and HTML5 Canvas.

### jQuery

User input in the form of keyup/keydown events cause Canvas elements to be updated and re-rendered, and start/end the audio corresponding to a given note. Users can also choose to mute the keyboard and play with the visual feedback alone if they desire.

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

Elements are rendered to the canvas at 60Hz using JavaScript's `requestAnimationFrame` method, with a callback to the `GameView` class's custom `animate` method. `Animate` updates the location of each item as a function of the time elapsed since the previous frame (taking into account the possibility of jitter on top of the usual 60Hz refresh rate) and re-renders them with their updated position.

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

## Future directions

Future releases will include the following features:

- More song options
- High score functionality
- Multi-user functionality

[landing_page]: ./lib/css/landing_page.png
[piano_hero]: ./lib/css/piano_hero.png
