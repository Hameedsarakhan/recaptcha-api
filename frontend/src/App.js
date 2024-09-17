// src/App.js
import React, { useState } from 'react';
import RecaptchaComponent from './components/RecaptchaComponent';

function App() {
  const [token, setToken] = useState('');

  const handleRecaptchaChange = (value) => {
    setToken(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <RecaptchaComponent onChange={handleRecaptchaChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
