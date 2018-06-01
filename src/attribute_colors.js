
"use strict";

import * as Util from "./util.js";

export default function insertAttributeColors(attributeMap) {

  let colorizationStylesElement = document.createElement('style');
  document.head.appendChild(colorizationStylesElement);
  let colorizationStyles = colorizationStylesElement.sheet;
  for (let attribute of attributeMap) {

    // background
    // selected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute.name)}.selected .hex-graphic { fill: ${ Util.shadeColor(attribute.color, 0.2) }`);
    // unselected
    colorizationStyles.insertRule(`.colorize-nodes .${Util.stringToCss(attribute.name)} .hex-graphic { fill: ${ Util.shadeColor(attribute.color, -0.55) }`);

    // border
    // selected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.selected .hex-graphic ` +
      ` { stroke: ${ Util.shadeColor(attribute.color, -0.5) }`);
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.selected.mouse-over .hex-graphic ` +
      `{ stroke: ${ Util.shadeColor(attribute.color, -0.25) }`);
    // unselected, no mouse
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)} .hex-graphic ` +
      `{ stroke: ${ Util.shadeColor(attribute.color, -0.75) }`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over .hex-graphic ` +
      `{ stroke: ${ Util.shadeColor(attribute.color, -0.65) }`);

    // hex text
    colorizationStyles.insertRule(`.colorize-nodes ` +
     `.${Util.stringToCss(attribute.name)} ` +
     `.hex-text { color: ${ Util.shadeColor(attribute.color, 0.9) }`);
     colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.selected ` +
      `.hex-text { color: ${ Util.shadeColor(attribute.color, -0.8) }`);

    // box shadow
    // selected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.selected ` +
      `.hex-graphic { ` +
      `-webkit-filter: drop-shadow(0px 0px 8px ${ Util.shadeColor(attribute.color, 0.5) }); ` +
      `filter:         drop-shadow(0px 0px 8px ${ Util.shadeColor(attribute.color, 0.5) }); ` +
      `}`);
    // unselected, mouse over
    colorizationStyles.insertRule(`.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over ` +
      `.hex-graphic { ` +
      `-webkit-filter: drop-shadow(0px 0px 8px ${ Util.shadeColor(attribute.color, 0.3) }); ` +
      `filter:         drop-shadow(0px 0px 8px ${ Util.shadeColor(attribute.color, 0.3) }); ` +
      `}`);
    // illegal, mouse over
    colorizationStyles.insertRule(`body.colorize-nodes ` +
      `.${Util.stringToCss(attribute.name)}.mouse-over.illegal ` +
      `.hex-graphic { ` +
      `-webkit-filter: drop-shadow(0px 0px 8px red); ` +
      `filter:         drop-shadow(0px 0px 8px red); ` +
      `}`);

    // tooltip
    // tooltip border
    colorizationStyles.insertRule(`.colorize-nodes ` +
    `#tooltip.${Util.stringToCss(attribute.name)} ` +
    `{ border-color: ${ Util.shadeColor(attribute.color, -0.75) }`);
    // tooltip namebar text
    colorizationStyles.insertRule(`.colorize-nodes ` +
    `#tooltip.${Util.stringToCss(attribute.name)} #tooltip-name-bar ` +
    `{ color: ${ Util.shadeColor(attribute.color, 0.9) }; }`);

    // tooltip namebar background
    colorizationStyles.insertRule(`.colorize-nodes ` +
    `#tooltip.${Util.stringToCss(attribute.name)} #tooltip-name-bar ` +
    `{ background: linear-gradient(135deg, ${ Util.shadeColor(attribute.color, -0.75) }BB, ` +
    `${ Util.shadeColor(attribute.color, -0.4) }BB); }`);

    // tooltip description background
    colorizationStyles.insertRule(`.colorize-nodes ` +
    `#tooltip.${Util.stringToCss(attribute.name)} ` +
    `{ background: linear-gradient(135deg, ${ Util.shadeColor(attribute.color, 0.2) }BB, ` +
    `${ Util.shadeColor(attribute.color, 0.5) }BB); }`);

  }
}
