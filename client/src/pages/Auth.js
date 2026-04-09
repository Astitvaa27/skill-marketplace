import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate(); // ✅ inside component

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("https://skill-marketplace-n8j5.onrender.com/login", {
          email,
          password,
        });

        alert("Login Successful");

        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("isAdmin", res.data.isAdmin);

        navigate("/"); // ✅ redirect
      } else {
        // SIGNUP
        await axios.post("https://your-backend.onrender.com/signup", {
          name,
          email,
          password,
        });

        alert("Signup Successful");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error: " + err.response?.data || "Something went wrong");
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
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p className="mt-3" onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "New user? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;