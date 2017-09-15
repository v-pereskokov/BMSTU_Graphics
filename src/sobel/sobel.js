import * as constants from '../constant/constant';

export default class Sobel {
  constructor(image, width, height) {
    this._image = image;
    this._data = this._image.data;

    this._width = width;
    this._height = height;

    this._grayscaleData = [];
    this._sobelData = [];
  }

  _transform() {
    let pixelAt = this._getPixelAtBind(this._data);

    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const r = pixelAt(x, y, 0);
        const g = pixelAt(x, y, 1);
        const b = pixelAt(x, y, 2);

        const avg = (r + g + b) / 3;
        this._grayscaleData.push(avg, avg, avg, 255);
      }
    }

    pixelAt = this._getPixelAtBind(this._grayscaleData);

    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const pixelX = (
          (constants.KERNEL_X[0][0] * pixelAt(x - 1, y - 1)) +
          (constants.KERNEL_X[0][1] * pixelAt(x, y - 1)) +
          (constants.KERNEL_X[0][2] * pixelAt(x + 1, y - 1)) +
          (constants.KERNEL_X[1][0] * pixelAt(x - 1, y)) +
          (constants.KERNEL_X[1][1] * pixelAt(x, y)) +
          (constants.KERNEL_X[1][2] * pixelAt(x + 1, y)) +
          (constants.KERNEL_X[2][0] * pixelAt(x - 1, y + 1)) +
          (constants.KERNEL_X[2][1] * pixelAt(x, y + 1)) +
          (constants.KERNEL_X[2][2] * pixelAt(x + 1, y + 1))
        );

        const pixelY = (
          (constants.KERNEL_Y[0][0] * pixelAt(x - 1, y - 1)) +
          (constants.KERNEL_Y[0][1] * pixelAt(x, y - 1)) +
          (constants.KERNEL_Y[0][2] * pixelAt(x + 1, y - 1)) +
          (constants.KERNEL_Y[1][0] * pixelAt(x - 1, y)) +
          (constants.KERNEL_Y[1][1] * pixelAt(x, y)) +
          (constants.KERNEL_Y[1][2] * pixelAt(x + 1, y)) +
          (constants.KERNEL_Y[2][0] * pixelAt(x - 1, y + 1)) +
          (constants.KERNEL_Y[2][1] * pixelAt(x, y + 1)) +
          (constants.KERNEL_Y[2][2] * pixelAt(x + 1, y + 1))
        );

        const magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

        this._sobelData.push(magnitude, magnitude, magnitude, 255);
      }
    }

    let clampedArray = this._sobelData;

    if (typeof Uint8ClampedArray === 'function') {
      clampedArray = new Uint8ClampedArray(this._sobelData);
    }

    clampedArray.toImageData = function () {
      return Sobel.toImageData(clampedArray, this._width, this._height);
    };

    return clampedArray;
  }

  _getPixelAtBind(data) {
    return (x, y, i) => data[((this._width * y) + x) * 4 + i || 0];
  }
}
