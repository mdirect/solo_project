import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function MainPage() {
  const getCookieHandler = async () => {
    try {
      const response = await axios('http://localhost:3000/cookie');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>MainPage</h1>
      <Button onClick={getCookieHandler()}>get cookies</Button>;
    </>
  );
}
