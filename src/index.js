import Canvas from './canvas/canvas';
import * as constansts from './constant/constant';

const drawLine = (x0, y0, x1, y1) => {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.stroke();
};

const canvas = new Canvas('picture', '2d', {
  width: constansts.WIDTH,
  height: constansts.HEIGHT
});
const ctx = canvas.context;

ctx.fillStyle = constansts.SQUARE_COLOR;

ctx.lineWidth = 1;
ctx.strokeStyle = '#000000';
ctx.globalCompositeOperation = 'source-over';

const start = [];
const end = [];

const stack = [];

const ax = 200;
const ay = 200;
const bx = 500;
const by = 200;
const cx = 500;
const cy = 500;
const dx = 200;
const dy = 500;

const xmin = ax;
const xmax = cx;
const ymin = ay;
const ymax = cy;


drawLine(ax, ay, bx, by);
drawLine(bx, by, cx, cy);
drawLine(cx, cy, dx, dy);
drawLine(dx, dy, ax, ay);
