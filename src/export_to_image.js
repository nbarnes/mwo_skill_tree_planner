
"use strict";

import domtoimage from 'dom-to-image';
import { treeSource } from "./tree_source";
import { findById } from "./dom.js";
import { treeNameToId } from "./util.js";

export let saveToFile = function (rootNode) {

  let treeView = buildTreeView();
  document.body.appendChild(treeView);
  domtoimage.toJpeg(treeView, { quality: 0.9 } )
  .then( dataUrl => {
    document.body.removeChild(treeView);

    // let image = new Image();
    // image.src = dataUrl;
    // document.body.appendChild(image);

    var link = document.createElement('a');
    link.download = 'skill_tree';
    link.href = dataUrl;
    link.click();


  });


}

function buildTreeView() {

  let treesView = findById("trees-view-template").content.cloneNode(true).firstElementChild;

  for (let tree of treeSource) {
    let labeledTree = findById("labeled-tree-template").content.cloneNode(true).firstElementChild;
    labeledTree.querySelector('.tree-label').textContent = tree.treeName;
    let treeElement = findById(treeNameToId(tree.treeName)).cloneNode(true);
    treeElement.id = '';
    treeElement.classList.remove('hide');
    labeledTree.appendChild(treeElement);
    treesView.appendChild(labeledTree);
  }

  return treesView;

}
