import { AxiosResponse } from "axios";
import axiosInstance from "../libs/axios";

type User = {
  username: string;
};

type Response<T> = Promise<AxiosResponse<T>>;

class API {
  public static getCurrentUser(): Response<{ user: User }> {
    return axiosInstance.get("/auth/me");
  }

  public static login(
    username: string,
    password: string
  ): Response<{ accessToken: string; user: User }> {
    return axiosInstance.post("/auth/login", { username, password });
  }
}

export default API;
