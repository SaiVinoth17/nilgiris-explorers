const journeyStops = [1, 2, 3, 4, 5, 6];

journeyStops.forEach((stop, index) => {
  const start = index / journeyStops.length;
  const end = (index + 1) / journeyStops.length;
  
  let bgInput;
  if (index === 0) {
    bgInput = [0, end - 0.05, end + 0.05];
  } else if (index === journeyStops.length - 1) {
    bgInput = [start - 0.05, start + 0.05, 1];
  } else {
    bgInput = [start - 0.05, start + 0.05, end - 0.05, end + 0.05];
  }
  
  console.log(`BG Index ${index}:`, bgInput);
  
  // check if strictly increasing
  for (let i = 0; i < bgInput.length - 1; i++) {
    if (bgInput[i] >= bgInput[i+1]) {
      console.error(`ERROR at BG Index ${index}: ${bgInput[i]} >= ${bgInput[i+1]}`);
    }
  }
});
