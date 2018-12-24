import React, { PureComponent } from "react";

const makeCSVCell = value => (
  (value || value === 0) ? `"${value.toString().replace(/"/g, "\"\"")}"` : ""
);

const makeCSVExport = data => {
  const csvEntries = Object.keys(data).map(key => (
    `${makeCSVCell(key)},${makeCSVCell(data[key])}`
  ));

  const csvContent = ["Key,Value"].concat(csvEntries).join("\n");
  return `data:text/csv;charset=utf-8;base64,${btoa(csvContent)}`;
};

const makePNGExport = imageSrc => new Promise(resolve => {
  const canvas = document.createElement("canvas");

  const size = 800;
  const padding = 100;

  canvas.width = size;
  canvas.height = size;

  const image = new Image();
  image.onload = () => {
    const context = canvas.getContext("2d");
    context.fillStyle = "white";

    context.fillRect(0, 0, size, size);
    context.drawImage(
      image, 0, 0, size, size,
      padding, padding, size - padding * 2, size - padding * 2
    );

    resolve(canvas.toDataURL("image/png"));
  };
  image.src = imageSrc;
});

const makeSVGExport = svg => {
  const svgContent = new XMLSerializer().serializeToString(svg);
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

const ChartExport = ({ ext, href, tabIndex }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    download={`chart.${ext}`}
    tabIndex={tabIndex}
  >
    Export .{ext}
  </a>
);

const ChartExportTrigger = ({ open }) => {
  if (open) {
    return (
      <>
        <line x1="4" y1="4" x2="12" y2="12" />
        <line x1="12" y1="4" x2="4" y2="12" />
      </>
    );
  }

  return (
    <>
      <path d="M 8, 3.4 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0" />
      <path d="M 8, 8 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0" />
      <path d="M 8, 12.6 m -1.3, 0 a 1.3, 1.3 0 1, 0 2.6, 0 a 1.3, 1.3 0 1, 0 -2.6, 0" />
    </>
  );
};

class ChartExports extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      csvExport: "#",
      dropdownOpen: false,
      pngExport: "#",
      svgExport: "#"
    };

    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.makeExports();
  }

  componentDidUpdate(prevProps) {
    const { data, hovering } = this.props;
    const { dropdownOpen } = this.state;

    if (data !== prevProps.data) {
      this.makeExports();
    }

    if (hovering !== prevProps.hovering && !hovering && dropdownOpen) {
      this.setState({ dropdownOpen: false });
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  makeExports() {
    setTimeout(() => {
      if (!this.componentIsMounted) {
        return;
      }

      const { data, svgRef } = this.props;

      const csvExport = makeCSVExport(data);
      const svgExport = makeSVGExport(svgRef.current);

      makePNGExport(svgExport).then(pngExport => {
        if (this.componentIsMounted) {
          this.setState({ csvExport, pngExport, svgExport });
        }
      });
    }, 2000);
  }

  handleToggleDropdown() {
    this.setState(({ dropdownOpen }) => ({
      dropdownOpen: !dropdownOpen
    }));
  }

  render() {
    const { hovering } = this.props;
    const { csvExport, dropdownOpen, pngExport, svgExport } = this.state;

    return (
      <div className="chq-charts--export">
        <button
          type="button"
          onClick={this.handleToggleDropdown}
          aria-label="Open dropdown"
          tabIndex={hovering ? 0 : -1}
        >
          <svg viewBox="0 0 16 16" className="chq-charts--export-trigger">
            <ChartExportTrigger open={dropdownOpen} />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="chq-charts--export-dropdown">
            <ChartExport ext="csv" href={csvExport} />
            <ChartExport ext="png" href={pngExport} />
            <ChartExport ext="svg" href={svgExport} />
          </div>
        )}
      </div>
    );
  }
}

export default ChartExports;
