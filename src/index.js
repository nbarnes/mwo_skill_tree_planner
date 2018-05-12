
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import buildSkillTree from "./skill_tree";
import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import renderTree from "./render_tree.js";
import wireEvents from "./event_wiring.js";
import { loadFromRemoteId } from "./cold_storage.js";
import { findById, findByClass } from "./dom.js";
import insertAttributeColors from "./attribute_colors.js";

document.addEventListener("DOMContentLoaded", function() {

  let skillTree = buildSkillTree(treeSource);


  insertAttributeColors(attributeMap);
  renderTree(skillTree);
  wireEvents(skillTree);
  loadFromRemoteId(skillTree);
  PubSub.publish("toggleChassisWeight");
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

  findById("chassis-weight-toggle").addEventListener("click", function(event) {
    PubSub.publish("toggleChassisWeight");
  });

  findById("chassis-tech-toggle").addEventListener("click", function(event) {
    PubSub.publish("toggleChassisTech");
  });

  for (let node of findByClass(".graph-node")) {
    node.addEventListener("mouseenter", function(event) {
      PubSub.publish("nodeMouseEnter", {attribute: this.dataset.attribute, treeName: skillTree.getActiveTreeName()} );
    });
  }

  for (let node of findByClass(".graph-node")) {
    node.addEventListener("mouseleave", function(event) {
      PubSub.publish("nodeMouseLeft", {attribute: this.dataset.attribute, treeName: skillTree.getActiveTreeName()} );
    });
  }

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
