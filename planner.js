"use strict";

document.addEventListener("DOMContentLoaded", function() {

  let treeSource = [
    {
      name: "Firepower",
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
    },

    {
      name: "Durability",
      nodes: [
        [
          {},
          {
            name: "Structural Resilience 1",
            attributeValue: 0.05
          }, {
            name: "Armor Hardening 1",
            attributeValue: 0.05
          }, {
            name: "Armor Hardening 2",
            attributeValue: 0.05
          },
          {}
        ], [
          {
            name: "Structural Resilience 2",
            attributeValue: 0.05
          },
          {
            name: "Armor Hardening 3",
            attributeValue: 0.05
          },
          {
            name: "Ammo Explosion Mitigation",
            attributeValue: 0.05
          },
          {
            name: "Structural Resilience 3",
            attributeValue: 0.05
          },
          {
            name: "Shock Absorbance 1",
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
    },

  ]

  let SkillTree = (function() {

    var activeTreeName = treeSource[0].name;
    let skillTrees = buildSkillTrees(treeSource);

    function buildSkillTrees(treeSource) {
      var skillTrees = [];
      for (let treeDef of treeSource) {
        var skillTree = {}
        skillTree.name = treeDef.name;
        skillTree.matrix = [];
        for (let nodeRowSource of treeDef.nodes) {
          var nodeRow = [];
          for (let nodeDef of nodeRowSource) {
            var newNode = undefined;
            if (nodeDef !== undefined && nodeDef.name !== undefined) {
              newNode = new Node(nodeDef.name, nodeDef.attributeValue);
            }
            nodeRow.push(newNode);
          }
          skillTree.matrix.push(nodeRow)
        }
        skillTrees.push(skillTree);
      }

      return skillTrees;
    }

    function setActiveTreeName(newName) {
      activeTreeName = newName;
    }

    function getTreeMatrix(skillTreeName) {
      if (skillTreeName == undefined) {
        return getTreeMatrix(activeTreeName);
      } else {
        for (let skillTree of skillTrees) {
          if (skillTree.name == skillTreeName) {
            return skillTree.matrix;
          }
        }
      }
    }

    function getNodeLocation(node) {
      for (let skillTree of skillTrees) {
        for (var y = 0; y < skillTree.matrix.length; y++) {
          for (var x = 0; x < skillTree.matrix[y].length; x++) {
            if (skillTree.matrix[y][x] == node) {
              return [x, y];
            }
          }
        }
      }
    }

    function nodeAt(x, y, skillTreeName) {
      let matrix = getTreeMatrix(skillTreeName);
      var node = undefined;
      let row = matrix[y];
      if (row !== undefined) {
        node = row[x];
      }
      return node;
    }

    function getTreeName() {
      return treeName;
    }

    function toggleNodeSelection(node) {
      node.toggleSelection();
    }

    function nodeCount() {
      var nodeCount = 0;
      for (let skillTree of skillTrees) {
        for (var y = 0; y < skillTree.matrix.length; y++) {
          for (var x = 0; x < skillTree.matrix[y].length; x++) {
            let node = nodeAt(x, y, skillTree.name);
            if (node != undefined) {
              nodeCount = nodeCount + 1;
            }
          }
        }
      }
      return nodeCount;
    }

    function nodesSelected() {
      var selectedCount = 0;
      for (let skillTree of skillTrees) {
        for (var y = 0; y < skillTree.matrix.length; y++) {
          for (var x = 0; x < skillTree.matrix[y].length; x++) {
            let node = nodeAt(x, y, skillTree.name);
            if (node != undefined && node.selected) {
              selectedCount = selectedCount + 1;
            }
          }
        }
      }
      return selectedCount;
    }

    function childrenOf(node) {
      var childNodes = [];
      let parentX = node.x();
      let parentY = node.y();

      if (parentX === 0) {
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1, activeTreeName));
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY, activeTreeName));
      }
      if ((parentX) == 1 || (parentX == 3)) {
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY + 1, activeTreeName));
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1, activeTreeName));
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY + 1, activeTreeName));
      }
      if (parentX == 2) {
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY, activeTreeName));
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY, activeTreeName));
      }
      if (parentX == 4) {
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY, activeTreeName));
      }

      return childNodes;
    }

    function parentsOf(node) {
      var parentNodes = [];
      let childX = node.x();
      let childY = node.y();

      // console.log("child node "" + nodeName + "" at " + childX + ", " + childY);

      if (childX == 0) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX, childY - 1, activeTreeName));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY - 1, activeTreeName));
      }

      if ((childX) == 1 || (childX == 3)) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY, activeTreeName));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX, childY - 1, activeTreeName));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY, activeTreeName));
      }

      if (childX == 2) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY - 1, activeTreeName));
        pushNodeIfNodeExists(parentNodes, nodeAt(childX + 1, childY - 1, activeTreeName));
      }

      if (childX == 4) {
        pushNodeIfNodeExists(parentNodes, nodeAt(childX - 1, childY - 1, activeTreeName));
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
      getActiveTreeName: activeTreeName,
      setActiveTreeName: setActiveTreeName,
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

  function buildUI(treeSource) {

    treeSource.forEach(function(skillTree, index) {
      let topOffset = 50;
      let tabElement = document.createElement("div");
      tabElement.id = skillTree.name.toLowerCase() + '-tab';
      tabElement.classList.add("tab");
      tabElement.style.top = (40 * index) + 50 + "px";
      tabElement.style.left = 0;
      tabElement.textContent = skillTree.name;
      tabElement.addEventListener("click", function() {
        document.querySelectorAll('.tab').forEach(function (el) {
          el.classList.remove('selected');
        });
        tabElement.classList.add('selected');
        changeSkillTree(skillTree.name);
      });
      document.getElementById("left-sidebar").appendChild(tabElement);

      let treeElement = document.createElement("div");
      treeElement.id = nodeNameToId(skillTree.name.toLowerCase() + '-skill-tree');
      treeElement.classList.add('skill-tree');
      treeElement.classList.add('hide');
      document.getElementById("graph-view").appendChild(treeElement);

      for (var y = 0; y < skillTree.nodes.length; y++) {
        for (var x = 0; x < skillTree.nodes[y].length; x++) {

          let allXOffset = 40;
          let allYOffset = 30;
          let offset = 60;
          let oddOffset = 30;

          let nodeX = x, nodeY = y;
          let node = SkillTree.nodeAt(nodeX, nodeY, skillTree.name);
          if (node !== undefined) {
            let nodeElement = document.createElement("div");
            nodeElement.classList.add("graph-node");
            nodeElement.style.top = ( (nodeY * offset) + (nodeX % 2 * oddOffset) + allYOffset ) + "px";
            nodeElement.style.left = ((nodeX * offset) + allXOffset) + "px";
            nodeElement.id = nodeNameToId(node.name);
            nodeElement.textContent = node.name;
            if (x == 2 && y === 0) {  // (2, 0) is the root node for all skill trees
              nodeElement.classList.add("available");
            } else {
              nodeElement.classList.add("unavailable");
            }
            nodeElement.addEventListener("click", function() {
              node.toggleSelection();
            });
            treeElement.appendChild(nodeElement);
          }
        }
      }

    });

    updateNodeCounter();
    document.getElementById('node-total').textContent = SkillTree.nodeCount();
    document.getElementById(treeSource[0].name.toLowerCase() + '-tab').click();
  }
  buildUI(treeSource);


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

  function changeSkillTree(treeName) {
    SkillTree.setActiveTreeName(treeName);
    document.querySelectorAll('.skill-tree').forEach(function (el) {
      el.classList.add('hide');
    });
    document.getElementById(treeName.toLowerCase() + '-skill-tree').classList.remove('hide');
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
