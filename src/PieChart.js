import React, { Fragment, PureComponent } from "react";
import ReactDOM from "react-dom";

import getColorList from "./getColorList";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = (data, scalar) => {
  const total = Object.keys(data).reduce((accum, key) => accum + data[key], 0);

  let cursor = 0;
  let slices = [];

  Object.keys(data).forEach((key, index) => {
    if (data[key] === 0) {
      return;
    }

    const percent = data[key] / total * scalar;
    const largeArc = percent > 0.5 ? 1 : 0;

    const [startX, startY] = getCoords(cursor);
    const [centerX, centerY] = getCoords(cursor + percent / 2);
    const [endX, endY] = getCoords(cursor + percent);

    cursor += percent;

    slices.push({
      key,
      value: data[key],
      label: `${key} ${Math.round(percent * 10000) / 100}%`,
      outerPath: [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArc} 1 ${endX} ${endY}`,
        `L 0 0 Z`
      ].join(" "),
      innerPath: [
        `M ${startX * .95} ${startY * .95}`,
        `A .95 .95 0 ${largeArc} 1 ${endX * .95} ${endY * .95}`,
        `L 0 0 Z`
      ].join(" "),
      legend: [centerX * 1.2, centerY * 1.2],
      leaderLine: {
        x1: centerX * .75,
        y1: centerY * .75,
        x2: centerX * 1.05,
        y2: centerY * 1.05
      }
    });
  });

  return slices;
};

const getScalar = time => {
  if (time < 0.5) {
    return 8 * Math.pow(time, 4);
  }

  const inverse = 1 - time;
  return 1 - 8 * Math.pow(inverse, 4);
};

class PieChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      colors: getColorList(Object.keys(props.data).length),
      slices: getSlices(props.data, getScalar(0))
    };
  }

  componentDidMount() {
    const { data } = this.props;

    let time = 0;

    this.interval = setInterval(() => {
      time += 0.015;

      if (time >= 1) {
        clearInterval(this.interval);
        return;
      }

      this.setState({ slices: getSlices(data, getScalar(time)) });
    }, 20);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;
    const { colors, slices } = this.state;

    return (
      <svg
        className="chq-charts--chart chq-charts--pie"
        viewBox="-1.2 -1.2 2.4 2.4"
      >
        {slices.map(({ key, outerPath, innerPath }, index) => (
          <g key={key} className="chq-charts--pie-slice" tabIndex={0}>
            <path d={outerPath} fill={colors[index]} />
            <path d={innerPath} fill={colors[index]} />
          </g>
        ))}
        {slices.map(({ key, value, label, legend: [x, y], leaderLine }) => (
          <g key={key} className="chq-charts--noselect">
            <line {...leaderLine} stroke="#666" strokeWidth={0.01} />
            <text
              x={x} y={y}
              textAnchor="middle"
              transform={`rotate(90, ${x}, ${y})`}
              fontSize={0.1}
            >
              <tspan x={x} y={y}>{label}</tspan>
              <tspan x={x} y={y} dy="1.2em">({value})</tspan>
            </text>
          </g>
        ))}
      </svg>
    );
  }
}

export default PieChart;
