const Board = require('./board.js');

class View {

  constructor(el) {
    this.$el = el;
    this.board = new Board();
    this.$el.on('keydown', this.handleKeyEvent)
    this.intervalId = window.setInterval(this.step.bind(this), 100);
    this.setupGrid();
  }

  setupGrid() {
    let newHtml = '';
    for (let i = 0; i < 20; i++) {
      newHtml += "<ul>";
      for (let i = 0; i < 20; i++) {
        newHtml += "<li></li>";
      }
      newHtml += "</ul>";
    }
    this.$el.html(newHtml);
  }

  step() {
    this.board.snake.move();
  }

  handleKeyEvent(event) {
    event.preventDefault();
    let newDirection;
    switch(event.keyCode) {
      case 37:
        newDirection = new Coord(0, -1);
      case 38:
        newDirection = new Coord(1, 0);
      case 39:
        newDirection = new Coord(0, 1);
      case 40:
        newDirection = new Coord(-1, 0);
    }
    this.board.snake.turn(newDirection);
  }

  render() {
    return (
      "working!"
    )
  }

}

module.exports = View;
