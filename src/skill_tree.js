import { stringToCss } from './util.js'

export default function SkillTreeFactory(treeSource) {

  var activeTreeName = treeSource[0].name;
  let skillTrees = buildSkillTrees(treeSource);

  function buildSkillTrees(treeSource) {
    let skillTrees = [];
    for (let treeDef of treeSource) {
      let skillTree = {}
      skillTree.name = treeDef.name;
      skillTree.nodes = [];
      for (let nodeDef of treeDef.nodes) {
        skillTree.nodes.push(NodeFactory(nodeDef));
      }
      skillTrees.push(skillTree);
    }
    return skillTrees;
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

}

function NodeFactory(nodeDef) {
  return {
    selected: false,
    name: nodeDef.name,
    id: nodeNameToId(nodeDef.name),
    attribute: nodeDef.attribute,
    value: parseFloat(nodeDef.value),
    leftChildId: nodeDef.leftChildId,
    centerChildId: nodeDef.centerChildId,
    rightChildId: nodeDef.rightChildId
  };
}

function nodeNameToId(nodeName) {
  return stringToCss(nodeName);
}
