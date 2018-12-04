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
    <nav>@culturehq/charts</nav>
    <main>
      <HorizontalBarChart data={data} />
      <VerticalBarChart data={data} />
      <PieChart data={data} />
    </main>
    {ReactDOM.createPortal(
      <footer>
        <p>
          Copyright (c) 2018 CultureHQ
          <br />
          <a href="https://github.com/CultureHQ/charts">github.com/CultureHQ/charts</a>
        </p>
      </footer>,
      document.body
    )}
  </>
);

ReactDOM.render(<App />, document.getElementById("main"));
