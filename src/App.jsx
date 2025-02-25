import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/Topbar";
import ProfileSidebar from "./core/private/components/profileSidebar";
import { isTokenValid } from "./utils/authUtil";

const HomePage = lazy(() => import("./core/public/pages/HomePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const MapPage = lazy(() => import("./core/public/pages/MapPage"));
const LoginPage = lazy(() => import("./core/public/pages/LoginPage"));
const SignUpPage = lazy(() => import("./core/public/pages/SignUpPage"));
const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const UploadBookPage = lazy(() => import("./core/private/pages/uploadBook"));

// Auth Lazy Loading
const AdminLoginPage = lazy(() => import("./core/admin/pages/adminLoginPage"));
const AdminDashboard = lazy(() => import("./core/admin/pages/dashboard"));

// Simple PrivateRoute
function PrivateRoute({ element }) {
  return isTokenValid() ? element : <Navigate to="/login" />;
}

const ProfileLayout = () => (
  <>
    <TopBar />
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 ml-64 p-4">
        <Outlet />
      </div>
    </div>
  </>
);

// Public Routes
const publicRouter = [
  {
    path: "/",
    element: (
      <>
        <TopBar />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
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
const privateRouter = [
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="user-settings" replace />,
      },
      {
        path: "user-settings",
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
        path: "upload-book",
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
    ],
    errorElement: <>error</>,
  },
];

// Admin Routes
const adminRouter = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLoginPage />
      </Suspense>
    ),
    errorElement: <>error</>,
  },
];

// Combine routes
const router = createBrowserRouter([
  ...publicRouter,
  ...privateRouter,
  ...adminRouter,
]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
