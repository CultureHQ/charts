"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _Chart = _interopRequireDefault(require("../Chart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DummyChartSVG = function DummyChartSVG(_ref) {
  var onToggle = _ref.onToggle,
      svgRef = _ref.svgRef;
  return _react.default.createElement("div", {
    ref: svgRef
  }, _react.default.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onToggle("a");
    }
  }, "Toggle"));
};

var DummyChart = function DummyChart(props) {
  return _react.default.createElement(_Chart.default, _extends({
    component: DummyChartSVG
  }, props));
};

test("allows interacting with the info box", function () {
  var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(DummyChart, {
    data: {
      a: 10
    }
  })),
      container = _render.container,
      getByText = _render.getByText;

  _reactTestingLibrary.fireEvent.click(getByText("Toggle"));

  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  _reactTestingLibrary.fireEvent.click(container.querySelector(".chq-charts--info span"));

  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  _reactTestingLibrary.fireEvent.click(container.querySelector(".chq-charts--info"));

  expect(container.querySelector(".chq-charts--info-show")).toBeFalsy();

  _reactTestingLibrary.fireEvent.click(getByText("Toggle"));

  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  _reactTestingLibrary.fireEvent.keyDown(container.querySelector(".chq-charts--info"), {
    key: "Shift"
  });

  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  _reactTestingLibrary.fireEvent.keyDown(container.querySelector(".chq-charts--info"), {
    key: "Escape"
  });

  expect(container.querySelector(".chq-charts--info-show")).toBeFalsy();
});
test("tracks hovering status", function () {
  var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(DummyChart, {
    data: {
      a: 10
    }
  })),
      container = _render2.container;

  var getExportsTabIndex = function getExportsTabIndex() {
    return container.querySelector(".chq-charts--export a").tabIndex;
  };

  _reactTestingLibrary.fireEvent.mouseEnter(container.querySelector(".chq-charts--wrap"));

  expect(getExportsTabIndex()).toEqual(0);

  _reactTestingLibrary.fireEvent.mouseLeave(container.querySelector(".chq-charts--wrap"));

  expect(getExportsTabIndex()).toEqual(-1);
});