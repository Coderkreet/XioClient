import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Ensure Tailwind is included
import { AppKitProvider } from './content/AppKitProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </BrowserRouter>
);
