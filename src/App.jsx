import axios from "axios";
import React, {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProfileSidebar from "./core/private/components/profileSidebar";
import TopBar from "./core/public/components/Topbar";
import {
  getCurrentUserDetails,
  isTokenValid,
  storeUserToken,
} from "./utils/authUtil";

// Lazy-loaded components
const HomePage = lazy(() => import("./core/public/pages/HomePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const MapPage = lazy(() => import("./core/public/Map/MapPage"));
const LoginPage = lazy(() => import("./core/public/Authentication/LoginPage"));
const SignUpPage = lazy(() =>
  import("./core/public/Authentication/SignUpPage")
);
const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const UploadBookPage = lazy(() => import("./core/private/pages/uploadBook"));
const AdminLoginPage = lazy(() => import("./core/admin/pages/adminLoginPage"));
const AdminDashboard = lazy(() => import("./core/admin/pages/dashboard"));

// Auth Context
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());
  const [user, setUser] = useState(null);

  // Fetch user details on mount if authenticated
  useEffect(() => {
    const fetchUser = async () => {
      if (isTokenValid()) {
        try {
          const userDetails = await getCurrentUserDetails();
          setUser(userDetails);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        const token = response.data.token;
        storeUserToken(token); // Store token using authUtil
        const userDetails = await getCurrentUserDetails(); // Fetch user details after login
        setUser(userDetails);
        setIsAuthenticated(true);
        return true; // Success
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error.response?.data || "Login failed"; // Throw error for component to handle
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Theme Context
const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Updated PrivateRoute using AuthContext
function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
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
      { index: true, element: <Navigate to="user-settings" replace /> },
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

const router = createBrowserRouter([
  ...publicRouter,
  ...privateRouter,
  ...adminRouter,
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer
          position="top-right"
          stacked
          closeOnClick
          newestOnTop
          autoClose={800}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

export { useAuth, useTheme };
