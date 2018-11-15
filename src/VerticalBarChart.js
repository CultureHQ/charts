import React, { memo, useMemo } from "react";

import getColorList from "./get-color-list";
import useScalarAnimation from "./use-scalar-animation";

const getChartConfig = data => ({
  colors: getColorList(Object.keys(data).length),
  maxValue: Math.max(...Object.values(data)),
  maxX: Object.keys(data).length * 40
});

const VerticalBarChart = memo(({ data, style = {} }) => {
  const { colors, maxValue, maxX } = useMemo(() => getChartConfig(data), [data]);
  const [scalar, opacity] = useScalarAnimation();

  return (
    <svg viewBox={`0 0 ${maxX} 300`} style={style}>
      {Object.keys(data).map((key, index) => {
        const height = (data[key] / maxValue) * 250 * scalar;

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
              width={25}
              height={height}
              x={index * 40}
              y={250 - height}
              fill={colors[index]}
              style={{ transformBox: "fill-box" }}
              opacity={opacity}
            />
          </g>
        );
      })}
    </svg>
  );
});

export default VerticalBarChart;
