import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the top level App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root attached to the #root div in index.html
root.render(
  <React.StrictMode>  {/*Render the app tree (StrictMode helps catch issues)*/}
    <App />
  </React.StrictMode>
);