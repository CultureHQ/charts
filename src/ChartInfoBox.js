import React, { PureComponent } from "react";

const getRoundedMean = data => {
  const sum = Object.values(data).reduce((accum, value) => accum + value, 0);

  return Math.round(sum / Object.keys(data).length * 100) / 100;
};

class ChartInfoBox extends PureComponent {
  constructor(props) {
    super(props);

    this.infoBoxRef = React.createRef();
    this.state = { roundedMean: getRoundedMean(props.data) };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.setState({ roundedMean: getRoundedMean(data) });
    }
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
    const { roundedMean } = this.state;

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
            Mean:
            {" "}
            <span className="chq-charts--mono">{roundedMean}</span>
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
