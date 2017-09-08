const resultArray = [];

const imageToFile = (ctx) => {
  let pixel = null;

  for (let i = 0; i < 100; ++i) {
    for (let j = 0; j < 100; ++j) {
      pixel = ctx.getImageData(i, j, 1, 1).data;

      if (+pixel[0] === 0 && +pixel[1] === 0 && +pixel[2] === 0) {
        pushToResult(true);
      } else {
        pushToResult(false);
      }
    }
  }

  const resultString = resultArray.join('');

  const textFile = new Blob([resultString], {type: 'text/plain'});
  const defaultFileName = 'top.txt';

  const downloadLink = document.createElement('a');
  downloadLink.download = defaultFileName;
  downloadLink.innerHTML = 'Download File';

  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFile);
  }
  else {
    downloadLink.href = window.URL.createObjectURL(textFile);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
};


const destroyClickedElement = event => {
  document.body.removeChild(event.target);
};

const pushToResult = (isPaint) => {
  resultArray.push(isPaint ? 1 : 0);
};

export default imageToFile;
