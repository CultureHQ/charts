import React, { PureComponent } from "react";

import ChartInfoBox from "./ChartInfoBox";

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeKey: null };

    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
    const { data, component: Component } = this.props;
    const { activeKey } = this.state;

    return (
      <div className="chq-charts--wrap">
        <Component
          data={data}
          activeKey={activeKey}
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

export default Chart;
