
"use strict";

import { stringToCss } from "./util.js"
import { attributeMap } from "./attribute_map";
import { PubSub } from "./pub_sub.js"

export default function buildSkillTree(treeSource) {

  var activeTreeName = treeSource[0].name;
  let skillTrees = buildSkillTrees(treeSource);

  function buildSkillTrees(treeSource) {
    let skillTrees = [];
    for (let treeDef of treeSource) {
      let skillTree = {}
      skillTree.name = treeDef.name;
      skillTree.nodes = [];
      for (let nodeDef of treeDef.nodes) {
        skillTree.nodes.push(buildNode(nodeDef));
      }
      skillTrees.push(skillTree);
    }
    return skillTrees;
  }

  function importJson(serializedTrees) {
    for (let serializedTree of serializedTrees) {
      let tree = getTree(serializedTree.name);
      let serializedNodes = serializedTree.nodes;
      for (let serializedNode of serializedNodes) {
        for (let node of tree.nodes) {
          if (serializedNode.id == node.id) {
            if (serializedNode.s == 1) {
              node.selected(true);
            } else {
              node.selected(false);
            }
          }
        }
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
        if (node.selected()) {
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

  function resetTree(treeName) {
    if (treeName == undefined) {
      for (let tree of skillTrees) {
        resetTree(tree.name);
      }
    } else {
      for (let node of getTree(treeName).nodes) {
        node.selectWithoutEvent(false);
      }
      PubSub.publish("treeChanged", {treeName: treeName});
    }
  }

  function selectTree(treeName) {
    console.log(`skillTree.selectTree hit, treeName = ${treeName}`);
    for (let node of getTree(treeName).nodes) {
      node.selectWithoutEvent(true);
    }
    PubSub.publish("treeChanged", {treeName: treeName});
  }

  function pushIfDefined(collection, node) {
    if (node !== undefined) {
      collection.push(node);
    }
  }

  return {
    importJson: importJson,
    getActiveTreeName: getActiveTreeName,
    setActiveTreeName: setActiveTreeName,
    getTree: getTree,
    getTrees: getTrees,
    getNode: getNode,
    getNodeCount: getNodeCount,
    getSelectedNodes: getSelectedNodes,
    parentsOf: parentsOf,
    childrenOf: childrenOf,
    resetTree: resetTree,
    selectTree: selectTree
  }

}

function buildNode(nodeDef) {

  var isSelected = false;

  function selectWithoutEvent(newSelected) {
    isSelected = newSelected;
  }

  function selected(newSelected) {
    if (newSelected == undefined) {
      return isSelected;
    } else {
      isSelected = newSelected;
      PubSub.publish("nodeChanged", { node: this } );
    }
  }

  return {
    // selectWithoutEvent mostly used for bulk / batch updating of nodes while
    //  avoiding event cascades
    selectWithoutEvent: selectWithoutEvent,
    selected: selected,
    name: nodeDef.name,
    id: nodeNameToId(nodeDef.name),
    attribute: nodeDef.attribute,
    value: parseFloat(nodeDef.value),
    leftChildId: nodeDef.leftChildId,
    centerChildId: nodeDef.centerChildId,
    rightChildId: nodeDef.rightChildId,
    selectedColor: attributeMap[nodeDef.attribute].selectedColor,
    availableColor: attributeMap[nodeDef.attribute].availableColor,
    unavailableColor: attributeMap[nodeDef.attribute].unavailableColor,
    lockedColor: attributeMap[nodeDef.attribute].lockedColor
  }
}

function nodeNameToId(nodeName) {
  return stringToCss(nodeName);
}
