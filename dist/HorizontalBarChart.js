"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _getColorList = _interopRequireDefault(require("./getColorList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var HorizontalBarChart = (0, _react.memo)(function (_ref) {
  var data = _ref.data;
  var colors = (0, _getColorList.default)(Object.keys(data).length);
  var maxValue = Math.max.apply(Math, _toConsumableArray(Object.values(data)));
  var maxKeyLen = Math.max.apply(Math, _toConsumableArray(Object.keys(data).map(function (key) {
    return key.length;
  })));
  var maxX = (maxKeyLen + 2) * 10 + 250;
  var maxY = (Object.keys(data).length - 1) * 40 + 25;
  return _react.default.createElement("svg", {
    viewBox: "0 0 ".concat(maxX, " ").concat(maxY)
  }, Object.keys(data).map(function (key, index) {
    return _react.default.createElement("g", {
      key: key
    }, _react.default.createElement("text", {
      x: (maxKeyLen + 1) * 10,
      y: index * 40,
      dy: "1em",
      textAnchor: "end"
    }, key), _react.default.createElement("rect", {
      className: "chq-charts--hori-bar",
      width: data[key] / maxValue * 250,
      height: 25,
      x: (maxKeyLen + 2) * 10,
      y: index * 40,
      fill: colors[index]
    }));
  }));
});
var _default = HorizontalBarChart;
exports.default = _default;