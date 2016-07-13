const Note = require('./note.js');

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
