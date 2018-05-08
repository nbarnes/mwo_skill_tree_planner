
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import buildSkillTree from "./skill_tree";
import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import renderTree from "./render_tree.js";
import wireEvents from "./event_wiring.js";
import { loadFromRemoteId } from "./cold_storage.js"

document.addEventListener("DOMContentLoaded", function() {

  let skillTree = buildSkillTree(treeSource);

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of Object.getOwnPropertyNames(attributeMap)) {
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.selected { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.locked { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.available { background-color: hsl(${ attributeMap[attribute].hue }, 90%, 70%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.unavailable { background-color: hsl(${ attributeMap[attribute].hue }, 90%, 70%); }`);
  }

  renderTree(skillTree);
  wireEvents(skillTree);
  loadFromRemoteId(skillTree);
  PubSub.publish("treeTabClicked", {treeName: skillTree.getTrees()[0].name});

  PubSub.subscribe("toggleNodeColorization", data => toggleNodeColorization());

  document.getElementById("reset-tree-button").addEventListener("click", () => {
    PubSub.publish("resetActiveTree", {treeName: skillTree.getActiveTreeName()});
  });

  document.getElementById("reset-all-button").addEventListener("click", () => {
    PubSub.publish("resetAllTrees");
  });

  document.getElementById("select-tree-button").addEventListener("click", () => {
    PubSub.publish("selectTree", {treeName: skillTree.getActiveTreeName()});
  });

  document.getElementById("permalink-button").addEventListener("click", () => {
    PubSub.publish("getPermalink", {skillTree: skillTree} );
  });

  document.getElementById("permalink-display").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  document.getElementById("modal-overlay").addEventListener("click", function() {
    let closeable = document.getElementById("modal-overlay").getAttribute("data-closeable");
    if (closeable == "true") {
      document.getElementById("modal-overlay").classList.add("hide");
    }
  });

  document.getElementById("colorize-nodes-button").addEventListener("click", function(event) {
    PubSub.publish("toggleNodeColorization");
  });

  function toggleNodeColorization() {
    document.getElementById("graph-view").classList.toggle("colorize-nodes");
  }

});
