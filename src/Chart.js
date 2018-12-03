import React, { PureComponent } from "react";

import ChartExports from "./ChartExports";
import ChartInfoBox from "./ChartInfoBox";

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
    this.state = { activeKey: null, hovering: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    const { className, data, component: Component } = this.props;
    const { activeKey, hovering } = this.state;

    return (
      <div
        className={`chq-charts--wrap ${className || ""}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Component
          data={data}
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
