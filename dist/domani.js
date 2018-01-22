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

  each (callback) {
    this.htmlEls.forEach( (node) => {
      callback(node);
    });
  }
}

// end of class

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
}

document.addEventListener("DOMContentLoaded", (e) => {
    _docReady = true;
    _queue.forEach((func) => {
      func();
  });
});

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

    xhr.send(JSON.stringify(mergedCall.data));
  }
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
