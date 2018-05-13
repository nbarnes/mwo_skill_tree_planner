
"use strict";

import { PubSub } from "./pub_sub.js";
import * as Util from "./util.js";
import { findById } from "./dom.js";
import * as Chassis from "./chassis.js";

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
      skillTree.importJson(json);
      Chassis.importRemote(json.weightClass, json.techLevel);
      findById("modal-overlay").classList.add("hide");
    });
  } else {
    skillTree.updateNoOp();
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
    findById("permalink-display").textContent = pushRemoteIdToURL(remoteId);
    findById("modal-overlay").classList.remove("hide");
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
  serializedTrees.weightClass = Chassis.exportRemote().weightClass;
  serializedTrees.techLevel = Chassis.exportRemote().techLevel;
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
  if (node.selected()) {
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
