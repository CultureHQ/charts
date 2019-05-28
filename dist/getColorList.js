"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var STATIC_COLORS = ["#8cb4d6", "#79b17d", "#ffd24b"];

var getColorList = function getColorList(size) {
  var colors = STATIC_COLORS.concat();

  for (var idx = 3; idx < size; idx += 1) {
    colors.push("hsl(".concat(Math.round(Math.random() * 360), ", 33%, 66%)"));
  }

  return colors.slice(0, size);
};

var _default = getColorList;
exports["default"] = _default;