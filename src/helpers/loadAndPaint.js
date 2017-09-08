const loadFileAsText = (callback) => {
  const fileToLoad = document.querySelector('.fileToLoad').files[0];
  const fileReader = new FileReader();

  fileReader.addEventListener('load', fileLoadedEvent => {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    const isPaintArray = textFromFileLoaded.split('');

    const arrayArray = [[]];

    for (let i = 0; i < 100; ++i) {
      for (let j = 0; j < 100; ++j) {
        arrayArray[i].push(isPaintArray[j]);
      }
    }

    for (let i = 0; i < 100; ++i) {
      for (let j = 0; j < 100; ++j) {
        if (+arrayArray[i][j] === 1) {
          callback(i, j);
        }
      }
    }
  });

  fileReader.readAsText(fileToLoad, 'UTF-8');
};

export default loadFileAsText;
