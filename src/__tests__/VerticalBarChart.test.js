import React from "react";
import { render, fireEvent } from "react-testing-library";

import VerticalBarChart from "../VerticalBarChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<VerticalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--vert-bar-group")).toHaveLength(4);
});

test("allows clicking on bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<VerticalBarChart data={data} />);

  fireEvent.click(container.querySelector(".chq-charts--vert-bar-group"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();
});
