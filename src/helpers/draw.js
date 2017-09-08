import * as constants from '../constant/constant';

const mouse = {
  x: 0,
  y: 0
};

const draw = (canvas, ctx) => {
  canvas.addEventListener('mousemove', event => {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
  });

  ctx.lineWidth = 3;
  ctx.strokeStyle = constants.POINT_COLOR;

  canvas.addEventListener('mousedown', event => {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint.bind(this, ctx));
  });

  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', onPaint.bind(this, ctx));
  });
};

const onPaint = (ctx) => {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};

export default draw;
