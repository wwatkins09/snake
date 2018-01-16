/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);

window.$d(function() {
  const rootEl = window.$d('.snake-game');
  new View(rootEl);
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

class Coord {

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  plus(otherCoord) {
    return new Coord(this.row + otherCoord.row, this.col + otherCoord.col);
  }

  equals(otherCoord) {
    return (this.row === otherCoord.row && this.col === otherCoord.col);
  }

  isOpposite(otherCoord) {
    return (this.row === otherCoord.row * -1 && this.col === otherCoord.col * -1)
  }

}

module.exports = Coord;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(4);

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
    for (let i = 0; i < 8; i++) {
      newHtml += "<ul>";
      for (let i = 0; i < 8; i++) {
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(5);

class Board {

  constructor() {
    this.snake = new Snake();
  }

}

module.exports = Board;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(2);

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


/***/ })
/******/ ]);