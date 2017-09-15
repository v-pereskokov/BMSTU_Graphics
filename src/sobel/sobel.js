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
    const horizontal = this._getData(constants.KERNEL_Y);
    const vertical = this._getData(constants.KERNEL_X);
    const img = Sobel.createImageData(this._image.width, this._image.height);

    for (let i = 0; i < img.data.length; i += 4) {
      const absVertical = Math.abs(vertical.data[i]);
      const absHorizontal = Math.abs(horizontal.data[i]);
      const sqrt = Math.sqrt(Math.pow(absHorizontal, 2) + Math.pow(absVertical, 2));

      img.data[i] = sqrt;
      img.data[i + 1] = sqrt;
      img.data[i + 2] = sqrt;
      img.data[i + 3] = 255;
    }

    this._result = img;
  }

  _getData(matrix) {
    const side = Math.round(Math.sqrt(matrix.length));
    const halfSide = Math.floor(side / 2);

    const src = this._image.data;
    const sw = this._image.width;
    const sh = this._image.height;

    const w = sw;
    const h = sh;
    const output = {
      width: w,
      height: h,
      data: new Float32Array(w * h * 4)
    };
    const dst = output.data;

    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        const sy = y;
        const sx = x;
        const dstOff = (y * w + x) * 4;

        let red = 0;
        let green = 0;
        let blue = 0;

        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            let scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
            let scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));

            let srcOff = (scy * sw + scx) * 4;
            let wt = matrix[cy * side + cx];

            red += src[srcOff] * wt;
            green += src[srcOff + 1] * wt;
            blue += src[srcOff + 2] * wt;
          }
        }

        dst[dstOff] = red;
        dst[dstOff + 1] = green;
        dst[dstOff + 2] = blue;
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
