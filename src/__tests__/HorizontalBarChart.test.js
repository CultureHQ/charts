import React from "react";
import { render, fireEvent } from "react-testing-library";

import HorizontalBarChart from "../HorizontalBarChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<HorizontalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});

test("allows interacting with bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };

  const { container, debug } = render(<HorizontalBarChart data={data} />);
  const barGroup = container.querySelector(".chq-charts--hori-bar-group");
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
  const { container, rerender, debug } = render(<HorizontalBarChart data={{ a: 10 }} />);

  const data = { a: 10, b: 20, c: 30, d: 40 };
  rerender(<HorizontalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});
