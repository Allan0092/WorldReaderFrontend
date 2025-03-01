import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllBooksPublic = () => {
  return useQuery({
    queryKey: ["GET_ALL_BOOKS_PUBLIC"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/book/public");
      return response.data;
    },
  });
};
