
"use strict";

import { PubSub } from "./pub_sub.js";
import * as Util from "./util.js";

export const loadFromRemoteId = function(skillTree) {
  let regex = /([^//?]*)$/;
  let remoteId = regex.exec(window.location.href)[1];

  if ((remoteId != undefined) && (remoteId !== "")) {
    Util.showModal("Reactor online, weapons online, sensors online....");

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
      skillTree.importJson(json["trees"]);
      updateBonuses();
      updateTreeColors();
      changeSkillTree(json["activeTreeName"]);
      document.getElementById("modal-overlay").classList.add("hide");
    });
  }
}

PubSub.subscribe("getPermalink", (data) => {
  Util.showModal("Permalink inbound on your position.");
  fetch("https://jsonblob.com/api/jsonBlob", {
    method: "POST",
    body: serializeTrees(data.skillTree),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    let regex = /([^//]*)$/;
    let remoteId = regex.exec(response.headers.get("location"))[0];
    document.getElementById("permalink-display").textContent = pushRemoteIdToURL(remoteId);
    document.getElementById("modal-overlay").classList.remove("hide");
    Util.setModalCloseability(true);
  }, function(error) {
    console.log(error.message);
    Util.setModalCloseability(true);
  });
});

function serializeTrees(skillTree) {
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

function pushRemoteIdToURL(remoteId) {
  let remoteURL = window.location.origin + window.location.pathname + "?" + remoteId
  history.pushState({}, "", remoteURL);
  return remoteURL;
}
