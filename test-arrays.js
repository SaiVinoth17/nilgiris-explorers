const journeyStops = [1, 2, 3, 4, 5, 6];

journeyStops.forEach((stop, index) => {
  const start = index / journeyStops.length;
  const end = (index + 1) / journeyStops.length;
  
  let contentInput;
  if (index === 0) {
    contentInput = [0, end - 0.05, end + 0.02];
  } else if (index === journeyStops.length - 1) {
    contentInput = [start - 0.02, start + 0.05, 1];
  } else {
    contentInput = [start - 0.02, start + 0.05, end - 0.05, end + 0.02];
  }
  
  console.log(`Index ${index}:`, contentInput);
  
  // check if strictly increasing
  for (let i = 0; i < contentInput.length - 1; i++) {
    if (contentInput[i] >= contentInput[i+1]) {
      console.error(`ERROR at Index ${index}: ${contentInput[i]} >= ${contentInput[i+1]}`);
    }
  }
});
