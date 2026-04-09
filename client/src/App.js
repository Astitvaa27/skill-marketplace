import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddService from "./pages/AddService";
import Auth from "./pages/Auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // 🔥 Global user state
  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
  );

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
    <BrowserRouter>

      {/* 🔥 NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">SkillMarket 🚀</span>

        <div className="d-flex align-items-center">

          {/* 👋 USER NAME */}
          {userName && (
            <span className="text-white me-3">👋 {userName}</span>
          )}

          <Link className="btn btn-light mx-2" to="/">Home</Link>

          {/* 🔒 PROTECTED ADD SERVICE */}
          <Link className="btn btn-light mx-2" to="/add">
            Add Service
          </Link>

          {!userName ? (
            <Link className="btn btn-light mx-2" to="/auth">Login</Link>
          ) : (
            <button className="btn btn-danger mx-2" onClick={handleLogout}>
              Logout 🚪
            </button>
          )}

        </div>
      </nav>

      {/* 🔔 TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* 🔄 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 🔥 PROTECTED ROUTE */}
        <Route
          path="/add"
          element={
            userName ? (
              <AddService />
            ) : (
              <Auth setUserName={setUserName} />
            )
          }
        />

        {/* AUTH */}
        <Route path="/auth" element={<Auth setUserName={setUserName} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;