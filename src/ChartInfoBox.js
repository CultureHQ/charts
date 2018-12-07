import React, { PureComponent } from "react";

class ChartInfoBox extends PureComponent {
  constructor(props) {
    super(props);

    this.infoBoxRef = React.createRef();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown(event) {
    const { onDeselect } = this.props;

    if (event.key === "Escape") {
      onDeselect();
    }
  }

  handleClick(event) {
    const { onDeselect } = this.props;

    if (event.target === this.infoBoxRef.current) {
      onDeselect();
    }
  }

  render() {
    const { data, activeKey, onDeselect } = this.props;

    let className = "chq-charts--info";
    if (activeKey) {
      className = `${className} chq-charts--info-show`;
    }

    return (
      <div
        ref={this.infoBoxRef}
        className={className}
        role="button"
        tabIndex={activeKey ? 0 : -1}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        {activeKey && (
          <span>
            {activeKey}
            <br />
            <br />
            Value:
            {" "}
            <span className="chq-charts--mono">{data[activeKey]}</span>
            <br />
            <br />
            <button type="button" onClick={onDeselect}>← Back</button>
          </span>
        )}
      </div>
    );
  }
}

export default ChartInfoBox;
