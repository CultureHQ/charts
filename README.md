# @culturehq/charts

An SVG React charting library

## Getting started

First, add `@culturehq/charts` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`.

There are three basic chart types, `HorizontalBarChart`, `PieChart`, and `VerticalBarChart`. Each accepts only one prop: `data`. It should be an object with the keys being the name of the data series and the values being the quantity.

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.
