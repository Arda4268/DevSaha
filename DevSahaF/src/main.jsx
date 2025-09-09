// src/index.jsx veya src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // ← ekle
import App from './App';
import './index.css'; // varsa global stiller

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>           {/* ← BrowserRouter burada */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
