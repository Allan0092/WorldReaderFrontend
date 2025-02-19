import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Utilities or Hooks
import { isTokenValid } from "./utils/authUtil"; // Example import

// Components
import TopBar from "./components/Topbar";
import ProfileSidebar from "./core/private/components/profileSidebar";

// Lazy-loaded Pages
const HomePage = lazy(() => import("./core/public/pages/HomePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const MapPage = lazy(() => import("./core/public/pages/MapPage"));
const LoginPage = lazy(() => import("./core/public/pages/LoginPage"));
const SignUpPage = lazy(() => import("./core/public/pages/SignUpPage"));
const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const UploadBookPage = lazy(() => import("./core/private/pages/uploadBook"));

/**
 * Simple PrivateRoute wrapper
 * Redirects if user is not authenticated
 */
function PrivateRoute({ element }) {
  const tokenValid = isTokenValid();
  return tokenValid ? element : <Navigate to="/login" />;
}

// Public Routes
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
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "map",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MapPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        ),
      },
      // Catch-all for unknown routes
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <>Unauthorized</>
          </Suspense>
        ),
      },
    ],
    errorElement: <>error</>,
  },
];

// Private Routes
// Notice how the children do NOT start with a slash
const privateRouter = [
  {
    path: "/profile",
    element: <ProfileSidebar />, // Acts as a layout
    errorElement: <>error</>,
    children: [
      {
        path: "user-settings", // /profile/user-settings
        element: (
          <PrivateRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProfilePage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "upload-book", // /profile/upload-book
        element: (
          <PrivateRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UploadBookPage />
              </Suspense>
            }
          />
        ),
      },
      // You can add more child routes under /profile here if needed
    ],
  },
];

// Combine both sets of routes
const router = createBrowserRouter([...publicRouter, ...privateRouter]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
