import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import 'remixicon/fonts/remixicon.css'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </AuthContextProvider>
);
