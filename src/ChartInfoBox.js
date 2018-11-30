import React, { PureComponent } from "react";

const getRoundedMean = data => {
  let sum = 0;
  for (const key in data) {
    sum += data[key];
  }

  return Math.round(sum / Object.keys(data).length * 100) / 100;
};

class ChartInfoBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { roundedMean: getRoundedMean(props.data) };

    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  render() {
    const { data, activeKey, onDeselect } = this.props;
    const { roundedMean } = this.state;

    let className = "chq-charts--info";
    if (activeKey) {
      className = `${className} chq-charts--info-show`;
    }

    return (
      <div
        className={className}
        tabIndex={activeKey ? 0 : -1}
        onKeyDown={this.handleKeyDown}
      >
        {activeKey && (
          <>
            {activeKey}
            <br /><br />
            Value: <span className="chq-charts--mono">{data[activeKey]}</span>
            <br />
            Mean: <span className="chq-charts--mono">{roundedMean}</span>
            <br /><br />
            <button type="button" onClick={onDeselect}>← Back</button>
          </>
        )}
      </div>
    );
  }
}

export default ChartInfoBox;
