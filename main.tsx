import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LearningProvider>
        <App />
      </LearningProvider>
    </AuthProvider>
  </React.StrictMode>
);
