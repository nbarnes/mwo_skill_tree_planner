
import { attributeMap } from "./attribute_map";
import { findById } from "./dom.js";

export let maxSkillNodes = 91; // total allowed number of selected skill nodes, per MWO
export let cbillsPerNode = 60000;
export let xpPerNode = 800;

export let stringToCss = string => {
  return string.replace(/ \/ /g, "-").replace(/ /g, "-").toLowerCase();
}

// strips the "px" off the end of a CSS dimension, returns the number value
export const dimensionAsNumber = dimension => {
  return parseFloat(dimension.slice(0, -2));
}

export const treeNameToId = treeName => {
  return stringToCss(treeName) + "-skill-tree";
}

export const getValueTemplate = attribute => {
  const template = attributeMap[attribute].template.split("{}");
  return [ template[0], template[1] ];
}

export const showModal = message => {
  setModalCloseability(false);
  findById("permalink-display").textContent = message;
  findById("modal-overlay").classList.remove("hide");
}

// takes a boolean
export const setModalCloseability = closeability => {
  findById("modal-overlay").setAttribute("data-closeable", closeability.toString());
}
