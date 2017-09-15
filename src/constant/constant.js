const SQUARE_SIZE = 100;
const WIDTH = 500;
const HEIGHT = 200;
const PIXEL_SIZE = 1;
const SQUARE_COLOR = '#00aa00';
const POINT_COLOR = '#000000';
const IMAGE_URL = './static/test.png';
const KERNEL_X = [
  -1, 0, 1,
  -2, 0, 2,
  -1, 0, 1
];
const KERNEL_Y = [
  -1, -2, -1,
  0, 0, 0,
  1, 2, 1
];

export {
  SQUARE_SIZE,
  WIDTH,
  HEIGHT,
  PIXEL_SIZE,
  SQUARE_COLOR,
  POINT_COLOR,
  IMAGE_URL,
  KERNEL_X,
  KERNEL_Y
};
