
"use strict";

import { PubSub } from "./pub_sub.js";
import * as Util from "./util.js";
import { findById, findByClass } from "./dom.js";

export default function wireEvents(skillTree) {

  PubSub.subscribe("nodeClicked", data => {
    toggleNode(data.node);
  });

  PubSub.subscribe("nodeChanged", data => {
    updateTotalNodesAndCosts(skillTree.getSelectedNodes().length);
    updatePerTreeNodeCountDisplay();
    updateTreeColors();
    updateBonuses();
    revertURL();
  });

  PubSub.subscribe("treeChanged", data => {
    updateTotalNodesAndCosts(skillTree.getSelectedNodes().length);
    updatePerTreeNodeCountDisplay();
    updateTreeColors();
    updateBonuses();
    revertURL();
  });

  PubSub.subscribe("treeImported", data => {
    updateTotalNodesAndCosts(skillTree.getSelectedNodes().length);
    updatePerTreeNodeCountDisplay();
    updateTreeColors();
    updateBonuses();
    PubSub.publish("treeTabClicked", { treeName: data.activeTreeName });
  });

  PubSub.subscribe("treeTabClicked", data => {
    changeSkillTree(data.treeName);
  });

  PubSub.subscribe("resetActiveTree", data => {
    skillTree.resetTree(data.treeName);
  });

  PubSub.subscribe("resetAllTrees", data => {
    skillTree.resetTree();
  });

  PubSub.subscribe("selectTree", data => {
    selectTree(data.treeName);
  });

  function toggleNode(node) {
    if (node.selected()) {
      attemptNodeDeselection(node);
    } else {
      attemptNodeSelection(node);
    }
  }

  function attemptNodeSelection(node) {
    if (canSelectNode(node)) {
      node.selected(true);
    }
  }

  function attemptNodeDeselection(node) {
    if (canDeselectNode(node)) {
      node.selected(false);
    }
  }

  function canSelectNode(node) {
    var availableNodeCount = (skillTree.getSelectedNodes().length <= Util.maxSkillNodes);
    var isRootNode = skillTree.parentsOf(node).length === 0;
    var parentSelected = false;
    for (let parent of skillTree.parentsOf(node)) {
      parentSelected = parent.selected() || parentSelected;
    }
    return availableNodeCount && (isRootNode || parentSelected);
  }

  function canDeselectNode(node) {
    var allChildrenUnlocked = true;
    // for each child, find out if the child has another parent selelcted
    for (let child of skillTree.childrenOf(node)) {
      allChildrenUnlocked = allChildrenUnlocked && childUnlocked(child, node);
    }
    return allChildrenUnlocked;
  }

  function childUnlocked(child, parent) {
    var childUnlocked = true;
    if (child.selected()) {
      let otherParents = skillTree.parentsOf(child).filter(element => {
        element != parent;
      });
      childUnlocked = parentSelected(otherParents);
    }
    return childUnlocked;
  }

  function parentSelected(parents) {
    var parentSelected = false;
    for (let parent of parents) {
      parentSelected = parentSelected || parent.selected();
    }
    return parentSelected;
  }

  function selectTree(treeName) {
    let availableNodes = Util.maxSkillNodes - skillTree.getSelectedNodes().length;
    let tree = skillTree.getTree(treeName);
    if (availableNodes >= tree.nodes.length) {
      skillTree.selectTree(treeName);
    }
  }

  function updateTreeColors(treeName) {
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        updateTreeColors(tree.name);
      }
    } else {
      let tree = skillTree.getTree(treeName);
      for (let node of tree.nodes) {
        updateNodeColor(node);
      }
    }
  }

  function updateNodeColor(node) {
    if (node.selected()) {
      if (canDeselectNode(node)) {
        setNodeElementColors(node, "selected");
      } else {
        setNodeElementColors(node, "locked");
      }
    } else {
      if (canSelectNode(node)) {
        setNodeElementColors(node, "available");
      } else {
        setNodeElementColors(node, "unavailable");
      }
    }
  }

  function setNodeElementColors(node, state) {
    findById(node.id).querySelectorAll(".node-element").forEach(function(element) {
      removeNodeClasses(element);
      element.classList.add(state);
    });
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
    findById("bonuses-display").innerHTML = "";
    let bonusFrame = document.createDocumentFragment();
    bonuses.forEach((bonus, index) => {
      let bonusDisplayElement = document.createElement("div");
      bonusDisplayElement.classList.add("bonus-display");
      bonusDisplayElement.textContent = bonus.attribute + " " + Util.getValueTemplate(bonus.attribute)[0] + bonus.value + Util.getValueTemplate(bonus.attribute)[1];
      bonusFrame.append(bonusDisplayElement);
    });
    findById("bonuses-display").append(bonusFrame);
    if (findById("bonuses-display").offsetHeight > 560) {
      findByClass(".bonus-display").forEach(function (el) {
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

  function changeSkillTree(treeName) {
    skillTree.setActiveTreeName(treeName);
    findByClass(".treeTab").forEach(function (el) {
      el.classList.remove("selected");
    });
    getTabForTreeName(treeName).classList.add("selected");

    findByClass(".skill-tree").forEach(function (el) {
      el.classList.add("hide");
    });
    let treeElement = findById(Util.treeNameToId(treeName));
    treeElement.classList.remove("hide");

    // Reize the app to fit the new tree
    // TODO: The bonuses sidebar changes width, which breaks this
    let treeDisplayWidth = Util.dimensionAsNumber(treeElement.style.width);
    let totalWidth = (treeDisplayWidth + 294) + "px"
    findById("modal-overlay").style.width = totalWidth;
  }

  function getTabForTreeName(treeName) {
    return findById(Util.stringToCss(treeName) + "-tab");
  }

  function removeNodeClasses(nodeElement) {
    nodeElement.classList.remove("selected");
    nodeElement.classList.remove("available");
    nodeElement.classList.remove("locked");
    nodeElement.classList.remove("unavailable");
  }

  function updateTotalNodesAndCosts(selectedNodeCount) {
    findById("node-selection-counter").textContent = selectedNodeCount;
    let totalCbillCost = `${(selectedNodeCount * Util.cbillsPerNode).toLocaleString("en-US")} C-Bills and`;
    let totalXpCost = `${(selectedNodeCount * Util.xpPerNode).toLocaleString("en-US")} XP / GXP`;
    findById("cost-totals-display").innerHTML = totalCbillCost + "</br>" + totalXpCost;
  }

  function updatePerTreeNodeCountDisplay(treeName, selectedTreeNodesCount, treeNodesCount) {
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        let treeTabName = `${Util.stringToCss(tree.name)}-tab-counter`;
        let selectedCount = skillTree.getSelectedNodes(tree.name).length;
        let totalCount = skillTree.getNodeCount(tree.name);
        let nodeCountDisplay = findById(treeTabName);
        nodeCountDisplay.textContent = `${selectedCount} / ${totalCount}`;
      }
    } else {
      let nodeCountDisplay = findById(`${Util.stringToCss(treeName)}-tab-counter`);
      nodeCountDisplay.textContent = `${selectedTreeNodesCount} / ${treeNodesCount}`;
    }
  }

  function revertURL() {
    history.pushState({}, "", window.location.origin + window.location.pathname);
  }

}
