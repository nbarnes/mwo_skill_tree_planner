
"use strict";

import { PubSub } from "./pub_sub.js";
import * as Util from "./util.js";
import { findById, findByClass } from "./dom.js";
import * as Chassis from "./chassis.js";
import { bonusSort, aggregateBonuses } from "./bonuses.js";

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
    PubSub.publish("treeTabClicked", { treeName: data.activeTreeName } );
    PubSub.publish("toggleChassisWeight", {} );
    PubSub.publish("toggleChassisTech", {} );
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

  PubSub.subscribe("toggleChassisWeight", data => {
    let toggleElement = findById("chassis-weight-toggle");
    toggleElement.textContent = Chassis.displayString(Chassis.incrementWeightClass());
  });

  PubSub.subscribe("toggleChassisTech", data => {
    let toggleElement = findById("chassis-tech-toggle");
    toggleElement.textContent = Chassis.displayString(Chassis.incrementTechLevel());
  });

  PubSub.subscribe("chassisWeightUpdated", data => {
    updateHexValues();
    updateBonuses();
  });

  PubSub.subscribe("chassisTechUpdated", data => {
    updateHexValues();
    updateBonuses();
  });

  PubSub.subscribe("bonusSortChanged", data => {
    updateBonusSortButton(data.label);
    // don't really need to do a full recalc here, just re-render with the new
    // sort display, but it's quick anyway
    updateBonuses();
  });

  PubSub.subscribe("nodeMouseEnter", data => {
    for (let node of findById(`${Util.treeNameToId(data.treeName)}`).querySelectorAll(".node")) {
      if (node.dataset.attribute == data.attribute) {
        node.classList.add("mouse-over");
      } else {
        node.classList.remove("mouse-over");
      }
    }
  });

  PubSub.subscribe("nodeMouseLeft", data => {
    for (let node of findById(`${Util.treeNameToId(data.treeName)}`).querySelectorAll(".node")) {
      node.classList.remove("mouse-over");
    }
  });

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
        let childEdges = findByClass(`.${node.id}`);
        if (node.selected()) {
          nodeElement.classList.add("selected");
          skillTree.nodeLegal(node) ? nodeElement.classList.remove("illegal") : nodeElement.classList.add("illegal");
          for (let edge of childEdges) {
            edge.classList.add("selected");
            skillTree.nodeLegal(node) ? edge.classList.remove("illegal") : edge.classList.add("illegal");
          }
        } else {
          nodeElement.classList.remove("selected");
          nodeElement.classList.remove("illegal");
          for (let edge of childEdges) {
            edge.classList.remove("selected");
            edge.classList.remove("illegal");
          }
        }
      }
    }
  }

  function updateHexValues() {
    let nodeElements = findByClass('.node');
    for (let nodeElement of nodeElements) {
      let node = skillTree.getNode(nodeElement.id);
      nodeElement.querySelector('.hex-value').textContent = Util.formatValue(node.attribute, node.value());
    }
  }

  function updateBonusSortButton(newLabel) {
    findById("bonus-sort-button").textContent = newLabel;
  }

  function updateBonuses() {
    findById("bonuses-display").innerHTML = "";
    let bonusFrame = document.createDocumentFragment();
    if (bonusSort() === 'tree') {
      let trees = skillTree.getTrees();
      for (let tree of trees) {
        let treeName = tree.name;
        if (skillTree.getLegalNodes(treeName).length > 0) {
          let treeNameElement = document.createElement("div");
          treeNameElement.classList.add("bonus-tree-name");
          treeNameElement.classList.add("bonus-list-element");
          treeNameElement.textContent = treeName;
          bonusFrame.append(treeNameElement);
          appendBonuses(aggregateBonuses(skillTree.getLegalNodes(treeName)), bonusFrame);
        }
      }
    } else if (bonusSort() == 'alpha') {
      appendBonuses(aggregateBonuses(skillTree.getLegalNodes()), bonusFrame);
    }

    findById("bonuses-display").append(bonusFrame);

    if (findById("bonuses-display").offsetHeight > 560) {
      findByClass(".bonus-list-element").forEach(function (el) {
        el.classList.add("min");
      });
    } else {
      findByClass(".bonus-list-element").forEach(function (el) {
        el.classList.remove("min");
      });
    }

  }

  function appendBonuses(bonuses, bonusFrame) {
    bonuses.forEach((bonus, index) => {
      let bonusDisplayElement = document.createElement("div");
      bonusDisplayElement.classList.add("bonus-display");
      bonusDisplayElement.classList.add("bonus-list-element");
      bonusDisplayElement.textContent = bonus.attribute.name + " " + Util.formatValue(bonus.attribute, bonus.value);;
      bonusFrame.append(bonusDisplayElement);
    });
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
        let nodeCountDisplay = findById(treeTabName);
        let selectedCount = skillTree.getSelectedNodes(tree.name).length;
        let totalCount = skillTree.getNodeCount(tree.name);
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
