import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
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
import { useQueryClient as useReactQueryClient } from "@tanstack/react-query"; // Correct import
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../App"; // Adjust path as needed
import { useDeleteUser, useGetAllUserList } from "../query"; // Adjust path to your query file

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useReactQueryClient(); // Use React Query's client
  const { isAdminAuthenticated, adminLogout } = useAuth();

  // Fetch users using React Query
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUserList();

  // Delete user mutation
  const { mutate: deleteUser, isLoading: deleteLoading } = useDeleteUser({
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["GET_ALL_USER_LIST"]); // Refetch users after deletion
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
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
    deleteUser(_id); // Pass _id instead of id
  };

  // Redirect if not authenticated as admin
  if (!isAdminAuthenticated) {
    navigate("/admin");
    return null;
  }

  // Handle loading and error states
  if (usersLoading) {
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

  if (usersError) {
    toast.error("Failed to load user data");
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Admin Top Bar */}
      <AppBar position="sticky" sx={{ bgcolor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            WorldReader Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Stats Card */}
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

          {/* User Management */}
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
