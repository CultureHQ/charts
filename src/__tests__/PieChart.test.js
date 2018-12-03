import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

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

test("syncs with data", () => {
  const { container, rerender } = render(<PieChart data={{ a: 10 }} />);

  const data = { a: 10, b: 20, c: 30, d: 40 };
  rerender(<PieChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});

test("finishes animation and cancels interval", async () => {
  const { getByText } = render(<PieChart data={{ a: 10, b: 0 }} />);

  await new Promise(resolve => setTimeout(resolve, 2000));
  await waitForElement(() => getByText("100% (10)"));
});
