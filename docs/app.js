import React from "react";
import ReactDOM from "react-dom";

import { HorizontalBarChart, VerticalBarChart, PieChart } from "../src";
import "../src/style.css";

const getRandomDatum = () => Math.floor(Math.random() * 100);

const data = {
  alpha: getRandomDatum(),
  beta: getRandomDatum(),
  gamma: getRandomDatum(),
  delta: getRandomDatum(),
  epsilon: getRandomDatum()
};

const App = () => (
  <>
    <HorizontalBarChart data={data} />
    <VerticalBarChart data={data} />
    <PieChart data={data} />
  </>
);

ReactDOM.render(<App />, document.getElementById("main"));
