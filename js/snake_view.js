const Board = require('./board.js');
const Coord = require('./coord.js');
const leftCoord = new Coord(0, -1);
const upCoord = new Coord(-1, 0);
const rightCoord = new Coord(0, 1);
const downCoord = new Coord(1, 0);

class View {

  constructor(el) {
    this.step = this.step.bind(this);
    this.render = this.render.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.checkIfGameOver = this.checkIfGameOver.bind(this);
    this.gameOver = this.gameOver.bind(this);

    this.$el = el;
    this.board = new Board();
    this.intervalId = window.setInterval(this.step, 100);
    this.setupGrid();
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  setupGrid() {
    let newHtml = '';
    for (let i = 0; i < 20; i++) {
      newHtml += `<ul id=ul${i}>`;
      for (let j = 0; j < 20; j++) {
        newHtml += `<li id=li${i*20 + j}></li>`;
      }
      newHtml += "</ul>";
    }
    this.$el.html(newHtml);
  }

  step() {
    if (this.checkIfGameOver()) {
      this.gameOver();
    } else {
      this.board.snake.move();
      this.render();
    }
  }

  handleKeyEvent(event) {
    event.preventDefault();
    let newDirection;
    if (event.keyCode === 37) {
      newDirection = new Coord(0, -1);
    }
    if (event.keyCode === 38) {
      newDirection = new Coord(-1, 0);
    }
    if (event.keyCode === 39) {
      newDirection = new Coord(0, 1);
    }
    if (event.keyCode === 40) {
      newDirection = new Coord(1, 0);
    }
    this.board.snake.turn(newDirection);
  }

  render() {
    //write this into domani!!!
    this.$el.find('li').htmlEls.forEach((el) => {
      $d(el).removeClass('snake');
    });
    this.board.snake.segments.forEach((segment) => {
      const flattenedSegment = (segment.row * 20) + segment.col;
      // write this into domani!
      $d(document.getElementById(`li${flattenedSegment}`)).addClass('snake');
    });
   }

   checkIfGameOver() {
     let result = false;
     this.board.snake.segments.forEach((segment) => {
       if ((this.board.snake.direction.equals(upCoord) && segment.row <= 0) ||
         (this.board.snake.direction.equals(downCoord) && segment.row >= 19) ||
         (this.board.snake.direction.equals(leftCoord) && segment.col <= 0) ||
         (this.board.snake.direction.equals(rightCoord) && segment.col >= 19) ||
         (this.board.snake.isOccupying(this.board.snake.segments[0].plus(this.board.snake.direction)))
       ) {
           result = true;
         }
     });
     return result;
   }

   gameOver() {
     window.clearInterval(this.intervalId);
     console.log("working!");
   }

}

module.exports = View;
