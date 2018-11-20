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

var VerticalBarChart = (0, _react.memo)(function (_ref) {
  var data = _ref.data;
  var keys = Object.keys(data);
  var colors = (0, _getColorList.default)(keys.length);
  var maxValue = Math.max.apply(Math, _toConsumableArray(Object.values(data)));
  var maxX = keys.length * 40;
  return _react.default.createElement("svg", {
    className: "chq-charts--chart chq-charts--vert-bar",
    viewBox: "0 0 ".concat(maxX, " 325")
  }, Object.keys(data).map(function (key, index) {
    var height = data[key] / maxValue * 250;
    return _react.default.createElement("g", {
      key: key
    }, _react.default.createElement("text", {
      x: index * 40,
      y: 305,
      textAnchor: "middle",
      transform: "rotate(-30, ".concat(index * 40, ", 305)")
    }, key), _react.default.createElement("text", {
      x: index * 40 + 25 / 2,
      y: 265 - height,
      textAnchor: "middle"
    }, data[key]), height !== 0 && _react.default.createElement("g", {
      className: "chq-charts--vert-bar-group",
      tabIndex: 0
    }, _react.default.createElement("rect", {
      width: 25,
      height: height,
      x: index * 40,
      y: 275 - height,
      fill: colors[index]
    }), _react.default.createElement("rect", {
      className: "chq-charts--bar-shadow",
      width: 35,
      height: height + 5,
      x: index * 40 - 5,
      y: 270 - height,
      fill: colors[index]
    })), index !== keys.length - 1 && _react.default.createElement("line", {
      x1: (index + 1) * 40 - 7.5,
      y1: 285,
      x2: (index + 1) * 40 - 7.5,
      y2: 265,
      stroke: "#ccc",
      strokeWidth: 1
    }));
  }), _react.default.createElement("line", {
    x1: -10,
    y1: 280,
    x2: maxX,
    y2: 280,
    stroke: "#ccc",
    strokeWidth: 1
  }));
});
var _default = VerticalBarChart;
exports.default = _default;