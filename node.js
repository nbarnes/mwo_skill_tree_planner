import { detachedNodesCounterUpdated, allowFreeNodeSelection } from "./planner.js"

export const highlightedNodesArray = [];
export var detachedNodesCounter = 0;

export function Node(newName, newAttribute, newValue, newValueTemplate, newId, newLeftChildId, newCenterChildId, newRightChildId) {
  var selected = false;
  let highlighted = false;

  this.name = newName;
  this.attribute = newAttribute;
  this.value = newValue;
  this.valueTemplate = newValueTemplate
  this.id = newId;

  this.leftChildId = newLeftChildId,
  this.centerChildId = newCenterChildId,
  this.rightChildId = newRightChildId;
  this.parents = [];
  this.children = [];
  this.selected = selected;
  this.highlighted = highlighted;
  
  this.inDetachedSubTreeValue = false;
  this.inDetachedSubTree = function() {
    return this.inDetachedSubTreeValue;
  }
  this.markAsAttached = function() {
    if(this.inDetachedSubTreeValue) {
      --detachedNodesCounter;
      this.inDetachedSubTreeValue = false;
      detachedNodesCounterUpdated();
    }
  }
  this.markAsDetached = function() {
    if(!this.inDetachedSubTreeValue) {
      ++detachedNodesCounter;
      this.inDetachedSubTreeValue = true;
      detachedNodesCounterUpdated();
    }
  }
/*  
    // public interface
  return {
    
    inDetachedSubTree: inDetachedSubTree,
    markAsAttached: markAsAttached,
    markAsDetached: markAsDetached
*/
}

export function selectNode(value, node) {
//    console.log("nodeName " + node.name + " highlighted state is " + node.hightlighted);
  node.selected = value;
  if(value == false) {
    node.markAsAttached();
    for (let childNode of node.children) {
      if (childNode.selected && !childNode.inDetachedSubTree()) {
        childNode.markAsDetached();
        for (let parentNode of childNode.parents) {
          if (parentNode.selected && !parentNode.inDetachedSubTree()) {
            childNode.markAsAttached();
            break;
          }
        }
        if (childNode.inDetachedSubTree()) {
          propagateDetachment(childNode);
        }
      }
    }
  }
  else {
    if (!node.inDetachedSubTree()) {
      for(let childNode of node.children) {
        if(childNode.inDetachedSubTree()) {
          childNode.markAsAttached();
          propagateAttachment(childNode);
        }
      }
    }
  }
  updateNodeColor(node);

  for (let child of node.children) {
    updateNodeColor(child);
    //update color for other parents of children, so available ones for deselection before become locked if required.
    for (let childParentNode of child.parents) {
      if(childParentNode != node) {
        updateNodeColor(childParentNode);
      }
    }
  }
  
  for (let parent of node.parents) {
    updateNodeColor(parent);
  }
}

function propagateAttachment(node) {
  for (let childNode of node.children) {
    if (childNode.inDetachedSubTree()) {
      childNode.markAsAttached();
      updateNodeColor(childNode);
      propagateAttachment(childNode);
    }
  }
}

function propagateDetachment(node) {
  for (let childNode of node.children) {
    if (childNode.selected && !childNode.inDetachedSubTree()) {
      childNode.markAsDetached();
      for (let parentNode of childNode.parents) {
        if (parentNode.selected && !parentNode.inDetachedSubTree()) {
          childNode.markAsAttached();
          break;
        }
      }
      if (childNode.inDetachedSubTree()) {
        updateNodeColor(childNode);
        propagateDetachment(childNode);
      }
    }
  }
}

export function highlightNode(node) {
  if(node) {
    node.highlighted = true;
    updateNodeColor(node);
    highlightedNodesArray.push(node);
  }
}

export function markAsAttachedRecursively(currentNodes)
{
  let nextLevelNodes = [];
  for (let currentNode of currentNodes) {
    if (!currentNode.selected) {
      continue;
    }
    for (let parentNode of currentNode.parents) {
      if (parentNode.selected && !parentNode.inDetachedSubTree()) {
        currentNode.markAsAttached();
        nextLevelNodes = nextLevelNodes.concat(currentNode.children);
        break;
      }
    }
  }
  if (nextLevelNodes.length > 0) {
    markAsAttachedRecursively(nextLevelNodes);
  }
}

//visual methods

export function updateNodeColor(node) {
  var mode = "";
  if (node.highlighted)
  {
    mode = node.selected ? "highlightedSelected" : "highlightedNotSelected";
  } else {
    if (node.selected) {
      if (safeToDeselect(node)) {
        mode = "selected";
      } else {
        mode = "locked";
      }
    } else {
      if ((allowFreeNodeSelection == false && nodeAvailableForSelection(node)) || node.parents.length == 0) {
        mode = "available";
      } else {
        mode = "unavailable";
      }
    }
  }
  if(mode.length > 0) {
//      console.log(node.name + " mode " + mode + " selected " + node.selected + " high " + node.highlighted);
    setNodeElementColors(node, mode);
  } else {
    console.log("Can't determinate node color (mode) for " + node.name + " " + node.id);
  }
}

export function nodeAvailableForSelection(node) {
  var parentIsSelected = false;
  for (let parentNode of node.parents) {
    parentIsSelected = (parentNode.selected && !parentNode.inDetachedSubTree()) || parentIsSelected;
  }
  parentIsSelected = parentIsSelected || (node.parents.length === 0);
  return parentIsSelected;
}

function setNodeElementColors(node, state) {
  document.getElementById(node.id).querySelectorAll(".node-element").forEach(function(element) {
    removeNodeClasses(element);
    element.classList.add(state);
  });
  let borderElement = "attached";
  if(node.selected && node.inDetachedSubTree()) {
    borderElement = "detached";
  }
  document.getElementById(node.id).querySelectorAll(".hex-component").forEach(function(element) {
    element.classList.remove("attached");
    element.classList.remove("detached");
    element.classList.add(borderElement);
  });
}

export function safeToDeselect(node) {
  var safeToDeselect = true;
  for (let child of node.children) {
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

function removeNodeClasses(nodeElement) {
  nodeElement.classList.remove("selected");
  nodeElement.classList.remove("available");
  nodeElement.classList.remove("locked");
  nodeElement.classList.remove("unavailable");
  nodeElement.classList.remove("highlightedSelected");
  nodeElement.classList.remove("highlightedNotSelected");
}
