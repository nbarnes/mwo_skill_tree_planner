"use strict";

document.addEventListener("DOMContentLoaded", function() {

  let treeSource = {
    treeName: "Firepower",
    nodes: [
      [
        {},
        {
          name: "Weapon Cooldown 2",
          attributeValue: 0.05
        }, {
          name: "Weapon Cooldown 1",
          attributeValue: 0.05
        }, {
          name: "Heat Dissipation 1",
          attributeValue: 0.05
        },
        {}
      ], [
        {
          name: "SRM Spread 1",
          attributeValue: 0.05
        },
        {
          name: "Weapon Cooldown 3",
          attributeValue: 0.05
        },
        {
          name: "Armor Penetration 1",
          attributeValue: 0.05
        },
        {
          name: "Heat Dissipation 2",
          attributeValue: 0.05
        },
        {
          name: "Heat Containment 1",
          attributeValue: 0.05
        }
      ], [
        {},
        {},
        {},
        {},
        {}
      ], [
        {},
        {},
        {},
        {},
        {}
      ], [
        {},
        {},
        {},
        {},
        {}
      ]
    ]
  }

  let SkillTree = (function() {

    let treeName = treeSource.treeName;
    let nodesMatrix = buildNodeMatrix(treeSource.nodes);

    function getNodeLocation(node) {
      for (var y = 0; y < nodesMatrix.length; y++) {
        for (var x = 0; x < nodesMatrix[y].length; x++) {
          if (nodesMatrix[y][x] == node) {
            return [x, y];
          }
        }
      }
    }

    function getNode(name) {
      let nodeLocation = getNodeLocation(name);
      return nodeAt(nodeLocation[1], nodeLocation[0]);
    }

    function nodeAt(x, y) {
      var node = undefined;
      let row = nodesMatrix[y];
      if (row !== undefined) {
        node = row[x];
      }
      return node;
    }

    function buildNodeMatrix(nodeDefs) {
      var nodeMatrix = [];
      for (let nodeSourceRow of nodeDefs) {
        var nodeRow = [];
        nodeMatrix.push(nodeRow);
        for (let nodeDef of nodeSourceRow) {
          var newNode = undefined;
          if (nodeDef !== undefined && nodeDef.name !== undefined) {
            newNode = new Node(nodeDef.name, nodeDef.attributeValue);
          }
          nodeRow.push(newNode);
        }
      }
      return nodeMatrix;
    }

    function getTreeName() {
      return treeName;
    }

    function toggleNodeSelection(node) {
      node.toggleSelection();
    }

    function nodeCount() {
      var nodeCount = 0;
      for (var y = 0; y < nodesMatrix.length; y++) {
        for (var x = 0; x < nodesMatrix[y].length; x++) {
          let node = nodeAt(x, y);
          if (node != undefined) {
            nodeCount = nodeCount + 1;
          }
        }
      }
      return nodeCount;
    }

    function nodesSelected() {
      var selectedCount = 0;
      for (var y = 0; y < nodesMatrix.length; y++) {
        for (var x = 0; x < nodesMatrix[y].length; x++) {
          let node = nodeAt(x, y);
          if (node != undefined && node.selected) {
            selectedCount = selectedCount + 1;
          }
        }
      }
      return selectedCount;
    }

    function childrenOf(node) {
      var childNodes = [];
      let parentX = node.x();
      let parentY = node.y();

      // console.log("parent node "" + node.name + "" at " + parentX + ", " + parentY);
      if (parentX === 0) {
        // console.log ("child A at " + parentX + ", " + (parentY + 1) + ", named: " + nodeAt(parentX, parentY + 1).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1));

        // console.log ("child B at " + (parentX + 1) + ", " + parentY + ", named: " + nodeAt(parentX + 1, parentY).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY));
      }

      if ((parentX) == 1 || (parentX == 3)) {
        // console.log ("child A at " + (parentX - 1) + ", " + parentY + ", named: " + nodeAt(parentX - 1, parentY + 1).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY + 1));

        // console.log ("child B at " + (parentX + 1) + ", " + parentY + ", named: " + nodeAt(parentX, parentY + 1).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1));

        // console.log ("child C at " + parentX + ", " + (parentY + 1) + ", named: " + nodeAt(parentX + 1, parentY + 1).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY + 1));
      }

      if (parentX == 2) {
        // console.log ("child A at " + (parentX - 1) + ", " + parentY + ", named: " + nodeAt(parentX - 1, parentY).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY));

        // console.log ("child B at " + (parentX + 1) + ", " + parentY + ", named: " + nodeAt(parentX + 1, parentY).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY));
      }

      if (parentX == 4) {
        // console.log ("child A at " + (parentX - 1) + ", " + parentY + ", named: " + nodeAt(parentX - 1, parentY).name);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY));
      }

      return childNodes;
    }

    function parentsOf(node) {
      var parentNodes = [];
      let childX = node.x();
      let childY = node.y();

      // console.log("child node "" + nodeName + "" at " + childX + ", " + childY);

      if (childX == 0) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX, childY - 1));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY - 1));
      }

      if ((childX) == 1 || (childX == 3)) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX, childY - 1));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY));
      }

      if (childX == 2) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY - 1));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY - 1));
      }

      if (childX == 4) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY - 1));
      }

      return parentNodes;
    }

    function pushNodeIfNodeExists(collection, node) {
      if (node !== undefined && node.name !== undefined) {
        collection.push(node);
      }
    }

    // public interface
    return {
      getTreeName: getTreeName,
      getNode: getNode,
      getNodeLocation: getNodeLocation,
      nodeAt: nodeAt,
      toggleNodeSelection: toggleNodeSelection,
      nodeCount: nodeCount,
      nodesSelected: nodesSelected,
      parentsOf: parentsOf,
      childrenOf: childrenOf
    }

  })();

  function Node(newName, newAttributeValue) {
    var selected = false;

    function x() {
      return SkillTree.getNodeLocation(this)[0];
    }
    function y() {
      return SkillTree.getNodeLocation(this)[1];
    }
    function parents() {
      return SkillTree.parentsOf(this);
    }
    function children() {
      return SkillTree.childrenOf(this);
    }

    this.name = newName;
    this.attributeValue = newAttributeValue;
    this.x = x;
    this.y = y;
    this.parents = parents;
    this.children = children;
    this.selected = selected;
    this.toggleSelection = function() {
      nodeSelectionChanged(this);
    };
  }

  function buildUI(nodesMatrix) {
    let allXOffset = 85;
    let allYOffset = 30;
    let offset = 60;
    let oddOffset = 30;
    for (var y = 0; y < nodesMatrix.length; y++) {
      for (var x = 0; x < nodesMatrix[y].length; x++) {
        let nodeX = x, nodeY = y;
        let node = SkillTree.nodeAt(nodeX, nodeY);
        if (node !== undefined) {
          let element = document.createElement("div");
          element.classList.add("graph-node");
          element.style.top = ( (nodeY * offset) + (nodeX % 2 * oddOffset) + allYOffset ) + "px";
          element.style.left = ((nodeX * offset) + allXOffset) + "px";
          element.id = nodeNameToId(node.name);
          element.textContent = node.name;
          if (x == 2 && y === 0) {  // (2, 0) is the root node for all skill trees
            element.classList.add("available");
          } else {
            element.classList.add("unavailable");
          }
          document.getElementById("graph-view").appendChild(element);
          element.addEventListener("click", function() {
            node.toggleSelection();
          });
        }
      }
    }
    updateNodeCounter();
    document.getElementById('node-total').textContent = SkillTree.nodeCount();
  }
  buildUI(treeSource.nodes);

  function nodeSelectionChanged(node) {
    if (node.selected) {
      if (safeToDeselect(node)) {
        node.selected = false;
        if (nodeAvailableForSelection(node)) {
          setNodeColorBasedOnSelectionStatus(node, "available");
        } else {
          setNodeColorBasedOnSelectionStatus(node, "unavailable");
        }
      }
    } else {
      if (nodeAvailableForSelection(node)) {
        node.selected = true;
        setNodeColorBasedOnSelectionStatus(node, "selected");
      }
    }

    // update children
    for (let child of node.children()) {
      if (child.selected) {
        setNodeColorBasedOnSelectionStatus(child, "selected");
      } else if (nodeAvailableForSelection(child)) {
        setNodeColorBasedOnSelectionStatus(child, "available");
      } else {
        setNodeColorBasedOnSelectionStatus(child, "unavailable");
      }
    }
    updateNodeCounter();
  }

  function nodeAvailableForSelection(node) {
    var parentIsSelected = false;
    for (let parent of node.parents()) {
      parentIsSelected = parent.selected || parentIsSelected;
    }
    parentIsSelected = parentIsSelected || (node.parents().length === 0);
    return parentIsSelected;
  }

  function safeToDeselect(node) {
    var safeToDeselect = true;
    for (let child of node.children()) {
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

  function setNodeColorBasedOnSelectionStatus(node, selectionStatus) {
    let nodeElement = document.getElementById(nodeNameToId(node.name));
    removeNodeClasses(nodeElement);
    nodeElement.classList.add(selectionStatus);
  }

  function updateNodeCounter() {
    document.getElementById('node-selection-counter').textContent = SkillTree.nodesSelected();
  }


  function nodeNameToId(nodeName) {
    return nodeName.replace(/ /g, "_").toLowerCase();
  }

  function idToNodeName(id) {
    return id.replace(/(\b[a-z](?!\s))/g, function(x){return x.toUpperCase();});
  }

  function removeNodeClasses(nodeElement) {
    nodeElement.classList.remove("selected");
    nodeElement.classList.remove("available");
    nodeElement.classList.remove("unavailable");
  }

});
