"use strict";

var sass = require('node-sass');

export function stringHash (str) {
  let value = 5381;
  let i = str.length;

  while (i) {
    value = (value * 33) ^ str.charCodeAt(--i);
  }

  return (value >>> 0).toString(36);
}

function interpolateTaggedTemplateStrings (strings, args) {
  var values = Array.prototype.slice.call(args, 1);

  var scss = "";

  for (var i = 0; i < values.length; i++) {
    scss += strings[i];
    scss += values[i].toString();
  }

  scss += strings[strings.length - 1];

  return scss;
}

/**
 * represents a style context
 */
function Style () {
  this.css = "";
}

/**
 * registers a new class with a hash-based name
 *
 * @return the name of the new class
 */
Style.prototype.register = function (strings) {
  var scss = interpolateTaggedTemplateStrings(strings, arguments);

  var className = stringHash(scss);
  scss = "." + className + "{\n" + scss + "\n}";

  var renderResult = sass.renderSync({data: scss});
  this.css += renderResult.css.toString();

  return className;
};

/**
 * just compiles and includes includes some SASS
 *
 * @return void
 */
Style.prototype.rules = function (strings) {
  var scss = interpolateTaggedTemplateStrings(strings, arguments);

  var renderResult = sass.renderSync({data: scss});
  this.css += renderResult.css.toString();
};

/**
 * returns the CSS compiled so far
 */
Style.prototype.getCSS = function () {
  return this.css;
};

/**
 * returns a brand spanking new style context
 */
Style.prototype.context = function () {
  return new Style();
};

module.exports = new Style();
