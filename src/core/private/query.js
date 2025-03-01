import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCurrentToken } from "../../utils/authUtil";

// Fetch user's library
export const useGetUserLibrary = (userId) => {
  return useQuery({
    queryKey: ["USER_LIBRARY", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/user/library/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getCurrentToken()}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!userId && !!getCurrentToken(),
  });
};

// Add book to library
export const useAddToLibrary = () => {
  return useMutation({
    mutationKey: ["ADD_TO_LIBRARY"],
    mutationFn: async ({ userId, bookId }) => {
      const response = await axios.post(
        "http://localhost:5000/api/user/library/add",
        { userId, bookId },
        {
          headers: {
            Authorization: `Bearer ${getCurrentToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};

// Remove book from library
export const useRemoveFromLibrary = () => {
  return useMutation({
    mutationKey: ["REMOVE_FROM_LIBRARY"],
    mutationFn: async ({ userId, bookId }) => {
      const response = await axios.post(
        "http://localhost:5000/api/user/library/remove",
        { userId, bookId },
        {
          headers: {
            Authorization: `Bearer ${getCurrentToken()}`,
          },
        }
      );
      return response.data;
    },
  });
};
