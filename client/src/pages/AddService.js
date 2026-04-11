import React, { useState } from "react";
import axios from "axios";

function AddService({ userName }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  

  const BASE_URL = "https://skill-marketplace-n8j5.onrender.com";

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ LIMIT SIZE (VERY IMPORTANT)
    if (file.size > 200000) {
      alert("Image too large (max 200kb)");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async () => {
    if (!userName) {
      alert("Login first");
      return;
    }

    if (!title || !price) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/services`, {
        title,
        price,
        image: "",
        user: userName,
      });

      alert("Service Added");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Error adding service");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Service</h2>

      <input
        className="form-control my-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="file"
        className="form-control my-2"
        onChange={handleImage}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Add Service
      </button>
    </div>
  );
}

export default AddService;