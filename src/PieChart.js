import React, { PureComponent, memo, useState, useEffect, useMemo } from "react";

import getColorList from "./get-color-list";
import useScalarAnimation from "./use-scalar-animation";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = (data, scalar) => {
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
      ].join(" ")
    };
  });
};

const PieChart = memo(({ data }) => {
  const colors = useMemo(() => getColorList(Object.keys(data).length), [data]);
  const [opacity, scalar, scaling] = useScalarAnimation();

  return (
    <svg className="chq-charts--pie" viewBox="-1 -1 2 2">
      {getSlices(data, scalar).map(({ key, outerPath, innerPath }, index) => (
        <g key={key} className="chq-charts--pie-slice">
          <path d={outerPath} fill={colors[index]} opacity={opacity} />
          <path d={innerPath} fill={colors[index]} opacity={opacity} />
        </g>
      ))}
    </svg>
  );
});

export default PieChart;
