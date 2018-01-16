class Coord {

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  plus(otherCoord) {
    this.row = this.row + otherCoord.row;
    this.col = this.col + otherCoord.col;
  }

  equals(otherCoord) {
    return (this.row === otherCoord.row && this.col === otherCoord.col);
  }

  isOpposite(otherCoord) {
    return (this.row === otherCoord.row * -1 && this.col === otherCoord.col * -1)
  }

}

module.exports = Coord;
