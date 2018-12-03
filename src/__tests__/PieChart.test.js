import React from "react";
import { render } from "react-testing-library";

import PieChart from "../PieChart";

test("renders bars", () => {
  const data = { a: 10, b: 20, c: 30, d: 40 };
  const { container } = render(<PieChart data={data} />);

  expect(container.querySelectorAll(".chq-charts--pie-slice")).toHaveLength(4);
});
