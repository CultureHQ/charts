"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _PieChart = _interopRequireDefault(require("../PieChart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("renders slices", function () {
  var data = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
  };

  var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_PieChart.default, {
    data: data
  })),
      container = _render.container;

  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});
test("allows interacting with slices", function () {
  var data = {
    a: 10,
    b: 20,
    c: 30,
    d: 40
  };

  var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_PieChart.default, {
    data: data
  })),
      container = _render2.container;

  var pieSlice = container.querySelector(".chq-charts--pie-slice");

  var getInfoOpen = function getInfoOpen() {
    return container.querySelector(".chq-charts--info-show");
  };

  _reactTestingLibrary.fireEvent.click(pieSlice);

  expect(getInfoOpen()).toBeTruthy();

  _reactTestingLibrary.fireEvent.click(pieSlice);

  expect(getInfoOpen()).toBeFalsy();

  _reactTestingLibrary.fireEvent.keyDown(pieSlice, {
    key: "Enter"
  });

  expect(getInfoOpen()).toBeTruthy();

  _reactTestingLibrary.fireEvent.keyDown(pieSlice, {
    key: "Escape"
  });

  expect(getInfoOpen()).toBeFalsy();

  _reactTestingLibrary.fireEvent.keyDown(pieSlice, {
    key: "Shift"
  });

  expect(getInfoOpen()).toBeFalsy();
});
test("syncs with data", function () {
  var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_PieChart.default, {
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
  rerender(_react.default.createElement(_PieChart.default, {
    data: data
  }));
  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});
test("finishes animation and cancels interval",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _render4, getByText;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_PieChart.default, {
            data: {
              a: 10,
              b: 0
            }
          })), getByText = _render4.getByText;
          _context.next = 3;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
          });

        case 3:
          _context.next = 5;
          return (0, _reactTestingLibrary.waitForElement)(function () {
            return getByText("100% (10)");
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));