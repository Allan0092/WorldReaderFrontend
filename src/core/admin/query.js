import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllUserList = () => {
  return useQuery({
    queryKey: "GET_ALL_USER_LIST",
    queryFn: () => {
      return axios.get("http://localhost:5000/api/user/");
    },
  });
};

export const useDeleteUser = () => {
  useMutation({
    mutationKey: "DELETE_USER",
    mutationFn: (id) => {
      return axios.delete("http://localhost:5000/api/user/" + id);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: "UPDATE_USER",
    mutationFn: (data) => {
      return axios.post("http://localhost:5000/api/user/update/", data);
    },
  });
};
