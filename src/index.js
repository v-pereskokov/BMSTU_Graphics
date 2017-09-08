import Canvas from './canvas/canvas';
import loadFileAsText from './helpers/loadAndPaint';
import draw from './helpers/draw';
import imageToFile from './helpers/imageToFile';

const canvas = new Canvas();
const ctx = canvas.context;

const paint = (x, y) => {
  ctx.fillRect(x, y, 1, 1);
};

document.querySelector('.saveToFile').addEventListener('click', imageToFile.bind(this, ctx));

draw(canvas, ctx);

document.body.querySelector('.loadText').addEventListener('click', loadFileAsText.bind(this, paint.bind(this)));
