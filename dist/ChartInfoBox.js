"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var getRoundedMean = function getRoundedMean(data) {
  var sum = Object.values(data).reduce(function (accum, value) {
    return accum + value;
  }, 0);
  return Math.round(sum / Object.keys(data).length * 100) / 100;
};

var ChartInfoBox =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ChartInfoBox, _PureComponent);

  function ChartInfoBox(props) {
    var _this;

    _classCallCheck(this, ChartInfoBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartInfoBox).call(this, props));
    _this.infoBoxRef = _react.default.createRef();
    _this.state = {
      roundedMean: getRoundedMean(props.data)
    };
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ChartInfoBox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var data = this.props.data;

      if (data !== prevProps.data) {
        this.setState({
          roundedMean: getRoundedMean(data)
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var onDeselect = this.props.onDeselect;

      if (event.key === "Escape") {
        onDeselect();
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var onDeselect = this.props.onDeselect;

      if (event.target === this.infoBoxRef.current) {
        onDeselect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          activeKey = _this$props.activeKey,
          onDeselect = _this$props.onDeselect;
      var roundedMean = this.state.roundedMean;
      var className = "chq-charts--info";

      if (activeKey) {
        className = "".concat(className, " chq-charts--info-show");
      }

      return _react.default.createElement("div", {
        ref: this.infoBoxRef,
        className: className,
        role: "button",
        tabIndex: activeKey ? 0 : -1,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick
      }, activeKey && _react.default.createElement("span", null, activeKey, _react.default.createElement("br", null), _react.default.createElement("br", null), "Value:", " ", _react.default.createElement("span", {
        className: "chq-charts--mono"
      }, data[activeKey]), _react.default.createElement("br", null), "Mean:", " ", _react.default.createElement("span", {
        className: "chq-charts--mono"
      }, roundedMean), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement("button", {
        type: "button",
        onClick: onDeselect
      }, "\u2190 Back")));
    }
  }]);

  return ChartInfoBox;
}(_react.PureComponent);

var _default = ChartInfoBox;
exports.default = _default;