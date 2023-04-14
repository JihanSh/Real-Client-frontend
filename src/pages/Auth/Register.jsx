import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, address, phonenumber }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label className="phone-number">Phone Number:</label>
      <input
        type="text"
        id="phone-number"
        value={phonenumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <Link to="/">
        <button type="submit">Register</button>
      </Link>

      {error && error.message === "Username already exists" && (
        <p>Please choose a different username</p>
      )}
    </form>
  );
};

export default Auth;
