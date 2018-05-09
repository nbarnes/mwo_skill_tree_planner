
"use strict";

import { PubSub } from "./pub_sub.js";
import * as Util from "./util.js";
import { findById, findByClass } from "./dom.js";

export default function wireEvents(skillTree) {

  PubSub.subscribe("nodeClicked", data => {
    toggleNode(data.node);
  });

  PubSub.subscribe("nodeChanged", data => {
    let treeName = skillTree.getActiveTreeName();
    updateTotalNodesAndCosts(skillTree.getSelectedNodes().length);
    updatePerTreeNodeCountDisplay(treeName,
                                  skillTree.getSelectedNodes(treeName).length,
                                  skillTree.getNodeCount(treeName)
    );
    updateTreeColors(skillTree.getActiveTreeName());
    updateBonuses();
    revertURL();
  });

  PubSub.subscribe("treeChanged", data => {
    updateTotalNodesAndCosts(skillTree.getSelectedNodes().length);
    updatePerTreeNodeCountDisplay(data.treeName,
                                  skillTree.getSelectedNodes(data.treeName).length,
                                  skillTree.getNodeCount(data.treeName)
    );
    updateTreeColors(data.treeName);
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
    skillTree.selectTree(data.treeName);
  });

  PubSub.subscribe("toggleNodeColorization", data => toggleNodeColorization());

  function toggleNode(node) {
    node.selected(!node.selected());
  }

  function updateTreeColors(treeName) {
    if (treeName == undefined) {
      for (let tree of skillTree.getTrees()) {
        updateTreeColors(tree.name);
      }
    } else {
      let tree = skillTree.getTree(treeName);
      for (let node of tree.nodes) {
        let nodeElement = findById(node.id);
        if (node.selected()) {
          nodeElement.classList.add("selected");
          nodeLegal(node) ? nodeElement.classList.remove("illegal") : nodeElement.classList.add("illegal");
        } else {
          nodeElement.classList.remove("selected");
          nodeElement.classList.remove("illegal")
        }
      }
    }
  }

  function nodeLegal(node) {
    let isRootNode = skillTree.parentsOf(node).length === 0;
    let legalParentIsSelected = false;
    for (let parent of skillTree.parentsOf(node)) {
      legalParentIsSelected = ( parent.selected() && nodeLegal(parent) ) || legalParentIsSelected;
    }
    return isRootNode || legalParentIsSelected;
  }

  function updateBonuses() {
    let bonuses = [];
    let nodes = skillTree.getSelectedNodes();
    for (let node of nodes) {
      if (nodeLegal(node)) {
        let bonusForAttribute = getBonusForAttribute(bonuses, node.attribute);
        if (bonusForAttribute != undefined) {
          bonusForAttribute.value = ((bonusForAttribute.value * 10) + (node.value * 10)) / 10;
        } else {
          bonuses.push({attribute: node.attribute, value: node.value, valueTemplate: node.valueTemplate});
        }
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
    let treeDisplayWidth = Util.dimensionAsNumber(treeElement.style.width);
    let totalWidth = (treeDisplayWidth + 294) + "px"
    findById("modal-overlay").style.width = totalWidth;
  }

  function getTabForTreeName(treeName) {
    return findById(Util.stringToCss(treeName) + "-tab");
  }

  function updateTotalNodesAndCosts(selectedNodeCount) {
    findById("node-selection-counter").textContent = selectedNodeCount;
    if (selectedNodeCount > Util.maxSkillNodes) {
      findById("node-selection-counter").classList.add("exceeded-max-nodes")
    } else {
      findById("node-selection-counter").classList.remove("exceeded-max-nodes")
    }
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

  function toggleNodeColorization() {
    findById("graph-view").classList.toggle("colorize-nodes");
  }

}
