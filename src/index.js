import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import configuration from "./config/msalConfiguration";

const pca = new PublicClientApplication(configuration);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
