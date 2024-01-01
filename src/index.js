import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import GeneratorPage from './Components/GeneratorPage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeneratorPage />
  </React.StrictMode>
);