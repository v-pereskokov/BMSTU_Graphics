const SQUARE_SIZE = 100;
const PIXEL_SIZE = 1;
const SQUARE_COLOR = '#00aa00';
const POINT_COLOR = '#000000';
const IMAGE_URL = 'http://itc.ua/wp-content/uploads/2017/09/iphonex-front-crop-top-corner-splash.jpg';
const KERNEL_X = [
  [-1,0,1],
  [-2,0,2],
  [-1,0,1]
];
const KERNEL_Y = [
  [-1,-2,-1],
  [0,0,0],
  [1,2,1]
];

export {
  SQUARE_SIZE,
  PIXEL_SIZE,
  SQUARE_COLOR,
  POINT_COLOR,
  IMAGE_URL,
  KERNEL_X,
  KERNEL_Y
};
