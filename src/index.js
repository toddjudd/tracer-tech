import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import App from './App';
import { useEffect } from 'react';

const Oauth = () => {
  const location = useLocation();
  useEffect(() => {});
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
