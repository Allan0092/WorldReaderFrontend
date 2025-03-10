import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAdminToken } from "../../utils/authUtil"; // Adjust path as needed

// Fetch all users (admin endpoint)
export const useGetAllUserList = () => {
  return useQuery({
    queryKey: ["GET_ALL_USER_LIST"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/user/", {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });
      return response.data;
    },
    enabled: !!getAdminToken(),
  });
};

// Delete a user
export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (_id) => {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userId, updates }) => {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};

// Fetch all books
export const useGetAllBooks = () => {
  return useQuery({
    queryKey: ["GET_ALL_BOOKS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/book/", {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });
      return response.data;
    },
    enabled: !!getAdminToken(),
  });
};

// Delete a book
export const useDeleteBook = () => {
  return useMutation({
    mutationKey: ["DELETE_BOOK"],
    mutationFn: async (_id) => {
      const response = await axios.delete(
        `http://localhost:5000/api/book/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};
