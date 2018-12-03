import React, { PureComponent } from "react";

class ChartSegment extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick() {
    const { dataKey, onToggle } = this.props;

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
    const { activeKey, component: Component, ...props } = this.props;

    return (
      <Component
        tabIndex={activeKey ? -1 : 0}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        {...props}
      />
    );
  }
}

export default ChartSegment;
