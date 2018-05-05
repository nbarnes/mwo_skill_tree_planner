
"use strict";

import { treeSource } from "./tree_source";
import { attributeMap } from "./attribute_map";
import SkillTreeFactory from "./skill_tree";
import * as Util from "./util.js";
import { PubSub } from "./pub_sub.js";
import renderTree from "./render_tree.js";
import wireEvents from "./event_wiring.js";

document.addEventListener("DOMContentLoaded", function() {

  let skillTree = SkillTreeFactory(treeSource);

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of Object.getOwnPropertyNames(attributeMap)) {
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.selected { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.locked { background-color: hsl(${ attributeMap[attribute].hue }, 100%, 20%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.available { background-color: hsl(${ attributeMap[attribute].hue }, 90%, 70%); }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes .${Util.stringToCss(attribute)} .hex-component.unavailable { background-color: hsl(${ attributeMap[attribute].hue }, 90%, 70%); }`);
  }

  renderTree(skillTree);
  wireEvents(skillTree);

  PubSub.subscribe("toggleNodeColorization", data => toggleNodeColorization());

  PubSub.publish("treeTabClicked", {treeName: skillTree.getTrees()[0].name});

  document.getElementById("reset-tree-button").addEventListener("click", () => {
    PubSub.publish("resetActiveTree", {treeName: skillTree.getActiveTreeName()});
  });

  document.getElementById("reset-all-button").addEventListener("click", () => {
    PubSub.publish("resetAllTrees");
  });

  document.getElementById("select-tree-button").addEventListener("click", () => {
    PubSub.publish("selectEntireTree", {treeName: skillTree.getActiveTreeName()});
  });

  function loadFromRemoteId() {
    let regex = /([^//?]*)$/;
    let remoteId = regex.exec(window.location.href)[1];

    if ((remoteId != undefined) && (remoteId !== "")) {
      setModalCloseability(false);
      document.getElementById("modal-overlay").classList.remove("hide");
      document.getElementById("permalink-display").textContent = "Reactor online, weapons online, sensors online....";

      fetch("https://jsonblob.com/api/jsonBlob/" + remoteId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error response - " + response);
        }
      })
      .then(function(json) {
        importTrees(json["trees"]);
        updateBonuses();
        updateTreeColors();
        changeSkillTree(json["activeTreeName"]);
        document.getElementById("modal-overlay").classList.add("hide");
      });

    }
  }

  document.getElementById("permalink-button").addEventListener("click", () => {
    PubSub.publish("GetPermalink");
  });

  PubSub.subscribe("GetPermalink", (data) => {
    setModalCloseability(false);
    document.getElementById("permalink-display").textContent = "Permalink inbound on your position.";
    document.getElementById("modal-overlay").classList.remove("hide");
    fetch("https://jsonblob.com/api/jsonBlob", {
      method: "POST",
      body: serializeTrees(),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      let regex = /([^//]*)$/;
      let remoteId = regex.exec(response.headers.get("location"))[0];
      document.getElementById("permalink-display").textContent = pushRemoteIdToURL(remoteId);
      document.getElementById("modal-overlay").classList.remove("hide");
      setModalCloseability(true);
    }, function(error) {
      console.log(error.message);
      setModalCloseability(true);
    });
  });

  function serializeTrees() {
    let trees = skillTree.getTrees();
    let serializedTrees = {};
    serializedTrees.trees = [];
    serializedTrees.activeTreeName = skillTree.getActiveTreeName();
    for (let tree of trees) {
      let serializedTree = {
        name: tree.name,
        nodes: []
      }
      for (let node of tree.nodes) {
        serializedTree.nodes.push(serializeNode(node));
      }
      serializedTrees.trees.push(serializedTree);
    }
    return JSON.stringify(serializedTrees);
  }

  function serializeNode(node) {
    let s;
    if (node.selected) {
      s = 1;
    } else {
      s = 0;
    }
    return {
      id: node.id,
      s: s
    }
  }

  function importTrees(serializedTrees) {
    for (let serializedTree of serializedTrees) {
      let tree = skillTree.getTree(serializedTree.name);
      let serializedNodes = serializedTree.nodes;
      for (let serializedNode of serializedNodes) {
        for (let node of tree.nodes) {
          if (serializedNode.id == node.id) {
            if (serializedNode.s == 1) {
              node.selected = true;
            } else {
              node.selected = false;
            }
          }
        }
      }
    }
  }

  function pushRemoteIdToURL(remoteId) {
    let remoteURL = window.location.origin + window.location.pathname + "?" + remoteId
    history.pushState({}, "", remoteURL);
    return remoteURL;
  }

  // takes a boolean
  function setModalCloseability(closeability) {
      document.getElementById("modal-overlay").setAttribute("data-closeable", closeability.toString());
  }

  document.getElementById("modal-overlay").addEventListener("click", function() {
    let closeable = document.getElementById("modal-overlay").getAttribute("data-closeable");
    if (closeable == "true") {
      document.getElementById("modal-overlay").classList.add("hide");
    }
  });

  document.getElementById("permalink-display").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  loadFromRemoteId();

  document.getElementById("colorize-nodes-button").addEventListener("click", function(event) {
    PubSub.publish("toggleNodeColorization");
  });

  function toggleNodeColorization() {
    document.getElementById("graph-view").classList.toggle("colorize-nodes");
  }

});
