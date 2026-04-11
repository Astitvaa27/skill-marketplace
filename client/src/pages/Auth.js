import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "https://skill-marketplace-n8j5.onrender.com";

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });

        alert("Login Successful");

        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("isAdmin", res.data.isAdmin);

        window.location.href = "/";
      } else {
        await axios.post(`${BASE_URL}/signup`, {
          name,
          email,
          password,
        });

        alert("Signup Successful");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error: " + (err.response?.data || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {!isLogin && (
        <input
          className="form-control my-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="form-control my-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control my-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "New user? Sign up" : "Already have account? Login"}
      </p>
    </div>
  );
}

export default Auth;