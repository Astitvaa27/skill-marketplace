import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Auth({ setUserName }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Fill all fields ❌");
      return;
    }

    const url = isLogin
  ? "https://skill-marketplace-n8j5.onrender.com/login"
  : "https://skill-marketplace-n8j5.onrender.com/signup";

    const data = isLogin
      ? { email, password }
      : { name, email, password };

    axios.post(url, data)
      .then((res) => {
        if (!res.data.message.includes("successful")) {
          toast.error(res.data.message);
          return;
        }

        toast.success(res.data.message);

        // 🔥 LOGIN FLOW
        if (isLogin) {
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("isAdmin", res.data.isAdmin);

          // 🔥 update navbar instantly
          setUserName(res.data.name);

          // 🔁 redirect
          navigate("/");
        }

        // clear fields
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        toast.error("Server error ❌");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        
        <h3 className="text-center mb-3">
          {isLogin ? "Login 🔐" : "Sign Up 📝"}
        </h3>

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
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-center mt-3"
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Auth;