import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  Navigate,
} from "react-router-dom";
import { isLogged } from "./routes/common/loaders";
import ErrorPage from "./routes/error";
import GameWindow from "./routes/game";
import HomePage from "./routes/home";
import LoginPage, { loginAction } from "./routes/loginPage";
import "./styles.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <GameWindow />,
    loader: isLogged,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: isLogged,
    action: loginAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
