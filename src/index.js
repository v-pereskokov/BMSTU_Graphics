import Canvas from './canvas/canvas';
import * as constants from './constant/constant';

const canvas = new Canvas();
const ctx = canvas.context;

const image = new Image();
image.src = constants.IMAGE_URL;

image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0);
});
