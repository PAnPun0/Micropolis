import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './assets/css/Global.css';
import './assets/css/Reset.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);