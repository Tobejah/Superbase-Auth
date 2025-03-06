import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex flex-col items-center justify-start h-screen">
      <h1 className="text-center pt-4 text-3xl">Testing React Superbase</h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
  
    </div>
  </StrictMode>
);
