import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      {/* ändra basename inför produktion, t.ex. '/aw/arskurs-3/task-tracker' */}
      <BrowserRouter basename=''>
         <App />
      </BrowserRouter>
   </React.StrictMode>,
)
