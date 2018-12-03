import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import PieChart from "../PieChart";

test("renders slices", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<PieChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});

test("allows interacting with slices", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };

  const { container } = render(<PieChart data={data} />);
  const pieSlice = container.querySelector(".chq-charts--pie-slice");
  const getInfoOpen = () => container.querySelector(".chq-charts--info-show");

  fireEvent.click(pieSlice);
  expect(getInfoOpen()).toBeTruthy();

  fireEvent.click(pieSlice);
  expect(getInfoOpen()).toBeFalsy();

  fireEvent.keyDown(pieSlice, { key: "Enter" });
  expect(getInfoOpen()).toBeTruthy();

  fireEvent.keyDown(pieSlice, { key: "Escape" });
  expect(getInfoOpen()).toBeFalsy();

  fireEvent.keyDown(pieSlice, { key: "Shift" });
  expect(getInfoOpen()).toBeFalsy();
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
