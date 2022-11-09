import axios, { AxiosResponse } from "axios";

type Response<T> = Promise<AxiosResponse<T>>;

class API {
  public getCurrentUser(): Response<{}> {
    return axios.get("/api/users/me");
  }
}

export default API;
