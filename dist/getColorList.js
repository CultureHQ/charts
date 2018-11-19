"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var STATIC_COLORS = ["#8cb4d6", "#79b17d", "#ffd24b"];

var getRandomValue = function getRandomValue() {
  return Math.floor(Math.random() * 255);
};

var getRandomColor = function getRandomColor() {
  return "rgb(".concat(getRandomValue(), ", ").concat(getRandomValue(), ", ").concat(getRandomValue(), ")");
};

var getColorList = function getColorList(size) {
  var colors = STATIC_COLORS.concat();

  for (var idx = 3; idx < size; idx += 1) {
    colors.push(getRandomColor());
  }

  return colors.slice(0, size);
};

var _default = getColorList;
exports.default = _default;