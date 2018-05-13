
"use strict";

import { PubSub } from "./pub_sub.js";

let theWeightClass = 0;
let theTechLevel = 0;

const techLevels = ["clan", "is"];
const weightClasses = ["assault", "light", "medium", "heavy"];

export const weightClass = () => {
  return weightClasses[theWeightClass];
}

export const techLevel = () => {
  return techLevels[theTechLevel];
}

export const incrementWeightClass = () => {
  theWeightClass == 3 ? theWeightClass = 0 : theWeightClass++;
  PubSub.publish("chassisWeightUpdated", {});
  return weightClasses[theWeightClass];
}

export const incrementTechLevel = () => {
  theTechLevel == 1 ? theTechLevel = 0 : theTechLevel++;
  PubSub.publish("chassisTechUpdated", {});
  return techLevels[theTechLevel];
}

export const displayString = (input) => {
  return displayStrings[input];
}

export const exportRemote = () => {
  return {
    weightClass: theWeightClass,
    techLevel: theTechLevel
  }
}

export const importRemote = (weightClass, techLevel) => {
  theWeightClass = weightClass;
  theTechLevel = techLevel;
}

const displayStrings = {
  "is": "I.S.",
  "clan": "Clan",
  "light": "Light",
  "medium": "Medium",
  "heavy": "Heavy",
  "assault": "Assault"
}
