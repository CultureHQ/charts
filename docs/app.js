import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "../src/style.css";

const getCandidates = view => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText(view, 0, 30);

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const candidates = [];

  for (let idx = 0; idx < canvas.width * canvas.height; idx += 1) {
    if (data[idx * 4] || data[idx * 4 + 1] || data[idx * 4 + 2]) {
      candidates.push([
        (idx % canvas.width) / canvas.width,
        Math.floor(idx / canvas.width) / canvas.height
      ]);
    }
  }

  return candidates;
};

const makePoint = () => Math.ceil(Math.random() * 100000) / 1000;
const makeStar = () => [makePoint(), makePoint()];

const stars = Array(300).fill().map(makeStar);
const copyStars = () => stars.map(star => [...star]);

const App = () => {
  const [view, setView] = useState(null);

  const [currentStars, setCurrentStars] = useState(copyStars);
  const onResetStars = useCallback(() => setCurrentStars(copyStars), setCurrentStars);

  useEffect(
    () => {
      if (view) {
        const candidates = getCandidates(view);

        setCurrentStars(stars.map(() => {
          candidates.splice(Math.floor(Math.random() * candidates.length), 1);
        }));
      }

      return onResetStars;
    },
    [view, onResetStars]
  );

  return (
    <>
      {currentStars.map(([left, top], index) => (
        <div key={index} className="star" style={{ left: `${left}vw`, top: `${top}vh` }} />
      ))}
      <h1>
        Kevin Deisz<br />
        <small>CTO at CultureHQ</small>
      </h1>
      <button onClick={() => setView("Projects")}>Projects</button><br />
      <button onClick={() => setView("Speaking")}>Speaking</button><br />
      <button onClick={() => setView("Blog Posts")}>Blog Posts</button><br />
      {view === "Projects" && (
        <h2>Projects</h2>
      )}
      {view === "Speaking" && (
        <h2>Speaking</h2>
      )}
      {view === "Blog Posts" && (
        <h2>Blog Posts</h2>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
