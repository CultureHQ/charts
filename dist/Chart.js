"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ChartExports = _interopRequireDefault(require("./ChartExports"));

var _ChartInfoBox = _interopRequireDefault(require("./ChartInfoBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ellipsizeKeys = function ellipsizeKeys(data) {
  var ellipsized = {};
  Object.keys(data).forEach(function (key) {
    var string = key.toString();
    ellipsized[key] = string.length >= 12 ? "".concat(string.slice(0, 10), "...") : string;
  });
  return ellipsized;
};

var Chart =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Chart, _PureComponent);

  function Chart(props) {
    var _this;

    _classCallCheck(this, Chart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chart).call(this, props));
    _this.svgRef = _react["default"].createRef();
    _this.state = {
      activeKey: null,
      ellipsized: ellipsizeKeys(props.data),
      hovering: false
    };
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_assertThisInitialized(_this));
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_assertThisInitialized(_this));
    _this.handleDeselect = _this.handleDeselect.bind(_assertThisInitialized(_this));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Chart, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var data = this.props.data;

      if (data !== prevProps.data) {
        this.setState({
          ellipsized: ellipsizeKeys(data)
        });
      }
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.setState({
        hovering: true
      });
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        hovering: false
      });
    }
  }, {
    key: "handleDeselect",
    value: function handleDeselect() {
      this.setState({
        activeKey: null
      });
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(activeKey) {
      this.setState(function (state) {
        return {
          activeKey: activeKey === state.activeKey ? null : activeKey
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          data = _this$props.data,
          Component = _this$props.component,
          props = _objectWithoutProperties(_this$props, ["className", "data", "component"]);

      var _this$state = this.state,
          activeKey = _this$state.activeKey,
          ellipsized = _this$state.ellipsized,
          hovering = _this$state.hovering;
      var classList = "chq-charts--wrap";

      if (className) {
        classList = "".concat(classList, " ").concat(className);
      }

      return _react["default"].createElement("div", {
        className: classList,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, _react["default"].createElement(Component, _extends({}, props, {
        data: data,
        ellipsized: ellipsized,
        activeKey: activeKey,
        onDeselect: this.handleDeselect,
        onToggle: this.handleToggle,
        svgRef: this.svgRef
      })), _react["default"].createElement(_ChartInfoBox["default"], {
        data: data,
        activeKey: activeKey,
        onDeselect: this.handleDeselect
      }), _react["default"].createElement(_ChartExports["default"], {
        data: data,
        hovering: hovering,
        svgRef: this.svgRef
      }));
    }
  }]);

  return Chart;
}(_react.PureComponent);

var _default = Chart;
exports["default"] = _default;