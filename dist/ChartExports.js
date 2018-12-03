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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var makeCSVCell = function makeCSVCell(value) {
  return value ? value.toString().replace(/"/g, "\"\"") : "";
};

var makeCSVExport = function makeCSVExport(data) {
  var csvEntries = Object.keys(data).map(function (key) {
    return "".concat(makeCSVCell(key), ",").concat(makeCSVCell(data[key]));
  });
  var csvContent = ["Key,Value"].concat(csvEntries).join("\n");
  return "data:text/csv;charset=utf-8;base64,".concat(btoa(csvContent));
};

var makeSVGExport = function makeSVGExport(svg) {
  var svgContent = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml;base64,".concat(btoa(svgContent));
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
      svgExport: "#"
    };
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
      var data = this.props.data;

      if (data !== prevProps.data) {
        this.makeExports();
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
        if (_this2.componentIsMounted) {
          var _this2$props = _this2.props,
              data = _this2$props.data,
              svgRef = _this2$props.svgRef;

          _this2.setState({
            csvExport: makeCSVExport(data),
            svgExport: makeSVGExport(svgRef.current)
          });
        }
      }, 2000);
    }
  }, {
    key: "render",
    value: function render() {
      var hovering = this.props.hovering;
      var _this$state = this.state,
          csvExport = _this$state.csvExport,
          svgExport = _this$state.svgExport;
      var tabIndex = hovering ? 0 : -1;
      return _react.default.createElement("div", {
        className: "chq-charts--export"
      }, _react.default.createElement("a", {
        href: csvExport,
        target: "_blank",
        rel: "noopener noreferrer",
        download: true,
        title: "Export data",
        "aria-label": "Export data",
        tabIndex: tabIndex
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024"
      }, _react.default.createElement("path", {
        d: "M864 160v704h-704v-704h704zM896 128h-768v768h768v-768z M384 304h384v32h-384v-32z M384 496h384v32h-384v-32z M384 688h384v32h-384v-32z M320 320c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z M320 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z M320 704c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"
      }))), _react.default.createElement("a", {
        href: svgExport,
        target: "_blank",
        rel: "noopener noreferrer",
        download: true,
        title: "Export graphic",
        "aria-label": "Export graphic",
        tabIndex: tabIndex
      }, _react.default.createElement("svg", {
        viewBox: "0 0 1024 1024"
      }, _react.default.createElement("path", {
        d: "M835 320h-123c-64-72-84-96-109-96h-177c-25 0-44 24-109 96h-27v-32h-68v32h-27c-35 0-67 26-67 61v352c0 35 32 67 67 67h640c35 0 61-32 61-67v-352c0-35-26-61-61-61z M864 733c0 19-12 35-29 35h-640c-17 0-35-17-35-35v-352c0-16 16-29 35-29h136l10-6c8-9 15-20 22-28 23-25 39-43 51-54 9-8 12-8 12-8h177c0 0 3 0 13 9 12 11 29 33 53 60 6 7 12 14 19 21l10 6h138c18 0 29 12 29 29v352z M512 379c-94 0-171 77-171 171s77 171 171 171 171-77 171-171-77-171-171-171z M512 689c-77 0-139-62-139-139s62-139 139-139 139 62 139 139-62 139-139 139z M704 384h34v34h-34v-34z M576 550c0 35-29 64-64 64s-64-29-64-64c0-35 29-64 64-64s64 29 64 64z"
      }))));
    }
  }]);

  return ChartExports;
}(_react.PureComponent);

var _default = ChartExports;
exports.default = _default;