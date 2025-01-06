import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/Topbar";
import HomePage from "./core/public/pages/HomePage";
import MapPage from "./core/public/pages/MapPage";

const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const LoginPage = lazy(() => import("./core/public/pages/LoginPage"));
const SignUpPage = lazy(() => import("./core/public/pages/SignUpPage"));

function App() {
  const token = false;

  const privateRouter = [
    {
      path: "/profile",
      element: (
        <Suspense>
          <ProfilePage />,
        </Suspense>
      ),
      errorElement: <>error</>,
    },
  ];

  const publicRouter = [
    {
      path: "/",
      element: <TopBar />,
      children: [
        {
          path: "/home",
          element: (
            <Suspense>
              <HomePage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/about",
          element: (
            <Suspense>
              <AboutPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/login",
          element: (
            <Suspense>
              <LoginPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/register",
          element: (
            <Suspense>
              <SignUpPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
      ],
      errorElement: <>error</>,
    },

    {
      path: "*",
      element: <Suspense>Unauthorized</Suspense>,
      errorElement: <>error</>,
    },
  ];

  const router = token ? privateRouter : publicRouter;

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={createBrowserRouter(router)} />
    </>
  );
}

export default App;
