import React, { memo } from "react";

import getColorList from "./get-color-list";

const HorizontalBarChart = memo(({ data }) => {
  const colors = getColorList(Object.keys(data).length);

  const maxValue = Math.max(...Object.values(data));
  const maxKeyLen = Math.max(...Object.keys(data).map(key => key.length));

  const maxX = (maxKeyLen + 2) * 10 + 250;
  const maxY = (Object.keys(data).length - 1) * 40 + 25;

  return (
    <svg viewBox={`0 0 ${maxX} ${maxY}`}>
      {Object.keys(data).map((key, index) => (
        <g key={key}>
          <text x={(maxKeyLen + 1) * 10} y={index * 40} dy="1em" textAnchor="end">
            {key}
          </text>
          <rect
            className="chq-charts--hori-bar"
            width={(data[key] / maxValue) * 250}
            height={25}
            x={(maxKeyLen + 2) * 10}
            y={index * 40}
            fill={colors[index]}
          />
        </g>
      ))}
    </svg>
  );
});

export default HorizontalBarChart;
