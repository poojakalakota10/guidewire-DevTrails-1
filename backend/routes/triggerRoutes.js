const express = require('express');
const router = express.Router();
const { mockWeatherData } = require('../services/triggerEngine');

router.get('/status/:zone', (req, res) => {
  const zone = req.params.zone;
  const data = mockWeatherData[zone] || { rainfall: 0, temp: 30, aqi: 100, curfew: false };
  res.json(data);
});

router.get('/status', (req, res) => {
  res.json(mockWeatherData);
});

module.exports = router;
