
"use strict";

import * as Util from "./util.js";

export default function insertAttributeColors(attributeMap) {

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of attributeMap) {

    // background
    // selected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute.name)}.selected .hex-component { background-color: ${ Util.shadeColor(attribute.color, 0.2) }`);
    // unselected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute.name)} .hex-component { background-color: ${ Util.shadeColor(attribute.color, -0.55) }`);

    // box shadow
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.selected ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px ${ Util.shadeColor(attribute.color, 0.5) }; }`);
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.selected ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px ${ Util.shadeColor(attribute.color, 0.5) }; }`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px ${ Util.shadeColor(attribute.color, 0.3) }; }`);
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px ${ Util.shadeColor(attribute.color, 0.3) }; }`);
    // illegal, mouse over
    colorizationStyles.insertRule(`#graph-view.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.illegal ` +
      `.hex-shadow-top { box-shadow: -1px -6px 15px 8px red; }`);
    colorizationStyles.insertRule(`#graph-view.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.illegal ` +
      `.hex-shadow-bottom { box-shadow: 0px 3px 15px 8px red; }`);

    // border
    // selected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.selected .hex-component ` +
      ` { border-color: ${ Util.shadeColor(attribute.color, -0.5) }`);
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.selected.mouse-over .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attribute.color, -0.25) }`);
    // unselected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)} .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attribute.color, -0.75) }`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over .hex-component ` +
      `{ border-color: ${ Util.shadeColor(attribute.color, -0.65) }`);

  }
}
