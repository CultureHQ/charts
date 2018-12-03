import React from "react";
import { render } from "react-testing-library";

import HorizontalBarChart from "../HorizontalBarChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<HorizontalBarChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--hori-bar-group")).toHaveLength(4);
});
