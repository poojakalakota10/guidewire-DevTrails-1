export const fetchSimulatedAPIData = async (city) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Determine mock conditions based on random chance or city
  // Using some fixed realistic parameters for Hyderabad
  const isRaining = Math.random() > 0.6;
  const isHot = Math.random() > 0.5;
  const highPollution = Math.random() > 0.7;
  
  const weather = {
    rainfall: isRaining ? Math.floor(Math.random() * 60) + 10 : 0, // 0 to 70mm
    temperature: isHot ? Math.floor(Math.random() * 12) + 33 : Math.floor(Math.random() * 10) + 22, // 22 to 45C
  };

  const aqi = highPollution ? Math.floor(Math.random() * 200) + 200 : Math.floor(Math.random() * 100) + 50; // 50 to 400

  const trafficMap = ['Normal', 'Heavy', 'Gridlock', 'Shutdown'];
  const trafficLevel = isRaining ? 2 : (highPollution ? 1 : 0);
  const traffic = trafficMap[trafficLevel];

  return {
    weather,
    aqi,
    traffic,
    timestamp: new Date().toISOString()
  };
};
