import { Form, Link } from "react-router-dom";

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
