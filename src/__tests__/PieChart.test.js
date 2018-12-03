import React from "react";
import { render, fireEvent } from "react-testing-library";

import PieChart from "../PieChart";

test("renders slices", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<PieChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});

test("allows clicking on slices", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<PieChart data={data} />);

  fireEvent.click(container.querySelector(".chq-charts--pie-slice"));
  expect(container.querySelector(".chq-charts--info-show")).toBeTruthy();
});
