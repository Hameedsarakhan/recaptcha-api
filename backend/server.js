const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load secret key from environment variables
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Endpoint to verify reCAPTCHA token
app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;

  // Check if token is provided
  if (!token) {
    return res.status(400).json({ message: 'reCAPTCHA token is missing.' });
  }

  try {
    // Send POST request to Google's reCAPTCHA API
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    // Check Google's response
    if (response.data.success) {
      res.json({ message: 'reCAPTCHA verified successfully!' });
    } else {
      res.json({
        message: 'reCAPTCHA verification failed.',
        'error-codes': response.data['error-codes'], // Log error codes for better debugging
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
