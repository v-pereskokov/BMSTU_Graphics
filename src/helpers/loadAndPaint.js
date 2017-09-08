const loadFileAsText = (callback) => {
  const fileToLoad = document.querySelector('.fileToLoad').files[0];
  const fileReader = new FileReader();

  fileReader.addEventListener('load', fileLoadedEvent => {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    const isPaintArray = textFromFileLoaded.split('');

    for (let i in isPaintArray) {
      if (+isPaintArray[i] === 1) {
        callback(i, i);
      }
    }
  });

  fileReader.readAsText(fileToLoad, 'UTF-8');
};

export default loadFileAsText;
