import { redirect, LoaderFunctionArgs } from "react-router-dom";
import API from "../../services/API";

export const isLogged = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isLoginRoute = url.pathname === "/login";

  try {
    const response = await API.getCurrentUser();

    const user = response.data?.user ?? null;

    if (isLoginRoute && user) {
      return redirect("/game");
    }

    return user;
  } catch (error) {
    console.log("ERROR", error);
    if (!isLoginRoute) {
      throw redirect("/login");
    }
  }
};
