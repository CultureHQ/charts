import React, { memo, useState, useEffect, useMemo } from "react";

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

const PieChartSlice = ({ outerPath, innerPath, color, opacity, scaling }) => {
  const [hovering, setHovering] = useState(false);

  const onMouseEnter = () => setHovering(true);
  const onMouseLeave = () => setHovering(false);

  const transform = hovering && !scaling ? "scale(1.05)" : null;

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ transition: scaling ? null : "transform 300ms" }}
      transform={transform}
    >
      <path
        d={outerPath}
        fill={color}
        opacity={opacity * (hovering ? .6 : .3)}
        style={{ transition: scaling ? null : "opacity 300ms" }}
      />
      <path d={innerPath} fill={color} opacity={opacity} />
    </g>
  );
};

const pieChartStyle = { transform: "rotate(-90deg)", overflow: "visible" };

const PieChart = memo(({ data, style = {} }) => {
  const colors = useMemo(() => getColorList(Object.keys(data).length), [data]);
  const [opacity, scalar, scaling] = useScalarAnimation();

  return (
    <svg viewBox="-1 -1 2 2" style={{ ...pieChartStyle, ...style }}>
      {getSlices(data, scalar).map(({ key, outerPath, innerPath }, index) => (
        <PieChartSlice
          key={key}
          outerPath={outerPath}
          innerPath={innerPath}
          color={colors[index]}
          opacity={opacity}
          scaling={scaling}
        />
      ))}
    </svg>
  );
});

export default PieChart;
