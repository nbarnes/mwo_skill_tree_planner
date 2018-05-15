
import { attributeMap } from "./attribute_map";
import { findById } from "./dom.js";

export const maxSkillNodes = 91; // total allowed number of selected skill nodes, per MWO
export const cbillsPerNode = 60000;
export const xpPerNode = 800;

export const stringToCss = string => {
  return string.replace(/ \/ | /g, "-").replace(/\./g, "").toLowerCase();
}

// strips the "px" off the end of a CSS dimension, returns the number value
export const dimensionAsNumber = dimension => {
  return parseFloat(dimension.slice(0, -2));
}

export const treeNameToId = treeName => {
  return stringToCss(treeName) + "-skill-tree";
}

export const formatValue = (attribute, value) => {
  const template = attribute.template.split("{}");
  return `${template[0]}${value}${template[1]}`;
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

// From Pimp Trizkit's spectacular public service at
// https://stackoverflow.com/a/13542669/1720976
export const shadeColor = (hexColor, percent) => {
  var f=parseInt(hexColor.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

// debounce function from https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
