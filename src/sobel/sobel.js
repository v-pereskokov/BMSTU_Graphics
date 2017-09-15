import * as constants from '../constant/constant';

export default class Sobel {
  constructor(image) {
    this._image = image;
    this._result = null;

    this._transform();
  }

  get image() {
    return this._result;
  }

  _transform() {
    let pixelsPB = this.escalaCinza(this._image);
    let horizontal = this.convolucao(pixelsPB, constants.KERNEL_Y);
    let vertical = this.convolucao(pixelsPB, constants.KERNEL_X);
    const img = Sobel.createImageData(this._image.width, this._image.height);

    for (let i = 0; i < img.data.length; i += 4) {
      let v = Math.abs(vertical.data[i]);
      let h = Math.abs(horizontal.data[i]);

      let s = Math.sqrt(Math.pow(h, 2) + Math.pow(v, 2));
      img.data[i] = s;
      img.data[i + 1] = s;
      img.data[i + 2] = s;
      img.data[i + 3] = 255;
    }

    this._result = img;
  }

  escalaCinza(pixels) {
    let d = pixels.data;

    for (let i = 0; i < d.length; i += 4) {
      let r = d[i];
      let g = d[i + 1];
      let b = d[i + 2];
      let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      d[i] = d[i + 1] = d[i + 2] = v;
    }

    return pixels;
  }

  convolucao(pixels, weights) {
    if (!window.Float32Array)
      Float32Array = Array;

    let side = Math.round(Math.sqrt(weights.length));
    let halfSide = Math.floor(side / 2);

    let src = pixels.data;
    let sw = pixels.width;
    let sh = pixels.height;

    let w = sw;
    let h = sh;
    let output = {width: w, height: h, data: new Float32Array(w * h * 4)};
    let dst = output.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sy = y;
        let sx = x;
        let dstOff = (y * w + x) * 4;
        let r = 0, g = 0, b = 0, a = 0;

        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            let scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
            let scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
            let srcOff = (scy * sw + scx) * 4;
            let wt = weights[cy * side + cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
            a += src[srcOff + 3] * wt;
          }
        }

        dst[dstOff] = r;
        dst[dstOff + 1] = g;
        dst[dstOff + 2] = b;
        dst[dstOff + 3] = 255;
      }
    }

    return output;
  }

  static createImageData(width, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    return context.createImageData(width, height);
  }
}
