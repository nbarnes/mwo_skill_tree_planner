
"use strict";

import { PubSub } from "./pub_sub.js";

let sort = 0;

const sorts = ["tree", "alpha"];

export const bonusSort = () => {
  return sorts[sort];
}

export const incrementBonusSort = () => {
  sort == 1 ? sort = 0 : sort++;
  PubSub.publish("bonusSortChanged", {bonusSort: sorts[sort], label: displayStrings[sorts[sort]]});
  return sorts[sort];
}

export const aggregateBonuses = (nodes) => {
  let bonuses = [];
  for (let node of nodes) {
    let bonusForAttribute = getBonusForAttribute(bonuses, node.attribute);
    if (bonusForAttribute != undefined) {
      bonusForAttribute.value = ((bonusForAttribute.value * 10) + (node.value() * 10)) / 10;
    } else {
      bonuses.push({attribute: node.attribute, value: node.value()});
    }
  }
  bonuses.sort( (a, b) => {
    return (a.attribute.name > b.attribute.name ? 1 : -1);
  })
  return bonuses;
}

function getBonusForAttribute(bonuses, attribute) {
  for (let bonus of bonuses) {
    if (bonus.attribute == attribute) {
      return bonus;
    }
  }
}

export const displayString = (input) => {
  return displayStrings[input];
}

// Note: the TYPE of sort is correlated with a button label that lists the OTHER
// sort, as the button is claiming to CHANGE the sorting type to the non-active
// one
const displayStrings = {
  "tree": "Sort by Alpha",
  "alpha": "Sort by Tree"
}
