import React, { useState, useEffect } from "react";

const getScalar = time => {
  if (time < 0.5) {
    return 8 * Math.pow(time, 4);
  }

  const inverse = 1 - time;
  return 1 - 8 * Math.pow(inverse, 4);
};

const useScalarAnimation = () => {
  const [opacity, setOpacity] = useState(0);
  const [scalar, setScalar] = useState(0);
  const [scaling, setScaling] = useState(true);

  useEffect(() => {
    let time = 0;

    const interval = setInterval(() => {
      time += 0.015;

      if (time >= 1) {
        clearInterval(interval);
        setScaling(false);
        return;
      }

      setScalar(getScalar(time));
      setOpacity(time);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return [opacity, scalar, scaling];
};

export default useScalarAnimation;
