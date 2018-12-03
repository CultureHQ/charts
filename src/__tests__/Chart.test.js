import React from "react";
import { render, fireEvent } from "react-testing-library";

import Chart from "../Chart";

const DummyChartSVG = ({ onToggle, svgRef }) => (
  <div ref={svgRef}>
    <button type="button" onClick={() => onToggle("a")}>Toggle</button>
  </div>
);

const DummyChart = props => <Chart component={DummyChartSVG} {...props} />;

test("allows interacting with the info box", () => {
  const { container, getByText } = render(<DummyChart data={{ a: 10 }} />);

  fireEvent.click(getByText("Toggle"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  fireEvent.click(container.querySelector(".chq-charts--info span"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  fireEvent.click(container.querySelector(".chq-charts--info"));
  expect(container.querySelector(".chq-charts--info-show")).toBeFalsy();

  fireEvent.click(getByText("Toggle"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  fireEvent.keyDown(container.querySelector(".chq-charts--info"), { key: "Shift" });
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();

  fireEvent.keyDown(container.querySelector(".chq-charts--info"), { key: "Escape" });
  expect(container.querySelector(".chq-charts--info-show")).toBeFalsy();
});

test("tracks hovering status", () => {
  const { container } = render(<DummyChart data={{ a: 10 }} />);
  const getExportsTabIndex = () => container.querySelector(".chq-charts--export a").tabIndex;

  fireEvent.mouseEnter(container.querySelector(".chq-charts--wrap"));
  expect(getExportsTabIndex()).toEqual(0);

  fireEvent.mouseLeave(container.querySelector(".chq-charts--wrap"));
  expect(getExportsTabIndex()).toEqual(-1);
});
