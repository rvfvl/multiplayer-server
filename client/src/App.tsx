import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import ErrorPage from "./routes/error";
import GameWindow from "./routes/game";
import HomePage from "./routes/home";
import LoginPage from "./routes/Login";
import "./styles.scss";

const login = async () => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: "test",
      password: "test",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <GameWindow />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const data = await login();

      if (!data.success) {
        return redirect("/login");
      }

      return data;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: ({ params, request }) => {
      console.log(params, request, "sending action");
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
