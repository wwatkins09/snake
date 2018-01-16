const Coord = require('./coord.js');

class Snake {

  constructor() {
    this.direction = new Coord(0,0);
    this.segments = [new Coord(4,4)];
  }

  move() {
    let oldHead = this.segments[0];
    this.segments.unshift(oldHead.plus(this.direction))
    this.segments.pop();
  }

  turn(newDirection) {
    this.direction = newDirection
  }

}

module.exports = Snake;
