/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'picture';
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2d';

    _classCallCheck(this, Canvas);

    this._canvas = document.querySelector('.' + className);
    this._context = this.canvas.getContext(context);
  }

  _createClass(Canvas, [{
    key: 'setCallback',
    value: function setCallback() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
      var callback = arguments[1];

      this.canvas.addEventListener(type, callback);
    }
  }, {
    key: 'context',
    get: function get() {
      return this._context;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this._canvas;
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SQUARE_SIZE = 70;
var SQUARE_COLOR = '#00aa00';
var POINT_COLOR = '#000000';

exports.SQUARE_SIZE = SQUARE_SIZE;
exports.SQUARE_COLOR = SQUARE_COLOR;
exports.POINT_COLOR = POINT_COLOR;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _canvas = __webpack_require__(0);

var _canvas2 = _interopRequireDefault(_canvas);

var _constant = __webpack_require__(1);

var constants = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = new _canvas2.default();
var ctx = canvas.context;

ctx.fillStyle = constants.SQUARE_COLOR;
ctx.fillRect(0, 0, constants.SQUARE_SIZE, constants.SQUARE_SIZE);

canvas.setCallback('click', function (event) {
  ctx.fillRect(event.offsetX, event.offsetY, 1, 1);

  ctx.fillStyle = constants.POINT_COLOR;

  for (var i = 0; i < constants.SQUARE_SIZE; ++i) {
    ctx.fillRect(i, i, 1, 1);
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map