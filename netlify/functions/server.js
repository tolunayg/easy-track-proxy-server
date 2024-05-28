require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors({
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization', 'X-MBX-APIKEY', 'redirect']
}));

app.get('/sapi/v1/margin/allAssets', (req, res) => {
  const API_URL = 'https://api.binance.com/sapi/v1/margin/allAssets';
  const options = {
    url: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-MBX-APIKEY': process.env.API_KEY,
      'redirect': 'follow'
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ type: 'error', message: error.message });
    }
    if (response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: 'Failed to fetch data' });
    }

    res.json(JSON.parse(body));
  });
});

app.get('/api/v3/ticker/price', (req, res) => {
  const { symbols } = req.query;
  let API_URL;
  if (symbols) {
    API_URL = `https://testnet.binance.vision/api/v3/ticker/price?symbols=${symbols}`;
  } else {
    API_URL = 'https://testnet.binance.vision/api/v3/ticker/price';
  }

  request(API_URL, (error, response, body) => {
    if (error) {
      return res.status(500).json({ type: 'error', message: error.message });
    }
    if (response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: 'Failed to fetch data' });
    }

    res.json(JSON.parse(body));
  });
});

app.get('/api/v3/klines', (req, res) => {
  const { symbol, interval } = req.query;
  const API_URL = `https://testnet.binance.vision/api/v3/klines?symbol=${symbol}&interval=${interval}`;

  request(API_URL, (error, response, body) => {
    if (error) {
      return res.status(500).json({ type: 'error', message: error.message });
    }
    if (response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: 'Failed to fetch data' });
    }

    res.json(JSON.parse(body));
  });
});

module.exports.handler = serverless(app);
