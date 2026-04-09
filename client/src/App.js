import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddService from "./pages/AddService";
import Auth from "./pages/Auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [services, setServices] = useState([]);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔥 Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const storedAdmin = localStorage.getItem("isAdmin") === "true";

    if (storedUser) setUserName(storedUser);
    if (storedAdmin) setIsAdmin(true);
  }, []);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand text-white">SkillMarket 🚀</span>

        <div>
          <Link className="btn btn-light mx-2" to="/">Home</Link>
          <Link className="btn btn-light mx-2" to="/add">Add Service</Link>

          {userName ? (
            <>
              <span className="text-white mx-2">Hi, {userName}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-light mx-2" to="/auth">Login</Link>
          )}
        </div>
      </nav>

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              services={services}
              setServices={setServices}
              userName={userName}
              isAdmin={isAdmin}
            />
          }
        />

        <Route
          path="/add"
          element={
            <AddService
              services={services}
              setServices={setServices}
              userName={userName}
            />
          }
        />

        <Route
          path="/auth"
          element={
            <Auth
              setUserName={setUserName}
              setIsAdmin={setIsAdmin}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;