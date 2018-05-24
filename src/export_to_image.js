"use strict";

import domtoimage from 'dom-to-image';
import { findById } from "./dom.js";

export let saveToFile = function (rootNode) {
  // domtoimage.toPng(findById('graph-view'))
  domtoimage.toJpeg(findById('graph-view'), { quality: 0.7 })
  .then( dataUrl => {

    // var img = new Image();
    // img.src = dataUrl;
    // findById('graph-view').appendChild(img);

    var link = document.createElement('a');
    link.download = 'skilltree.jpeg';
    link.href = dataUrl;
    link.click();

  });
}
