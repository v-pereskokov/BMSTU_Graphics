import * as constants from '../constant/constant';

export default class Sobel {
  constructor(image = '', width = 1, height = 2) {
    this._image = image;
    this._data = this._image.data;

    this._width = width;
    this._height = height;

    this._grayscaleData = [];
    this._sobelData = [];
  }

  top(pixels) {
    var matrizHorizontal =
      [-1, -2, -1,
        0, 0, 0,
        1, 2, 1];

    var matrizVertical =
      [-1, 0, 1,
        -2, 0, 2,
        -1, 0, 1];

    var pixelsPB = this.escalaCinza(pixels);
    var horizontal = this.convolucao(pixelsPB, matrizHorizontal);
    var vertical = this.convolucao(pixelsPB, matrizVertical);
    var img = this.criarImageData(pixels.width, pixels.height);

    for (var i = 0; i < img.data.length; i += 4) {
      var v = Math.abs(vertical.data[i]);
      var h = Math.abs(horizontal.data[i]);

      var s = Math.sqrt(Math.pow(h, 2) + Math.pow(v, 2));
      img.data[i] = s;
      img.data[i + 1] = s;
      img.data[i + 2] = s;
      img.data[i + 3] = 255;
    }

    return img;
  }

  escalaCinza(pixels) {
    var d = pixels.data;

    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      d[i] = d[i + 1] = d[i + 2] = v;
    }

    return pixels;
  }

  convolucao(pixels, weights) {
    if (!window.Float32Array)
      Float32Array = Array;

    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;

    var w = sw;
    var h = sh;
    var output = {width: w, height: h, data: new Float32Array(w * h * 4)};
    var dst = output.data;

    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y * w + x) * 4;
        var r = 0, g = 0, b = 0, a = 0;

        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
            var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
            var srcOff = (scy * sw + scx) * 4;
            var wt = weights[cy * side + cx];
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

  criarImageData(w, h) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    return context.createImageData(w, h);
  }

  getPixel(img) {
    var canvas;

    if (img.getContext) {
      canvas = img;
    } else {
      canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
    }

    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, img.width, img.height);
  }
}
