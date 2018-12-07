# @culturehq/charts

[![Build Status](https://travis-ci.com/CultureHQ/charts.svg?branch=master)](https://travis-ci.com/CultureHQ/charts)
[![Package Version](https://img.shields.io/npm/v/@culturehq/charts.svg)](https://www.npmjs.com/package/@culturehq/charts)

An SVG React charting library.

## Getting started

First, add `@culturehq/charts` to your `package.json` `dependencies`, then install using either `npm install` or `yarn install`.

There are three basic chart types, `HorizontalBarChart`, `PieChart`, and `VerticalBarChart`. Each accepts two props:

* `className?` - an optional class name for the SVG
* `data` - an object with the keys being the name of the data series and the values being the quantity

To get the styles, be sure to also import `@culturehq/charts/dist/style.css` into whatever stylesheet you're using.

## Testing locally

You can run the tests by running `yarn test` and lint by running `yarn lint`. You can run the local server by running `yarn start` which will start the docs server on `http://localhost:8080`.
