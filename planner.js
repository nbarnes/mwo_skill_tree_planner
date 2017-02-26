'use strict';

document.addEventListener("DOMContentLoaded", function() { 

  let treeSource = {
    treeName: 'Firepower',
    nodes: [
      [
        {},
        {
          name: 'Weapon Cooldown 2',
          attributeValue: 0.05
        }, {
          name: 'Weapon Cooldown 1',
          attributeValue: 0.05
        }, {
          name: 'Heat Dissipation 1',
          attributeValue: 0.05
        },
        {}
      ], [
        {
          name: 'SRM Spread 1',
          attributeValue: 0.05
        },
        {
          name: 'Weapon Cooldown 3',
          attributeValue: 0.05
        },
        {
          name: 'Armor Penetration 1',
          attributeValue: 0.05
        },
        {
          name: 'Heat Dissipation 2',
          attributeValue: 0.05
        },
        {
          name: 'Heat Containment 1',
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
      let nodeLocation = getNodeLocation(nodeName); 
      return nodeAt(nodeLocation[1], nodeLocation[0]);
    }

    function nodeAt(x, y) {
      return nodesMatrix[y][x];
    }

    function buildNodeMatrix(nodeDefs) {
      var nodeMatrix = [];
      for (let nodeSourceRow of nodeDefs) {
        var nodeRow = [];
        nodeMatrix.push(nodeRow);
        for (let nodeDef of nodeSourceRow) {
          var newNode;
          if (nodeDef != undefined && nodeDef.name != undefined) {
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

    function childrenOf(node) {
      var childNodes = [];
      let parentX = node.x;
      let parentY = node.y;

      //console.log('parent node "' + nodeName + '" at ' + parentX + ', ' + parentY);
      if (parentX == 0) {
        //console.log ('child A at ' + parentX + ', ' + (parentY + 1) + ', named: ' + nodeAt(parentX, parentY + 1).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1));

        //console.log ('child B at ' + (parentX + 1) + ', ' + parentY + ', named: ' + nodeAt(parentX + 1, parentY).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY));
      }

      if ((parentX) == 1 || (parentX == 3)) {
        //console.log ('child A at ' + (parentX - 1) + ', ' + parentY + ', named: ' + nodeAt(parentX - 1, parentY + 1).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY + 1));

        //console.log ('child B at ' + (parentX + 1) + ', ' + parentY + ', named: ' + nodeAt(parentX, parentY + 1).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX, parentY + 1));

        //console.log ('child C at ' + parentX + ', ' + (parentY + 1) + ', named: ' + nodeAt(parentX + 1, parentY + 1).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY + 1));
      }

      if (parentX == 2) {
        //console.log ('child A at ' + (parentY - 1) + ', ' + parentX + ', named: ' + nodeAt(parentX - 1, parentY).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY));

        //console.log ('child B at ' + (parentY + 1) + ', ' + parentX + ', named: ' + nodeAt(parentX + 1, parentY).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX + 1, parentY));
      }

      if (parentX == 4) {
        //console.log ('child A at ' + (parentY - 1) + ', ' + parentX + ', named: ' + nodeAt(parentX - 1, parentY).nodeName);
        pushNodeIfNodeExists(childNodes, nodeAt(parentX - 1, parentY));
      }

      return childNodes;
    }

    function parentsOf(node) {
      var parentNodes = [];
      let childX = node.x;
      let childY = node.y;

      // console.log('child node "' + nodeName + '" at ' + childX + ', ' + childY);

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
      if (node != undefined && node.nodeName != undefined) {
        collection.push(node);
      }
    }

    // public interface
    return {
      getTreeName: getTreeName,
      toggleNodeSelection: toggleNodeSelection,
      getNode: getNode,
      nodeAt: nodeAt,
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
    this.selected = function() { return selected };
    this.toggleSelection = function() {
      selected = !selected;
      nodeSelectionChanged(this);
    };
  }

  function buildNodeUI(nodesMatrix) {
    let offset = 60
    let oddOffset = 30
    console.log('matrix size = ' + nodesMatrix[0].length + ' by ' + nodesMatrix.length)
    for (var y = 0; y < nodesMatrix.length; y++) {
      for (var x = 0; x < nodesMatrix[y].length; x++) {
        let nodeX = x, nodeY = y;
        let node = SkillTree.nodeAt(nodeX, nodeY);
        if (node != undefined) {
          let element = document.createElement('div');
          element.classList.add('graph-node');
          element.style.top = ( (nodeY * offset) + (nodeX % 2 * oddOffset) ) + 'px';
          element.style.left = (nodeX * offset) + 'px';
          element.id = nodeNameToId(node.name);
          element.textContent = node.name;
          document.getElementById('graph-view').appendChild(element);
          element.addEventListener('click', function() {
            node.toggleSelection();
          });
        } 
      }
    }
  }

  buildNodeUI(treeSource.nodes);

  function nodeSelectionChanged(node) {

    setNodeSelectionStatus(node);
    for (let childNode of node.children) {
      setNodeSelectionStatus(childNode);
    }


    let nodeElement = document.getElementById(nodeNameToId(nodeName));
    nodeParents = getParentNodes(nodeName);
    var parentIsSelected = false;
    for (let parentNode of parentNodes) {
      if (parentNode.selected == true) {
        parentIsSelected = true;
      }
    }
    if (parentIsSelected) {
      removeNodeClasses(nodeElement);
      nodeElement.classList.add('selected');
    }
    
    // loop through the nodes and update their color based on selelction / availability
    let childNodes = SkillTree.getChildNodes(nodeName);
    for (let childNode of childNodes) {
      let parentNodes = SkillTree.getParentNodes(childNode.nodeName);



      let child = document.getElementById(nodeNameToId(childNode.nodeName));
      removeNodeClasses(child);
    }
    // update counters
    // update stat tracker
  }

  function setNodeSelectionColor(node) {

  }

  function nodeNameToId(nodeName) {
    return nodeName.replace(/ /g, '_').toLowerCase();
  }

  function idToNodeName(id) {
    return id.replace(/(\b[a-z](?!\s))/g, function(x){return x.toUpperCase();});
  }

  function removeNodeClasses(nodeElement) {
    nodeElement.classList.remove('selected')
    nodeElement.classList.remove('enabled')
    nodeElement.classList.remove('disabled');
  }

});
