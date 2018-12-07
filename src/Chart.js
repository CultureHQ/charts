import React, { PureComponent } from "react";

import ChartExports from "./ChartExports";
import ChartInfoBox from "./ChartInfoBox";

const ellipsizeKeys = data => {
  const ellipsized = {};

  Object.keys(data).forEach(key => {
    const string = key.toString();
    ellipsized[key] = string.length >= 12 ? `${string.slice(0, 10)}...` : string;
  });

  return ellipsized;
};

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
    this.state = {
      activeKey: null,
      ellipsized: ellipsizeKeys(props.data),
      hovering: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.setState({ ellipsized: ellipsizeKeys(data) });
    }
  }

  handleMouseEnter() {
    this.setState({ hovering: true });
  }

  handleMouseLeave() {
    this.setState({ hovering: false });
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
    const { className, data, component: Component, ...props } = this.props;
    const { activeKey, ellipsized, hovering } = this.state;

    let classList = "chq-charts--wrap";
    if (className) {
      classList = `${classList} ${className}`;
    }

    return (
      <div
        className={classList}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Component
          {...props}
          data={data}
          ellipsized={ellipsized}
          activeKey={activeKey}
          onDeselect={this.handleDeselect}
          onToggle={this.handleToggle}
          svgRef={this.svgRef}
        />
        <ChartInfoBox
          data={data}
          activeKey={activeKey}
          onDeselect={this.handleDeselect}
        />
        <ChartExports
          data={data}
          hovering={hovering}
          svgRef={this.svgRef}
        />
      </div>
    );
  }
}

export default Chart;
