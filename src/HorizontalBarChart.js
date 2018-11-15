import React from "react";
import getColorList from "./get-color-list";

const HorizontalBarChart = ({ results }) => {
  const colors = getColorList(Object.keys(results).length);

  const maxValue = Math.max(...Object.values(results));
  const maxKeyLen = Math.max(...Object.keys(results).map(key => key.length));

  const maxX = (maxKeyLen + 2) * 10 + 300;
  const maxY = (Object.keys(results).length - 1) * 40 + 25;

  return (
    <svg viewBox={`0 0 ${maxX} ${maxY}`}>
      {Object.keys(results).map((key, index) => (
        <g key={key}>
          <text x={(maxKeyLen + 1) * 10} y={index * 40} dy="1em" text-anchor="end">
            {key}
          </text>
          <rect
            width={(results[key] / maxValue) * 300}
            height={25}
            x={(maxKeyLen + 2) * 10}
            y={index * 40}
            fill={colors[index]}
            style={{ transformBox: "fill-box" }}
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              from="0 1"
              to="1 1"
              begin="0s"
              dur="1s"
              repeatCount="0"
              keySplines="0.4, 0, 0.2, 1"
              keyTimes="0; 1"
              calcMode="spline"
            />
          </rect>
        </g>
      ))}
    </svg>
  );
};

export default HorizontalBarChart;
