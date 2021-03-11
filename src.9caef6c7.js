// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/board/board.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/enums/Cell.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cell;

(function (Cell) {
  Cell["X"] = "X";
  Cell["O"] = "O";
  Cell["NONE"] = "NONE";
})(Cell || (Cell = {}));

exports.default = Cell;
},{}],"../src/enums/GameState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameState;

(function (GameState) {
  GameState["IN_PROGRESS"] = "IN_PROGRESS";
  GameState["GAME_OVER"] = "GAME_OVER";
})(GameState || (GameState = {}));

exports.default = GameState;
},{}],"../src/utils/dom.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;
/**
 * Creates a DOM Element
 */

function create(options) {
  var element = document.createElement(options.element);

  if (options.className) {
    element.className = options.className;
  }

  if (options.onClick) {
    element.onclick = options.onClick;
  }

  if (options.appendTo) {
    options.appendTo.appendChild(element);
  }

  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  return element;
}

exports.create = create;
},{}],"../src/utils/array.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = void 0;
/**
 * Checks if two arrays are equal
 */

function isEqual(a, b) {
  if (!a || !b) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

exports.isEqual = isEqual;
},{}],"../src/components/board/Board.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Cell_1 = __importDefault(require("../../enums/Cell"));

var GameState_1 = __importDefault(require("../../enums/GameState"));

var dom = __importStar(require("../../utils/dom"));

var array = __importStar(require("../../utils/array"));

var Board =
/** @class */
function () {
  function Board(container, options) {
    var _this = this;

    this.currentTurn = Cell_1.default.X;

    this.init = function (container, options) {
      _this.state = _this.initState(options);
      _this.container = _this.createBoard(container);

      _this.renderBoard(_this.container, _this.state);
    };

    this.initState = function (options) {
      return Array(options.rows * options.cols).fill('');
    };

    this.createBoard = function (container) {
      return dom.create({
        element: 'div',
        className: 'board',
        appendTo: container
      });
    };

    this.renderBoard = function (container, state) {
      var row = dom.create({
        element: 'div',
        className: 'row row-0'
      });

      var _loop_1 = function _loop_1(i) {
        dom.create({
          element: 'div',
          className: "cell col-" + i % _this.cols,
          appendTo: row,
          onClick: function onClick() {
            _this.onCellClick(i);
          }
        });

        if ((i + 1) % _this.cols === 0) {
          container.appendChild(row);
          row = dom.create({
            element: 'div',
            className: "row row-" + (i + 1) / _this.rows
          });
        }
      };

      for (var i = 0; i < state.length + 1; i++) {
        _loop_1(i);
      }
    };

    this.onCellClick = function (index) {
      if (_this.state[index]) {
        return;
      }

      _this.state[index] = _this.currentTurn;

      if (_this.currentTurn === Cell_1.default.X) {
        _this.currentTurn = Cell_1.default.O;
      } else {
        _this.currentTurn = Cell_1.default.X;
      }
    };

    this.updateBoard = function (state) {
      var cells = _this.container.getElementsByClassName('cell');

      for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = state[i];
      }

      _this.prevState = __spreadArray([], _this.state);
    };

    this.rowMatch = function (state, i) {
      var matches = 0;

      if (i % _this.rows !== 0) {
        return false;
      }

      for (var j = 1; j < _this.cols; j++) {
        if (state[i] && state[i] === state[i + j]) {
          matches++;
        }
      }

      if (matches == _this.rows - 1) {
        return true;
      }

      return false;
    };

    this.colMatch = function (state, i) {
      var matches = 0;

      for (var j = 1; j < _this.cols; j++) {
        if (state[i] && state[i] === state[i + j * _this.rows]) {
          matches++;
        }
      }

      if (matches == _this.rows - 1) {
        return true;
      }

      return false;
    };

    this.diagonalMatch = function (state, i) {
      if (i === 0) {
        var matches = 0;

        for (var j = 1; j < _this.cols; j++) {
          if (state[i] && state[i] === state[4 * j]) {
            matches++;
          }
        }

        if (matches === _this.rows - 1) {
          return true;
        }
      }

      if (i === 2) {
        var matches = 0;

        for (var j = 1; j < _this.cols; j++) {
          if (state[i] && state[i] === state[2 * (j + 1)]) {
            matches++;
          }
        }

        if (matches === _this.rows - 1) {
          return true;
        }
      }

      return false;
    };

    this.isFull = function (state) {
      return state.filter(function (s) {
        return s;
      }).length === _this.rows * _this.cols;
    };

    this.checkWinner = function (state) {
      for (var i = 0; i < state.length; i++) {
        if (_this.rowMatch(state, i) || _this.colMatch(state, i) || _this.diagonalMatch(state, i)) {
          _this.onGameOver();

          return;
        }
      }

      if (_this.isFull(state)) {
        _this.onGameOver();

        _this.currentTurn = Cell_1.default.NONE;
      }
    };

    this.update = function (options) {
      if (array.isEqual(_this.state, _this.prevState)) {
        return;
      }

      if (options.gameState === GameState_1.default.GAME_OVER) {
        return;
      }

      _this.updateBoard(_this.state);

      _this.checkWinner(_this.state);
    };

    this.remove = function () {
      _this.container.remove();
    };

    this.rows = options.rows;
    this.cols = options.cols;
    this.onGameOver = options.onGameOver;
    this.init(container, options);
  }

  return Board;
}();

exports.default = Board;
},{"../../enums/Cell":"../src/enums/Cell.ts","../../enums/GameState":"../src/enums/GameState.ts","../../utils/dom":"../src/utils/dom.ts","../../utils/array":"../src/utils/array.ts"}],"../src/components/board/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./board.css");

var Board_1 = __importDefault(require("./Board"));

exports.default = Board_1.default;
},{"./board.css":"../src/components/board/board.css","./Board":"../src/components/board/Board.ts"}],"../src/components/status/status.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/status/Status.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Cell_1 = __importDefault(require("../../enums/Cell"));

var GameState_1 = __importDefault(require("../../enums/GameState"));

var dom = __importStar(require("../../utils/dom"));

var Status =
/** @class */
function () {
  function Status(container, options) {
    var _this = this;

    this.init = function (container, options) {
      _this.container = dom.create({
        element: 'div',
        className: 'status',
        appendTo: container,
        innerHTML: "\n        <div class=\"game-over hidden\">\n          <div class=\"title\">Congratulations!</div>\n          <div class=\"sub-title\">Player wins</div>\n          <button class=\"restart\">Play Again!</button>\n        </div>\n        <div class=\"turns\">\n          <div class=\"players\">\n            <div class=\"player\"> \n              P1 (X)\n            </div>\n            <div class=\"player\">\n              P2 (O)\n            </div>\n          </div>\n        </div>\n      "
      });
      var button = document.getElementsByClassName('restart');
      button[0].addEventListener('click', options.onRestart);
    };

    this.updateTurn = function (turn) {
      var players = _this.container.getElementsByClassName('player');

      if (turn === Cell_1.default.X) {
        players[0].className = 'player active';
        players[1].className = 'player';
      }

      if (turn === Cell_1.default.O) {
        players[0].className = 'player';
        players[1].className = 'player active';
      }

      _this.prevTurn = turn;
    };

    this.onGameOver = function (winner) {
      var gameOverContainer = _this.container.getElementsByClassName('game-over');

      var message = gameOverContainer[0].getElementsByClassName('sub-title');

      if (winner) {
        var player = winner === Cell_1.default.X ? '1' : '2';
        message[0].innerHTML = "Player " + player + " (" + winner + ") wins!";
      } else {
        var titleContainer = gameOverContainer[0].getElementsByClassName('title');
        titleContainer[0].innerHTML = 'Game Over';
        message[0].innerHTML = "It's a tie!";
      }

      gameOverContainer[0].className = 'game-over';
    };

    this.update = function (options) {
      if (options.currentTurn === _this.prevTurn) {
        return;
      }

      if (options.gameState === GameState_1.default.GAME_OVER) {
        if (_this.prevGameState === options.gameState) {
          return;
        }

        var winner = options.currentTurn === Cell_1.default.NONE ? '' : _this.prevTurn;

        _this.onGameOver(winner);

        _this.prevGameState = options.gameState;
        return;
      }

      _this.updateTurn(options.currentTurn);
    };

    this.remove = function () {
      _this.container.remove();
    };

    this.init(container, options);
  }

  return Status;
}();

exports.default = Status;
},{"../../enums/Cell":"../src/enums/Cell.ts","../../enums/GameState":"../src/enums/GameState.ts","../../utils/dom":"../src/utils/dom.ts"}],"../src/components/status/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./status.css");

var Status_1 = __importDefault(require("./Status"));

exports.default = Status_1.default;
},{"./status.css":"../src/components/status/status.css","./Status":"../src/components/status/Status.ts"}],"../src/components/Game.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var board_1 = __importDefault(require("./board"));

var status_1 = __importDefault(require("./status"));

var dom = __importStar(require("../utils/dom"));

var GameState_1 = __importDefault(require("../enums/GameState"));

var Game =
/** @class */
function () {
  function Game(container) {
    var _this = this;

    this.gameState = GameState_1.default.IN_PROGRESS;

    this.init = function (container) {
      _this.container = dom.create({
        element: 'div',
        className: 'container',
        appendTo: container
      });

      _this.start();
    };

    this.start = function () {
      _this.status = new status_1.default(_this.container, {
        onRestart: _this.restart
      });
      _this.board = new board_1.default(_this.container, {
        rows: 3,
        cols: 3,
        onGameOver: function onGameOver() {
          return _this.updateGameState(GameState_1.default.GAME_OVER);
        }
      });
    };

    this.updateGameState = function (gameState) {
      _this.gameState = gameState;
    };

    this.restart = function () {
      _this.board.remove();

      _this.status.remove();

      _this.start();

      _this.gameState = GameState_1.default.IN_PROGRESS;
    }; // Main Game Loop


    this.loop = function () {
      _this.board.update({
        gameState: _this.gameState
      });

      _this.status.update({
        gameState: _this.gameState,
        currentTurn: _this.board.currentTurn
      });
    };

    this.init(container);
  }

  return Game;
}();

exports.default = Game;
},{"./board":"../src/components/board/index.ts","./status":"../src/components/status/index.ts","../utils/dom":"../src/utils/dom.ts","../enums/GameState":"../src/enums/GameState.ts"}],"../src/constants/settings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TICK_RATE = void 0; // 60fps

exports.TICK_RATE = 1000 / 60;
},{}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./index.css");

var Game_1 = __importDefault(require("./components/Game"));

var settings = __importStar(require("./constants/settings"));

function init() {
  var nextFrame = Date.now();
  var container = document.getElementById('root');
  var game = new Game_1.default(container);

  function nextAnimationFrame() {
    var now = Date.now();

    if (nextFrame < now) {
      game.loop();
      nextFrame = now + settings.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
},{"./index.css":"../src/index.css","./components/Game":"../src/components/Game.ts","./constants/settings":"../src/constants/settings.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65489" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map