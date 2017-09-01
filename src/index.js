const canvas = document.querySelector('.picture');
const ctx = canvas.getContext('2d');

const size = 10;

ctx.fillStyle = '#00aa00';
ctx.fillRect(10, 10, 10, 10);

ctx.fillStyle = '#000000';

for (let i = 0; i < size; ++i) {
  ctx.fillRect(i + 10, i + 10, 1, 1);
}
