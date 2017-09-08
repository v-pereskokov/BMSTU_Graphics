import Canvas from './canvas/canvas';
import * as constants from './constant/constant';

const canvas = new Canvas();
const ctx = canvas.context;

ctx.fillStyle = constants.SQUARE_COLOR;
ctx.fillRect(0, 0, constants.SQUARE_SIZE, constants.SQUARE_SIZE);

const mouse = {
  x: 0,
  y: 0
};

canvas.canvas.addEventListener('mousemove', event => {
  mouse.x = event.pageX - canvas.canvas.offsetLeft;
  mouse.y = event.pageY - canvas.canvas.offsetTop;
});

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#cc181c';

canvas.canvas.addEventListener('mousedown', event => {
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);

  canvas.canvas.addEventListener('mousemove', onPaint, false);
});

canvas.canvas.addEventListener('mouseup', () => {
  canvas.canvas.removeEventListener('mousemove', onPaint, false);
});

const onPaint = () => {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};
