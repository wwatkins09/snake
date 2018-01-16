const $d = require('../dist/domani.js');
const Coord = require('./coord.js');

const coord = new Coord(4, 5)
const coord2 = new Coord(4,8)

console.log(coord.equals(coord2));
