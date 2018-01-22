const Snake = require('./snake.js');
const Coord = require('./coord.js');

class Board {

  constructor() {
    this.generateApple = this.generateApple.bind(this);
    this.move = this.move.bind(this);
    this.eatApple = this.eatApple.bind(this);

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

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


}

module.exports = Board;
