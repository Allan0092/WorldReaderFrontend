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
      return response.data; // Expecting array of users
    },
    enabled: !!getAdminToken(),
  });
};

// Delete a user
export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (_id) => {
      // Use _id to match server data
      const response = await axios.delete(
        `http://localhost:5000/api/user/${_id}`,
        {
          // Adjusted to match your endpoint
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};

// Update a user (included for completeness, not used in dashboard yet)
export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/user/update/",
        data,
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
