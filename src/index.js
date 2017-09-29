import Canvas from './canvas/canvas';
import Sobel from './sobel/sobel';
import Median from './median/median';
import * as constansts from './constant/constant';

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

    image.src = event.target.result;
  });

  reader.readAsDataURL(event.target.files[0]);
});

const startImage = new Image();
startImage.src = constansts.IMAGE_URL;

startImage.addEventListener('load', () => {
  toCanvases(startImage);
});

let filterEffect = new Median();

let timer = 0.0, pixels = 1.0;

window.onload = function () {
  loadDefaultImage();
};

function loadDefaultImage() {
  let img = new Image;
  img.onload = function () {
    fileReady(img);
  };
  img.onerror = function () {
    alert('Failed to load image.');
  };
  img.src = 'static/test.png';
}

function addFile(file) {
  let img = new Image;
  img.onload = function () {
    fileReady(img);
  };
  img.src = URL.createObjectURL(file);
}


function fileReady(img) {
  let canvas = document.querySelector('.picture');
  let context = canvas.getContext('2d');

  let ratio = 1.0, w = img.width, h = img.height;
  canvas.width = w;
  canvas.height = h;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, w, h);

  let imageData;
  try {
    imageData = context.getImageData(0, 0, w, h);
  } catch (e) {
    alert(e);
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.putImageData(
    filterEffect.convertImage(imageData, w, h),
    0, 0);
}
