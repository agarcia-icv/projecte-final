import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/profile.css";
import "./styles/adminusers.css";
import "./styles/auth.css";
import "./styles/postdetail.css";
import "./styles/postlists.css";
import "./styles/forge-buttons.css";
import "./styles/createposts.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)