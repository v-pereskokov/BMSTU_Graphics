const canvas = document.querySelector('.picture');
const ctx = canvas.getContext('2d');

const size = 40;

ctx.fillStyle = '#00aa00';
ctx.fillRect(size, size, size, size);

canvas.addEventListener('click', event => {
  ctx.fillRect(event.offsetX, event.offsetY, 1, 1);

  ctx.fillStyle = '#000000';

  for (let i = 0; i < size; ++i) {
    ctx.fillRect(i + size, i + size, 1, 1);
  }
});
