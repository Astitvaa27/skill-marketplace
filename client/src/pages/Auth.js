import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Auth({ setUserName, setIsAdmin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/signup";

      const res = await axios.post(url, form);

      if (res.data.message.includes("successful")) {
        toast.success(res.data.message);

        if (isLogin) {
          // 🔥 STORE
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("isAdmin", res.data.isAdmin);

          // 🔥 FORCE UPDATE
          setUserName(res.data.name);
          setIsAdmin(res.data.isAdmin === true);

          // 🔥 VERY IMPORTANT (FORCE RELOAD UI)
          window.location.href = "/";
        } else {
          setIsLogin(true);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      {!isLogin && (
        <input
          className="form-control my-2"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      )}

      <input
        className="form-control my-2"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p
        className="mt-3 text-primary"
        style={{ cursor: "pointer" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New user? Signup"
          : "Already have account? Login"}
      </p>
    </div>
  );
}

export default Auth;