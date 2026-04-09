import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddService() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 📸 Resize + compress image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const MAX_WIDTH = 300;
      const MAX_HEIGHT = 200;

      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      if (height > MAX_HEIGHT) {
        width = width * (MAX_HEIGHT / height);
        height = MAX_HEIGHT;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
      setImage(compressedImage);
    };

    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const user = localStorage.getItem("userName");

    if (!user) {
      toast.error("Please login first ❌");
      return;
    }

    axios.post("https://skill-marketplace-n8j5.onrender.com/services", {
      title,
      price,
      image,
      user   // 🔥 store owner
    }).then(() => {
      toast.success("Added ✅");
      setTitle("");
      setPrice("");
      setImage("");
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add Service</h2>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="file"
        className="form-control my-2"
        onChange={handleImage}
      />

      {image && (
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}

      <button className="btn btn-success mt-2" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default AddService;