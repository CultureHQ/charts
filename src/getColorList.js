const STATIC_COLORS = ["#8cb4d6", "#79b17d", "#ffd24b"];

const getColorList = size => {
  const colors = [...STATIC_COLORS];

  for (let idx = 3; idx < size; idx += 1) {
    colors.push(`hsl(${Math.round(Math.random() * 360)}, 33%, 66%)`);
  }

  return colors.slice(0, size);
};

export default getColorList;
