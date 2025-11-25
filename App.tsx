import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GalleryPage } from './pages/GalleryPage';
import { DetailPage } from './pages/DetailPage';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GalleryPage />} />
          <Route path="/:slug" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
