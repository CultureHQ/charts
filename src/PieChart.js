import React, { Component } from "react";
import getColorList from "./get-color-list";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = (data, scalar, colors) => {
  const total = Object.keys(data).reduce((accum, key) => accum + data[key], 0);
  let cursor = 0;

  return Object.keys(data).map((key, index) => {
    const percent = data[key] / total * scalar;
    const largeArc = percent > 0.5 ? 1 : 0;

    const [startX, startY] = getCoords(cursor);

    cursor += percent;
    const [endX, endY] = getCoords(cursor);

    return {
      key,
      d: `M ${startX} ${startY} A 1 1 0 ${largeArc} 1 ${endX} ${endY} L 0 0`,
      color: colors[index]
    };
  });
};

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scalar: 0,
      colors: getColorList(Object.keys(props.data).length)
    };
  }

  componentDidMount() {
    let time = 0;

    this.interval = setInterval(() => {
      this.setState(({ scalar }) => {
        time += 0.015;

        if (time >= 1) {
          clearInterval(this.interval);
          return {};
        }

        if (time < 0.5) {
          return { scalar: 8 * Math.pow(time, 4) };
        }

        const inverse = 1 - time;
        return { scalar: 1 - 8 * Math.pow(inverse, 4) };
      });
    }, 20);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;
    const { scalar, colors } = this.state;

    const slices = getSlices(data, scalar, colors);

    return (
      <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
        {slices.map(({ key, d, color }) => (
          <path key={key} d={d} fill={color} />
        ))}
      </svg>
    );
  }
};

export default PieChart;
