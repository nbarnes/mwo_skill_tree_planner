
"use strict";

export let findById = function (id) {
  return document.getElementById(id);
}

export let findByClass = function (klass) {
  return document.querySelectorAll(klass);
}
