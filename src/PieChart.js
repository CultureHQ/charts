import React, { PureComponent } from "react";

import getColorList from "./getColorList";
import Chart from "./Chart";
import ChartSegment from "./ChartSegment";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [
  Math.cos(TWO_PI * (percent - 0.25)),
  Math.sin(TWO_PI * (percent - 0.25))
];

const getLegendAlignment = centerPerc => {
  if (centerPerc >= 0.125 && centerPerc < 0.375) {
    return ["start", 1.1];
  }
  if (centerPerc >= 0.625 && centerPerc < 0.875) {
    return ["end", 1.1];
  }
  return ["middle", 1.25];
};

const getSlices = (data, ellipsized, scalar) => {
  const total = Object.keys(data).reduce((accum, key) => accum + data[key], 0);

  let cursor = 0;
  const slices = [];

  Object.keys(data).forEach(key => {
    if (data[key] === 0) {
      return;
    }

    const percent = data[key] / total * scalar;
    const largeArc = percent > 0.5 ? 1 : 0;

    const centerPerc = cursor + percent / 2;
    const [textAnchor, legendScalar] = getLegendAlignment(cursor + percent / 2);

    const [startX, startY] = getCoords(cursor);
    const [centerX, centerY] = getCoords(centerPerc);
    const [endX, endY] = getCoords(cursor + percent);

    cursor += percent;

    slices.push({
      key,
      labelTop: ellipsized[key],
      labelBottom: `${Math.round(percent * 10000) / 100}% (${data[key]})`,
      outerPath: [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArc} 1 ${endX} ${endY}`,
        "L 0 0 Z"
      ].join(" "),
      innerPath: [
        `M ${startX * 0.95} ${startY * 0.95}`,
        `A 0.95 0.95 0 ${largeArc} 1 ${endX * 0.95} ${endY * 0.95}`,
        "L 0 0 Z"
      ].join(" "),
      legend: [centerX * legendScalar, centerY * legendScalar],
      leaderLine: {
        x1: centerX * 0.75,
        y1: centerY * 0.75,
        x2: centerX * 1.02,
        y2: centerY * 1.02
      },
      textAnchor
    });
  });

  return slices;
};

const getScalar = time => {
  if (time < 0.5) {
    return 8 * (time ** 4);
  }

  const inverse = 1 - time;
  return 1 - 8 * (inverse ** 4);
};

const PieChartGroup = ({ outerPath, innerPath, color, onClick, onKeyDown, tabIndex }) => (
  <g
    className="chq-charts--pie-slice"
    tabIndex={tabIndex}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <path d={outerPath} fill={color} />
    <path d={innerPath} fill={color} />
  </g>
);

const PieChartSlice = props => <ChartSegment component={PieChartGroup} {...props} />;

class PieChartSVG extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      colors: getColorList(Object.keys(props.data).length),
      slices: getSlices(props.data, props.ellipsized, getScalar(0))
    };
  }

  componentDidMount() {
    this.beginInterval();
  }

  componentDidUpdate(prevProps) {
    const { data, ellipsized } = this.props;

    if (data !== prevProps.data) {
      clearInterval(this.interval);

      this.setState({
        colors: getColorList(Object.keys(data).length),
        slices: getSlices(data, ellipsized, getScalar(0))
      });

      this.beginInterval();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  beginInterval() {
    const { data, ellipsized } = this.props;
    let time = 0;

    this.interval = setInterval(() => {
      time += 0.015;

      if (time >= 1) {
        clearInterval(this.interval);
        return;
      }

      this.setState({ slices: getSlices(data, ellipsized, getScalar(time)) });
    }, 20);
  }

  render() {
    const { onToggle, onDeselect, svgRef } = this.props;
    const { colors, slices } = this.state;

    return (
      <svg
        className="chq-charts--chart"
        viewBox="-1.4 -1.4 2.8 2.8"
        ref={svgRef}
      >
        {slices.map(({ key, outerPath, innerPath }, index) => (
          <PieChartSlice
            key={key}
            dataKey={key}
            outerPath={outerPath}
            innerPath={innerPath}
            color={colors[index]}
            onToggle={onToggle}
            onDeselect={onDeselect}
          />
        ))}
        {slices.map(({ key, labelTop, labelBottom, legend: [x, y], leaderLine, textAnchor }) => (
          <g key={key} className="chq-charts--noselect">
            <line {...leaderLine} stroke="#666" strokeWidth={0.01} />
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              fontSize={0.12}
            >
              <tspan x={x} y={y}>{labelTop}</tspan>
              <tspan x={x} y={y} dy=".15">{labelBottom}</tspan>
            </text>
          </g>
        ))}
      </svg>
    );
  }
}

const PieChart = props => <Chart component={PieChartSVG} {...props} />;

export default PieChart;
