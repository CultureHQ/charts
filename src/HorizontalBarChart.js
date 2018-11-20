import React, { memo } from "react";

import getColorList from "./getColorList";

const HorizontalBarChart = memo(({ data }) => {
  const keys = Object.keys(data);
  const colors = getColorList(keys.length);

  const maxValue = Math.max(...Object.values(data));
  const maxKeyLen = Math.max(...keys.map(key => key.length));

  const maxX = (maxKeyLen + 3) * 10 + 250;
  const maxY = (keys.length - 1) * 40 + 25;

  const startX = (maxKeyLen + 3) * 10 - 5;

  return (
    <svg className="chq-charts--chart chq-charts--hori-bar" viewBox={`0 0 ${maxX + 15} ${maxY + 10}`}>
      {keys.map((key, index) => (
        <g key={key}>
          <text
            x={(maxKeyLen + 1) * 10} y={index * 40}
            dy="1em"
            textAnchor="end"
          >
            {key}
          </text>
          <text
            x={startX + (data[key] / maxValue) * 250 + 10}
            y={index * 40 + 17.5}
            textAnchor="left"
          >
            {data[key]}
          </text>
          <g className="chq-charts--hori-bar-group" tabIndex={0}>
            <rect
              width={(data[key] / maxValue) * 250}
              height={25}
              x={startX}
              y={index * 40}
              fill={colors[index]}
            />
            <rect
              className="chq-charts--bar-shadow"
              width={(data[key] / maxValue) * 250 + 5}
              height={35}
              x={startX}
              y={index * 40 - 5}
              fill={colors[index]}
            />
          </g>
          {index !== keys.length - 1 && (
            <line
              x1={startX - 10} y1={(index + 1) * 40 - 7.5}
              x2={startX + 10} y2={(index + 1) * 40 - 7.5}
              stroke="#ccc"
              strokeWidth={1}
            />
          )}
        </g>
      ))}
      <line
        x1={startX - 5} y1={-10}
        x2={startX - 5} y2={maxY + 10}
        stroke="#ccc"
        strokeWidth={1}
      />
    </svg>
  );
});

export default HorizontalBarChart;
