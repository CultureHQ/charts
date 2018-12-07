import React, { PureComponent } from "react";

import getColorList from "./getColorList";
import Chart from "./Chart";
import ChartSegment from "./ChartSegment";

const makeChartConfig = data => {
  const keys = Object.keys(data);
  const colors = getColorList(keys.length);

  const maxValue = Math.max(...Object.values(data));
  const maxKeyLen = Math.max(...keys.map(key => key.length));

  const maxX = (maxKeyLen + 3) * 10 + 250;
  const maxY = (keys.length - 1) * 40 + 25;

  const startX = (maxKeyLen + 3) * 10 - 5;

  return { keys, colors, maxValue, maxKeyLen, maxX, maxY, startX };
};

const ChartBarGroup = ({
  maxKeyLen, maxValue, startX, index, isLast, dataKey, dataValue, color,
  tabIndex, onClick, onKeyDown
}) => {
  const perc = maxValue ? (dataValue / maxValue) : 0;

  return (
    <g>
      <text x={(maxKeyLen + 1) * 10} y={index * 40} dy="1em" textAnchor="end">
        {dataKey}
      </text>
      {dataValue !== 0 && (
        <text
          x={startX + perc * 250 + 10}
          y={index * 40 + 17.5}
          textAnchor="left"
        >
          {dataValue}
        </text>
      )}
      <g
        className="chq-charts--hori-bar-group"
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <rect
          width={perc * 250}
          height={25}
          x={startX}
          y={index * 40}
          fill={color}
        />
        <rect
          className="chq-charts--bar-shadow"
          width={perc * 250 + 5}
          height={35}
          x={startX}
          y={index * 40 - 5}
          fill={color}
        />
      </g>
      {!isLast && (
        <line
          x1={startX - 10}
          y1={(index + 1) * 40 - 7.5}
          x2={startX + 10}
          y2={(index + 1) * 40 - 7.5}
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
    const { data, activeKey, onDeselect, onToggle, svgRef } = this.props;
    const { chartConfig } = this.state;

    const { keys, colors, maxValue, maxKeyLen, maxX, maxY, startX } = chartConfig;

    return (
      <svg
        className="chq-charts--chart chq-charts--hori-bar"
        viewBox={`0 0 ${maxX + 15} ${maxY + 10}`}
        ref={svgRef}
      >
        {keys.map((key, index) => (
          <ChartBar
            key={key}
            maxKeyLen={maxKeyLen}
            maxValue={maxValue}
            startX={startX}
            index={index}
            isLast={index === keys.length - 1}
            activeKey={activeKey}
            dataKey={key}
            dataValue={data[key]}
            color={colors[index]}
            onDeselect={onDeselect}
            onToggle={onToggle}
          />
        ))}
        <line
          x1={startX - 5}
          y1={-10}
          x2={startX - 5}
          y2={maxY + 10}
          stroke="#ccc"
          strokeWidth={1}
        />
      </svg>
    );
  }
}

const HorizontalBarChart = ({ className, data }) => (
  <Chart className={className} component={ChartSVG} data={data} />
);

export default HorizontalBarChart;
