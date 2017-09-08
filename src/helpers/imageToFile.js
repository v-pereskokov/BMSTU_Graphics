import * as constants from '../constant/constant';

const imageToFile = (canvas, ctx) => {
  const img = ctx.getImageData(0, 0, constants.SQUARE_SIZE, constants.SQUARE_SIZE).data;
  let textImg = '';

  for (let i = 3; i < img.length; i += 4) {
    textImg += img[i] ? '1' : '0';
  }

  const textFile = new Blob([textImg], {type: 'text/plain'});
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

export default imageToFile;
