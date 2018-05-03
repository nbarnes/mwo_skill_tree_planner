
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import SkillTreeFactory from "./skill_tree";
import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import InterfaceBuilder from "./render_tree.js";

document.addEventListener("DOMContentLoaded", function() {

  let cbillsPerNode = 60000;
  let xpPerNode = 800;

  let skillTree = SkillTreeFactory(treeSource);

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;

  for (let attribute of Object.getOwnPropertyNames(attributeMap)) {
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.selected { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 80%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.locked { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 80%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.available { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.unavailable { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
  }

  InterfaceBuilder(skillTree);

  PubSub.subscribe("treeTabClicked", data => {
    changeSkillTree(data.treeName);
  });

  PubSub.subscribe("nodeClicked", data => nodeClicked(data.node));

  PubSub.subscribe("toggleNodeColorization", data => toggleNodeColorization());

  PubSub.publish("treeTabClicked", {treeName: skillTree.getTrees()[0].name});

  function nodeClicked(node) {
    if (node.selected) {
      attemptNodeDeselection(node);
    } else {
      if (nodeAvailableForSelection(node) && (skillTree.getSelectedNodes().length < Util.maxSkillNodes)) {
        node.selected = true;
      }
    }
    updateNodeColors(skillTree.getActiveTreeName());
    updateNodeCounters(skillTree.getActiveTreeName());
    updateBonuses();
    revertURL();
  }

  function updateNodeColors(treeName) {
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        updateNodeColors(tree.name);
      }
    } else {
      let tree = skillTree.getTree(treeName);
      for (let node of tree.nodes) {
        updateNodeColor(node);
      }
    }
  }

  function attemptNodeDeselection(node) {
    if (safeToDeselect(node)) {
      node.selected = false;
      updateNodeColor(node);
    }
    for (let child of skillTree.childrenOf(node)) {
      updateNodeColor(child);
    }
    for (let parent of skillTree.parentsOf(node)) {
      updateNodeColor(parent);
    }
  }

  function updateNodeColor(node) {
    if (node.selected) {
      if (safeToDeselect(node)) {
        setNodeElementColors(node, "selected");
      } else {
        setNodeElementColors(node, "locked");
      }
    } else {
      if (nodeAvailableForSelection(node)) {
        setNodeElementColors(node, "available");
      } else {
        setNodeElementColors(node, "unavailable");
      }
    }
  }

  function safeToDeselect(node) {
    var safeToDeselect = true;
    for (let child of skillTree.childrenOf(node)) {
      if (child.selected) {
        // Set node in question to deselected to see if the chlid is still elegible for selection
        // based on other parents.  We"ll set it back to selected after we"re done with that check.
        node.selected = false;
        safeToDeselect = nodeAvailableForSelection(child) && safeToDeselect;
        node.selected = true;
      }
    }
    return safeToDeselect;
  }

  function nodeAvailableForSelection(node) {
    var parentIsSelected = false;
    for (let parent of skillTree.parentsOf(node)) {
      parentIsSelected = parent.selected || parentIsSelected;
    }
    parentIsSelected = parentIsSelected || (skillTree.parentsOf(node).length === 0);
    return parentIsSelected;
  }

  function setNodeElementColors(node, state) {
    document.getElementById(node.id).querySelectorAll(".node-element").forEach(function(element) {
      removeNodeClasses(element);
      element.classList.add(state);
    });
  }

  function updateNodeDisplay(treeName) {
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        updateNodeDisplay(tree.name);
      }
    } else {
      for (let node of skillTree.getTres(treeName).nodes) {
        updateNodeColor(node);
      }
    }
  }

  function updateNodeCounters(treeName) {
    let totalNodesSelected = skillTree.getSelectedNodes().length;
    document.getElementById("node-selection-counter").textContent = totalNodesSelected;
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        updateNodeCounters(tree.name);
      }
    } else {
      let tab = document.getElementById(treeName.toLowerCase() + "-tab-counter");
      let nodesSelected = skillTree.getSelectedNodes(treeName).length;
      let nodesTotal = skillTree.getNodeCount(treeName);
      tab.textContent = nodesSelected + " / " + nodesTotal;
    }
    let totalCbillCost = (totalNodesSelected * cbillsPerNode).toLocaleString("en-US") + " C-Bills and";
    let totalXpCost = (totalNodesSelected * xpPerNode).toLocaleString("en-US") + " XP / GXP";
    document.getElementById("cost-totals-display").innerHTML = totalCbillCost + "</br>" + totalXpCost;
  }

  function updateBonuses() {
    let bonuses = [];
    let nodes = skillTree.getSelectedNodes();
    for (let node of nodes) {
      let bonusForAttribute = getBonusForAttribute(bonuses, node.attribute);
      if (bonusForAttribute != undefined) {
        bonusForAttribute.value = ((bonusForAttribute.value * 10) + (node.value * 10)) / 10;
      } else {
        bonuses.push({attribute: node.attribute, value: node.value, valueTemplate: node.valueTemplate});
      }
    }
    document.getElementById("bonuses-display").innerHTML = "";
    let bonusFrame = document.createDocumentFragment();
    bonuses.forEach((bonus, index) => {
      let bonusDisplayElement = document.createElement("div");
      bonusDisplayElement.classList.add("bonus-display");
      bonusDisplayElement.textContent = bonus.attribute + " " + Util.getValueTemplate(bonus.attribute)[0] + bonus.value + Util.getValueTemplate(bonus.attribute)[1];
      bonusFrame.append(bonusDisplayElement);
    });
    document.getElementById("bonuses-display").append(bonusFrame);
    if (document.getElementById("bonuses-display").offsetHeight > 560) {
      document.querySelectorAll(".bonus-display").forEach(function (el) {
        el.style.fontSize= "12px";
      });
    }
  }

  function getBonusForAttribute(bonuses, attribute) {
    for (let bonus of bonuses) {
      if (bonus.attribute == attribute) {
        return bonus;
      }
    }
  }

  function changeSkillTree(treeName) {
    skillTree.setActiveTreeName(treeName);
    document.querySelectorAll(".treeTab").forEach(function (el) {
      el.classList.remove("selected");
    });
    getTabForTreeName(treeName).classList.add("selected");

    document.querySelectorAll(".skill-tree").forEach(function (el) {
      el.classList.add("hide");
    });
    let treeElement = document.getElementById(Util.treeNameToId(treeName));
    treeElement.classList.remove("hide");
    let treeDisplayWidth = Util.dimensionAsNumber(treeElement.style.width);
    let totalWidth = (treeDisplayWidth + 294) + "px"
    document.getElementById("modal-overlay").style.width = totalWidth;
    document.getElementById("footer").style.width = totalWidth;
  }

  function getTabForTreeName(treeName) {
    return document.getElementById(Util.stringToCss(treeName) + "-tab");
  }

  function removeNodeClasses(nodeElement) {
    nodeElement.classList.remove("selected");
    nodeElement.classList.remove("available");
    nodeElement.classList.remove("locked");
    nodeElement.classList.remove("unavailable");
  }

  document.getElementById("reset-tree-button").addEventListener("click", () => {
    PubSub.publish("resetActiveTree", {treeName: skillTree.getActiveTreeName()});
  });

  PubSub.subscribe("resetActiveTree", data => {
    resetTree(data.treeName);
  });

  document.getElementById("reset-all-button").addEventListener("click", () => {
    PubSub.publish("resetAllTrees", {});
  });

  PubSub.subscribe("resetAllTrees", data => {
    for (let tree of skillTree.getTrees()) {
      resetTree(tree.name);
    }
  });

  document.getElementById("select-tree-button").addEventListener("click", () => {
    PubSub.publish("selectEntireTree", {treeName: skillTree.getActiveTreeName()});
  });

  PubSub.subscribe("selectEntireTree", data => {
    selectAllNodes(data.treeName);
  });

  function resetTree(treeName) {
    let tree = skillTree.getTree(treeName);
    for (let node of tree.nodes) {
      node.selected = false;
    }
    updateNodeCounters(treeName);
    updateBonuses();
    updateNodeColors(treeName);
    revertURL();
  }

  function selectAllNodes(treeName) {
    let availableNodes = Util.maxSkillNodes - skillTree.getSelectedNodes().length;
    let tree = skillTree.getTree(treeName);
    if (availableNodes > tree.nodes.length) {
      for (let node of tree.nodes) {
        node.selected = true;
      }
      updateNodeCounters(treeName);
      updateBonuses();
      updateNodeColors(treeName);
      revertURL();
    }
  }

  function loadFromRemoteId() {
    let regex = /([^//?]*)$/;
    let remoteId = regex.exec(window.location.href)[1];

    if ((remoteId != undefined) && (remoteId !== "")) {
      setModalCloseability(false);
      document.getElementById("modal-overlay").classList.remove("hide");
      document.getElementById("permalink-display").textContent = "Reactor online, weapons online, sensors online....";

      fetch("https://jsonblob.com/api/jsonBlob/" + remoteId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error response - " + response);
        }
      })
      .then(function(json) {
        importTrees(json["trees"]);
        updateNodeCounters();
        updateBonuses();
        updateNodeColors();
        changeSkillTree(json["activeTreeName"]);
        document.getElementById("modal-overlay").classList.add("hide");
      });

    }
  }

  document.getElementById("permalink-button").addEventListener("click", () => {
    PubSub.publish("GetPermalink");
  });

  PubSub.subscribe("GetPermalink", (data) => {
    setModalCloseability(false);
    document.getElementById("permalink-display").textContent = "Permalink inbound on your position.";
    document.getElementById("modal-overlay").classList.remove("hide");
    fetch("https://jsonblob.com/api/jsonBlob", {
      method: "POST",
      body: serializeTrees(),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      let regex = /([^//]*)$/;
      let remoteId = regex.exec(response.headers.get("location"))[0];
      document.getElementById("permalink-display").textContent = pushRemoteIdToURL(remoteId);
      document.getElementById("modal-overlay").classList.remove("hide");
      setModalCloseability(true);
    }, function(error) {
      console.log(error.message);
      setModalCloseability(true);
    });
  });

  function serializeTrees() {
    let trees = skillTree.getTrees();
    let serializedTrees = {};
    serializedTrees.trees = [];
    serializedTrees.activeTreeName = skillTree.getActiveTreeName();
    for (let tree of trees) {
      let serializedTree = {
        name: tree.name,
        nodes: []
      }
      for (let node of tree.nodes) {
        serializedTree.nodes.push(serializeNode(node));
      }
      serializedTrees.trees.push(serializedTree);
    }
    return JSON.stringify(serializedTrees);
  }

  function serializeNode(node) {
    let s;
    if (node.selected) {
      s = 1;
    } else {
      s = 0;
    }
    return {
      id: node.id,
      s: s
    }
  }

  function importTrees(serializedTrees) {
    for (let serializedTree of serializedTrees) {
      let tree = skillTree.getTree(serializedTree.name);
      let serializedNodes = serializedTree.nodes;
      for (let serializedNode of serializedNodes) {
        for (let node of tree.nodes) {
          if (serializedNode.id == node.id) {
            if (serializedNode.s == 1) {
              node.selected = true;
            } else {
              node.selected = false;
            }
          }
        }
      }
    }
  }

  function pushRemoteIdToURL(remoteId) {
    let remoteURL = window.location.origin + window.location.pathname + "?" + remoteId
    history.pushState({}, "", remoteURL);
    return remoteURL;
  }

  function revertURL() {
    history.pushState({}, "", window.location.origin + window.location.pathname);
  }

  // takes a boolean
  function setModalCloseability(closeability) {
      document.getElementById("modal-overlay").setAttribute("data-closeable", closeability.toString());
  }

  document.getElementById("modal-overlay").addEventListener("click", function() {
    let closeable = document.getElementById("modal-overlay").getAttribute("data-closeable");
    if (closeable == "true") {
      document.getElementById("modal-overlay").classList.add("hide");
    }
  });

  document.getElementById("permalink-display").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  loadFromRemoteId();

  document.getElementById("colorize-nodes-button").addEventListener("click", function(event) {
    PubSub.publish("toggleNodeColorization");
  });

  function toggleNodeColorization() {
    document.getElementById("graph-view").classList.toggle("colorize-nodes");
  }

});
