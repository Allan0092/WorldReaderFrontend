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

export const useGetBooksForMap = () => {
  return useQuery({
    queryKey: ["BOOKS_FOR_MAP"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/book/map");
      return response.data;
    },
  });
};
