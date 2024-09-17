// src/components/RecaptchaComponent.js
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaComponent = ({ onChange }) => {
  const recaptchaRef = React.createRef();

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LelwkUqAAAAAB2BpxC6ECA1msYaQYUA1aNifhWd"
        onChange={onChange}
        ref={recaptchaRef}
      />
    </div>
  );
};

export default RecaptchaComponent;
