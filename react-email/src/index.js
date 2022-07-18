import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FormComponent from './components/FormComponent';
import './App.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormComponent />
  </React.StrictMode>
);
