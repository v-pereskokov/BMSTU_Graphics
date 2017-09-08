import * as constants from '../constant/constant';

const loadFileAsText = (canvas, ctx) => {
  const fileToLoad = document.querySelector('.fileToLoad').files[0];
  const fileReader = new FileReader();

  fileReader.addEventListener('load', fileLoadedEvent => {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    const isPaintArray = textFromFileLoaded.split('');

    for (let i in isPaintArray) {
      if (+isPaintArray[i]) {
        paint(ctx, i % canvas.width, i / canvas.width);
      }
    }
  });

  fileReader.readAsText(fileToLoad, 'UTF-8');
};

const paint = (ctx, x, y) => {
  ctx.fillRect(x, y, constants.PIXEL_SIZE, constants.PIXEL_SIZE);
};

export default loadFileAsText;
