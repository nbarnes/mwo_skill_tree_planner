
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import buildSkillTree from "./skill_tree";
import { debounce, dimensionAsNumber, stringToCss } from "./util.js";
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
  PubSub.publish("toggleChassisTech");
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

  var lastTooltipTarget = undefined;
  findById("graph-view").addEventListener("mousemove", function(event) {
    let tooltip = findById('tooltip');
    let node = event.target.closest('.graph-node');
    if (node == undefined || node != lastTooltipTarget) {
      tooltip.classList.remove('full-tooltip');
      tooltip.classList.add('zero-tooltip');
    }
    debouncedMouseMove(tooltip, node, event);
    lastTooltipTarget = node;
  });

  var debouncedMouseMove = debounce(function(tooltip, node, event) {
    if (node != undefined) {
      styleTooltip(tooltip, node, event);
      setTimeout(() => {
        tooltip.classList.remove('zero-tooltip');
        tooltip.classList.add('full-tooltip');
      }, 10);
    }
  }, 800);

  function styleTooltip(tooltip, nodeElement, event) {
    tooltip.style.top = dimensionAsNumber(nodeElement.style.top) + 50 +"px";
    tooltip.style.left = dimensionAsNumber(nodeElement.style.left) + 202 + "px";
    let attribute = getAttribute(nodeElement.dataset.attribute);
    tooltip.classList.remove(tooltip.dataset.attribute);
    tooltip.classList.add(nodeElement.dataset.attribute);
    tooltip.dataset.attribute = nodeElement.dataset.attribute;
    let node = skillTree.getNode(nodeElement.id);
    findById("tooltip-name-bar").textContent = node.name;
    findById("tooltip-description").textContent = attribute.description;
  }

  function getAttribute(attributeCss) {
    for (let attribute of attributeMap) {
      if (stringToCss(attribute.name) == attributeCss) {
        return attribute;
      }
    }
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
