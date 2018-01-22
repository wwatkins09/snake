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

const View = __webpack_require__(1);

window.$d(function() {
  const rootEl = window.$d('.snake-game');
  new View(rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Coord = __webpack_require__(4);
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
    this.board = new Board((this.$el));
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
      this.board.move();
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
    const flattenedApple = (this.board.appleCoord.row * 20) + this.board.appleCoord.col;
    $d(document.getElementById(`li${flattenedApple}`)).addClass('apple');
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);
const Coord = __webpack_require__(4);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(4);

class Snake {

  constructor() {
    this.direction = new Coord(-1,0);
    this.segments = [new Coord(10,10)];
    this.segmentNum = 1;
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

}

module.exports = Snake;


/***/ }),
/* 4 */
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

  flatten() {
    return (this.row * 20) + this.col;
  }

}

module.exports = Coord;


/***/ })
/******/ ]);