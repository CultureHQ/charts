import React, { PureComponent } from "react";

import getColorList from "./getColorList";
import getMaximum from "./getMaximum";
import Chart from "./Chart";
import ChartSegment from "./ChartSegment";

const makeChartConfig = data => {
  const keys = Object.keys(data);
  const colors = getColorList(keys.length);

  const maxValue = getMaximum(data);
  const maxX = keys.length * 40;

  return { keys, colors, maxValue, maxX };
};

const ChartBarGroup = ({
  dataValue, ellipsized, maxValue, index, color, isLast, tabIndex, onClick,
  onKeyDown, rotateKeys
}) => {
  const height = maxValue ? (dataValue / maxValue) * 250 : 0;

  return (
    <g>
      <text
        x={index * 40 + (rotateKeys ? 0 : (25 / 2))}
        y={305}
        textAnchor="middle"
        transform={rotateKeys ? `rotate(-30, ${index * 40}, 305)` : null}
      >
        {ellipsized}
      </text>
      {dataValue !== 0 && (
        <text
          x={index * 40 + (25 / 2)}
          y={265 - height}
          textAnchor="middle"
        >
          {dataValue}
        </text>
      )}
      {height !== 0 && (
        <g
          className="chq-charts--vert-bar-group"
          tabIndex={tabIndex}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          <rect
            width={25}
            height={height}
            x={index * 40}
            y={275 - height}
            fill={color}
          />
          <rect
            className="chq-charts--bar-shadow"
            width={35}
            height={height + 5}
            x={index * 40 - 5}
            y={270 - height}
            fill={color}
          />
        </g>
      )}
      {!isLast && (
        <line
          x1={(index + 1) * 40 - 7.5}
          y1={285}
          x2={(index + 1) * 40 - 7.5}
          y2={265}
          stroke="#ccc"
          strokeWidth={1}
        />
      )}
    </g>
  );
};

const ChartBar = props => <ChartSegment component={ChartBarGroup} {...props} />;

class ChartSVG extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { chartConfig: makeChartConfig(props.data) };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.setState({ chartConfig: makeChartConfig(data) });
    }
  }

  render() {
    const { data, ellipsized, onToggle, onDeselect, rotateKeys = true, svgRef } = this.props;
    const { chartConfig } = this.state;

    const { keys, colors, maxValue, maxX } = chartConfig;

    return (
      <svg
        className="chq-charts--chart chq-charts--vert-bar"
        viewBox={`0 0 ${maxX} 325`}
        ref={svgRef}
      >
        {keys.map((key, index) => (
          <ChartBar
            key={key}
            dataKey={key}
            dataValue={data[key]}
            ellipsized={ellipsized[key]}
            maxValue={maxValue}
            index={index}
            color={colors[index]}
            isLast={index === keys.length - 1}
            onToggle={onToggle}
            onDeselect={onDeselect}
            rotateKeys={rotateKeys}
          />
        ))}
        <line
          x1={-10}
          y1={280}
          x2={maxX}
          y2={280}
          stroke="#ccc"
          strokeWidth={1}
        />
      </svg>
    );
  }
}

const VerticalBarChart = props => <Chart component={ChartSVG} {...props} />;

export default VerticalBarChart;
