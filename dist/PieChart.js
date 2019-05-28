"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _getColorList = _interopRequireDefault(require("./getColorList"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartSegment = _interopRequireDefault(require("./ChartSegment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TWO_PI = 2 * Math.PI;

var getCoords = function getCoords(percent) {
  return [Math.cos(TWO_PI * (percent - 0.25)), Math.sin(TWO_PI * (percent - 0.25))];
};

var getLegendAlignment = function getLegendAlignment(centerPerc) {
  if (centerPerc >= 0.125 && centerPerc < 0.375) {
    return ["start", 1.1];
  }

  if (centerPerc >= 0.625 && centerPerc < 0.875) {
    return ["end", 1.1];
  }

  return ["middle", 1.25];
};

var getSlices = function getSlices(data, ellipsized, scalar) {
  var total = Object.keys(data).reduce(function (accum, key) {
    return accum + data[key];
  }, 0);
  var cursor = 0;
  var slices = [];
  Object.keys(data).forEach(function (key) {
    if (data[key] === 0) {
      return;
    }

    var percent = data[key] / total * scalar;
    var largeArc = percent > 0.5 ? 1 : 0;
    var centerPerc = cursor + percent / 2;

    var _getLegendAlignment = getLegendAlignment(cursor + percent / 2),
        _getLegendAlignment2 = _slicedToArray(_getLegendAlignment, 2),
        textAnchor = _getLegendAlignment2[0],
        legendScalar = _getLegendAlignment2[1];

    var _getCoords = getCoords(cursor),
        _getCoords2 = _slicedToArray(_getCoords, 2),
        startX = _getCoords2[0],
        startY = _getCoords2[1];

    var _getCoords3 = getCoords(centerPerc),
        _getCoords4 = _slicedToArray(_getCoords3, 2),
        centerX = _getCoords4[0],
        centerY = _getCoords4[1];

    var _getCoords5 = getCoords(cursor + percent),
        _getCoords6 = _slicedToArray(_getCoords5, 2),
        endX = _getCoords6[0],
        endY = _getCoords6[1];

    cursor += percent;
    slices.push({
      key: key,
      labelTop: ellipsized[key],
      labelBottom: "".concat(Math.round(percent * 10000) / 100, "% (").concat(data[key], ")"),
      outerPath: ["M ".concat(startX, " ").concat(startY), "A 1 1 0 ".concat(largeArc, " 1 ").concat(endX, " ").concat(endY), "L 0 0 Z"].join(" "),
      innerPath: ["M ".concat(startX * 0.95, " ").concat(startY * 0.95), "A 0.95 0.95 0 ".concat(largeArc, " 1 ").concat(endX * 0.95, " ").concat(endY * 0.95), "L 0 0 Z"].join(" "),
      legend: [centerX * legendScalar, centerY * legendScalar],
      leaderLine: {
        x1: centerX * 0.75,
        y1: centerY * 0.75,
        x2: centerX * 1.02,
        y2: centerY * 1.02
      },
      textAnchor: textAnchor
    });
  });
  return slices;
};

var getScalar = function getScalar(time) {
  if (time < 0.5) {
    return 8 * Math.pow(time, 4);
  }

  var inverse = 1 - time;
  return 1 - 8 * Math.pow(inverse, 4);
};

var PieChartGroup = function PieChartGroup(_ref) {
  var outerPath = _ref.outerPath,
      innerPath = _ref.innerPath,
      color = _ref.color,
      onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      tabIndex = _ref.tabIndex;
  return _react["default"].createElement("g", {
    className: "chq-charts--pie-slice",
    tabIndex: tabIndex,
    onClick: onClick,
    onKeyDown: onKeyDown
  }, _react["default"].createElement("path", {
    d: outerPath,
    fill: color
  }), _react["default"].createElement("path", {
    d: innerPath,
    fill: color
  }));
};

var PieChartSlice = function PieChartSlice(props) {
  return _react["default"].createElement(_ChartSegment["default"], _extends({
    component: PieChartGroup
  }, props));
};

var PieChartSVG =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PieChartSVG, _PureComponent);

  function PieChartSVG(props) {
    var _this;

    _classCallCheck(this, PieChartSVG);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PieChartSVG).call(this, props));
    _this.state = {
      colors: (0, _getColorList["default"])(Object.keys(props.data).length),
      slices: getSlices(props.data, props.ellipsized, getScalar(0))
    };
    return _this;
  }

  _createClass(PieChartSVG, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.beginInterval();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          data = _this$props.data,
          ellipsized = _this$props.ellipsized;

      if (data !== prevProps.data) {
        clearInterval(this.interval);
        this.setState({
          colors: (0, _getColorList["default"])(Object.keys(data).length),
          slices: getSlices(data, ellipsized, getScalar(0))
        });
        this.beginInterval();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "beginInterval",
    value: function beginInterval() {
      var _this2 = this;

      var _this$props2 = this.props,
          data = _this$props2.data,
          ellipsized = _this$props2.ellipsized;
      var time = 0;
      this.interval = setInterval(function () {
        time += 0.015;

        if (time >= 1) {
          clearInterval(_this2.interval);
          return;
        }

        _this2.setState({
          slices: getSlices(data, ellipsized, getScalar(time))
        });
      }, 20);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          onToggle = _this$props3.onToggle,
          onDeselect = _this$props3.onDeselect,
          svgRef = _this$props3.svgRef;
      var _this$state = this.state,
          colors = _this$state.colors,
          slices = _this$state.slices;
      return _react["default"].createElement("svg", {
        className: "chq-charts--chart",
        viewBox: "-1.4 -1.4 2.8 2.8",
        ref: svgRef
      }, slices.map(function (_ref2, index) {
        var key = _ref2.key,
            outerPath = _ref2.outerPath,
            innerPath = _ref2.innerPath;
        return _react["default"].createElement(PieChartSlice, {
          key: key,
          dataKey: key,
          outerPath: outerPath,
          innerPath: innerPath,
          color: colors[index],
          onToggle: onToggle,
          onDeselect: onDeselect
        });
      }), slices.map(function (_ref3) {
        var key = _ref3.key,
            labelTop = _ref3.labelTop,
            labelBottom = _ref3.labelBottom,
            _ref3$legend = _slicedToArray(_ref3.legend, 2),
            x = _ref3$legend[0],
            y = _ref3$legend[1],
            leaderLine = _ref3.leaderLine,
            textAnchor = _ref3.textAnchor;

        return _react["default"].createElement("g", {
          key: key,
          className: "chq-charts--noselect"
        }, _react["default"].createElement("line", _extends({}, leaderLine, {
          stroke: "#666",
          strokeWidth: 0.01
        })), _react["default"].createElement("text", {
          x: x,
          y: y,
          textAnchor: textAnchor,
          fontSize: 0.12
        }, _react["default"].createElement("tspan", {
          x: x,
          y: y
        }, labelTop), _react["default"].createElement("tspan", {
          x: x,
          y: y,
          dy: ".15"
        }, labelBottom)));
      }));
    }
  }]);

  return PieChartSVG;
}(_react.PureComponent);

var PieChart = function PieChart(props) {
  return _react["default"].createElement(_Chart["default"], _extends({
    component: PieChartSVG
  }, props));
};

var _default = PieChart;
exports["default"] = _default;