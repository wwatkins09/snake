const View = require('./snake_view.js');

window.$d(function() {
  const rootEl = window.$d('.snake-game');
  new View(rootEl);
});
