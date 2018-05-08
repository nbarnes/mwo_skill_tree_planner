
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
    let tabHeight = 40; // matches element height defined in planner.css
    let topOffset = 50;
    let tabElement = document.createElement("div");
    tabElement.id = Util.stringToCss(tree.name + "-tab");
    tabElement.classList.add("treeTab");
    tabElement.style.top = (40 * index) + 55 + "px";
    tabElement.textContent = tree.name;

    let counterElement = document.createElement("div");
    counterElement.id = Util.stringToCss(tree.name) + "-tab-counter";
    counterElement.classList.add("tab-counter");
    counterElement.textContent = "0 / " + skillTree.getNodeCount(tree.name);
    tabElement.appendChild(counterElement);

    tabElement.addEventListener("click", () => {
      PubSub.publish("treeTabClicked", {treeName: tree.name});
    });

    findById("total-nodes-display").after(tabElement);
  }

  function buildTreeDisplay(tree) {
    let treeElement = document.createElement("div");
    treeElement.id = Util.treeNameToId(tree.name);
    treeElement.classList.add("skill-tree");
    treeElement.classList.add("hide");

    // TODO: need to do something here to sort the node array.  Probably search
    // it each time you add a node and add the children of that node to a queue
    // to be the next loaded

    let xOffset = 65;
    let yOffset = 38;
    var leftmostNodeElement = 0;
    var rightmostNodeElement = 0;

    // Create graph nodes and insert them into the tree
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
        let parentElement = treeElement.querySelector(`#${parent.id}`);

        let parentTop = Util.dimensionAsNumber(parentElement.style.top);
        let parentLeft = Util.dimensionAsNumber(parentElement.style.left);

        // derive the offsets from the parent's position in the pane to the
        // child's
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

      let leftPosition = Util.dimensionAsNumber(nodeFrameElement.style.left);
      if (leftPosition < leftmostNodeElement) {
        leftmostNodeElement = leftPosition;
      }
      if (leftPosition > rightmostNodeElement) {
        rightmostNodeElement = leftPosition;
      }

      treeElement.appendChild(nodeFrameElement);

      nodeFrameElement.addEventListener("click", function() {
        PubSub.publish("nodeClicked", { node: node });
      });
    }

    let nodeWidth = 52; // width of a graph node, per planner.css
    let padding = 25;   // "padding" here rather than in css because "absolute" positioning of the
                        // node elements throws off alignment of css padding
    let treeWidth = rightmostNodeElement - leftmostNodeElement + nodeWidth + (padding * 2);
    treeElement.style.width = treeWidth + "px";
    treeElement.querySelectorAll(".graph-node").forEach( el => {
      let newLeft = Util.dimensionAsNumber(el.style.left) + (-leftmostNodeElement) + padding + "px";
      el.style.left = newLeft;
    });

    // Create the lines between the graph nodes and add them to the tree
    for (let node of tree.nodes) {
      let parentElement = treeElement.querySelector(`#${node.id}`);
      if (node.leftChildId != undefined) {
        let leftChildElement = treeElement.querySelector(`#${node.leftChildId}`);
        if (leftChildElement == null) {
          console.log("left child id results in null = " + node.leftChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, leftChildElement, treeElement);
        }
      }
      if (node.centerChildId != undefined) {
        let centerChildElement = treeElement.querySelector(`#${node.centerChildId}`);
        if (centerChildElement == null) {
          console.log("center child id results in null = " + node.centerChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, centerChildElement, treeElement);
        }
      }
      if (node.rightChildId != undefined) {
        let rightChildElement = treeElement.querySelector(`#${node.rightChildId}`);
        if (rightChildElement == null) {
          console.log("right child id results in null = " + node.rightChildId + " for parent " + parentElement.id);
        } else {
          drawLineBetweenNodes(parentElement, rightChildElement, treeElement);
        }
      }
    }

    findById("graph-view").appendChild(treeElement);

  }

  function buildNodeElement(node) {
    let nodeFrameElement = document.createElement("div");
    let hexTopElement = document.createElement("div");
    let nodeTextElement = document.createElement("div");
    let nodeValueElement = document.createElement("div");
    let hexBottomElement = document.createElement("div");
    let hexTopShadowElement = document.createElement("div");
    let hexBottomShadowElement = document.createElement("div");

    nodeFrameElement.classList.add("node-element");
    hexTopElement.classList.add("node-element");
    nodeTextElement.classList.add("node-element");
    nodeValueElement.classList.add("node-element");
    hexBottomElement.classList.add("node-element");
    hexTopShadowElement.classList.add("node-element");
    hexBottomShadowElement.classList.add("node-element");

    nodeFrameElement.id = node.id;
    nodeFrameElement.classList.add("graph-node");
    nodeFrameElement.classList.add(`${Util.stringToCss(node.attribute)}`);

    hexTopElement.classList.add("hex-top");
    hexTopElement.classList.add("hex-component");
    nodeTextElement.classList.add("hex-text");
    nodeValueElement.classList.add("hex-text");
    nodeValueElement.classList.add("hex-value");
    hexBottomElement.classList.add("hex-bottom");
    hexBottomElement.classList.add("hex-component");
    hexTopShadowElement.classList.add("hex-top-shadow");
    hexBottomShadowElement.classList.add("hex-bottom-shadow");

    nodeTextElement.textContent = node.name;
    nodeValueElement.textContent = Util.getValueTemplate(node.attribute)[0] + node.value + Util.getValueTemplate(node.attribute)[1];

    nodeFrameElement.append(hexTopElement);
    nodeFrameElement.append(nodeTextElement);
    nodeFrameElement.append(nodeValueElement);
    nodeFrameElement.append(hexBottomElement);
    nodeFrameElement.append(hexTopShadowElement);
    nodeFrameElement.append(hexBottomShadowElement);

    return nodeFrameElement;
  }

  function drawLineBetweenNodes(parentElement, childElement, treeElement) {
    let lineElement = document.createElement("div");
    lineElement.classList.add("node-connect-line");

    let parentX = Util.dimensionAsNumber(parentElement.style.left);
    let parentY = Util.dimensionAsNumber(parentElement.style.top);
    let childX = Util.dimensionAsNumber(childElement.style.left);
    let childY = Util.dimensionAsNumber(childElement.style.top);

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

}
