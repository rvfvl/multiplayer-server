import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
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
    element: <GamePage />,
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
