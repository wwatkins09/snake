const Board = require('./board.js');
const Coord = require('./coord.js');

class View {

  constructor(el) {
    this.step = this.step.bind(this);
    this.render = this.render.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.checkIfGameOver = this.checkIfGameOver.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.handleStart = this.handleStart.bind(this);

    this.$el = el;
    this.startModal = window.$d('#start-modal');
    this.endModal = window.$d('#end-modal');
    this.startModal.on('click', this.handleStart);
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
      this.board.move();
      this.render();
    }
  }

  handleStart(event) {
    this.startModal.off('click', this.handleStart)
    this.startModal.removeClass("showing");
    this.startModal.addClass("hidden");
    this.endModal.removeClass("showing");
    this.endModal.addClass("hidden");
    this.board = new Board(this.$el);
    this.intervalId = window.setInterval(this.step, 100);
    this.setupGrid();
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

    if (newDirection) {
      this.board.turnSnake(newDirection);
    }
  }

  render() {
    this.$el.find('li').each((el) => {
      $d(el).removeClass('snake');
    });
    this.board.snake.segments.forEach((segment) => {
      $d(`#li${segment.flatten()}`).addClass('snake');
    });
    $d(`#li${this.board.appleCoord.flatten()}`).addClass('apple');
   }

   checkIfGameOver() {
     return this.board.checkIfGameOver();
   }

   gameOver() {
     window.clearInterval(this.intervalId);
     this.endModal.removeClass('hidden');
     this.endModal.addClass('showing');
     this.endModal.on('click', this.handleStart);
   }

}

module.exports = View;
