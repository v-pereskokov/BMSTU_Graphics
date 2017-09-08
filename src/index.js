import Canvas from './canvas/canvas';

const canvas = new Canvas();
const ctx = canvas.context;

const loadFileAsText = () => {
  const fileToLoad = document.querySelector('.fileToLoad').files[0];
  const fileReader = new FileReader();

  fileReader.addEventListener('load', fileLoadedEvent => {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    const isPaintArray = textFromFileLoaded.split('');

    for (let i in isPaintArray) {
      if (+isPaintArray[i] === 1) {
        paint(i, i);
      }
    }
  });

  fileReader.readAsText(fileToLoad, 'UTF-8');
};

const paint = (x, y) => {
  ctx.fillRect(x, y, 1, 1);
};

document.body.querySelector('.loadText').addEventListener('click', loadFileAsText.bind(this));
