import { Form, Link, ActionFunctionArgs, redirect } from "react-router-dom";
import axiosInstance from "../libs/axios";
import API from "../services/API";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const response = await API.login(
      formData.get("username")?.toString() ?? "",
      formData.get("password")?.toString() ?? ""
    );

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
    }

    return redirect("/game");
  } catch (error) {
    console.log("error", error);
  }
};

const LoginPage = () => {
  return (
    <div>
      <h1>Login:</h1>
      <Form method="post">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </Form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
