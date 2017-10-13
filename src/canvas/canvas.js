export default class Canvas {
  constructor(className = 'picture', context = '2d', {width = 0, height = 0}) {
    this._canvas = document.querySelector(`.${className}`);
    this._context = this.canvas.getContext(context);

    this._width = width;
    this._height = height;

    this._setupCanvas();
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

  getPixel() {
    this._context.drawImage(this._canvas, 0, 0);
    return this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
  }

  _setupCanvas() {
    this.canvas.width = this._width;
    this.canvas.height = this._height;
  }
}
