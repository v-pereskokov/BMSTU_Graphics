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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {
  constructor(className = 'picture', context = '2d') {
    this._canvas = document.querySelector(`.${className}`);
    this._context = this.canvas.getContext(context);
  }

  get context() {
    return this._context;
  }

  get canvas() {
    return this._canvas;
  }

  setCallback(type = 'click', callback) {
    this.canvas.addEventListener(type, callback);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SQUARE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SQUARE_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return POINT_COLOR; });
const SQUARE_SIZE = 70;
const SQUARE_COLOR = '#00aa00';
const POINT_COLOR = '#000000';



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant_constant__ = __webpack_require__(1);



const canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas_canvas__["a" /* default */]();
const ctx = canvas.context;

ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_1__constant_constant__["a" /* SQUARE_COLOR */];
ctx.fillRect(0, 0, __WEBPACK_IMPORTED_MODULE_1__constant_constant__["b" /* SQUARE_SIZE */], __WEBPACK_IMPORTED_MODULE_1__constant_constant__["b" /* SQUARE_SIZE */]);

canvas.setCallback('click', event => {
  ctx.fillRect(event.offsetX, event.offsetY, 1, 1);

  ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_1__constant_constant__["c" /* POINT_COLOR */];

  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constant_constant__["b" /* SQUARE_SIZE */]; ++i) {
    ctx.fillRect(i, i, 1, 1);
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map