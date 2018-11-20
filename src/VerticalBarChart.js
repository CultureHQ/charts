import React, { memo } from "react";

import getColorList from "./getColorList";

const VerticalBarChart = memo(({ data }) => {
  const keys = Object.keys(data);
  const colors = getColorList(keys.length);

  const maxValue = Math.max(...Object.values(data));
  const maxX = keys.length * 40;

  return (
    <svg className="chq-charts--chart chq-charts--vert-bar" viewBox={`0 0 ${maxX} 325`}>
      {Object.keys(data).map((key, index) => {
        const height = (data[key] / maxValue) * 250;

        return (
          <g key={key}>
            <text
              x={index * 40} y={305}
              textAnchor="middle"
              transform={`rotate(-30, ${index * 40}, 305)`}
            >
              {key}
            </text>
            <text
              x={index * 40 + (25 / 2)} y={265 - height}
              textAnchor="middle"
            >
              {data[key]}
            </text>
            {height !== 0 && (
              <g className="chq-charts--vert-bar-group" tabIndex={0}>
                <rect
                  width={25}
                  height={height}
                  x={index * 40} y={275 - height}
                  fill={colors[index]}
                />
                <rect
                  className="chq-charts--bar-shadow"
                  width={35}
                  height={height + 5}
                  x={index * 40 - 5} y={270 - height}
                  fill={colors[index]}
                />
              </g>
            )}
            {index !== keys.length - 1 && (
              <line
              x1={(index + 1) * 40 - 7.5} y1={285}
                x2={(index + 1) * 40 - 7.5} y2={265}
                stroke="#ccc"
                strokeWidth={1}
              />
            )}
          </g>
        );
      })}
      <line
        x1={-10} y1={280}
        x2={maxX} y2={280}
        stroke="#ccc"
        strokeWidth={1}
      />
    </svg>
  );
});

export default VerticalBarChart;
