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
  Paper,
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../App"; // Adjust path as needed
import { getAdminToken } from "../../utils/authUtil"; // Adjust path as needed

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdminAuthenticated, adminLogout } = useAuth();

  // Fetch dashboard data on mount
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/admin");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersResponse = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: { Authorization: `Bearer ${getAdminToken()}` },
          }
        );
        setUsers(usersResponse.data);

        // Fetch books
        const booksResponse = await axios.get(
          "http://localhost:5000/api/admin/books",
          {
            headers: { Authorization: `Bearer ${getAdminToken()}` },
          }
        );
        setBooks(booksResponse.data);

        // Fetch stats
        const statsResponse = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${getAdminToken()}` },
          }
        );
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Could not load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdminAuthenticated, navigate]);

  // Handle admin logout
  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  // Handle user deletion (example action)
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Handle book approval (example action)
  const handleApproveBook = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/books/${bookId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${getAdminToken()}` } }
      );
      setBooks(
        books.map((book) =>
          book.id === bookId ? { ...book, approved: true } : book
        )
      );
      toast.success("Book approved successfully");
    } catch (error) {
      toast.error("Failed to approve book");
    }
  };

  if (loading) {
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
          {/* Stats Cards */}
          <Grid item xs={12} sm={6}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Users
                </Typography>
                <Typography variant="h4" color="primary">
                  {stats.totalUsers}
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
                  {stats.totalBooks}
                </Typography>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* User Management */}
          <Grid item xs={12}>
            <Paper
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
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Book Moderation */}
          <Grid item xs={12}>
            <Paper
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
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          {book.approved ? "Approved" : "Pending"}
                        </TableCell>
                        <TableCell>
                          {!book.approved && (
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApproveBook(book.id)}
                            >
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
