import Canvas from './canvas/canvas';
import Sobel from './sobel/sobel';

const toCanvases = (image) => {
  const plainCanvas = new Canvas('picture', '2d', {
    width: image.width,
    height: image.height
  });
  plainCanvas.context.drawImage(image, 0, 0);

  const sobel = new Sobel(plainCanvas.getPixel());

  const sobelCanvas = new Canvas('sobel', '2d', {
    width: image.width,
    height: image.height
  });
  sobelCanvas.context.putImageData(sobel.image, 0, 0);
};

document.querySelector('.file').addEventListener('change', event => {
  const reader = new FileReader();

  reader.addEventListener('load', event => {
    const image = new Image();

    image.addEventListener('load', () => {
      toCanvases(image);
    });

    image.addEventListener('error', () => {
      console.log('Can\'t open');
    });

    image.src = event.target.result
  });

  reader.readAsDataURL(event.target.files[0])
});
