import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from './core/public/pages/AboutPage';
import HomePage from './core/public/pages/HomePage';
import LoginPage from './core/public/pages/LoginPage';
import SignUpPage from './core/public/pages/SignUpPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  }
])

const App = () => {
  return (
    <>
      <ToastContainer position='top-right'/>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
