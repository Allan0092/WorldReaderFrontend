import { Box, Typography } from "@mui/material"; // Add Typography
import { styled } from "@mui/material/styles"; // Add styled
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  isAdmin,
  isTokenValid,
  storeAdminToken,
  storeUserToken,
} from "./utils/authUtil";

// Lazy-loaded components
const HomePage = lazy(() => import("./core/public/pages/HomePage"));
const AboutPage = lazy(() => import("./core/public/pages/AboutPage"));
const MapPage = lazy(() => import("./core/public/Map/MapPage"));
const StorePage = lazy(() => import("./core/public/store/StorePage"));
const LibraryPage = lazy(() => import("./core/public/library/LibraryPage"));
const LoginPage = lazy(() => import("./core/public/Authentication/LoginPage"));
const SignUpPage = lazy(() =>
  import("./core/public/Authentication/SignUpPage")
);
const ProfilePage = lazy(() => import("./core/private/pages/ProfilePage"));
const UploadBookPage = lazy(() => import("./core/private/pages/uploadBook"));
const AdminLoginPage = lazy(() => import("./core/admin/pages/adminLoginPage"));
const AdminDashboard = lazy(() => import("./core/admin/pages/adminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Auth Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(isAdmin());
  const [user, setUser] = useState(null);

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
        storeUserToken(token);
        const userDetails = await getCurrentUserDetails();
        setUser(userDetails);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error.response?.data || "Login failed";
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role.toLowerCase() !== "admin") {
          throw new Error("Access denied. Admins only.");
        }
        storeAdminToken(token);
        setIsAdminAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Admin login failed:", error);
      setIsAdminAuthenticated(false);
      throw error.response?.data || "Admin login failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const adminLogout = () => {
    localStorage.removeItem("admin-token");
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminAuthenticated,
        user,
        login,
        adminLogin,
        logout,
        adminLogout,
      }}
    >
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

// PrivateRoute for regular users
function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

// PrivateRoute for admin users
function AdminPrivateRoute({ element }) {
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? element : <Navigate to="/admin" />;
}

// Styled Footer
const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  backgroundColor: "#8B4513",
  color: "white",
  borderRadius: theme.shape.borderRadius * 2,
  width: "100%",
}));

const ProfileLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <TopBar />
    <Box sx={{ display: "flex", flex: 1 }}>
      <ProfileSidebar />
      <Box sx={{ flex: 1, ml: "240px", p: 2 }}>
        <Outlet />
      </Box>
    </Box>
    <Footer>
      <Typography variant="body2" sx={{ fontFamily: "Georgia, serif" }}>
        © {new Date().getFullYear()} WorldReader. All rights reserved.
      </Typography>
    </Footer>
  </Box>
);

const AdminLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Outlet />
  </Box>
);

const PublicLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <TopBar />
    <Box sx={{ flex: 1 }}>
      <Outlet />
    </Box>
    <Footer>
      <Typography variant="body2" sx={{ fontFamily: "Georgia, serif" }}>
        © {new Date().getFullYear()} WorldReader. All rights reserved.
      </Typography>
    </Footer>
  </Box>
);

// Public Routes
const publicRouter = [
  {
    path: "/",
    element: <PublicLayout />,
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
        path: "store",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <StorePage />
          </Suspense>
        ),
      },
      {
        path: "library",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LibraryPage />
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

// Private Routes (Regular Users)
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
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminLoginPage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminPrivateRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminDashboard />
              </Suspense>
            }
          />
        ),
      },
    ],
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer
            position="top-right"
            stacked
            closeOnClick
            newestOnTop
            autoClose={800}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

export { useAuth, useTheme };
