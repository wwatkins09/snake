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

const $d = __webpack_require__(1);
const Coord = __webpack_require__(2);

const coord = new Coord(4, 5)
const coord2 = new Coord(4,8)

console.log(coord.equals(coord2));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const _queue = [];
let _docReady = false;


class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
  }

  html(string) {
    if (typeof string === 'string') {
      this.htmlEls.forEach((node) => {
        node.innerHTML = string;
      });
    } else {
      return this.htmlEls[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    this.htmlEls.forEach( (node) => {
      node.innerHTML += arg;
    });
  }

  attr(attrName, newValue) {
    if (typeof newValue === 'string' ) {
      this.htmlEls.forEach( (node) => {
        node.setAttribute(attrName, newValue)
      });
    } else {
      return this.htmlEls[0].getAttribute(attrName);
    }
  }

  addClass(className) {
    this.htmlEls.forEach ( (node) => {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlEls.forEach ( (node) => {
      node.classList.remove(className);
    });
  }

  children() {
    let result = [];
    this.htmlEls.forEach( (node) => {
      let nodeChildren = node.children;
      result = result.concat(Array.from(nodeChildren));
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];
    this.htmlEls.forEach( (node) => {
      let nodeParent = node.parentNode;
      if (!result.includes(nodeParent)) {
        result.push(nodeParent);
        }
      });
      return new DOMNodeCollection(result);
    }


  find(selector) {
    let result = [];
    this.htmlEls.forEach( (node) => {
      let elementList = node.querySelectorAll(selector);
      result = result.concat(Array.from(elementList));
    });
    return new DOMNodeCollection(result);
  }

  remove () {
    this.empty();
    this.htmlEls = [];
  }

  on (eventName, handler) {
    this.htmlEls.forEach( (node) => {
      node.addEventListener(eventName, handler);
      const eventKey = `domani-${eventName}`;
      if (typeof node[eventKey] === 'undefined') {
        node[eventKey] = [];
      }
      node[eventKey].push(handler);
    });
  }

  off (eventName) {
    this.htmlEls.forEach( (node) => {
      const eventKey = `domani-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach((handler) => {
          node.removeEventListener(eventName, handler);
        });
      }
      node[eventKey] = [];
    });
  }

}


window.$d = function (selector) {
  switch (typeof selector) {
    case 'function':
      return registerDocReadyCallback(selector);
    case 'string':
      return fetchNodesFromDom(selector);
    case 'object':
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector])
      }
  }

  document.addEventListener("DOMContentLoaded", (e) => {
    _docReady = true;
    queue.forEach((func) => {
      func();
    });
  });
};

window.$d.extend = function(base, ...objects) {
  objects.forEach((object) => {
    for (const key in object) {
      base[key] = object[key];
    }
  });
  return base;
};

window.$d.ajax = function(options) {
  const defaults = {
    method: 'GET',
    url: 'https://www.booknomads.com/api/v0/isbn/9789000035526',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {},
  };

  const mergedCall = $d.extend(defaults, options);
  mergedCall.method = mergedCall.method.toUpperCase();

  const xhr = new XMLHttpRequest();
  xhr.open(mergedCall.method, mergedCall.url, true);

  xhr.onload = function(e) {
    if (xhr.status === 200) {
      defaults.success(xhr.response);
    } else {
      defaults.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(mergedCall.data));
};

fetchNodesFromDom = function (selector) {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
}

registerDocReadyCallback = function (func) {
  if (_docReady) {
    func();
  } else {
    _queue.push(func)
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);