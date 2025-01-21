import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/Topbar";
import HomePage from "./core/public/pages/HomePage";
import MapPage from "./core/public/pages/MapPage";
import { isTokenValid } from "./utils/authUtil";

const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const LoginPage = lazy(() => import("./core/public/pages/LoginPage"));
const SignUpPage = lazy(() => import("./core/public/pages/SignUpPage"));

const PrivateRoute = ({ element }) => {
  const token = isTokenValid();
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const publicRouter = [
    {
      path: "/",
      element: <TopBar />,
      children: [
        {
          path: "home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AboutPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "map",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MapPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SignUpPage />
            </Suspense>
          ),
          errorElement: <>error</>,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfilePage />
                </Suspense>
              }
            />
          ),
          errorElement: <>error</>,
        },
      ],
      errorElement: <>error</>,
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<div>Loading...</div>}>Unauthorized</Suspense>
      ),
      errorElement: <>error</>,
    },
  ];

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={createBrowserRouter(publicRouter)} />
    </>
  );
}

export default App;
