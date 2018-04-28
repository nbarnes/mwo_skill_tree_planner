
function stringToCss(string) {
  return string.replace(/ /g, "-").toLowerCase();
}

export { stringToCss };
