import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage/MainPage';
import Layout from './app/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/autorization" element={<AutorizationPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
