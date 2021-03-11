parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"9BSY":[function(require,module,exports) {

},{}],"ESYx":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.X="X",e.O="O",e.NONE="NONE"}(e||(e={})),exports.default=e;
},{}],"YUeK":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.IN_PROGRESS="IN_PROGRESS",e.GAME_OVER="GAME_OVER"}(e||(e={})),exports.default=e;
},{}],"vLRE":[function(require,module,exports) {
"use strict";function e(e){var n=document.createElement(e.element);return e.className&&(n.className=e.className),e.onClick&&(n.onclick=e.onClick),e.appendTo&&e.appendTo.appendChild(n),e.innerHTML&&(n.innerHTML=e.innerHTML),n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.create=void 0,exports.create=e;
},{}],"NkO4":[function(require,module,exports) {
"use strict";function e(e,r){if(!e||!r)return!1;if(e.length!==r.length)return!1;for(var t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isEqual=void 0,exports.isEqual=e;
},{}],"xQ9q":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var n={};if(null!=r)for(var i in r)"default"!==i&&Object.prototype.hasOwnProperty.call(r,i)&&e(n,r,i);return t(n,r),n},n=this&&this.__spreadArray||function(e,t){for(var r=0,n=t.length,i=e.length;r<n;r++,i++)e[i]=t[r];return e},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o=i(require("../../enums/Cell")),a=i(require("../../enums/GameState")),u=r(require("../../utils/dom")),s=r(require("../../utils/array")),c=function(){return function(e,t){var r=this;this.currentTurn=o.default.X,this.init=function(e,t){r.state=r.initState(t),r.container=r.createBoard(e),r.renderBoard(r.container,r.state)},this.initState=function(e){return Array(e.rows*e.cols).fill("")},this.createBoard=function(e){return u.create({element:"div",className:"board",appendTo:e})},this.renderBoard=function(e,t){for(var n=u.create({element:"div",className:"row row-0"}),i=function(t){u.create({element:"div",className:"cell col-"+t%r.cols,appendTo:n,onClick:function(){r.onCellClick(t)}}),(t+1)%r.cols==0&&(e.appendChild(n),n=u.create({element:"div",className:"row row-"+(t+1)/r.rows}))},o=0;o<t.length+1;o++)i(o)},this.onCellClick=function(e){r.state[e]||(r.state[e]=r.currentTurn,r.currentTurn===o.default.X?r.currentTurn=o.default.O:r.currentTurn=o.default.X)},this.updateBoard=function(e){for(var t=r.container.getElementsByClassName("cell"),i=0;i<t.length;i++)t[i].innerHTML=e[i];r.prevState=n([],r.state)},this.rowMatch=function(e,t){var n=0;if(t%r.rows!=0)return!1;for(var i=1;i<r.cols;i++)e[t]&&e[t]===e[t+i]&&n++;return n==r.rows-1},this.colMatch=function(e,t){var n=0;if(t>=3)return!1;for(var i=1;i<r.cols;i++)e[t]&&e[t]===e[t+i*r.rows]&&n++;return n==r.rows-1},this.diagonalMatch=function(e,t){if(0===t){for(var n=0,i=1;i<r.cols;i++)e[t]&&e[t]===e[4*i]&&n++;if(n===r.rows-1)return!0}if(2===t){for(n=0,i=1;i<r.cols;i++)e[t]&&e[t]===e[2*(i+1)]&&n++;if(n===r.rows-1)return!0}return!1},this.isFull=function(e){return e.filter(function(e){return e}).length===r.rows*r.cols},this.checkWinner=function(e){for(var t=0;t<e.length;t++)if(r.rowMatch(e,t)||r.colMatch(e,t)||r.diagonalMatch(e,t))return void r.onGameOver();r.isFull(e)&&(r.onGameOver(),r.currentTurn=o.default.NONE)},this.update=function(e){s.isEqual(r.state,r.prevState)||e.gameState!==a.default.GAME_OVER&&(r.updateBoard(r.state),r.checkWinner(r.state))},this.remove=function(){r.container.remove()},this.rows=t.rows,this.cols=t.cols,this.onGameOver=t.onGameOver,this.init(e,t)}}();exports.default=c;
},{"../../enums/Cell":"ESYx","../../enums/GameState":"YUeK","../../utils/dom":"vLRE","../../utils/array":"NkO4"}],"cZYQ":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("./board.css");var r=e(require("./Board"));exports.default=r.default;
},{"./board.css":"9BSY","./Board":"xQ9q"}],"dw7k":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(n){if(n&&n.__esModule)return n;var a={};if(null!=n)for(var r in n)"default"!==r&&Object.prototype.hasOwnProperty.call(n,r)&&e(a,n,r);return t(a,n),a},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=a(require("../../enums/Cell")),i=a(require("../../enums/GameState")),s=n(require("../../utils/dom")),u=function(){return function(e,t){var n=this;this.init=function(e,t){n.container=s.create({element:"div",className:"status",appendTo:e,innerHTML:'\n        <div class="game-over hidden">\n          <div class="title">Congratulations!</div>\n          <div class="sub-title">Player wins</div>\n          <button class="restart">Play Again!</button>\n        </div>\n        <div class="turns">\n          <div class="players">\n            <div class="player"> \n              P1 (X)\n            </div>\n            <div class="player">\n              P2 (O)\n            </div>\n          </div>\n        </div>\n      '}),document.getElementsByClassName("restart")[0].addEventListener("click",t.onRestart)},this.updateTurn=function(e){var t=n.container.getElementsByClassName("player");e===r.default.X&&(t[0].className="player active",t[1].className="player"),e===r.default.O&&(t[0].className="player",t[1].className="player active"),n.prevTurn=e},this.onGameOver=function(e){var t=n.container.getElementsByClassName("game-over"),a=t[0].getElementsByClassName("sub-title");if(e){var i=e===r.default.X?"1":"2";a[0].innerHTML="Player "+i+" ("+e+") wins!"}else t[0].getElementsByClassName("title")[0].innerHTML="Game Over",a[0].innerHTML="It's a tie!";t[0].className="game-over"},this.update=function(e){if(e.currentTurn!==n.prevTurn){if(e.gameState===i.default.GAME_OVER){if(n.prevGameState===e.gameState)return;var t=e.currentTurn===r.default.NONE?"":n.prevTurn;return n.onGameOver(t),void(n.prevGameState=e.gameState)}n.updateTurn(e.currentTurn)}},this.remove=function(){n.container.remove()},this.init(e,t)}}();exports.default=u;
},{"../../enums/Cell":"ESYx","../../enums/GameState":"YUeK","../../utils/dom":"vLRE"}],"GT9o":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("./status.css");var t=e(require("./Status"));exports.default=t.default;
},{"./status.css":"9BSY","./Status":"dw7k"}],"Jr2T":[function(require,module,exports) {
"use strict";var t=this&&this.__createBinding||(Object.create?function(t,e,a,r){void 0===r&&(r=a),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[a]}})}:function(t,e,a,r){void 0===r&&(r=a),t[r]=e[a]}),e=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||function(a){if(a&&a.__esModule)return a;var r={};if(null!=a)for(var n in a)"default"!==n&&Object.prototype.hasOwnProperty.call(a,n)&&t(r,a,n);return e(r,a),r},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n=r(require("./board")),u=r(require("./status")),i=a(require("../utils/dom")),o=r(require("../enums/GameState")),s=function(){return function(t){var e=this;this.gameState=o.default.IN_PROGRESS,this.init=function(t){e.container=i.create({element:"div",className:"container",appendTo:t}),e.start()},this.start=function(){e.status=new u.default(e.container,{onRestart:e.restart}),e.board=new n.default(e.container,{rows:3,cols:3,onGameOver:function(){return e.updateGameState(o.default.GAME_OVER)}})},this.updateGameState=function(t){e.gameState=t},this.restart=function(){e.board.remove(),e.status.remove(),e.start(),e.gameState=o.default.IN_PROGRESS},this.loop=function(){e.board.update({gameState:e.gameState}),e.status.update({gameState:e.gameState,currentTurn:e.board.currentTurn})},this.init(t)}}();exports.default=s;
},{"./board":"cZYQ","./status":"GT9o","../utils/dom":"vLRE","../enums/GameState":"YUeK"}],"5ao7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TICK_RATE=void 0,exports.TICK_RATE=1e3/60;
},{}],"+fUd":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(n){if(n&&n.__esModule)return n;var r={};if(null!=n)for(var i in n)"default"!==i&&Object.prototype.hasOwnProperty.call(n,i)&&e(r,n,i);return t(r,n),r},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),require("./index.css");var i=r(require("./components/Game")),o=n(require("./constants/settings"));function u(){var e=Date.now(),t=document.getElementById("root"),n=new i.default(t);requestAnimationFrame(function t(){var r=Date.now();e<r&&(n.loop(),e=r+o.TICK_RATE),requestAnimationFrame(t)})}u();
},{"./index.css":"9BSY","./components/Game":"Jr2T","./constants/settings":"5ao7"}]},{},["+fUd"], null)
//# sourceMappingURL=/src.6f776637.js.map