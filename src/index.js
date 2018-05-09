
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import buildSkillTree from "./skill_tree";
import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import renderTree from "./render_tree.js";
import wireEvents from "./event_wiring.js";
import { loadFromRemoteId } from "./cold_storage.js";
import { findById } from "./dom.js";

document.addEventListener("DOMContentLoaded", function() {

  let skillTree = buildSkillTree(treeSource);

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of Object.getOwnPropertyNames(attributeMap)) {
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)}.selected .hex-component { background-color: ${ attributeMap[attribute].color }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component { background-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.65) }`);
  }

  renderTree(skillTree);
  wireEvents(skillTree);
  loadFromRemoteId(skillTree);
  PubSub.publish("treeTabClicked", {treeName: skillTree.getTrees()[0].name});

  findById("reset-tree-button").addEventListener("click", () => {
    PubSub.publish("resetActiveTree", {treeName: skillTree.getActiveTreeName()});
  });

  findById("reset-all-button").addEventListener("click", () => {
    PubSub.publish("resetAllTrees");
  });

  findById("select-tree-button").addEventListener("click", () => {
    PubSub.publish("selectTree", {treeName: skillTree.getActiveTreeName()});
  });

  findById("permalink-button").addEventListener("click", () => {
    PubSub.publish("getPermalink", {skillTree: skillTree} );
  });

  findById("colorize-nodes-button").addEventListener("click", function(event) {
    PubSub.publish("toggleNodeColorization");
  });

  findById("permalink-display").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  findById("modal-overlay").addEventListener("click", function() {
    let closeable = findById("modal-overlay").getAttribute("data-closeable");
    if (closeable == "true") {
      findById("modal-overlay").classList.add("hide");
    }
  });

});
