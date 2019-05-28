"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var makeCSVCell = function makeCSVCell(value) {
  return value || value === 0 ? "\"".concat(value.toString().replace(/"/g, "\"\""), "\"") : "";
};

var makeCSVExport = function makeCSVExport(data) {
  var csvEntries = Object.keys(data).map(function (key) {
    return "".concat(makeCSVCell(key), ",").concat(makeCSVCell(data[key]));
  });
  var csvContent = ["Key,Value"].concat(csvEntries).join("\n");
  return "data:text/csv;charset=utf-8;base64,".concat(btoa(csvContent));
};

var makePNGExport = function makePNGExport(imageSrc) {
  return new Promise(function (resolve) {
    var canvas = document.createElement("canvas");
    var size = 800;
    var padding = 100;
    canvas.width = size;
    canvas.height = size;
    var image = new Image();

    image.onload = function () {
      var context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, size, size);
      context.drawImage(image, 0, 0, size, size, padding, padding, size - padding * 2, size - padding * 2);
      resolve(canvas.toDataURL("image/png"));
    };

    image.src = imageSrc;
  });
};

var makeSVGExport = function makeSVGExport(svg) {
  var svgContent = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml;base64,".concat(btoa(svgContent));
};

var ChartExport = function ChartExport(_ref) {
  var ext = _ref.ext,
      href = _ref.href,
      tabIndex = _ref.tabIndex;
  return _react["default"].createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    download: "chart.".concat(ext),
    tabIndex: tabIndex
  }, "Export .", ext);
};

var ChartExportTrigger = function ChartExportTrigger(_ref2) {
  var open = _ref2.open;

  if (open) {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("line", {
      x1: "4",
      y1: "4",
      x2: "12",
      y2: "12"
    }), _react["default"].createElement("line", {
      x1: "12",
      y1: "4",
      x2: "4",
      y2: "12"
    }));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("path", {
    d: "M 8, 3.4 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0"
  }), _react["default"].createElement("path", {
    d: "M 8, 8 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0"
  }), _react["default"].createElement("path", {
    d: "M 8, 12.6 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0"
  }));
};

var ChartExports =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ChartExports, _PureComponent);

  function ChartExports(props) {
    var _this;

    _classCallCheck(this, ChartExports);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartExports).call(this, props));
    _this.state = {
      csvExport: "#",
      dropdownOpen: false,
      pngExport: "#",
      svgExport: "#"
    };
    _this.handleToggleDropdown = _this.handleToggleDropdown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChartExports, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
      this.makeExports();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          data = _this$props.data,
          hovering = _this$props.hovering;
      var dropdownOpen = this.state.dropdownOpen;

      if (data !== prevProps.data) {
        this.makeExports();
      }

      if (hovering !== prevProps.hovering && !hovering && dropdownOpen) {
        this.setState({
          dropdownOpen: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "makeExports",
    value: function makeExports() {
      var _this2 = this;

      setTimeout(function () {
        if (!_this2.componentIsMounted) {
          return;
        }

        var _this2$props = _this2.props,
            data = _this2$props.data,
            svgRef = _this2$props.svgRef;
        var csvExport = makeCSVExport(data);
        var svgExport = makeSVGExport(svgRef.current);
        makePNGExport(svgExport).then(function (pngExport) {
          if (_this2.componentIsMounted) {
            _this2.setState({
              csvExport: csvExport,
              pngExport: pngExport,
              svgExport: svgExport
            });
          }
        });
      }, 2000);
    }
  }, {
    key: "handleToggleDropdown",
    value: function handleToggleDropdown() {
      this.setState(function (_ref3) {
        var dropdownOpen = _ref3.dropdownOpen;
        return {
          dropdownOpen: !dropdownOpen
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var hovering = this.props.hovering;
      var _this$state = this.state,
          csvExport = _this$state.csvExport,
          dropdownOpen = _this$state.dropdownOpen,
          pngExport = _this$state.pngExport,
          svgExport = _this$state.svgExport;
      return _react["default"].createElement("div", {
        className: "chq-charts--export"
      }, _react["default"].createElement("button", {
        type: "button",
        onClick: this.handleToggleDropdown,
        "aria-label": "Open dropdown",
        tabIndex: hovering ? 0 : -1
      }, _react["default"].createElement("svg", {
        viewBox: "0 0 16 16",
        className: "chq-charts--export-trigger"
      }, _react["default"].createElement(ChartExportTrigger, {
        open: dropdownOpen
      }))), dropdownOpen && _react["default"].createElement("div", {
        className: "chq-charts--export-dropdown"
      }, _react["default"].createElement(ChartExport, {
        ext: "csv",
        href: csvExport
      }), _react["default"].createElement(ChartExport, {
        ext: "png",
        href: pngExport
      }), _react["default"].createElement(ChartExport, {
        ext: "svg",
        href: svgExport
      })));
    }
  }]);

  return ChartExports;
}(_react.PureComponent);

var _default = ChartExports;
exports["default"] = _default;