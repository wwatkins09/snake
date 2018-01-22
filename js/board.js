const Snake = require('./snake.js');
const Coord = require('./coord.js');
const leftCoord = new Coord(0, -1);
const upCoord = new Coord(-1, 0);
const rightCoord = new Coord(0, 1);
const downCoord = new Coord(1, 0);

class Board {

  constructor() {
    this.generateApple = this.generateApple.bind(this);
    this.move = this.move.bind(this);
    this.eatApple = this.eatApple.bind(this);
    this.checkIfGameOver = this.checkIfGameOver.bind(this);

    this.snake = new Snake();
    this.generateApple();
  }

  move() {
    this.snake.move();
    if (this.snake.segments[0].equals(this.appleCoord)) {
      this.eatApple();
    }
  }

  generateApple() {
    const appleCoord = new Coord(this.getRandomArbitrary(0, 20), this.getRandomArbitrary(0, 20));
    let taken = false;
    this.snake.segments.forEach((segment) => {
      if (segment.equals(appleCoord)) {
        taken = true;
      }
    });
    if (taken) {
      this.generateApple();
    } else {
      this.appleCoord = appleCoord;
    }
  }

  eatApple() {
    this.snake.segmentNum += 1;
    $d(document.getElementById(`li${this.appleCoord.flatten()}`)).removeClass('apple');
    this.generateApple();
  }

  turnSnake(newDirection) {
    if (!newDirection.isOpposite(this.snake.direction)) {
      this.snake.turn(newDirection);
    }
  }

  checkIfGameOver() {
    let result = false;
    const headCoord = this.snake.head();
      if ((this.snake.direction.equals(upCoord) && headCoord.row <= 0) ||
        (this.snake.direction.equals(downCoord) && headCoord.row >= 19) ||
        (this.snake.direction.equals(leftCoord) && headCoord.col <= 0) ||
        (this.snake.direction.equals(rightCoord) && headCoord.col >= 19) ||
        (this.snake.isOccupying(this.snake.head().plus(this.snake.direction)))
      ) {
          result = true;
        }
    return result;
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


}

module.exports = Board;
