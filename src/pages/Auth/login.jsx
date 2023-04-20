import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      console.log(Error);
      const { token, user } = await response.json();
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("Id", user);

      console.log("Login successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p className="error-message"> {error}</p>}
      <button type="submit">Log In</button>
      <p className="register">
        Not Registered? Click Here
        <a href="./register"> Register</a>
      </p>
      <Link to="/"></Link>
    </form>
  );
};
export default Login;
