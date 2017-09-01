import Canvas from './canvas/canvas';
import * as constants from './constant/constant';

const canvas = new Canvas();
const ctx = canvas.context;

ctx.fillStyle = constants.SQUARE_COLOR;
ctx.fillRect(0, 0, constants.SQUARE_SIZE, constants.SQUARE_SIZE);

canvas.setCallback('click', event => {
  ctx.fillRect(event.offsetX, event.offsetY, 1, 1);

  ctx.fillStyle = constants.POINT_COLOR;

  for (let i = 0; i < constants.SQUARE_SIZE; ++i) {
    ctx.fillRect(i, i, 1, 1);
  }
});
