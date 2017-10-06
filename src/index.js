import Canvas from './canvas/canvas';
import * as constansts from './constant/constant';

const drawButton = document.querySelector('.draw');

const canvas = new Canvas('picture', '2d', {
  width: constansts.WIDTH,
  height: constansts.HEIGHT
});
const ctx = canvas.context;

ctx.fillStyle = constansts.SQUARE_COLOR;

ctx.lineWidth = 1;
ctx.strokeStyle = '#cc181c';

drawButton.addEventListener('click', () => {
  const x0 = document.getElementsByName('circle-x0')[0].value;
  const y0 = document.getElementsByName('circle-y0')[0].value;
  const r = document.getElementsByName('circle-r')[0].value;

  drawCircle(+x0, +y0, +r);
});

function drawCircle(x0, y0, r) {
  let Z = 0;
  let x = 0;
  let y = r;

  while (x <= y) {
    setPixel(x0 - x, y0 - y);
    setPixel(x0 - x, y0 + y);

    setPixel(x0 + x, y0 - y);
    setPixel(x0 + x, y0 + y);

    setPixel(x0 - y, y0 - x);
    setPixel(x0 - y, y0 + x);

    setPixel(x0 + y, y0 - x);
    setPixel(x0 + y, y0 + x);

    if (Z > 0) {
      --y;
      Z -= 2 * y;
    }

    ++x;
    Z += 2 * x;
  }
}

function setPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}
