import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post("/api/register", {
        username,
        password,
        address,
        phonenumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put("/api/update", {
        id: "user-id",
        role: "admin",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete("/api/deleteUser", {
        data: {
          id: "user-id",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="text"
          id="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={registerUser}>Register User</button>

      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={loginUser}>Login User</button>

      <h1>Update Role</h1>
      <button onClick={updateUser}>Update Role to Admin</button>

      <h1>Delete User</h1>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
};

export default Auth;
