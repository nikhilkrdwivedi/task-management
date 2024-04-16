import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>

    <Toaster />
    <Routes>
    <Route path="/*" element={<App />} />
    </Routes>
    </BrowserRouter>

    </AuthProvider>
  // </React.StrictMode>,
)

{/* <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider> */}