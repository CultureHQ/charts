"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _getColorList = _interopRequireDefault(require("./getColorList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TWO_PI = 2 * Math.PI;

var getCoords = function getCoords(percent) {
  return [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];
};

var getSlices = function getSlices(data, scalar) {
  var total = Object.keys(data).reduce(function (accum, key) {
    return accum + data[key];
  }, 0);
  var cursor = 0;
  return Object.keys(data).map(function (key, index) {
    var percent = data[key] / total * scalar;
    var largeArc = percent > 0.5 ? 1 : 0;

    var _getCoords = getCoords(cursor),
        _getCoords2 = _slicedToArray(_getCoords, 2),
        startX = _getCoords2[0],
        startY = _getCoords2[1];

    var _getCoords3 = getCoords(cursor + percent / 2),
        _getCoords4 = _slicedToArray(_getCoords3, 2),
        centerX = _getCoords4[0],
        centerY = _getCoords4[1];

    var _getCoords5 = getCoords(cursor + percent),
        _getCoords6 = _slicedToArray(_getCoords5, 2),
        endX = _getCoords6[0],
        endY = _getCoords6[1];

    cursor += percent;
    return {
      key: key,
      label: "".concat(key, " (").concat(data[key], ")"),
      outerPath: ["M ".concat(startX, " ").concat(startY), "A 1 1 0 ".concat(largeArc, " 1 ").concat(endX, " ").concat(endY), "L 0 0 Z"].join(" "),
      innerPath: ["M ".concat(startX * .95, " ").concat(startY * .95), "A .95 .95 0 ".concat(largeArc, " 1 ").concat(endX * .95, " ").concat(endY * .95), "L 0 0 Z"].join(" "),
      infoBox: [centerX * .5, centerY * .5]
    };
  });
};

var getScalar = function getScalar(time) {
  if (time < 0.5) {
    return 8 * Math.pow(time, 4);
  }

  var inverse = 1 - time;
  return 1 - 8 * Math.pow(inverse, 4);
};

var PieChart =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PieChart, _PureComponent);

  function PieChart(props) {
    var _this;

    _classCallCheck(this, PieChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PieChart).call(this, props));
    _this.state = {
      colors: (0, _getColorList.default)(Object.keys(props.data).length),
      scalar: 0
    };
    return _this;
  }

  _createClass(PieChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var time = 0;
      this.interval = setInterval(function () {
        time += 0.015;

        if (time >= 1) {
          clearInterval(_this2.interval);
          return;
        }

        _this2.setState({
          scalar: getScalar(time)
        });
      }, 20);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      var _this$state = this.state,
          colors = _this$state.colors,
          scalar = _this$state.scalar;
      var slices = getSlices(data, scalar);
      return _react.default.createElement("svg", {
        className: "chq-charts--pie",
        viewBox: "-1 -1 2 2"
      }, slices.map(function (_ref, index) {
        var key = _ref.key,
            outerPath = _ref.outerPath,
            innerPath = _ref.innerPath;
        return _react.default.createElement("g", {
          key: key,
          className: "chq-charts--pie-slice"
        }, _react.default.createElement("path", {
          d: outerPath,
          fill: colors[index]
        }), _react.default.createElement("path", {
          d: innerPath,
          fill: colors[index]
        }));
      }), slices.map(function (_ref2) {
        var key = _ref2.key,
            label = _ref2.label,
            _ref2$infoBox = _slicedToArray(_ref2.infoBox, 2),
            x = _ref2$infoBox[0],
            y = _ref2$infoBox[1];

        return _react.default.createElement("text", {
          key: key,
          x: x,
          y: y,
          textAnchor: "middle",
          transform: "rotate(90, ".concat(x, ", ").concat(y, ")"),
          fontSize: 0.1
        }, label);
      }));
    }
  }]);

  return PieChart;
}(_react.PureComponent);

var _default = PieChart;
exports.default = _default;