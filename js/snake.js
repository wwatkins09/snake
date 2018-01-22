const Coord = require('./coord.js');

class Snake {

  constructor() {
    this.direction = new Coord(-1,0);
    this.segments = [new Coord(10,10)];
    this.segmentNum = 1;

    this.head = this.head.bind(this);
  }

  move() {
    let oldHead = this.segments[0];
    this.segments.unshift(oldHead.plus(this.direction))
    while (this.segments.length > this.segmentNum) {
      this.segments.pop();
    }
  }

  turn(newDirection) {
    this.direction = newDirection
  }

  isOccupying(coord) {
    let result = false;
    this.segments.forEach((segCoord) => {
      if (coord.equals(segCoord)) {
        result = true;
      }
    });
    return result;
  }

  eatApple() {
    this.segmentNum += 1;
  }

  head() {
    return this.segments[0];
  }

}

module.exports = Snake;
