import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
/*
 No se usa aquí pero es necesario para 
 que funcione en otros sitios
*/
// eslint-disable-next-line 
import * as Bootstrap from 'bootstrap'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
