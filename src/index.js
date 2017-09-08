import Canvas from './canvas/canvas';
import loadFileAsText from './helpers/loadAndPaint';

const canvas = new Canvas();
const ctx = canvas.context;

const paint = (x, y) => {
  ctx.fillRect(x, y, 1, 1);
};

document.body.querySelector('.loadText').addEventListener('click', loadFileAsText.bind(this, paint.bind(this)));
