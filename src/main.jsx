// react depnedencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react component
import App from './App.jsx'

// stylesheet

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
