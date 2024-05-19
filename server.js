const express = require('express');
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
      'X-MBX-APIKEY': '9M88haLggrucTacRnx3sKCOc1aw1QvxrsVljlRu0SdR1g8fFyb92icUArZl2uUFt', // Replace 'xxx' with your actual API key
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

// Add a new route for the ticker/price endpoint
app.get('/api/v3/ticker/price', (req, res) => {
  const { symbols } = req.query;

  var API_URL;
  // Check if symbols parameter is present
  if (symbols) {
    // If symbols parameter is present, use it directly in the API URL
    API_URL = `https://testnet.binance.vision/api/v3/ticker/price?symbols=${symbols}`;
  } else {
    // If symbols parameter is not present, make the API call to the base endpoint
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

// Add a new route for the klines endpoint (candlestick data)
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





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
