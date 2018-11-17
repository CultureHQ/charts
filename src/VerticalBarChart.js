import React, { memo } from "react";

import getColorList from "./getColorList";

const VerticalBarChart = memo(({ data }) => {
  const colors = getColorList(Object.keys(data).length);

  const maxValue = Math.max(...Object.values(data));
  const maxX = Object.keys(data).length * 40;

  return (
    <svg viewBox={`0 0 ${maxX} 300`}>
      {Object.keys(data).map((key, index) => {
        const height = (data[key] / maxValue) * 250;

        return (
          <g key={key}>
            <text
              x={index * 40}
              y={280}
              textAnchor="middle"
              transform={`rotate(-30, ${index * 40}, 280)`}
            >
              {key}
            </text>
            <rect
              className="chq-charts--vert-bar"
              width={25}
              height={height}
              x={index * 40}
              y={250 - height}
              fill={colors[index]}
            />
          </g>
        );
      })}
    </svg>
  );
});

export default VerticalBarChart;
