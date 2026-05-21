import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './app.jsx';

const el = document.getElementById('root');
if (el) {
  createRoot(el).render(<Root />);
}
