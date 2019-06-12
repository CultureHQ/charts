const getMaximum = data => {
  let maximum = 0;

  Object.keys(data).forEach(key => {
    if (data[key] > maximum) {
      maximum = data[key];
    }
  });

  return maximum;
};

export default getMaximum;
