import React, { memo, useState, useEffect, useMemo } from "react";

import getColorList from "./get-color-list";
import useScalarAnimation from "./use-scalar-animation";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = (data, colors, scalar) => {
  const total = Object.keys(data).reduce((accum, key) => accum + data[key], 0);
  let cursor = 0;

  return Object.keys(data).map((key, index) => {
    const percent = data[key] / total * scalar;
    const largeArc = percent > 0.5 ? 1 : 0;

    const [startX, startY] = getCoords(cursor);

    cursor += percent;
    const [endX, endY] = getCoords(cursor);

    return {
      key,
      outerPath: [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArc} 1 ${endX} ${endY}`,
        `L 0 0 Z`
      ].join(" "),
      innerPath: [
        `M ${startX * .95} ${startY * .95}`,
        `A .95 .95 0 ${largeArc} 1 ${endX * .95} ${endY * .95}`,
        `L 0 0 Z`
      ].join(" "),
      color: colors[index]
    };
  });
};

const PieChart = memo(({ data }) => {
  const colors = useMemo(() => getColorList(Object.keys(data).length), [data]);
  const [scalar, opacity] = useScalarAnimation();

  return (
    <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
      {getSlices(data, colors, scalar).map(({ key, outerPath, innerPath, color }) => (
        <g key={key}>
          <path d={outerPath} fill={color} opacity={opacity * .5} />
          <path d={innerPath} fill={color} opacity={opacity} />
        </g>
      ))}
    </svg>
  );
});

export default PieChart;
