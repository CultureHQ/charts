"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _HorizontalBarChart = _interopRequireDefault(require("../HorizontalBarChart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("renders bars", function () {
  var data = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
  };

  var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_HorizontalBarChart.default, {
    data: data
  })),
      container = _render.container;

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});
test("allows interacting with bars", function () {
  var data = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
  };

  var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_HorizontalBarChart.default, {
    data: data
  })),
      container = _render2.container;

  var barGroup = container.querySelector(".chq-charts--hori-bar-group");

  var getInfoOpen = function getInfoOpen() {
    return container.querySelector(".chq-charts--info-show");
  };

  _reactTestingLibrary.fireEvent.click(barGroup);

  expect(getInfoOpen()).toBeTruthy();

  _reactTestingLibrary.fireEvent.click(barGroup);

  expect(getInfoOpen()).toBeFalsy();

  _reactTestingLibrary.fireEvent.keyDown(barGroup, {
    key: "Enter"
  });

  expect(getInfoOpen()).toBeTruthy();

  _reactTestingLibrary.fireEvent.keyDown(barGroup, {
    key: "Escape"
  });

  expect(getInfoOpen()).toBeFalsy();

  _reactTestingLibrary.fireEvent.keyDown(barGroup, {
    key: "Shift"
  });

  expect(getInfoOpen()).toBeFalsy();
});
test("syncs with data", function () {
  var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_HorizontalBarChart.default, {
    data: {
      a: 10
    }
  })),
      container = _render3.container,
      rerender = _render3.rerender;

  var data = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
  };
  rerender(_react.default.createElement(_HorizontalBarChart.default, {
    data: data
  }));
  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});