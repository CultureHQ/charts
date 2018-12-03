import React from "react";
import { render, fireEvent } from "react-testing-library";

import VerticalBarChart from "../VerticalBarChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<VerticalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--vert-bar-group")).toHaveLength(4);
});

test("allows interacting with bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };

  const { container } = render(<VerticalBarChart data={data} />);
  const barGroup = container.querySelector(".chq-charts--vert-bar-group");
  const getInfoOpen = () => container.querySelector(".chq-charts--info-show");

  fireEvent.click(barGroup);
  expect(getInfoOpen()).toBeTruthy();

  fireEvent.click(barGroup);
  expect(getInfoOpen()).toBeFalsy();

  fireEvent.keyDown(barGroup, { key: "Enter" });
  expect(getInfoOpen()).toBeTruthy();

  fireEvent.keyDown(barGroup, { key: "Escape" });
  expect(getInfoOpen()).toBeFalsy();

  fireEvent.keyDown(barGroup, { key: "Shift" });
  expect(getInfoOpen()).toBeFalsy();
});

test("syncs with data", () => {
  const { container, rerender } = render(<VerticalBarChart data={{ a: 10 }} />);

  const data = { a: 10, b: 20, c: 30, d: 40 };
  rerender(<VerticalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--vert-bar-group")).toHaveLength(4);
});
