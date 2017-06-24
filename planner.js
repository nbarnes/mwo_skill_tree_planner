import { treeSource, attributeTemplateMap } from "./tree.js"
import { Node, selectNode, highlightNode, markAsAttachedRecursively, updateNodeColor, nodeAvailableForSelection, safeToDeselect, highlightedNodesArray, detachedNodesCounter } from "./node.js"

export var allowFreeNodeSelection = true;
var displayAllBonuses = false;

export function detachedNodesCounterUpdated() {
  if (detachedNodesCounter > 0) {
    document.getElementById("deselect-detached-nodes-button").classList.remove("hide");
  } else {
    document.getElementById("deselect-detached-nodes-button").classList.add("hide");
  }
}

document.addEventListener("DOMContentLoaded", function() {

  let maxSkillNodes = 91;
  let cbillsPerNode = 45000;
  let xpPerNode = 800;

  let SkillTree = (function() {

    var activeTreeName = treeSource[0].name;
    let skillTrees = buildSkillTrees(treeSource);

    function buildSkillTrees(treeSource) {
      let skillTrees = [];
      for (let treeDef of treeSource) {
        let skillTree = {}
        skillTree.name = treeDef.name;
        skillTree.nodes = [];
        for (let nodeDef of treeDef.nodes) {
          skillTree.nodes.push(new Node(nodeDef.name,
                                        nodeDef.attribute,
                                        parseFloat(nodeDef.value),
                                        nodeDef.valueTemplate,
                                        nodeNameToId(nodeDef.name),
                                        nodeDef.leftChildId,
                                        nodeDef.centerChildId,
                                        nodeDef.rightChildId
                              ));
        }
        let rootNode = skillTree.nodes[0];
        buildDependences(skillTree.nodes, rootNode);
        skillTrees.push(skillTree);
      }
      return skillTrees;
    }
    
    function buildDependences(nodesList, currentNode) {

      var childrenQuantity = 0;
      {
        if (currentNode.leftChildId != undefined) {
          ++childrenQuantity;
        }
        if (currentNode.centerChildId != undefined) {
          ++childrenQuantity;
        }
        if (currentNode.rightChildId != undefined) {
          ++childrenQuantity;
        }
      }

      for (let subnode of nodesList) {
        if (currentNode.children.length == childrenQuantity) {
          break;
        }
        if(subnode.id == currentNode.leftChildId || subnode.id == currentNode.centerChildId || subnode.id == currentNode.rightChildId) {
          currentNode.children.push(subnode);
          subnode.parents.push(currentNode);
          
          buildDependences(nodesList, subnode);
        }
      }
    }

    function setActiveTreeName(newName) {
      activeTreeName = newName;
    }

    function getActiveTreeName() {
      return activeTreeName;
    }

    function getTree(treeName) {
      for (let tree of trees) {
        if (tree.name = treeName) {
          return tree;
        }
      }
    }

    function getTrees() {
      return skillTrees;
    }

    function getTree(treeName) {
      if (treeName == undefined) {
        return getTree(activeTreeName);
      } else {
        for (let tree of skillTrees) {
          if (tree.name == treeName) {
            return tree;
          }
        }
      }
    }

    function getNode(nodeId) {
      for (let tree of skillTrees) {
        for (let node of tree.nodes) {
          if (node.id == nodeId) {
            return node;
          }
        }
      }
    }

    function getNodeCount(treeName) {
      var nodeCount = 0;
      if (treeName != undefined) {
        return getTree(treeName).nodes.length;
      } else {
        for (let tree of skillTrees) {
          nodeCount = getNodeCount(tree.name);
        }
      }
      return nodeCount;
    }

    function getSelectedNodes(treeName) {
      let selectedNodes = [];

      if (treeName != undefined) {
        for (let node of getTree(treeName).nodes) {
          if (node.selected) {
            selectedNodes.push(node);
          }
        }
      } else {
        for (let skillTree of skillTrees) {
          selectedNodes = selectedNodes.concat(getSelectedNodes(skillTree.name));
        }
      }
      return selectedNodes;
    }

    function childrenOf(node) {
      let childNodes = [];
      pushIfDefined(childNodes, getNode(node.leftChildId));
      pushIfDefined(childNodes, getNode(node.centerChildId));
      pushIfDefined(childNodes, getNode(node.rightChildId));
      return childNodes;
    }

    function parentsOf(node) {
      let parentNodes = [];
      for (let tree of skillTrees) {
        for (let potentialParent of tree.nodes) {
          if (potentialParent.leftChildId == node.id || potentialParent.centerChildId == node.id || potentialParent.rightChildId == node.id) {
            parentNodes.push(potentialParent);
          }
        }
      }
      return parentNodes;
    }

    function pushIfDefined(collection, node) {
      if (node !== undefined) {
        collection.push(node);
      }
    }

    // public interface
    return {
      getActiveTreeName: getActiveTreeName,
      setActiveTreeName: setActiveTreeName,
      getTree: getTree,
      getTrees: getTrees,
      getNode: getNode,
      getNodeCount: getNodeCount,
      getSelectedNodes: getSelectedNodes,
      parentsOf: parentsOf,
      childrenOf: childrenOf
    }

  })();

  function buildUI(trees) {
    trees.forEach(function(tree, index) {
      buildTab(tree, index);
      buildTreeDisplay(tree);
    });
    updateNodeCounters();
    document.getElementById("node-total").textContent = maxSkillNodes;
    document.getElementById(trees[0].name.toLowerCase() + "-tab").click();
  }

  buildUI(SkillTree.getTrees());

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
    counterElement.textContent = "0 / " + SkillTree.getNodeCount(tree.name);
    tabElement.appendChild(counterElement);

    tabElement.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(function (el) {
        el.classList.remove("selected");
      });
      tabElement.classList.add("selected");
      changeSkillTree(tree.name);
      if (!displayAllBonuses) {
        updateBonuses();
      }
    });

    document.getElementById("total-nodes-display").after(tabElement);
  }

  function buildTreeDisplay(tree) {
    let treeElement = document.createElement("div");
    treeElement.id = treeNameToId(tree.name);
    treeElement.classList.add("skill-tree");
    treeElement.classList.add("hide");
    document.getElementById("graph-view").appendChild(treeElement);

    // TODO: need to do something here to sort the node array.  Probably search it each
    // time you add a node and add the children of that node to a queue to be the next loaded

    let xOffset = 65;
    let yOffset = 38;
    var leftmostNodeElement = 0;
    var rightmostNodeElement = 0;

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
      nodeFrameElement.querySelectorAll(".hex-component").forEach(function(element) {
        element.classList.add("attached");
      });

      let parent = node.parents[0];
      if (parent != undefined) {
        let relativeChildPostiion = getRelativeChildPosition(parent, node.id);
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

      treeElement.appendChild(nodeFrameElement);

      nodeFrameElement.addEventListener("click", function(e) {
        nodeClicked(node, e);
      });
      nodeFrameElement.addEventListener("mouseover", function(e) {
        nodeHovered(node, e);
      });
      nodeFrameElement.addEventListener("mouseout", function() {
        nodeUnHovered(node);
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

  function getRelativeChildPosition(parent, childId) {
    if (parent.leftChildId == childId) {
      return "left";
    } else if (parent.centerChildId == childId) {
      return "center";
    } else if (parent.rightChildId == childId) {
      return "right";
    }
    return "child not found in getRelativeChildPosition()"
  }


  function nodeClicked(node, e) {
    var multiSelectionHappened = false;
    if (node.selected) {
      if(!allowFreeNodeSelection) {
        attemptNodeDeselection(node);
      } else {
        if (e.ctrlKey && highlightedNodesArray.length > 0) {
          for (let highlightedNode of highlightedNodesArray) {
            selectNode(false, highlightedNode);
          }
          multiSelectionHappened = true;
        }
			  else {
          selectNode(false, node);
        }
      }
    } else {
      if (allowFreeNodeSelection) {
        if (e.ctrlKey) {
          if(highlightedNodesArray.length > 0) {
            for (let highlightedNode of highlightedNodesArray) {
//              highlightedNode.selected = true;

//              updateNodeColor(highlightedNode);
              selectNode(true, highlightedNode);
            }
            multiSelectionHappened = true;
          }
        }
        else {
          if(node.parents.length > 0) {
            node.markAsDetached();
            for (let parentNode of node.parents) {
              if (parentNode.selected && !parentNode.inDetachedSubTree()) {
                node.markAsAttached();
                break;
              }
            }
          }
          selectNode(true, node);
        }
      } else if (nodeAvailableForSelection(node) && (SkillTree.getSelectedNodes().length < maxSkillNodes)) {
        selectNode(true, node);
//        node.selected = true;
//        updateNodeColor(node);
      }
    }
    if (multiSelectionHappened) {
      updateTreeIntegrity(SkillTree.getActiveTreeName());
    }
/*
    if(!multiSelectionHappened) {
      updateNodeColors(SkillTree.getActiveTreeName());
    }

    updateNodeColor(node);
    for (let child of node.children()) {
      updateNodeColor(child);
    }
    for (let parent of node.parents()) {
      updateNodeColor(parent);
    }
*/
    updateNodeCounters(SkillTree.getActiveTreeName());
    updateBonuses();
    revertURL();
  }
  
  function nodeHovered(node, e) {
    if(highlightedNodesArray.length > 0 || !e.ctrlKey) {
      return;
    }
    highlightNode(node);

    let treeName = SkillTree.getActiveTreeName();
    if (treeName == undefined) {
     return;
    } else {
      let tree = SkillTree.getTree(treeName);
      
      for (let anotherNode of tree.nodes) {
        if(anotherNode.attribute == node.attribute && anotherNode.id != node.id) {
          highlightNode(anotherNode);
        }
      }
    }
  }

  function nodeUnHovered(node) {
    if(highlightedNodesArray.length == 0) {
      return;
    }
    for (var highlightedNode of highlightedNodesArray) {
      highlightedNode.highlighted = false;
      updateNodeColor(highlightedNode);
    }
    highlightedNodesArray.length = 0;
  }

  function updateNodeColors(treeName) {
    if (treeName == undefined) {
      for (let tree of SkillTree.getTrees()) {
        updateNodeColors(tree.name);
      }
    } else {
      let tree = SkillTree.getTree(treeName);
      for (let node of tree.nodes) {
        updateNodeColor(node);
      }
    }
  }

  function attemptNodeDeselection(node) {
    if (safeToDeselect(node)) {
      selectNode(false, node);
    }
  }
/*
  function updateNodeDisplay(treeName) {
    if (treeName == undefined) {
      for (let tree of SkillTree.getTrees()) {
        updateNodeDisplay(tree.name);
      }
    } else {
      for (let node of SkillTree.getTres(treeName).nodes) {
        updateNodeColor(node);
      }
    }
  }
*/
  function updateNodeCounters(treeName) {
    let totalNodesSelected = SkillTree.getSelectedNodes().length;
    document.getElementById("node-selection-counter").textContent = totalNodesSelected;
    let totalCounter = document.getElementById("node-selection-counter");
    totalCounter.textContent = totalNodesSelected;
    if(totalNodesSelected > maxSkillNodes) {
      totalCounter.style.color = "red";
    } else {
      totalCounter.style.color = "inherit";
    }
    if (treeName == undefined) {
      for (let tree of SkillTree.getTrees()) {
        updateNodeCounters(tree.name);
      }
    } else {
      let tab = document.getElementById(treeName.toLowerCase() + "-tab-counter");
      let nodesSelected = SkillTree.getSelectedNodes(treeName).length;
      let nodesTotal = SkillTree.getNodeCount(treeName);
      tab.textContent = nodesSelected + " / " + nodesTotal;
    }
    let totalCbillCost = (totalNodesSelected * cbillsPerNode).toLocaleString("en-US") + " C-Bills and";
    let totalXpCost = (totalNodesSelected * xpPerNode).toLocaleString("en-US") + " XP / GXP";
    document.getElementById("cost-totals-display").innerHTML = totalCbillCost + "</br>" + totalXpCost;
  }

  function updateBonuses() {
    let bonuses = [];
    let treeName = undefined;
    if (!displayAllBonuses) {
      treeName = SkillTree.getActiveTreeName();
    }
    let nodes = SkillTree.getSelectedNodes(treeName);
    for (let node of nodes) {
      let bonusForAttribute = getBonusForAttribute(bonuses, node.attribute);
      if (bonusForAttribute != undefined) {
        bonusForAttribute.value = ((bonusForAttribute.value * 10) + (node.value * 10)) / 10;
      } else {
        bonuses.push({attribute: node.attribute, value: node.value, valueTemplate: node.valueTemplate});
      }
    }
    document.getElementById("bonuses-display").innerHTML = null;
    bonuses.forEach(function(bonus, index) {
      let bonusDisplayElement = document.createElement("div");
      bonusDisplayElement.id = bonusAttributeToId(bonus.attribute);
      bonusDisplayElement.classList.add("bonus-display");
      bonusDisplayElement.textContent = bonus.attribute + " " + getValueTemplate(bonus.attribute)[0] + bonus.value + getValueTemplate(bonus.attribute)[1];
      document.getElementById("bonuses-display").append(bonusDisplayElement);

    });
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
    for (let mapping of attributeTemplateMap) {
      if (mapping.attribute == attribute) {
        return [ mapping.template.split("{}")[0], mapping.template.split("{}")[1] ];
      }
    }
    console.log("value template not found for attribute " + attribute);
  }

  function changeSkillTree(treeName) {
    SkillTree.setActiveTreeName(treeName);
    document.querySelectorAll(".tab").forEach(function (el) {
      el.classList.remove("selected");
    });
    console.log(treeName);
    getTabForTreeName(treeName).classList.add("selected");

    document.querySelectorAll(".skill-tree").forEach(function (el) {
      el.classList.add("hide");
    });
    let treeElement = document.getElementById(treeNameToId(treeName));
    treeElement.classList.remove("hide");
    let treeDisplayWidth = dimensionAsNumber(treeElement.style.width);
    let totalWidth = (treeDisplayWidth + 294) + "px"
    document.getElementById("modal-overlay").style.width = totalWidth;
    document.getElementById("settings-overlay").style.width = totalWidth;
    document.getElementById("footer").style.width = totalWidth;
  }

  function getTabForTreeName(treeName) {
    return document.getElementById(stringToCss(treeName) + "-tab");
  }

  function treeNameToId(treeName) {
     return stringToCss(treeName) + "-skill-tree";
  }

  function bonusAttributeToId(attribute) {
     return stringToCss(attribute) + "bonus-display";
  }

  function nodeNameToId(nodeName) {
    return stringToCss(nodeName);
  }

  function stringToCss(string) {
    return string.replace(/ /g, "-").toLowerCase();
  }

  document.getElementById("download-image-button").addEventListener("click", function() {
    let canvas = document.getElementById("canvas");
    let treeHTML = document.getElementById(treeNameToId(SkillTree.getActiveTreeName()));
    rasterizeHTML.drawDocument(treeHTML, canvas);
  });

  document.getElementById("reset-tree-button").addEventListener("click", function() {
    resetTree(SkillTree.getActiveTreeName());
  });

  document.getElementById("reset-all-button").addEventListener("click", function() {
    for (let tree of SkillTree.getTrees()) {
      resetTree(tree.name);
    }
  });

  document.getElementById("select-tree-button").addEventListener("click", function() {
    selectAllNodes(SkillTree.getActiveTreeName());
  });

  function resetTree(treeName) {
    let tree = SkillTree.getTree(treeName);
    for (let node of tree.nodes) {
      node.selected = false;
      node.markAsAttached();
    }
    updateNodeCounters(treeName);
    updateBonuses();
    updateNodeColors(treeName);
    revertURL();
  }

  function selectAllNodes(treeName) {
    let availableNodes = maxSkillNodes - SkillTree.getSelectedNodes().length;
    let tree = SkillTree.getTree(treeName);
    if (availableNodes > tree.nodes.length || allowFreeNodeSelection) {
      for (let node of tree.nodes) {
        node.selected = true;
        node.markAsAttached();
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

    if ((remoteId != undefined) && (remoteId != "")) {
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
        importTrees(json['trees']);
        updateNodeCounters();
        updateBonuses();
        updateNodeColors();
        changeSkillTree(json['activeTreeName']);
        document.getElementById("modal-overlay").classList.add("hide");
      });

    }
  }

  document.getElementById("permalink-button").addEventListener("click", function() {
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
    let trees = SkillTree.getTrees();
    let serializedTrees = {};
    serializedTrees.trees = [];
    serializedTrees.activeTreeName = SkillTree.getActiveTreeName();
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
      let tree = SkillTree.getTree(serializedTree.name);
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

  // strips the "px" off the end of a CSS dimension, returns the number value
  function dimensionAsNumber(dimension) {
    return parseFloat(dimension.slice(0, -2));
  }

  loadFromRemoteId();
  document.getElementById("settings-button").addEventListener("click", function() {
    document.getElementById("settings-overlay").classList.remove("hide");
  });
  document.getElementById("settings-overlay").addEventListener("click", function() {
     document.getElementById("settings-overlay").classList.add("hide");
  });
  document.getElementById("settings-display").addEventListener("click", function(event) {
    event.stopPropagation();
  });
  
  function setFreeNodeSelection(isFree)
  {
    allowFreeNodeSelection = isFree;
    if (!allowFreeNodeSelection) {
      for (let tree of SkillTree.getTrees())
        updateTreeIntegrity(tree.name);
    }
    var text = "Free selection (ctrl)";
    if(allowFreeNodeSelection) {
      text = "Strict selection";
    }
    document.getElementById("settings-selection-type-button").textContent = text;
  }
  
  document.getElementById("settings-selection-type-button").addEventListener("click", function(event) {
    setFreeNodeSelection(!allowFreeNodeSelection);
    event.stopPropagation();
  });
  
  function updateTreeIntegrity(treeName) {
    let tree = SkillTree.getTree(treeName);
    
    tree.nodes.forEach(function(node){
      if (node.selected) {
        node.markAsDetached();
      }
    });
    tree.nodes[0].markAsAttached();
    if (tree.nodes[0].selected) {
      markAsAttachedRecursively(tree.nodes[0].children);
    }
    
    updateNodeColors(treeName);
  }
  
  document.getElementById("settings-show-bonus-mode-button").addEventListener("click", function(event) {
    changeBonusMode();
    event.stopPropagation();
  });
  
  function changeBonusMode() {
    displayAllBonuses = !displayAllBonuses;
    
    var text = "Show all bonuses";
    if(displayAllBonuses) {
      text = "Show bonuses from active tab";
    }
    document.getElementById("settings-show-bonus-mode-button").textContent = text;
    updateBonuses();
  }
  
  detachedNodesCounterUpdated();
  document.getElementById("deselect-detached-nodes-button").addEventListener("click", function(event) {
    for (let tree of SkillTree.getTrees()) {
      var treeHadDetachedNodes = false;
      tree.nodes.forEach(function(node){
        if (node.inDetachedSubTree()) {
          node.selected = false;
          node.markAsAttached();
          treeHadDetachedNodes = true;
        }
      });
      if (treeHadDetachedNodes) {
        updateNodeColors(tree.name);
      }
    }
    
    updateNodeCounters();
    updateBonuses();
//    event.stopPropagation();
  });
  
  document.getElementById("settings-show-tooltips-button").addEventListener("click", function(event) {
    event.stopPropagation();
  });
  
});
