
import { attributeMap } from "./attribute_map";


export let maxSkillNodes = 91; // total allowed number of selected skill nodes, per MWO

export let stringToCss = (string) => {
  return string.replace(/ \/ /g, "-").replace(/ /g, "-").toLowerCase();
}

// strips the "px" off the end of a CSS dimension, returns the number value
export let dimensionAsNumber = (dimension) => {
  return parseFloat(dimension.slice(0, -2));
}

export let treeNameToId = (treeName) => {
  return stringToCss(treeName) + "-skill-tree";
}

export let getValueTemplate = (attribute) => {
  const template = attributeMap[attribute].template.split("{}");
  return [ template[0], template[1] ];
}
