import React from "react";
import { render, fireEvent } from "react-testing-library";

import Chart from "../Chart";

const DummyChartSVG = ({ data, onToggle, svgRef }) => (
  <div ref={svgRef}>
    {Object.keys(data).map(key => (
      <em key={key}>{key}</em>
    ))}
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

test("allows passing in className", () => {
  const { container } = render(<DummyChart className="dummy" data={{ a: 10 }} />);

  expect(container.querySelector(".chq-charts--wrap").classList).toContain("dummy");
});

test("shortens names", () => {
  const data = { thisisasuperlongkey: 10, shortkey: 20 };
  const { getByText } = render(<DummyChart data={data} />);

  expect(getByText("thisisasup...")).toBeTruthy();
  expect(getByText("shortkey")).toBeTruthy();
});
