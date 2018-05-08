
"use strict";

export let saveToFile = function (rootNode) {
  domtoimage.toPng(document.getElementById('graph-view'))
  .then( dataUrl => {
    var img = new Image();
    img.src = dataUrl;
    document.getElementById('graph-view').appendChild(img);
  });
}

// export let saveToFile = function (rootNode) {
//   html2canvas(document.getElementById('graph-view'))
//   .then( canvas => {
//     document.getElementById('graph-view').appendChild(canvas);
//   });
// }
