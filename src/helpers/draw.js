import * as constants from '../constant/constant';

const mouse = {
  x: 0,
  y: 0
};

let isPaint = false;

const draw = (canvas, ctx) => {
  canvas.addEventListener('mousemove', event => {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;

    if (isPaint) {
      onPaint(ctx);
    }
  });

  ctx.lineWidth = 3;
  ctx.strokeStyle = constants.POINT_COLOR;

  canvas.addEventListener('mousedown', event => {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    isPaint = true;
  });

  canvas.addEventListener('mouseup', () => {
    isPaint = false;
  });
};

const onPaint = (ctx) => {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};

export default draw;
