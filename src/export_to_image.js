
"use strict";

import domtoimage from 'dom-to-image';
import { treeSource } from "./tree_source";
import { findById } from "./dom.js";
import { treeNameToId } from "./util.js";

export let saveToFile = function (rootNode) {

  let treeView = buildTreeView();
  document.body.appendChild(treeView);
  domtoimage.toPng(treeView)
  .then( dataUrl => {
    document.body.removeChild(treeView);
    var link = document.createElement('a');
    link.download = 'skill_tree';
    link.href = dataUrl;
    link.click();
  });

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
