import React from 'react';
import { createRoot } from 'react-dom/client';
import './particles.jsx';
import './chrome.jsx';
import './windows.jsx';
import './chatbot.jsx';
import './mobile.jsx';
import { Root } from './app.jsx';

const el = document.getElementById('root');
if (el) {
  createRoot(el).render(<Root />);
}
