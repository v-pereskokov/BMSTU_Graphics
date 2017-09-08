
const mouse = {
  x: 0,
  y: 0
};

const draw = (canvas, ctx) => {
  canvas.canvas.addEventListener('mousemove', event => {
    mouse.x = event.pageX - canvas.canvas.offsetLeft;
    mouse.y = event.pageY - canvas.canvas.offsetTop;
  });

  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#cc181c';

  canvas.canvas.addEventListener('mousedown', event => {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.canvas.addEventListener('mousemove', onPaint, false);
  });

  canvas.canvas.addEventListener('mouseup', () => {
    canvas.canvas.removeEventListener('mousemove', onPaint, false);
  });

  const onPaint = () => {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
};

export default draw;
