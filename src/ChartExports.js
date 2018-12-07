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

const makeSVGExport = svg => {
  const svgContent = new XMLSerializer().serializeToString(svg);
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

class ChartExports extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { csvExport: "#", svgExport: "#" };
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.makeExports();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.makeExports();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  makeExports() {
    setTimeout(() => {
      if (this.componentIsMounted) {
        const { data, svgRef } = this.props;

        this.setState({
          csvExport: makeCSVExport(data),
          svgExport: makeSVGExport(svgRef.current)
        });
      }
    }, 2000);
  }

  render() {
    const { hovering } = this.props;
    const { csvExport, svgExport } = this.state;

    const tabIndex = hovering ? 0 : -1;

    return (
      <div className="chq-charts--export">
        <a
          href={csvExport}
          target="_blank"
          rel="noopener noreferrer"
          download="chart.csv"
          title="Export data"
          aria-label="Export data"
          tabIndex={tabIndex}
        >
          <svg viewBox="0 0 1024 1024">
            <path d="M864 160v704h-704v-704h704zM896 128h-768v768h768v-768z M384 304h384v32h-384v-32z M384 496h384v32h-384v-32z M384 688h384v32h-384v-32z M320 320c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z M320 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z M320 704c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z" />
          </svg>
        </a>
        <a
          href={svgExport}
          target="_blank"
          rel="noopener noreferrer"
          download="chart.svg"
          title="Export graphic"
          aria-label="Export graphic"
          tabIndex={tabIndex}
        >
          <svg viewBox="0 0 1024 1024">
            <path d="M835 320h-123c-64-72-84-96-109-96h-177c-25 0-44 24-109 96h-27v-32h-68v32h-27c-35 0-67 26-67 61v352c0 35 32 67 67 67h640c35 0 61-32 61-67v-352c0-35-26-61-61-61z M864 733c0 19-12 35-29 35h-640c-17 0-35-17-35-35v-352c0-16 16-29 35-29h136l10-6c8-9 15-20 22-28 23-25 39-43 51-54 9-8 12-8 12-8h177c0 0 3 0 13 9 12 11 29 33 53 60 6 7 12 14 19 21l10 6h138c18 0 29 12 29 29v352z M512 379c-94 0-171 77-171 171s77 171 171 171 171-77 171-171-77-171-171-171z M512 689c-77 0-139-62-139-139s62-139 139-139 139 62 139 139-62 139-139 139z M704 384h34v34h-34v-34z M576 550c0 35-29 64-64 64s-64-29-64-64c0-35 29-64 64-64s64 29 64 64z" />
          </svg>
        </a>
      </div>
    );
  }
}

export default ChartExports;
