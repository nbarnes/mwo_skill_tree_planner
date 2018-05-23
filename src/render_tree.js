
"use strict";

import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import { findById } from "./dom.js";

export default function renderTree(skillTree) {

  skillTree.getTrees().forEach( (tree, index) => {
    buildTab(tree, index);
    buildTreeDisplay(tree);
  });
  findById("node-total").textContent = Util.maxSkillNodes;

  function buildTab(tree, index) {
    let tabElement = document.createElement("div");
    tabElement.id = Util.stringToCss(tree.name + "-tab");
    tabElement.classList.add("treeTab");
    tabElement.textContent = tree.name;

    let counterElement = document.createElement("div");
    counterElement.id = Util.stringToCss(tree.name) + "-tab-counter";
    counterElement.classList.add("tab-counter");
    counterElement.textContent = "0 / " + skillTree.getNodeCount(tree.name);
    tabElement.appendChild(counterElement);

    tabElement.addEventListener("click", () => {
      PubSub.publish("treeTabClicked", {treeName: tree.name});
    });

    findById("tabs-pane").append(tabElement);
  }

  function buildTreeDisplay(tree) {
    let treeElement = document.createElement("div");
    treeElement.id = Util.treeNameToId(tree.name);
    treeElement.classList.add("skill-tree");
    treeElement.classList.add("hide");

    // these control the spacing between nodes
    let xSpacing = 90;
    let ySpacing = 55;

    var leftmostNodeElement = 0;
    var rightmostNodeElement = 0;

    // TODO: need to do something here to sort the node array.  Probably search
    // it each time you add a node and add the children of that node to a queue
    // to be the next loaded

    // Create graph nodes and insert them into the tree
    for (let node of tree.nodes) {
      let nodeFrameElement = buildNodeElement(node);

      // the first element in nodes is the root node, so it starts available
      if (node == tree.nodes[0]) {
        nodeFrameElement.classList.add("available");
      } else {
        nodeFrameElement.classList.add("unavailable");
      }

      let parent = skillTree.parentsOf(node)[0];
      if (parent != undefined) {
        let relativeChildPostiion = getRelativeChildPosition(parent, node);
        let parentElement = treeElement.querySelector(`#${parent.id}`);

        let parentTop = Util.dimensionAsNumber(parentElement.style.top);
        let parentLeft = Util.dimensionAsNumber(parentElement.style.left);

        // derive the offsets from the parent's position in the pane to the
        // child's
        if (relativeChildPostiion == "left") {
          nodeFrameElement.style.top = parentTop + ySpacing + "px";
          nodeFrameElement.style.left = parentLeft - xSpacing + "px";
        } else if (relativeChildPostiion == "right") {
          nodeFrameElement.style.top = parentTop + ySpacing + "px";
          nodeFrameElement.style.left = parentLeft + xSpacing + "px";
        } else {
          nodeFrameElement.style.top = parentTop + (ySpacing * 2) + "px";
          nodeFrameElement.style.left = parentLeft + "px";
        }

      } else {
        nodeFrameElement.style.top = "25px";
        nodeFrameElement.style.left = "36px";
      }

      let leftPosition = Util.dimensionAsNumber(nodeFrameElement.style.left);
      if (leftPosition < leftmostNodeElement) {
        leftmostNodeElement = leftPosition;
      }
      if (leftPosition > rightmostNodeElement) {
        rightmostNodeElement = leftPosition;
      }

      treeElement.appendChild(nodeFrameElement);

    }

    let nodeWidth = 100; // width of a graph node, per planner.css
    let horzPadding = 25; // horizontal padding on either side of the assembled tree
    let treeWidth = rightmostNodeElement - leftmostNodeElement + nodeWidth + (horzPadding * 2);
    treeElement.style.width = treeWidth + "px";
    treeElement.querySelectorAll(".node").forEach( el => {
      let newLeft = Util.dimensionAsNumber(el.style.left) + (-leftmostNodeElement) + horzPadding + "px";
      el.style.left = newLeft;
    });

    for (let node of tree.nodes) {
      drawNodeEdges(node, treeElement);
    }

    findById("graph-view").appendChild(treeElement);
  }

  function buildNodeElement(node) {
    let nodeElement = findById("hex-template").content.cloneNode(true).firstElementChild;
    nodeElement.id = node.id;
    nodeElement.classList.add(`${Util.stringToCss(node.attribute.name)}`);
    nodeElement.dataset.attribute = Util.stringToCss(node.attribute.name);

    nodeElement.querySelector(".hex-text").textContent = node.attribute.label;

    return nodeElement;
  }

  // TODO: childrenOf is slow and probably doesn't need to be called here, just
  // to get the ids of the children.  Is it possible to get the child IDs out of
  // the parentNode without calling childrenOf?

  function drawNodeEdges(parentNode, treeElement) {
    let parentElement = treeElement.querySelector(`#${parentNode.id}`);
    for (let child of skillTree.childrenOf(parentNode)) {
      let childElement = treeElement.querySelector(`#${child.id}`);

      let lineElement = document.createElement("div");
      lineElement.classList.add("node-connect-line");
      lineElement.classList.add(parentNode.id);

      let parentX = Util.dimensionAsNumber(parentElement.style.left);
      let parentY = Util.dimensionAsNumber(parentElement.style.top);
      let childX = Util.dimensionAsNumber(childElement.style.left);
      let childY = Util.dimensionAsNumber(childElement.style.top);

      let deltaX = parentX - childX;
      let deltaY = parentY - childY;

      let angle  = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) + 180;
      let transform = "rotate(" + (angle) + "deg)";

      if (angle == 90) {
        lineElement.style.width = childY - parentY + "px";
      } else {
        lineElement.style.width = childY - parentY + 40 + "px";
      }

      lineElement.style.transform = transform;
      lineElement.style.top = (parentY + 47) + "px";
      lineElement.style.left = (parentX + 55) + "px";

      treeElement.appendChild(lineElement);
    }
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

}
