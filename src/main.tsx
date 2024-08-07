// src/index.tsx or src/App.tsx
import React from 'react';
import App from './App'; // Your main App component
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container!); // Create a root

root.render(
  <React.StrictMode>
      <App />
    </React.StrictMode>
);