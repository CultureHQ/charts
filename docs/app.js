import React from "react";
import ReactDOM from "react-dom";

import { HorizontalBarChart, VerticalBarChart, PieChart } from "../src";

const getRandomDatum = () => Math.floor(Math.random() * 100);
const getRandomData = () => ({
  alpha: getRandomDatum(),
  beta: getRandomDatum(),
  gamma: getRandomDatum(),
  delta: getRandomDatum(),
  epsilon: getRandomDatum()
})

const style = {
  height: "300px",
  width: "300px",
  margin: "10px"
};

const App = () => (
  <>
    <HorizontalBarChart data={getRandomData()} style={style} />
    <VerticalBarChart data={getRandomData()} style={style} />
    <PieChart data={getRandomData()} style={style} />
  </>
);

ReactDOM.render(<App />, document.getElementById("main"));
