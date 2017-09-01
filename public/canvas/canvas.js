export default class Canvas {
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
}
