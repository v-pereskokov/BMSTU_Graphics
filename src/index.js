import Canvas from './canvas/canvas';
import * as constansts from './constant/constant';

const drawButton = document.querySelector('.draw');

drawButton.addEventListener('click', () => {
  let x0 = document.getElementsByName('circle-x0')[0].value;
  let y0 = document.getElementsByName('circle-y0')[0].value;
  let r = document.getElementsByName('circle-r')[0].value;

  console.log(x0, y0, r);
});

const canvas = new Canvas('picture', '2d', {
  width: constansts.WIDTH,
  height: constansts.HEIGHT
});
const ctx = canvas.context;

ctx.fillStyle = constansts.SQUARE_COLOR;

let current = 0;
let points = [];

ctx.lineWidth = 1;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#cc181c';

function drawBrez(context, Xd, Yd, Xf, Yf) {
  let Dx, Dy, Dx2, Dy2, Dxy, S;
  let Xinc, Yinc, X, Y;

  if (Xd < Xf) Xinc = 1; else Xinc = -1;
  if (Yd < Yf) Yinc = 1; else Yinc = -1;

  Dx = Math.abs(Xd - Xf);
  Dy = Math.abs(Yd - Yf);

  Dx2 = Dx + Dx;
  Dy2 = Dy + Dy;

  X = Xd;
  Y = Yd;

  context.moveTo(X, Y);
  if (Dx > Dy) {
    S = Dy2 - Dx;
    Dxy = Dy2 - Dx2;
    for (let i = 0; i < Dx; i++) {
      if (S >= 0) {
        Y = Y + Yinc;
        S = S + Dxy;
      } else {
        S = S + Dy2;
      }

      X = X + Xinc;
      context.lineTo(X, Y);
    }
  } else {
    S = Dx2 - Dy;
    Dxy = Dx2 - Dy2;

    for (let i = 0; i < Dy; i++) {
      if (S >= 0) {
        X = X + Xinc;
        S = S + Dxy;
      } else {
        S = S + Dx2;
      }
      Y = Y + Yinc;
      context.lineTo(X, Y);
    }
  }

  context.stroke();
}

canvas.canvas.addEventListener('mousedown', event => {
  points.push({
    x: event.pageX - canvas.canvas.offsetLeft,
    y: event.pageY - canvas.canvas.offsetTop
  });

  console.log(points);

  ++current;
});

canvas.canvas.addEventListener('mouseup', () => {
  if (current === 4) {
    ctx.clearRect(0, 0, constansts.WIDTH, constansts.HEIGHT);
    points = [];
    current = 0;
  }

  if (current !== 0 && current !== 1) {
    ctx.beginPath();

    drawBrez(ctx, points[current - 2].x, points[current - 2].y, points[current - 1].x, points[current - 1].y);
  }

  if (current === 3) {
    ctx.beginPath();

    ctx.moveTo(points[current - 1].x, points[current - 1].y);
    ctx.lineTo(points[0].x, points[0].y);

    ctx.stroke();
  }
});
