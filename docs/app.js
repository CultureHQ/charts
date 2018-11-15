import React from "react";
import ReactDOM from "react-dom";

import { HorizontalBarChart, PieChart } from "../src";

const getRandomData = () => Math.floor(Math.random() * 100);

const data = {
  alpha: getRandomData(),
  beta: getRandomData(),
  gamma: getRandomData(),
  delta: getRandomData(),
  epsilon: getRandomData()
};

const App = () => (
  <div className="container">
    <HorizontalBarChart data={data} />
    <PieChart data={data} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("main"));
