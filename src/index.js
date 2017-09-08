import Canvas from './canvas/canvas';
import loadFileAsText from './helpers/loadAndPaint';
import draw from './helpers/draw';
import imageToFile from './helpers/imageToFile';

const canvas = new Canvas();
const ctx = canvas.context;

draw(canvas.canvas, ctx);

document.querySelector('.saveToFile').addEventListener('click', imageToFile.bind(this, canvas.canvas, ctx));
document.querySelector('.loadText')
  .addEventListener('click', loadFileAsText.bind(this, canvas.canvas, ctx));
