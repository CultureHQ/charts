import React from "react";
import { render, fireEvent } from "react-testing-library";

import HorizontalBarChart from "../HorizontalBarChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<HorizontalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});

test("allows clicking on bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<HorizontalBarChart data={data} />);

  fireEvent.click(container.querySelector(".chq-charts--hori-bar-group"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();
});

test("syncs with data", () => {
  const { container, rerender } = render(<HorizontalBarChart data={{ a: 10 }} />);

  const data = { a: 10, b: 20, c: 30, d: 40 };
  rerender(<HorizontalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});
