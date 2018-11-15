import React from "react";
import getColorList from "./get-color-list";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = data => {
  const total = Object.keys(data).reduce((accum, key) => accum + data[key], 0);
  const colors = getColorList(Object.keys(data).length);
  let cursor = 0;

  return Object.keys(data).map((key, index) => {
    const percent = data[key] / total;
    const largeArc = percent > 0.5 ? 1 : 0;

    const [startX, startY] = getCoords(cursor);

    cursor += percent;
    const [endX, endY] = getCoords(cursor);

    return {
      key,
      d: `M ${startX} ${startY} A 1 1 0 ${largeArc} 1 ${endX} ${endY} L 0 0`,
      color: colors[index]
    };
  });
};

const PieChart = ({ data }) => (
  <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
    {getSlices(data).map(({ key, d, color }) => (
      <path key={key} d={d} fill={color} />
    ))}
  </svg>
);

export default PieChart;
