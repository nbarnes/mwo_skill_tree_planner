
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import SkillTreeFactory from "./skill_tree";
import { stringToCss, dimensionAsNumber } from "./util.js";
import { PubSub } from "./pub_sub.js";

document.addEventListener("DOMContentLoaded", function() {

  let maxSkillNodes = 91;
  let cbillsPerNode = 60000;
  let xpPerNode = 800;

  let skillTree = SkillTreeFactory(treeSource);

  function buildUI(trees) {
    trees.forEach(function(tree, index) {
      buildTab(tree, index);
      buildTreeDisplay(tree);
    });
    updateNodeCounters();
    document.getElementById("node-total").textContent = maxSkillNodes;
  }

  buildUI(skillTree.getTrees());

  PubSub.subscribe("treeTabClicked", data => {
    changeSkillTree(data.treeName);
  });
  PubSub.subscribe("nodeClicked", data => nodeClicked(data.node));

  PubSub.subscribe("toggleNodeColorization", data => toggleNodeColorization());

  PubSub.publish("treeTabClicked", {treeName: skillTree.getTrees()[0].name});

  function buildTab(tree, index) {
    let tabHeight = 40; // matches element height defined in planner.css
    let topOffset = 50;
    let tabElement = document.createElement("div");
    tabElement.id = stringToCss(tree.name + "-tab");
    tabElement.classList.add("tab");
    tabElement.style.top = (40 * index) + 55 + "px";
    tabElement.textContent = tree.name;

    let counterElement = document.createElement("div");
    counterElement.id = tree.name.toLowerCase() + "-tab-counter";
    counterElement.classList.add("tab-counter");
    counterElement.textContent = "0 / " + skillTree.getNodeCount(tree.name);
    tabElement.appendChild(counterElement);

    tabElement.addEventListener("click", function() {
      PubSub.publish("treeTabClicked", {treeName: tree.name});
    });

    document.getElementById("total-nodes-display").after(tabElement);
  }

  function buildTreeDisplay(tree) {
    let treeElement = document.createElement("div");
    treeElement.id = treeNameToId(tree.name);
    treeElement.classList.add("skill-tree");
    treeElement.classList.add("hide");
    document.getElementById("graph-view").appendChild(treeElement);

    // TODO: need to do something here to sort the node array.  Probably search
    // it each time you add a node and add the children of that node to a queue
    // to be the next loaded

    let xOffset = 65;
    let yOffset = 38;
    var leftmostNodeElement = 0;
    var rightmostNodeElement = 0;

    let colorizationStylesElement = document.createElement('style');
    document.head.appendChild(colorizationStylesElement);
    let colorizationStyles = colorizationStylesElement.sheet;

    for (let node of tree.nodes) {
      let nodeFrameElement = buildNodeElement(node);

      // the first element in nodes is the root node, so it starts available
      if (node == tree.nodes[0])
        nodeFrameElement.querySelectorAll(".node-element").forEach(function(element) {
          element.classList.add("available");
        });
      else {
        nodeFrameElement.querySelectorAll(".node-element").forEach(function(element) {
          element.classList.add("unavailable");
        });
      }

      let parent = skillTree.parentsOf(node)[0];
      if (parent != undefined) {
        let relativeChildPostiion = getRelativeChildPosition(parent, node);
        let parentElement = document.getElementById(parent.id);

        let parentTop = dimensionAsNumber(parentElement.style.top);
        let parentLeft = dimensionAsNumber(parentElement.style.left);

        if (relativeChildPostiion == "left") {
          nodeFrameElement.style.top = parentTop + yOffset + "px";
          nodeFrameElement.style.left = parentLeft - xOffset + "px";
        } else if (relativeChildPostiion == "right") {
          nodeFrameElement.style.top = parentTop + yOffset + "px";
          nodeFrameElement.style.left = parentLeft + xOffset + "px";
        } else {
          nodeFrameElement.style.top = parentTop + (yOffset * 2) + "px";
          nodeFrameElement.style.left = parentLeft + "px";
        }
      } else {
        nodeFrameElement.style.top = "25px";
        nodeFrameElement.style.left = "26px";
      }

      let leftPosition = dimensionAsNumber(nodeFrameElement.style.left);
      if (leftPosition < leftmostNodeElement) {
        leftmostNodeElement = leftPosition;
      }
      if (leftPosition > rightmostNodeElement) {
        rightmostNodeElement = leftPosition;
      }

      colorizationStyles.insertRule(`#graph-view.colorize-nodes .hex-component.selected { background-color: ${ node.selectedColor }; }`);
      colorizationStyles.insertRule(`#graph-view.colorize-nodes .hex-component.available { background-color: ${ node.availableColor }; }`);
      colorizationStyles.insertRule(`#graph-view.colorize-nodes .hex-component.unavailable { background-color: ${ node.unavailabledColor }; }`);
      colorizationStyles.insertRule(`#graph-view.colorize-nodes .hex-component.locked { background-color: ${ node.lockedColor }; }`);

      treeElement.appendChild(nodeFrameElement);

      nodeFrameElement.addEventListener("click", function() {
        PubSub.publish("nodeClicked", {node: node});
      });

    }

    let nodeWidth = 52; // width of a graph node, per planner.css
    let padding = 25; // "padding" here rather than in css because "absolute" positioning of the
                      // node elements throws off alignment of css padding
    let treeWidth = rightmostNodeElement - leftmostNodeElement + nodeWidth + (padding * 2);
    treeElement.style.width = treeWidth + "px";
    document.getElementById(treeNameToId(tree.name)).querySelectorAll(".graph-node").forEach(function (el) {
      let newLeft = dimensionAsNumber(el.style.left) + (-leftmostNodeElement) + padding + "px";
      el.style.left = newLeft;
    });

    for (let node of tree.nodes) {
      let parentElement = document.getElementById(node.id);
      if (node.leftChildId != undefined) {
        let leftChildElement = document.getElementById(node.leftChildId);
        if (leftChildElement == null) {
          console.log("left child id results in null = " + node.leftChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, leftChildElement, treeElement);
        }
      }
      if (node.centerChildId != undefined) {
        let centerChildElement = document.getElementById(node.centerChildId);
        if (centerChildElement == null) {
          console.log("center child id results in null = " + node.centerChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, centerChildElement, treeElement);
        }
      }
      if (node.rightChildId != undefined) {
        let rightChildElement = document.getElementById(node.rightChildId);
        if (rightChildElement == null) {
          console.log("right child id results in null = " + node.rightChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, rightChildElement, treeElement);
        }
      }
    }
  }

  function buildNodeElement(node) {
    let nodeFrameElement = document.createElement("div");
    let hexTopElement = document.createElement("div");
    let nodeTextElement = document.createElement("div");
    let nodeValueElement = document.createElement("div");
    let hexBottomElement = document.createElement("div");

    nodeFrameElement.classList.add("node-element");
    hexTopElement.classList.add("node-element");
    nodeTextElement.classList.add("node-element");
    nodeValueElement.classList.add("node-element");
    hexBottomElement.classList.add("node-element");

    nodeFrameElement.classList.add("graph-node");
    nodeFrameElement.id = node.id;

    hexTopElement.classList.add("hex-top");
    hexTopElement.classList.add("hex-component");
    nodeTextElement.classList.add("hex-text");
    nodeValueElement.classList.add("hex-text");
    nodeValueElement.classList.add("hex-value");
    hexBottomElement.classList.add("hex-bottom");
    hexBottomElement.classList.add("hex-component");

    nodeTextElement.textContent = node.name;
    nodeValueElement.textContent = getValueTemplate(node.attribute)[0] + node.value + getValueTemplate(node.attribute)[1];

    nodeFrameElement.append(hexTopElement);
    nodeFrameElement.append(nodeTextElement);
    nodeFrameElement.append(nodeValueElement);
    nodeFrameElement.append(hexBottomElement);

    return nodeFrameElement;
  }

  function drawLineBetweenNodes(parentElement, childElement, treeElement) {
    let lineElement = document.createElement("div");
    lineElement.classList.add("node-connect-line");

    let parentX = dimensionAsNumber(parentElement.style.left);
    let parentY = dimensionAsNumber(parentElement.style.top);
    let childX = dimensionAsNumber(childElement.style.left);
    let childY = dimensionAsNumber(childElement.style.top);

    lineElement.style.width = childY - parentY + 15 + "px";

    let midX = (parentX + childX) / 2;
    let midY = (parentY + childY) / 2;

    let angle  = (Math.atan2(parentY - childY, parentX - childX) * 180 / Math.PI) + 180;
    let transform = "rotate(" + (angle) + "deg)";

    lineElement.style.transform = transform;
    lineElement.style.top = (parentY + 26) + "px";
    lineElement.style.left = (parentX + 26) + "px";

    treeElement.appendChild(lineElement);
  }

  function getRelativeChildPosition(parent, child) {
    if (parent.leftChildId == child.id) {
      return "left";
    } else if (parent.centerChildId == child.id) {
      return "center";
    } else if (parent.rightChildId == child.id) {
      return "right";
    }
    return "child not found in getRelativeChildPosition()"
  }

  function nodeClicked(node) {
    if (node.selected) {
      attemptNodeDeselection(node);
    } else {
      if (nodeAvailableForSelection(node) && (skillTree.getSelectedNodes().length < maxSkillNodes)) {
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
      bonusDisplayElement.textContent = bonus.attribute + " " + getValueTemplate(bonus.attribute)[0] + bonus.value + getValueTemplate(bonus.attribute)[1];
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

  function getValueTemplate(attribute) {
    const template = attributeMap[attribute].template.split("{}");
    return [ template[0], template[1] ];
  }

  function changeSkillTree(treeName) {
    skillTree.setActiveTreeName(treeName);
    document.querySelectorAll(".tab").forEach(function (el) {
      el.classList.remove("selected");
    });
    getTabForTreeName(treeName).classList.add("selected");

    document.querySelectorAll(".skill-tree").forEach(function (el) {
      el.classList.add("hide");
    });
    let treeElement = document.getElementById(treeNameToId(treeName));
    treeElement.classList.remove("hide");
    let treeDisplayWidth = dimensionAsNumber(treeElement.style.width);
    let totalWidth = (treeDisplayWidth + 294) + "px"
    document.getElementById("modal-overlay").style.width = totalWidth;
    document.getElementById("footer").style.width = totalWidth;
  }

  function getTabForTreeName(treeName) {
    return document.getElementById(stringToCss(treeName) + "-tab");
  }

  function treeNameToId(treeName) {
     return stringToCss(treeName) + "-skill-tree";
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
    let availableNodes = maxSkillNodes - skillTree.getSelectedNodes().length;
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
