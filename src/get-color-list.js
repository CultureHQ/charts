const STATIC_COLORS = ["#8cb4d6", "#79b17d", "#ffd24b"];

const getRandomValue = () => Math.floor(Math.random() * 255);
const getRandomColor = () => `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;

const getColorList = size => {
  const colors = [...STATIC_COLORS];

  for (let idx = 3; idx < size; idx += 1) {
    colors.push(getRandomColor());
  }

  return colors.slice(0, size);
};

export default getColorList;
