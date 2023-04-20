import React, { useState } from "react";
import "./Register.css";

const Register = () => {
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
    <div>
      <form onSubmit={handleSubmit} className="register-container">
        <div className="username">
          <label className="username">Username:</label> <br />
          <input
            autoComplete="off"
            className="register-input"
            type="text"
            id="username"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <label className="password">Password:</label>
          <br />
          <input
            autoComplete="off"
            className="register-input"
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="address">
          <label className="address">Address:</label>
          <br />
          <input
            autoComplete="off"
            className="register-input"
            type="text"
            id="address"
            value={address}
            placeholder="beirut dt aazariye block 3"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="phone-number">
          <label className="phone-number">Phone Number:</label>
          <br />
          <input
            autoComplete="off"
            className="register-input"
            type="text"
            id="phone-number"
            placeholder="+961 3 111 222"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {error && <p className="error-message"> {error}</p>}
        <button className="submit-button" type="submit">
          Register
        </button>
        <p className="login-register">
          Already Have an Account? <a href="./login">Login</a>
        </p>
      </form>
    </div>
  );

};

export default Register;
