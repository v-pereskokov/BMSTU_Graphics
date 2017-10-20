import Canvas from './canvas/canvas';
import * as constansts from './constant/constant';

const canvas = document.querySelector('.picture');
const ctx = canvas.getContext('2d');

ctx.globalCompositeOperation = 'source-over';

const stack = [];

const ax = 200;
const ay = 200;
const bx = 600;
const by = 300;
const cx = 500;
const cy = 500;
const dx = 200;
const dy = 500;
const ex = 100;
const ey = 300;

const xmin = ax;
const xmax = cx;
const ymin = ay;
const ymax = cy;


function cyrcusBeck(stack, line = {
  first: {
    x: 0,
    y: 0
  },
  second: {
    x: 0,
    y: 0
  }
}) {
  let delX = line.first.x - line.second.x;
  let delY = line.first.y - line.second.y;

  let pointDel = {
    x: delX,
    y: delY
  };

  let boundaryPoint = stack[2];

  let tEnter = 0;
  let tLeave = 1;

  for (let i = 0; i < stack.length; ++i) {
    if (i === stack.length - 2) {
      break;
    }

    let point = stack[i];
    let point2 = stack[i + 1];

    let line2 = {
      first: point,
      second: point2
    };

    let N = getInsideNormal(line2, boundaryPoint);

    let w = {
      x: line.first.x - point.x,
      y: line.first.y - point.y
    };

    let num = scalar(w, N);
    let den = scalar(pointDel, N);

    if (den === 0) {
      if (num < 0) {
        return;
      }

      continue;
    }

    let t = -num / den;
    if (den > 0) {
      tEnter = Math.max(tEnter, t);
    } else {
      tLeave = Math.min(tLeave, t);
    }

    boundaryPoint = point;
  }

  if (tEnter > tLeave) {
    return;
  }

  return {
    first: {
      x: line.first.x + delX * tEnter,
      y: line.first.y + delY * tEnter
    },
    second: {
      x: line.first.x + delX * tLeave,
      y: line.first.y + delY * tLeave
    }
  }
}

const drawLine = (x0, y0, x1, y1) => {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
};

const drawTestLine = (x0, y0, x1, y1, color) => {
  let start = [x0, y0];
  let end = [x1, y1];

  stack.push([start, end]);

  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);

  ctx.strokeStyle = `#${color}`;
  ctx.lineWdith = 1;
  ctx.stroke();
};

function deleteLine(start, end) {
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);

  ctx.strokeStyle = '#ffffff';

  ctx.lineWidth = 2;
  ctx.stroke();
}

drawLine(ax, ay, bx, by);
drawLine(bx, by, cx, cy);
drawLine(cx, cy, dx, dy);
drawLine(dx, dy, ex, ey);
drawLine(ex, ey, ax, ay);

drawTestLine(300, 300, 400, 400, 'ff0211');
drawTestLine(220, 100, 300, 150, 'ff0211');
drawTestLine(150, 300, 300, 280, 'ff0211');
drawTestLine(150, 250, 550, 400, 'ff0211');

document.addEventListener('keydown', event => {
  if (+event.keyCode === 39) {
    let endPoints = [];
    if (stack.length > 0) {
      endPoints = stack.pop();
    }

    clip(endPoints);
  }
});
