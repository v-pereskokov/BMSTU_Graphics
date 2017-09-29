export default function Median() {
  this.maskHeight = 10;
  this.maskWidth = 10;

  this.convertImage = function (imageData, w, h) {
    let data = imageData.data;

    let hs = this.calculateHistograms(data),
      bins = this.NUMCLUSTERS;

    hs[0] = this.blurHistogram(hs[0]);
    hs[1] = this.blurHistogram(hs[1]);
    hs[2] = this.blurHistogram(hs[2]);

    let tst = this.equalizeHistogramSum(hs[0], hs[1], hs[2], bins),
      rarr = tst[0],
      garr = tst[1],
      barr = tst[2];

    let element;
    switch (this.shape) {
      case this.DIAMOND:
        element = this.getDiamondMask(this.maskWidth, this.maskHeight);
        break;

      case this.CIRCULAR:
        element = this.getCircularMask(this.maskWidth, this.maskHeight);
        break;

      default:
        element = this.getRectangleMask(this.maskWidth, this.maskHeight);
    }


    let mask = this.maskToArray(element);


    if (mask.length === 0) {
      return imageData;
    }


    if (this.mode === this.FAST) {
      if (this.maskWidth > 3 && this.maskHeight >> 3) {
        let i = this.maskWidth >> 1, j = this.maskHeight >> 1;

        mask.push([i + 1, j, 3]);

      }
    }

    for (let i = 0; i < mask.length;) mask[i++][0] *= 4;


    let padding = element[0].length >> 1,

      ysize = mask[0][1];
    for (let i = 1; i < mask.length; i++) {
      if (mask[i][1] > ysize) ysize = mask[i][1];
    }
    ysize++;


    let evalPixel = function (r, g, b) {
      return rarr[r] + garr[g] + barr[b];
    };

    let rows = new Array(ysize),

      yNext = -(ysize >> 1);


    for (let i = 1; i < ysize; i++) {
      rows[i] = this.getRow(data, yNext++, w, h, padding);
    }


    let pxl = evalPixel(255, 255, 255) + 1,
      hst = (this.mode === this.FAST) ?
        new MedianHistogramFast(pxl) :
        new MedianHistogram(pxl);


    let id = 0;


    for (let y = 0; y < h; y++) {


      let removes = this.get2D(0, 2 * padding + 1, Array),
        i, j, k, r, g, b, x;


      rows.shift();
      rows.push(this.getRow(data, yNext++, w, h, padding));


      hst.clear();


      for (i = 0, x = 0; i < element.length; i++) {
        for (j = 0; j < element[i].length; j++) {
          if (element[i][j] === 1) {
            k = j << 2;
            r = rows[i][k++], g = rows[i][k++], b = rows[i][k], pxl = evalPixel(r, g, b);
            removes[j].push(pxl);
            hst.addItem(pxl, r, g, b);
            x++;
          }
        }
      }


      pxl = hst.initMedian(x * this.kth);
      data[id++] = pxl[0];
      data[id++] = pxl[1];
      data[id] = pxl[2];
      id += 2;


      for (x = 4; x < 4 * w; x += 4) {


        hst.removeItems(removes.shift());
        removes.push([]);


        for (i = 0; i < mask.length; i++) {
          j = x + mask[i][0], k = mask[i][1],
            r = rows[k][j++], g = rows[k][j++], b = rows[k][j];


          pxl = rarr[r] + garr[g] + barr[b];

          removes[mask[i][2]].push(pxl);

          hst.addItem(pxl, r, g, b);
        }


        hst.setMedian(data, id);
        id += 4;

      }
    }


    return imageData;
  };


  this.getRow = function (data, y, w, h, padding) {
    return this.getRowRepeat(data, y, w, h, padding);
  };


  this.getRowRepeat = function (data, y, w, h, padding) {

    y = y < 0 ? 0 : (y >= h ? h - 1 : y);


    let arr = data.subarray(4 * w * y, 4 * w * (y + 1) - 1),
      row = new Uint8ClampedArray((w + 2 * padding) << 2);
    row.set(arr, padding << 2);


    for (let j = (padding + 0) << 2, k = j - 4; k > -1;) {
      let tmp = row.subarray(j, j + 3);
      row.set(tmp, k);
      k -= 4;
    }


    for (let j = (w + padding) * 4, k = j - 4; j < row.length;) {
      let tmp = row.subarray(k, k + 3);
      row.set(tmp, j);
      j += 4;
    }
    return row;
  };


  this.getRowReflect = function (data, y, w, h, padding) {

    y = y < 0 ? -1 - y : (y >= h ? 2 * (h - 1) - y + 1 : y);


    let arr = data.subarray(4 * w * y, 4 * w * (y + 1) - 1),
      row = new Uint8ClampedArray((w + 2 * padding) << 2);
    row.set(arr, padding << 2);


    for (let j = (padding + 0) << 2, k = j - 4; k > -1;) {
      let tmp = row.subarray(j, j + 3);
      row.set(tmp, k);
      k -= 4;
      j += 4;
    }


    for (let j = (w + padding) * 4, k = j - 4; j < row.length;) {
      let tmp = row.subarray(k, k + 3);
      row.set(tmp, j);
      k -= 4;
      j += 4;
    }
    return row;
  };

  this.get2D = function (x, y, C) {
    let arr = new Array(y);
    for (let i = 0; i < y; i++) {
      arr[i] = x === 0 ? new C() : new C(x);
    }
    return arr;
  };


  this.calculateHistograms = function (data) {
    let rarr = new Uint32Array(256),
      garr = new Uint32Array(256),
      barr = new Uint32Array(256),
      N = 5;


    for (let i = 0; i < data.length; i += 2 + 4 * N) {
      rarr[data[i++]]++;
      garr[data[i++]]++;
      barr[data[i]]++;
    }
    return [rarr, garr, barr];
  };


  this.equalizeHistogram = function (hst, bins) {
    let total_sum = 0;
    for (let i = 0; i < hst.length; i++) {
      total_sum += hst[i];
    }

    let m = total_sum / bins;

    let hst2 = new Uint32Array(hst.length);

    for (let i = 0, j = 0, sum = 0; i < hst.length; i++) {
      sum += hst[i];
      while (sum > m) {
        sum -= m;
        j++;
      }
      hst2[i] = j;
    }
    return hst2;
  };

  this.equalizeHistogramSum = function (rh, gh, bh, bins) {
    let total_sum = 0, N = rh.length;
    for (let i = 0; i < N; i++) {
      total_sum += rh[i] + gh[i] + bh[i];
    }

    let m = total_sum / bins,
      sum = 0,
      ir = 0, ig = 0, ib = 0,
      j = 0,
      r, g, b, min, max,
      rh2 = new Uint32Array(N),
      gh2 = new Uint32Array(N),
      bh2 = new Uint32Array(N);

    while (ir < N || ig < N || ib < N) {
      r = ir < N ? rh[ir] : 0;
      g = ig < N ? gh[ig] : 0;
      b = ib < N ? bh[ib] : 0;

      if (r < g) {
        min = r;
        max = g;
      } else {
        min = g;
        max = r;
      }

      if (b < min) min = b;
      else if (b > max) max = b;

      if (max >= 0.9 * (r + g + b)) {
        rh2[ir++] =
          gh2[ig++] =
            bh2[ib++] = j;
        sum += r + g + b;
      } else {

        if (r === min) {
          rh2[ir++] = j;
        } else if (g === min) {
          gh2[ig++] = j;
        } else {
          bh2[ib++] = j;
        }
        if (r === max) {
          rh2[ir++] = j;
        } else if (g === max) {
          gh2[ig++] = j;
        } else {
          bh2[ib++] = j;
        }
        sum += min + max;
      }
      while (sum > m) {
        sum -= m;
        j++;
      }

    }
    return [rh2, gh2, bh2];
  };


  this.blurHistogram = function (hst) {
    let hst2 = new Uint32Array(hst.length);
    hst2[0] = hst2[1] = 1.5 * hst[0];
    let i = hst.length - 1;
    hst2[i] = hst[i - 1] = 1.5 * hst[i];
    for (i = 1; i < hst.length - 1; i++) {
      hst2[i - 1] = hst2[i] = hst2[i + 1] = hst[i];
    }
    for (i = 0; i < hst2.length; i++) {
      hst2[i] /= 3;
    }
    return hst2;
  };


  this.getRectangleMask = function (x, y) {
    let arr2 = new Array(x);
    for (let i = 0; i < x; arr2[i++] = 1) {
    }
    let arr = new Array(y);
    for (let i = 0; i < y; arr[i++] = arr2) ;
    return arr;
  };


  this.getCircularMask = function (x, y) {
    let arr = this.get2D(x, y, Int8Array),
      cx = 0.5 * (x - 1), cy = 0.5 * (y - 1),
      rx = 0.5 * (x - 0.5), ry = 0.5 * (y - 0.5);
    rx *= rx;
    ry *= ry;
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        arr[i][j] = (i - cy) * (i - cy) * rx + (j - cx) * (j - cx) * ry < rx * ry ? 1 : 0;
      }
    }
    return arr;
  };


  this.getDiamondMask = function (x, y) {
    let arr = this.get2D(x, y, Int8Array),
      cx = 0.5 * (x - 1), cy = 0.5 * (y - 1), r = 0.5 * x * y + 0.01;
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        arr[i][j] = Math.abs(i - cy) * x + Math.abs(j - cx) * y <= r ? 1 : 0;
      }
    }
    return arr;
  };


  this.maskToArray = function (mask) {
    let res = [];
    for (let y = 0, y0 = 0; y < mask.length; y++, y0++) {
      let arr = this.countBinaries(mask[y]);
      for (let x = 0; x < arr.length - 1;) {
        let a = arr[x++], b = arr[x++];

        res.push([b - 1, y, b - a - 1]);
      }
    }
    return res;
  };


  this.countBinaries = function (arr) {
    let last = 0, i = 0;
    let res = [];
    while (i < arr.length) {
      while (arr[i] === last) i++;
      last = arr[i];
      res.push(i);
    }
    return res.length < 2 ? [] : res;
  };



  this.shape = this.RECTANGULAR;

  this.CIRCULAR = 'circular';
  this.RECTANGULAR = 'rectangular';
  this.DIAMOND = 'diamond';

  this.kth = 0.5;

  this.FAST = 'fast';
  this.QUALITY = 'quality';

  this.mode = this.FAST;

  this.NUMCLUSTERS = 64;
}


function MedianHistogram(size) {
  this.medianbin;
  this.medianindex;
  this.histogram;
  this.colors;

  this.init = function (size) {
    this.medianbin = 0;
    this.medianindex = 1;

    this.histogram = new Uint16Array(size);

    this.colors = [];
    for (let i = size; i > 0;) {
      this.colors[--i] = new Uint32Array(3);
    }
  };

  this.init(size);


  this.addItem = function (index, r, g, b) {


    if (index < this.medianbin) {
      this.medianindex--;
    }

    this.histogram[index]++;

    let c = this.colors[index];

    c[0] += r;
    c[1] += g;
    c[2] += b;

  };

  this.removeItem = function (index) {


    if (index < this.medianbin) {
      this.medianindex++;
    }


    let c = this.colors[index];

    switch (this.histogram[index]) {
      case 1:

        this.histogram[index] = 0;
        c[0] = c[1] = c[2] = 0;
        break;

      case 2:

        this.histogram[index] = 1;
        c[0] >>= 1;
        c[1] >>= 1;
        c[2] >>= 1;
        break;

      default:


        let i = this.histogram[index]--,
          f = this.histogram[index] / i;

        c[0] *= f;
        c[1] *= f;
        c[2] *= f;
    }

  };


  this.removeItems = function (arr) {
    for (let i = 0; i < arr.length;) this.removeItem(arr[i++]);
  };


  this.initMedian = function (k) {
    this.medianbin = 0;
    this.medianindex = k >> 0;
    return this.getMedian();
  };


  this.getMedian = function () {

    while (this.medianindex > this.histogram[this.medianbin]) {
      this.medianindex -= this.histogram[this.medianbin++];
    }
    while (this.medianindex < 1) {
      this.medianindex += this.histogram[--this.medianbin];
    }


    let c = this.colors[this.medianbin];
    switch (this.histogram[this.medianbin]) {
      case 1:

        return c;

      case 2:
        return [c[0] >> 1, c[1] >> 1, c[2] >> 1];

      case 4:
        return [c[0] >> 2, c[1] >> 2, c[2] >> 2];

      default:
        let f = 1.0 / this.histogram[this.medianbin];
        return [f * c[0], f * c[1], f * c[2]];
    }

  };


  this.setMedian = function (data, id) {

    while (this.medianindex > this.histogram[this.medianbin]) {
      this.medianindex -= this.histogram[this.medianbin++];
    }
    while (this.medianindex < 1) {
      this.medianindex += this.histogram[--this.medianbin];
    }


    let c = this.colors[this.medianbin];
    switch (this.histogram[this.medianbin]) {
      case 1:

        data[id] = c[0];
        data[id + 1] = c[1];
        data[id + 2] = c[2];
        break;

      case 2:
        data[id] = c[0] >> 1;
        data[id + 1] = c[1] >> 1;
        data[id + 2] = c[2] >> 1;
        break;

      case 4:
        data[id] = c[0] >> 2;
        data[id + 1] = c[1] >> 2;
        data[id + 2] = c[2] >> 2;
        break;

      default:
        let f = 1.0 / this.histogram[this.medianbin];
        data[id] = f * c[0];
        data[id + 1] = f * c[1];
        data[id + 2] = f * c[2];
    }

  };


  this.clear = function () {
    this.init(this.histogram.length);
  };


  this.getEntries = function () {
    let arr = [];
    this.entries = 0;
    for (let i = 0; i < this.histogram.length; i++) {
      if (this.histogram[i] > 0) {
        this.entries++;
        for (let j = 0; j < this.histogram[i]; j++) {
          arr.push(i);
        }
      }
    }
    this.initMedian();
    return arr;
  };
}


function MedianHistogramFast(size) {

  this.medianbin;
  this.medianindex;
  this.colors;
  this.histogram;


  this.init = function (size) {
    this.histogram = new Uint16Array(size);
    this.colors = [];

    let i = size;
    while (i) {
      this.colors[--i] = new Uint8ClampedArray(3);
    }
    this.medianbin = 0;
    this.medianindex = 1;
  };

  this.init(size);


  this.addItem = function (index, r, g, b) {


    if (index < this.medianbin) {
      this.medianindex--;
    }

    this.histogram[index]++;

    let c = this.colors[index];
    c[0] = r;
    c[1] = g;
    c[2] = b;
  };

  this.removeItem = function (index) {


    if (index < this.medianbin) this.medianindex++;
    this.histogram[index]--;
  };


  this.removeItems = function (arr) {
    let i = arr.length;
    while (i) {
      if (arr[--i] < this.medianbin) this.medianindex++;
      this.histogram[arr[i]]--;
    }
  };


  this.initMedian = function (k) {
    this.medianbin = 0;
    this.medianindex = k >> 0;
    return this.getMedian();
  };


  this.getMedian = function () {

    while (this.medianindex > this.histogram[this.medianbin]) {
      this.medianindex -= this.histogram[this.medianbin++];
    }
    while (this.medianindex < 1) {
      this.medianindex += this.histogram[--this.medianbin];
    }


    return this.colors[this.medianbin];
  };


  this.setMedian = function (data, i) {

    while (this.medianindex > this.histogram[this.medianbin]) {
      this.medianindex -= this.histogram[this.medianbin++];
    }
    while (this.medianindex < 1) {
      this.medianindex += this.histogram[--this.medianbin];
    }


    let c = this.colors[this.medianbin];
    data[i] = c[0];
    data[i + 1] = c[1];
    data[i + 2] = c[2];
  };

  this.clear = function () {
    this.init(this.histogram.length);
  };


  this.getEntries = function () {
    let arr = [];
    this.entries = 0;
    for (let i = 0; i < this.histogram.length; i++) {
      if (this.histogram[i] > 0) {
        this.entries++;
        for (let j = 0; j < this.histogram[i]; j++) {
          arr.push(i);
        }
      }
    }
    this.initMedian();
    return arr;
  };
}

