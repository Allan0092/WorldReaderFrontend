import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../App"; // Adjust path as needed
import { useDeleteUser, useGetAllBooks, useGetAllUserList } from "../query"; // Adjust path

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#1a237e",
    color: "#fff",
  },
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdminAuthenticated, adminLogout } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");

  // Fetch users using React Query
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGetAllUserList();

  // Fetch books using React Query
  const {
    data: books = [],
    isLoading: booksLoading,
    error: booksError,
  } = useGetAllBooks();

  // Delete user mutation
  const { mutate: deleteUser, isLoading: deleteLoading } = useDeleteUser({
    onMutate: async (_id) => {
      console.log("Deleting user with _id:", _id);
      await queryClient.cancelQueries(["GET_ALL_USER_LIST"]);
      const previousUsers = queryClient.getQueryData(["GET_ALL_USER_LIST"]);
      queryClient.setQueryData(["GET_ALL_USER_LIST"], (old) =>
        old ? old.filter((user) => user._id !== _id) : []
      );
      return { previousUsers };
    },
    onSuccess: (data) => {
      console.log("Delete succeeded with response:", data);
      toast.success("User deleted successfully");
      refetchUsers(); // Force immediate refetch
    },
    onError: (error, _id, context) => {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
      queryClient.setQueryData(["GET_ALL_USER_LIST"], context.previousUsers);
    },
    onSettled: () => {
      console.log("Mutation settled, refetching users");
      refetchUsers(); // Ensure sync with server
    },
  });

  // Handle admin logout
  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  // Handle user deletion
  const handleDeleteUser = (_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    deleteUser(_id);
  };

  // Redirect if not authenticated as admin
  if (!isAdminAuthenticated) {
    navigate("/admin");
    return null;
  }

  // Handle loading state
  if (usersLoading || booksLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (usersError || booksError) {
    toast.error("Failed to load data");
  }

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {users.length}
                  </Typography>
                </CardContent>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Books
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {books.length}
                  </Typography>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>
        );
      case "users":
        return (
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              User Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.first_name && user.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : "Name not provided"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        );
      case "books":
        return (
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Book Moderation
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book._id}>
                      <TableCell>{book._id}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        {book.verifiedStatus ? "Verified" : "Pending"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar variant="permanent" anchor="left">
        <Typography
          variant="h6"
          sx={{ p: 2, fontWeight: "bold", color: "#fff" }}
        >
          Admin Panel
        </Typography>
        <List>
          <ListItem button onClick={() => setActiveView("dashboard")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => setActiveView("users")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setActiveView("books")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItem>
        </List>
      </Sidebar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
        {/* Redecorated Top Bar */}
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "#1a237e",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              WorldReader Admin
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ color: "#fff", mr: 2 }}>
                Admin Dashboard
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleLogout}
                sx={{ "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" } }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
