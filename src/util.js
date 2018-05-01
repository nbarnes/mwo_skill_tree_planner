
export let stringToCss = (string) => {
  return string.replace(/ /g, "-").toLowerCase();
}

// strips the "px" off the end of a CSS dimension, returns the number value
export let dimensionAsNumber = (dimension) => {
  return parseFloat(dimension.slice(0, -2));
}
