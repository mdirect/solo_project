import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage/MainPage';
import Layout from './app/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Routes element={<Layout />}>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
