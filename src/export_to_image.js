
"use strict";

import domtoimage from 'dom-to-image';
import { treeSource } from "./tree_source";
import { findById } from "./dom.js";
import { treeNameToId } from "./util.js";

export let saveToFile = function (rootNode) {

  domtoimage.toPng(findById('graph-view'))
  // domtoimage.toJpeg(findById('graph-view'), { quality: 0.7 })
  .then( dataUrl => {

    var img = new Image();
    img.src = dataUrl;
    findById('graph-view').appendChild(img);

  // var link = document.createElement('a');
  // link.download = 'skill_tree.jpeg';
  // link.href = dataUrl;
  // link.click();

  });

  // findById('graph-view').appendChild( buildTreeView() );

}

function buildTreeView() {

  let treeView = findById("tree-view-template").content.cloneNode(true).firstElementChild;
  treeView.id = 'tree-view';

  for (let tree of treeSource) {
    let treeElement = findById(treeNameToId(tree.treeName)).cloneNode(true);
    treeElement.id = '';
    treeElement.classList.remove('hide');
    treeView.appendChild(treeElement);
  }

  return treeView;

}
