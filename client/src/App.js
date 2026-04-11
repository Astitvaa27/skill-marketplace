import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddService from "./pages/AddService";
import Auth from "./pages/Auth";

function App() {
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <BrowserRouter>

      {/* ✅ EXACT SAME NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand text-white" to="/">
          SkillMarket 🚀
        </Link>

        <div>
          <Link className="btn btn-light mx-2" to="/">Home</Link>
          <Link className="btn btn-light mx-2" to="/add">Add Service</Link>

          {userName ? (
            <>
              <span className="text-white mx-2">
                Welcome, {userName}
              </span>

              <button className="btn btn-danger mx-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-light mx-2" to="/auth">Login</Link>
          )}
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home userName={userName} isAdmin={isAdmin} />} />
        <Route path="/add" element={<AddService userName={userName} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;