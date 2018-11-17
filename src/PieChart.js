import React, { PureComponent } from "react";

import getColorList from "./getColorList";

const TWO_PI = 2 * Math.PI;
const getCoords = percent => [Math.cos(TWO_PI * percent), Math.sin(TWO_PI * percent)];

const getSlices = (data, scalar) => {
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
      outerPath: [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArc} 1 ${endX} ${endY}`,
        `L 0 0 Z`
      ].join(" "),
      innerPath: [
        `M ${startX * .95} ${startY * .95}`,
        `A .95 .95 0 ${largeArc} 1 ${endX * .95} ${endY * .95}`,
        `L 0 0 Z`
      ].join(" ")
    };
  });
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
      scalar: 0
    };
  }

  componentDidMount() {
    let time = 0;

    this.interval = setInterval(() => {
      time += 0.015;

      if (time >= 1) {
        clearInterval(this.interval);
        return;
      }

      this.setState({ scalar: getScalar(time) });
    }, 20);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;
    const { colors, scalar } = this.state;

    return (
      <svg className="chq-charts--pie" viewBox="-1 -1 2 2">
        {getSlices(data, scalar).map(({ key, outerPath, innerPath }, index) => (
          <g key={key} className="chq-charts--pie-slice">
            <path d={outerPath} fill={colors[index]} />
            <path d={innerPath} fill={colors[index]} />
          </g>
        ))}
      </svg>
    );
  }
}

export default PieChart;
