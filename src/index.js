import Canvas from './canvas/canvas';
import * as constants from './constant/constant';

const canvas = new Canvas();
const ctx = canvas.context;

ctx.fillStyle = constants.SQUARE_COLOR;
ctx.fillRect(0, 0, constants.SQUARE_SIZE, constants.SQUARE_SIZE);

function loadFileAsText() {
  const fileToLoad = document.querySelector('.fileToLoad').files[0];

  const fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;

    console.log(textFromFileLoaded);
  };
  fileReader.readAsText(fileToLoad, 'UTF-8');
}

document.body.querySelector('.loadText').addEventListener('click', loadFileAsText.bind(this));
