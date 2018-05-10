
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

document.addEventListener("DOMContentLoaded", function() {

  let skillTree = buildSkillTree(treeSource);

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of Object.getOwnPropertyNames(attributeMap)) {

    // background
    // selected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute)}.selected .hex-component { background-color: ${ attributeMap[attribute].color }`);
    // unselected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute)} .hex-component { background-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.65) }`);

    // box shadow
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over.selected ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px ${ Util.shadeColor(attributeMap[attribute].color, 0.5) }; }`);
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over.selected ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px ${ Util.shadeColor(attributeMap[attribute].color, 0.5) }; }`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px ${ Util.shadeColor(attributeMap[attribute].color, 0.3) }; }`);
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px ${ Util.shadeColor(attributeMap[attribute].color, 0.3) }; }`);
    // illegal, mouse over
    colorizationStyles.insertRule(`#graph-view.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over.illegal ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px red; }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over.illegal ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px red; }`);

    // border
    // selected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.selected .hex-component ` +
      ` { border-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.6) }`);
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.selected.mouse-over .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.3) }`);
    // unselected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)} .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.75) }`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute)}.mouse-over .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attributeMap[attribute].color, -0.4) }`);

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
