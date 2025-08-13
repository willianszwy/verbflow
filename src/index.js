import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Use HashRouter as fallback for GitHub Pages
const Router = process.env.NODE_ENV === 'production' && window.location.hostname.includes('github.io') 
  ? HashRouter 
  : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);