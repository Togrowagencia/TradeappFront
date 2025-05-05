import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from './store.js'
import './index.css'
import App from './App.jsx'

import axios from 'axios';

axios.defaults.baseURL = "https://backtradeapp.com/api/";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
