import React, { PureComponent, memo } from "react";

import getColorList from "./getColorList";
import ChartInfoBox from "./ChartInfoBox";

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

class ChartBar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick() {
    const { onToggle, dataKey } = this.props;

    onToggle(dataKey);
  }

  handleKeyDown(event) {
    const { dataKey, onDeselect, onToggle } = this.props;

    switch (event.key) {
      case "Enter":
        onToggle(dataKey);
        break;
      case "Escape":
        onDeselect();
        break;
      default:
        break;
    }
  }

  render() {
    const { maxKeyLen, maxValue, startX, index, isLast, activeKey, dataKey, dataValue, color } = this.props;

    return (
      <g>
        <text x={(maxKeyLen + 1) * 10} y={index * 40} dy="1em" textAnchor="end">
          {dataKey}
        </text>
        <text
          x={startX + (dataValue / maxValue) * 250 + 10}
          y={index * 40 + 17.5}
          textAnchor="left"
        >
          {dataValue}
        </text>
        <g
          className="chq-charts--hori-bar-group"
          tabIndex={activeKey ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <rect
            width={(dataValue / maxValue) * 250}
            height={25}
            x={startX}
            y={index * 40}
            fill={color}
          />
          <rect
            className="chq-charts--bar-shadow"
            width={(dataValue / maxValue) * 250 + 5}
            height={35}
            x={startX}
            y={index * 40 - 5}
            fill={color}
          />
        </g>
        {!isLast && (
          <line
            x1={startX - 10} y1={(index + 1) * 40 - 7.5}
            x2={startX + 10} y2={(index + 1) * 40 - 7.5}
            stroke="#ccc"
            strokeWidth={1}
          />
        )}
      </g>
    );
  }
}

const ChartSVG = memo(({ data, activeKey, chartConfig, onDeselect, onToggle }) => {
  const { keys, colors, maxValue, maxKeyLen, maxX, maxY, startX } = chartConfig;

  return (
    <svg
      className="chq-charts--chart chq-charts--hori-bar"
      viewBox={`0 0 ${maxX + 15} ${maxY + 10}`}
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
        x1={startX - 5} y1={-10}
        x2={startX - 5} y2={maxY + 10}
        stroke="#ccc"
        strokeWidth={1}
      />
    </svg>
  );
});

class HorizontalBarChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: null,
      chartConfig: makeChartConfig(props.data)
    };

    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.setState({ chartConfig: makeChartConfig(data) });
    }
  }

  handleDeselect() {
    this.setState({ activeKey: null });
  }

  handleToggle(activeKey) {
    this.setState(state => ({
      activeKey: activeKey === state.activeKey ? null : activeKey
    }));
  }

  render() {
    const { data } = this.props;
    const { activeKey, chartConfig } = this.state;

    return (
      <div className="chq-charts--wrap">
        <ChartSVG
          data={data}
          activeKey={activeKey}
          chartConfig={chartConfig}
          onDeselect={this.handleDeselect}
          onToggle={this.handleToggle}
        />
        <ChartInfoBox
          data={data}
          activeKey={activeKey}
          onDeselect={this.handleDeselect}
        />
      </div>
    );
  }
}

export default HorizontalBarChart;
